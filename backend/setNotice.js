import express from 'express';
import pool from '../backend/db.js';
const router= express.Router();

router.post('/set', async(req, res)=>{
    try{
        const data=req.body;
        const result=await pool.query('insert into notice (title, description) values($1,$2)',[data.title,data.notice])
        res.status(200).json({ message: "notice received successfully" });
    }catch(err){
        console.log(err);
    }
});
router.get('/get', async(req, res)=>{
    try{
        const result=await pool.query('select * from notice order by date desc');
        if (result.rows.length===0){
            return res.status(404).json({message :"no notice"});
        }
        res.status(200).json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"error"})
    }
});

export default router;
