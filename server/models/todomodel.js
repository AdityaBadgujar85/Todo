const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchemas = new Schema({
    todo:{ 
        type:String, 
        required:true
    },
    description:{
        type: String, 
        required:true
    },
    completed:{
        type: Boolean, 
        required: false
    },
}, 
{
    timestamps: true
}
)
module.exports = mongoose.model("todo", todoSchemas);