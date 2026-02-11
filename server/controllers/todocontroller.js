const todomodel = require("../models/todomodel")

exports.getAllTasks = async(req,res) =>{
    const todo = await todomodel.find();
    // if(todo.length ===0){
    //     return res.status(404).json({
    //         success: false,
    //         message: "No Task"
    //     })
    // }

    res.status(200).json({
        success: true,
        data: todo
    })
}
exports.getTask = async(req,res)=>{
    const {id} = req.params
    let todoSearch = await todomodel.findOne({todo:id})
    if(!todoSearch){
       todoSearch = await todomodel.findOne({_id:id})
    }
    if(!todoSearch){
        return res.status(404).json({
            success:false,
            message: "Sorry no that found"
        })
    }
    res.status(200).json({
        success:true, 
        message: "Task found",
        task: todoSearch
    })
}

exports.addTask = async(req,res) => { 
    const {data} = req.body
    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:" fill input"
        })
    } 
    await todomodel.create(data)
    const todo = await todomodel.find();
    res.status(200).json({
        success: true,
        data: todo
    })
}

exports.editTask = async(req,res)=>{
    const {id} = req.params
    const {data} = req.body

    const updateTask = await todomodel.findByIdAndUpdate({_id:id},data,{new:true})

    if(!updateTask){
       return res.status(404).json({
            success: false, 
            message: "task not found"
        })
    }
    res.status(201).json({
        success:true,
        message:"Task Updated Successfully",
        data:updateTask
    })

}

exports.deleteTask = async(req,res)=>{
    const {id} = req.params
    const deleteTask = await todomodel.findByIdAndDelete(id)
    if(!deleteTask){
        return res.status(404).json({
            success:false,
            message:"No such task available"
        })
    }
    const todo = await todomodel.find()
        res.status(200).json({
            success: true,
            message: "Task deleted",
            todo:todo
        })
}