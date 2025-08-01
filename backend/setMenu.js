import express from 'express';
import pool from '../backend/db.js';
const router= express.Router();

router.post('/set', async(req, res)=>{
    try{
        const data=req.body;
        console.log(data);
        const result=await pool.query('insert into menu(tdate,breakfast,lunch,snacks,dinner) values($1,$2,$3,$4,$5)',[data.date,data.breakfast,data.lunch,data.snack,data.dinner])
        res.status(200).json({ message: "Menu received successfully" });
    }catch(err){
        console.log(err);
    }
});
router.get('/get', async(req, res)=>{
    try{
        const result=await pool.query('select * from menu where tdate= CURRENT_DATE Limit 1');
        if (result.rows.length===0){
            return res.status(404).json({message :"no menu"});
        }
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"error"})
    }
});

export default router;
