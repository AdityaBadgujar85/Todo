import {createContext, useReducer} from "react"

export const TodoContext = createContext();

export const todosReducer = (state,action)=>{
    switch(action.type){
        case "SET_TODOS":
            return{
                todos:action.payload
            }
        case "CREATE_TODOS":
            return{
                todos:[...state.todos, action.payload]
            }
        case "UPDATE_TODOS":
            return{
                todos: state.todos.map((item)=>
                    item._id === action.payload._id ? action.payload : item
                )   
            }
        case "DELETE_TODOS":
            return{
                todos: action.payload
            }

        default:
            return state
    }
} 

export const TodoContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(todosReducer,{
    todos: []
})
    return(
        <TodoContext.Provider value={{...state,dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}