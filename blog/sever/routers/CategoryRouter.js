const express = require("express")
const router = express.Router()
const {db,genid} =require("../db/DbUtils")

//列表接口
//添加接口
//修改接口
//删除接口

//列表接口
router.get("/list",async(req,res)=>{
    const reaserch_sql = "SELECT * FROM  `category`"
    let {err,rows} = await db.async.all(reaserch_sql,[])

    if(err == null){
        res.send({
            code:200, //与前端约定好200为正常
            msg:"查询成功",
            rows //相当于rows:rows
        })
    }else{
        res.send({
            code:303,
            msg:"查询失败"
        })
    }
})

//删除接口 /category/delete?id=xxx
router.delete("/_token/delete",async (req,res)=>{

    let id = req.query.id
    const delete_sql = "DELETE from `category` WHERE `id` = ?"
    let {err,rows} = await db.async.run(delete_sql,[id])

    if(err == null){
        res.send({
            code:200, //与前端约定好200为正常
            msg:"删除成功"
        })
    }else{
        res.send({
            code:302,
            msg:"删除失败"
        })
    }
})
//修改接口
router.put("/_token/update",async (req,res)=>{

    let {id,name} = req.body
    const update_sql = "UPDATE `category` SET `name` = ? WHERE `id` = ?"
    let {err,rows} = await db.async.run(update_sql,[name,id])

    if(err == null){
        res.send({
            code:200, //与前端约定好200为正常
            msg:"修改成功"
        })
    }else{
        res.send({
            code:304,
            msg:"修改失败"
        })
    }
})

//添加接口
router.post("/_token/add",async (req,res)=>{

    let {name} = req.body
    const insert_sql = "INSERT INTO `category` (`id`,`name`) VALUES (?,?)"
    let {err,rows} = await db.async.run(insert_sql,[genid.NextId(),name])

    if(err == null){
        res.send({
            code:200, //与前端约定好200为正常
            msg:"添加成功"
        })
    }else{
        res.send({
            code:301,
            msg:"添加失败"
        })
    }
})


module.exports = router