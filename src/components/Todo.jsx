import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

// initialize empty todo list, and setter object
const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

// Add functionality to add input text into todo items
const inputRef = useRef() ;

// function that adds tasks
const add = () => {
    const inputText = inputRef.current.value.trim();
    
    // if input is empty it will skip code
    if (inputText === '') {
        return null;
    }

    const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
    }

    setTodoList((prev) => [...prev, newTodo]);

    // empty input when beginning new task
    inputRef.current.value = '';

}

// function to delete tasks
const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id)
    })
}

const toggle = (id) => {
    setTodoList((prvTodos) => {
        return prvTodos.map((todo) => {
            if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
}, [todoList])

  return (
    // Todo List container
    <div className = 'bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

      {/* ------- title ---------- */}
      <div className = 'flex items-center mt-5 gap-2'>
        <img className = 'max-w-10' src={todo_icon}/>
        <h1 className = 'text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/* ------- input box -------- */}
      <div className = 'flex items-center my-5 bg-gray-300 rounded-full'>
        <input ref = {inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
        type = "text" placeholder = 'Add your task!' />
        <button onClick = {add} className= 'border-none outline-none rounded-full bg-rose-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
      </div>

      {/* -------- todo list: display all todo items------------ */}
      <div>
        {todoList.map((item, index) => {
            return <TodoItems key = {index} text = {item.text} id = {item.id} isComplete = {item.isComplete} deleteTodo = {deleteTodo} toggle = {toggle}/>
        })}
      </div>

    </div>
  )
}

export default Todo
