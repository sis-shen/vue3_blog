const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const Genid =require("../utils/SnowFlake")

var db = new sqlite3.Database(path.join(__dirname , "blog.sqlite3")) 
const genid = new Genid({WorkerId:1})//机器码。每个服务器都不同,防止id重复

db.async = {}

db.async.all = (sql,params) =>{
    return new Promise((resolve,reject) =>{
        db.all(sql,params,(err,rows)=>{
            resolve({err,rows})

        })
    })
}

db.async.run = (sql,params) =>{
    return new Promise((resolve,reject) =>{
        db.run(sql,params,(err,rows)=>{
            resolve({err,rows})

        })
    })
}
//导出0
module.exports = {db,genid}