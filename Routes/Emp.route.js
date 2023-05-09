const express = require("express")
const empRouter = express.Router()
const {empModel} = require("../Models/empModel")

empRouter.post("/add", async(req,res)=>{
console.log(req.body)
    try {
        const employ = new empModel(req.body)
        await employ.save()
        res.send("employ added successfully")
    } catch (error) {
        res.send(error)
    }
})

empRouter.get("/", async(req,res)=>{

    try {

        let q={}
        let sort={}
        if(req.query.depart){
            q.depart = req.query.depart
        }
        if(req.query.sort){
            sort.salary = +req.query.order
        }
        let employ = await empModel.find(q).sort(sort)
        res.json({"employee": employ})
    } catch (error) {
        res.send(error)
    }
})

empRouter.delete("/delete/:id", async(req,res)=>{
const id = req.params.id
    try {
         await empModel.findByIdAndDelete(id)
        res.send("Employ Deleted successfully")
    } catch (error) {
        res.send(error)
    }
})

empRouter.patch("/update/:id", async(req,res)=>{
    const id = req.params.id
    const data = req.body
    try {
    
             await empModel.findByIdAndUpdate({_id:id},data)
            res.send("Employ Updated successfully")
        } catch (error) {
            res.send(error)
        }
    })

module.exports ={empRouter}