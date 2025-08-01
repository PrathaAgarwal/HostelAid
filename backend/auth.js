import express from 'express';
import pool from '../backend/db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
router.post('/student/login', async (req, res)=>{
    try{
        const {email, password,role}= req.body;
        const result= await pool.query('select * from users where email= $1 and role=$2', [email,role]);
        if (result.rows.length===0){
            return res.status(400).json({error: 'invalid email'});
        }
        const user=result.rows[0];
        const valid= await bcrypt.compare(password, user.password);
        if (!valid){
            return res.status(401).json({error:'invalid password'});
            
        }
        req.session.studentName=user.name;
        res.json({message:'Login successful'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});

router.post('/student/register', async (req, res)=>{
    console.log("auth reguister");
    try{
        const {name,email, password,date, phone, room}= req.body;
        const result= await pool.query('select * from users where email= $1', [email]);
        if (result.rows.length>0){
            return res.status(400).json({error: 'already ecist '});
        }
        const salt =await bcrypt.genSalt(10);
        const hashedP= await bcrypt.hash(password,salt);
        const newUser=await pool.query('insert into users(name, email, password,role,DOB,father_phoneno,room_no) values ($1,$2, $3, $4,$5,$6,$7) returning *', [name,email,hashedP,'student', date, phone, room]);
        res.status(201).json({message:'Login successful', user:newUser.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});
router.post('/warden/login', async (req, res)=>{
    try{
        const {email, password,role}= req.body;
        const result= await pool.query('select * from users where email= $1 and role=$2', [email, role]);
        if (result.rows.length===0){
            return res.status(400).json({error: 'invalid email'});
        }
        const user=result.rows[0];
        const valid= await bcrypt.compare(password, user.password);
        if (!valid){
            return res.status(401).json({error:'invalid password'});
            
        }
        res.json({message:'Login successful'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});

router.post('/warden/register', async (req, res)=>{
    try{
        const {name,email, password}= req.body;
        const result= await pool.query('select * from users where email= $1', [email]);
        if (result.rows.length>0){
            return res.status(400).json({error: 'already ecist '});
        }
        const salt =await bcrypt.genSalt(10);
        const hashedP= await bcrypt.hash(password,salt);
        const newUser=await pool.query('insert into users(name, email, password,role) values ($1,$2, $3, $4) returning *', [name,email,hashedP,'warden']);
        res.status(201).json({message:'Login successful', user:newUser.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});
router.post('/driver/login', async (req, res)=>{
    try{
        const {email, password,role}= req.body;
        const result= await pool.query('select * from users where email= $1 and role=$2', [email,role]);
        if (result.rows.length===0){
            return res.status(400).json({error: 'invalid email'});
        }
        const user=result.rows[0];
        const valid= await bcrypt.compare(password, user.password);
        if (!valid){
            return res.status(401).json({error:'invalid password'});    
        }
        res.json({message:'Login successful'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});

router.post('/driver/register', async (req, res)=>{
    try{
        const {name,email, password}= req.body;
        const result= await pool.query('select * from users where email= $1', [email]);
        if (result.rows.length>0){
            return res.status(400).json({error: 'already ecist '});
        }
        const salt =await bcrypt.genSalt(10);
        const hashedP= await bcrypt.hash(password,salt);
        const newUser=await pool.query('insert into users(name, email, password,role) values ($1,$2, $3, $4) returning *', [name,email,hashedP,'driver']);
        res.status(201).json({message:'Login successful', user:newUser.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'server error'});
    }
});
export default router;
