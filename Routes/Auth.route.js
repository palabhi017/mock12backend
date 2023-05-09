const express = require("express")
const userRouter = express.Router()
const {userModel} = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/signup", async(req,res)=>{
    const {email,password} = req.body;
try {
   let user = await userModel.find({email})
   if(user.length>0){
    res.send("user already present plese login")
   }else{
      bcrypt.hash(password,5, async(err,hash)=>{
        const user = new userModel({email,password:hash})
        await user.save()
      })
      res.send("user ragistered successfully")
   }
} catch (error) {
 res.json({"err":error})
}
})

userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.find({email})
        if(user.length>0){
         bcrypt.compare(password,user[0].password,(err,result)=>{
         if(result){
             let token = jwt.sign({masai:"mock12"},"masai")
            res.json({"msg": "login successful","token":token})
         }else{
            res.send("wrond Password")
         }
         })
        }else{
            res.send("wrond Details")

        }
    } catch (error) {
        res.send(error)
    }
})


module.exports={userRouter}