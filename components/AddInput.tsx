
import React, { useState } from 'react'

const AddInput= ({todos,setTodos})=>{
    const [todo, setTodo] = useState("")

    const addTodo = () => {
        if(!todo) return
        let updatedTodos = [
            ...todos,
            {
                task: todo,
                completed: false
            }
        ]
        setTodos(updatedTodos);
        setTodo("")
    }
    return(
        <div >
        <h1 >heading</h1>
        <div>
        <input 
                className="input" 
                value={todo} 
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a new"
            />
            <button 
                className="add-btn"
                onClick={addTodo}
            >
                Add
            </button>
        </div>
        </div>
    )
}
export default AddInput