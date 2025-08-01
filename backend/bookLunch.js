import express from 'express'
import pool from '../backend/db.js';
console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
const router=express.Router()
router.post('/reserve' , async(req,res)=>{
    const studentName= req.session.studentName;
    try{
        const result= await pool.query('insert into lunch (name) values ($1)', [studentName]);
        res.json({message: 'successful'})
    }catch(err){
        console.log(err);
        res.status(500);
    }
});
router.get('/name', async(req,res) =>{
    try{
        const result= await pool.query("select name from lunch");
        res.json(result.rows);
    }catch(err){
        console.log(err);
    }
})
router.get('/qauntity', async(req,res) =>{
    try{
        const result = await pool.query("select count(*) from lunch");
        res.json(result.rows[0].count);
    }catch(err){
        console.log(err);
    }
})

export default router;