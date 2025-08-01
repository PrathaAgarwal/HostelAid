import express from 'express';
import pool from '../backend/db.js';

const router = express.Router();
router.get('/get', async(req,res)=>{
    const today = new Date().toISOString().split('T')[0];
    try{
      const result = await pool.query('select name from users where DOB = $1', [today]);
      res.json(result.rows);
    }catch(err){
        console.log(err);
    }
});
export default router;