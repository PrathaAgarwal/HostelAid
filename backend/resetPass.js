import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../backend/db.js'
import nodemailer from 'nodemailer'
import crypto from 'crypto';
const router= express.Router();
const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.Email_user,
        pass:process.env.Email_pass,
    },
});
router.post('/forgotPassword', async(req, res) =>{
    const {email}= req.body;
    try{
        const userRes = await pool.query('select * from users where email = $1', [email]);
        if (userRes.rowCount === 0){
            return res.status(404).json({error: 'user not found'});
        }
        const user = userRes.rows[0];
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt= new Date(Date.now() + 60*60*1000)
        await pool.query('insert into password_resets(user_id, token, expires_at) values ($1,$2,$3)' ,[user.id, token, expiresAt]);

        const resetLink= `https://prathaagarwal.github.io/Hostel/resetLink/${token}`;

        await transporter.sendMail({
            from: process.env.Email_user,
            to: email,
            subject: 'password resent link',
            html: `<p>click below :</p> <a href="${resetLink}">${resetLink}</a>`,
        });
        res.json({message: 'resent link sent'});
    }catch(err){
        console.error('forgot passwd error', err);
        res.status(500).json({error: 'something went wrong'});
    }
});
router.post('/resetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const tokenRes = await pool.query(
      'SELECT * FROM password_resets WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    if (tokenRes.rowCount === 0) {
        console.log("invaild token");
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    const userId = tokenRes.rows[0].user_id;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    await pool.query('DELETE FROM password_resets WHERE token = $1', [token]);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('resetPassword error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}); 
export default router;
