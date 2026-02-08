import { useEffect, useState } from "react"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdDelete,MdEdit} from "react-icons/md";
import Axios from "axios"
const baseURL = "https://todo-server-bfjv.onrender.com/todos" 
const addURL = "https://todo-server-bfjv.onrender.com/todos/addtask"
const InputForm = () =>{
    const [todoTask,setTodoTask] = useState("")
    const [todoDescription,setTodoDescription] = useState("")
    const [updateId,setUpdateId] = useState(false)
    const [apiData,setApiData]=useState([])
    const [loading,setLoading] = useState(true) 
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!todoTask.trim() || !todoDescription.trim()){
            alert("Input cannot be empty")
            return;
        }
        if(updateId){
            Axios.put(`https://todo-server-bfjv.onrender.com/todos/updatetask/${updateId}`,{data:{todo:todoTask,description:todoDescription}}).then((res)=>{
                setApiData((prev)=>prev.map((todo)=>todo._id === updateId ? res.data.data : todo))
                setTodoTask("")
                setTodoDescription("")
                setUpdateId(false)
            })
        }else{
            Axios.post(addURL,{data:{todo:todoTask,description:todoDescription,completed:false}}).then((res)=>{
            setApiData(res.data.data)
            setTodoTask("")
            setTodoDescription("")
        }).catch((error)=>{
            console.log(error)
        })
        }
    }
    const handleTaskStatus=(id,statusOfTask)=>{
        Axios.put(`https://todo-server-bfjv.onrender.com/todos/updatetask/${id}`,{data:{completed:!statusOfTask}}).then((res)=>{
            setApiData((prev)=>prev.map((todo)=>todo._id===id ? {...todo,completed:!statusOfTask}:todo))
        }).catch((error)=>{
            console.log(error)
        })
        
    }

    useEffect(()=>{
        Axios.get(baseURL).then((res)=>{
            setApiData(res.data.data)
            setLoading(false)
        })
    },[])


    const handleDelete=(id)=>{
        Axios.delete(`https://todo-server-bfjv.onrender.com/todos/deletetask/${id}`).then(()=>{
            setApiData((prev)=>prev.filter((todo)=>todo._id !== id))
        })

    }

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4 p-8 sm:p-15 select-none">
            <form action="" onSubmit={handleSubmit} className="flex justify-center items-start w-full flex-col gap-4 bg-white rounded-md p-5 sm:p-10"> 
                <h1 className="text-2xl text-gray-600">Todo</h1>
                <div className="w-full flex flex-wrap gap-4">
                <input 
                className="
                w-full 
                p-2 rounded-md 
                outline-none 
                shadow-sm
                shadow-gray-400
                focus:shadow-blue-300
                py-3
                px-5
                text-gray-700
                " 
                type="text" placeholder="Todo" onChange={(e)=>setTodoTask(e.target.value)} value={todoTask}/>
                <input 
                className="
                w-full 
                p-2 rounded-md 
                outline-none 
                shadow-sm
                shadow-gray-400
                focus:shadow-blue-300
                py-3
                px-5
                text-gray-700" 
                type="text" placeholder="Description" onChange={(e)=>setTodoDescription(e.target.value)} value={todoDescription}/>
                </div>
                <button className="px-4 py-2 rounded-md text-white w-full sm:w-[30%] bg-[#3D5B61] hover:bg-[#24383c] cursor-pointer">{updateId?"Update Task":"Add Task"}</button>
            </form> 
            {loading?             
            <div className="flex  flex-col justify-center items-center gap-3 bg-white w-full rounded-md h-full p-10">
                <div className="w-10 h-10 border-5 border-gray-300 border-t-5 border-t-gray-700 rounded-full animate-spin" ></div>
            </div>
            :
            <div className="flex  flex-col gap-3 bg-white w-full rounded-md h-full p-5 sm:p-10">
                {apiData.map((each)=>{
                    return(
                    <div key={each._id} className="bg-gray-200 justify-between px-4 py-3 flex rounded-md hover:bg-gray-300">
                    <div className="flex">
                    <input type="checkbox" name="" id="checkBox" className="scale-150 accent-[#3D5B61]" onChange={()=>handleTaskStatus(each._id,each.completed)} checked={each.completed}/>
                    <div className="flex justify-center items-center">
                    <label  style={{textDecoration: each.completed ? "line-through" : "none"}} className="text-gray-600 w-full ms-5" htmlFor="">{each.todo}</label>
                    </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-gray-700">
                        <div className="flex justify-center items-center relative group">
                            <IoMdInformationCircleOutline size={20} className="cursor-pointer"/> 
                            <div className="absolute right-full text-white hidden group-hover:block w-50 min-h-15 sm:w-100 wrap-break-word rounded-md p-3 text-sm z-10" style={{background:'#3D5B61'}}>
                                <p>{each.description}</p>
                            </div>
                        </div>
                        <MdEdit size={20} className="cursor-pointer" onClick={()=> {setTodoTask(each.todo) 
                                                        setTodoDescription(each.description)
                                                        setUpdateId(each._id)
                                                        }}/>
                        <MdDelete size={20} className="cursor-pointer" onClick={()=>handleDelete(each._id)}/>
                    </div>
                    </div>
                    )
                })}
            </div>
            }
        </div>
    )
}
export default InputForm