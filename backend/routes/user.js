const router = require("express").Router()
const config = require("../connection")
const connection = config.connection

router.get("/",(req,res)=>{
    console.log("hello")
})