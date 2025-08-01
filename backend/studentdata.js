import express from 'express'
import pool from '../backend/db.js'

const router = express.Router();

router.get('/data', async(req,res)=>{
    try{
        const result = await pool.query("select * from users where role='student' order by room_no");
        console.log(result.rows)
        res.json(result.rows);
    }catch(err){
        console.log(err);
    }
})
export default router 