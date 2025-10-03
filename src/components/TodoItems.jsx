import React from 'react'
import tick from "../assets/tick.png"
import notick from "../assets/not_tick.png"
import delete_icon from "../assets/delete.png"

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className = 'flex items-center my-3 gap-2'>

        {/* display check icon and task text*/}
      <div onClick = {() => {toggle(id)}}className = "flex flex-1 items-center cursor-pointer">

        <img className = "w-7" src={isComplete ? tick : notick} alt="ticked checkbox" />

        <p className = {`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>
            {text}
        </p>

      </div>

      {/* ---delete icon */}
      <img onClick = {() => {deleteTodo(id)}}className = 'w-4.5 cursor-pointer' src={delete_icon} alt="delete button" />

    </div>
  )
}

export default TodoItems
