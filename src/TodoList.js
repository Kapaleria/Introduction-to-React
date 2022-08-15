import React from 'react'
import Todo from './Todo'

export default function TodoList({todoList, toggleTodo}) {
  return (
   // <div>{todoList.length}</div>
   todoList.map(todo=>{
    return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/> //returning a todo elemnet
   })
  )
}
