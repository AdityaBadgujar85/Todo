import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";

const InputForm = () => {

  const [todoText, setTodoText] = useState("");
  const [description, setDescription] = useState("");

  const [todoList, setTodoList] = useState([]);
  const [showList, setShowList] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const baseURL = "https://todo-server-bfjv.onrender.com/todos";

  const loadTasks = async () => {
    try {
      const res = await axios.get(baseURL);
      const data = res.data.data;
      setTodoList(data);
      setShowList(data);
    } catch (err) {
      console.log("cannot load tasks", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadTasks();
  }, []);

  const submitTask = async (e) => {
    e.preventDefault();
    if (todoText.trim() === "" || description.trim() === "") {
      alert("please fill both fields");
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${baseURL}/updatetask/${editingId}`, {
          data: {
            todo: todoText,
            description: description,
          },
        });

      } else {
        await axios.post(`${baseURL}/addtask`, {
          data: {
            todo: todoText,
            description: description,
            completed: false,
          },
        });

      }

      setTodoText("");
      setDescription("");
      setEditingId(null);
      loadTasks();

    } catch (err) {
      console.log("error while saving", err);
    }
  };
  const removeTask = async (id) => {

    try {

      await axios.delete(`${baseURL}/deletetask/${id}`);

      loadTasks();

    } catch (err) {
      console.log("delete failed", err);
    }

  };

  const changeStatus = async (id, value) => {
    try {
      await axios.put(`${baseURL}/updatetask/${id}`, {
        data: {
          completed: !value,
        },
      });
      loadTasks();
    } catch (err) {
      console.log("status update error", err);
    }

  };

  useEffect(() => {
    let arr = [];
    if (searchText === "") {

      arr = todoList;
    } else {
      arr = todoList.filter((t) => {
        return t.todo.toLowerCase().includes(searchText.toLowerCase());
      });

    }
    setShowList(arr);

  }, [searchText, todoList]);
  return (

    <div className="flex flex-col items-center justify-center bg-gray-100 gap-4 p-8 sm:p-15 select-none">
      <form
        onSubmit={submitTask}
        className="flex flex-col gap-4 bg-white rounded-md p-6 sm:p-10 w-full"
      >
        <h2 className="text-xl text-gray-600">Todo</h2>
        <input
          type="text"
          placeholder="Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full p-3 px-5 rounded-md outline-none shadow-sm shadow-gray-400 focus:shadow-blue-300 text-gray-700"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 px-5 rounded-md outline-none shadow-sm shadow-gray-400 focus:shadow-blue-300 text-gray-700"
        />
        <button className="px-4 py-2 rounded-md text-white w-full sm:w-[30%] bg-[#3D5B61] hover:bg-[#24383c] cursor-pointer">
          {editingId ? "Update Task" : "Add Task"}
        </button>

      </form>
      {loading ? (
        <div className="bg-white w-full rounded-md p-10 text-center">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col gap-3 bg-white w-full rounded-md p-6 sm:p-10">
          <div className="flex">
            <input
              type="text"
              placeholder="Search task"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-2 ps-4 text-sm w-[95%] shadow rounded-bl-md rounded-tl-md outline-none shadow-gray-400 focus:shadow-blue-300"
            />
            <button
              type="button"
              className="p-2 w-[15%] sm:w-[5%] bg-[#3D5B61] rounded-br-md rounded-tr-md flex justify-center items-center shadow shadow-gray-400"
            >
              <MdSearch size={22} className="text-white" />
            </button>

          </div>

          {showList.map((item) => (
            <div
              key={item._id}
              className="bg-gray-200 flex justify-between px-4 py-3 rounded-md hover:bg-gray-300"
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="scale-150 accent-[#3D5B61]"
                  checked={item.completed}
                  onChange={() => changeStatus(item._id, item.completed)}
                />
                <div className="ms-5">
                  <label className="text-gray-700">
                    {item.todo}
                  </label>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MdEdit
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    setTodoText(item.todo);
                    setDescription(item.description);
                    setEditingId(item._id);
                  }}
                />
                <MdDelete
                  size={20}
                  className="cursor-pointer"
                  onClick={() => removeTask(item._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default InputForm;