import React, { useState } from 'react'
import AddInput from './AddInput'
import TodoList from './TodoList'

function Todo() {

    const [todos, setTodos] = useState([])

    return (
        <div className="todo">
            <AddInput 
                setTodos={setTodos}
                todos={todos}
            />
            <TodoList 
                todos={todos}
                setTodos={setTodos}
            />
        </div>
    )
}

export default Todo