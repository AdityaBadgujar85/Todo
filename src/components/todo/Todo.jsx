  import axios from "axios";
import { useEffect, useState } from "react";
import { useTodosContext } from "../hooks/useTodoContext";
const Todo = () => {

    const [todo,setTodo] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const {todos,dispatch} = useTodosContext();
    const [editId, setEditId] = useState(null);
    const [loading,setLoading] = useState(true)
    const handleSubmit = async(e) => {
    e.preventDefault();
    if(editId){
      const res = await axios.put("https://todo-server-bfjv.onrender.com/todos/updatetask/" + editId , {
        data:{todo,description}
      });
      dispatch({
        type: "UPDATE_TODOS",
        payload: res.data.data
      });
      setEditId(null);
      setTodo("");
      setDescription(""); 
    }else{
    try {
    if(!todo || !description){
      alert("Please fill all field")
    }
    const tasks = {todo ,description};    
    const res = await axios.post("https://todo-server-bfjv.onrender.com/todos/addtask/", {data:tasks});
    dispatch({
        type:"CREATE_TODOS",
        payload:res.data.data
    })
      setTodo("");
      setDescription("");

    } catch (error) {
      console.log(error);
    }
    }
    }

    const handleTask = async(id,current) => {
      try{
        const res = await axios.put("https://todo-server-bfjv.onrender.com/todos/updatetask/" + id ,{data: {completed:!current}})
        dispatch({
          type: "UPDATE_TODOS",
          payload: res.data.data
        })
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
       const getAllTask = async() => {
        try{
           const res = await axios.get("https://todo-server-bfjv.onrender.com/todos");
           dispatch({
            type:"SET_TODOS",
            payload: res.data.data
           }) 
           setLoading(false);
        }catch(error){
            console.log(error)
        }
       }
       getAllTask();
    },[dispatch])

    const handleDelete = async(id) => {
      try{
        const res = await axios.delete("https://todo-server-bfjv.onrender.com/todos/deletetask/" + id)
        dispatch({
          type:"DELETE_TODOS",
          payload:res.data.todo
        })
      }catch(error){
        console.log(error)
      }
    }
  return (
    <div className="flex flex-col min-h-screen items-center pt-10 pb-10">
      <div className=" w-[90%] max-w-xxl p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label>Todo</label>
          <input onChange={(e)=>setTodo(e.target.value)} value={todo} type="text" className="outline-[0.5px] p-2 rounded shadow-sm focus:shadow-blue-300 px-3 focus:outline-blue-300"/>
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} className="outline-[0.5px] p-2 rounded shadow-sm focus:shadow-blue-300 px-3 focus:outline-blue-300"/>
        </div>
        <div>
        <button className="bg-blue-400 px-10 py-2 text-white rounded hover:cursor-pointer">Add</button>
        </div>
        </form>
      </div>
      <div className="w-[90%] max-w-xxl p-10 rounded-lg shadow-lg">
      {loading?(
        <div className="flex justify-center items-center">
          Loading.....
        </div>
      ):<div className="flex flex-col gap-5">
       <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="outline-[0.5px] shadow rounded px-3 py-1 focus:outline-blue-300 focus:shadow-blue-300" placeholder="search"/>
        {todos && todos.filter((item)=>{
          return item && item.todo.toLowerCase().includes(search.toLowerCase());
        }).map((item)=>{
            return(
                <div key={item._id} className="bg-gray-200 gap-5 py-3 px-6 rounded-md flex items-center justify-between">
                  <div className="flex gap-6 justify-center items-center">
                    <div>
                        <input checked={item.completed} onChange={()=>handleTask(item._id,item.completed)} className="scale-200" type="checkbox" name="" id="" />
                    </div>
                    <div>
                    <h1>{item.todo}</h1>
                    <p>{item.description}</p>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={()=>{
                            setEditId(item._id);
                            setTodo(item.todo);
                            setDescription(item.description);
                      }} className="bg-blue-400 text-white px-4 py-1 rounded-md text-sm">Edit</button>
                      <button onClick={()=>handleDelete(item._id)} className="bg-red-400 text-white px-4 py-1 rounded-md text-sm">Delete</button>
                    </div>
                </div>    
            )
        })}
        </div>
     }
      </div>
    </div>
  );
};

export default Todo;