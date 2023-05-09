const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    name: String,
    email: String,
    depart: String,
    salary: Number
})

const empModel = mongoose.model("employee",empSchema)

module.exports = {empModel}