import React, {useState, useRef, useEffect} from 'react'; //useRef helps us to refernce input inside of HTML
//useEffect helps us to store on local storage
import './App.css';
import './card.css'
import TodoList from './TodoList';
import icon from './icon.png'
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
    //const[todos,setTodos]=useState([{id:'1', name:'task 1', complete:false}]); //the array is an object
    const[todos, setTodos]=useState([])
    

   const todoNameRef =useRef()

   //to retrieve our stored todos
  useEffect(() =>{
    const storedTodos= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos){
      setTodos(storedTodos);
    } 
    
   },[])
  
   useEffect(() =>{
      localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
   }, [todos]) //todos is the dependency everytime it changes, useEffect is ran

   function toggleTodo(id){
    //don't directly modify a state variable, always make a copy and use it to change the state
      const newTodos=[...todos]
      const todo=newTodos.find(todo=>todo.id===id)
      todo.complete=!todo.complete
      setTodos(newTodos)
   }
   
    function handleAddTodo(e){
      //useRef hok gives us access to what is being typed by the use on the keyboard
      //e.target.value
     const name= todoNameRef.current.value

     if (name==='') return
     //console.log(name) //this works great
     setTodos(prevTodos=> {
      return [...prevTodos, {id:nanoid(), name:name, complete:false}] 
     })

     todoNameRef.current.value=null //clear the input field after submission
    }

    function handleClearTodos(){
      const newTodos=todos.filter(todo=>!todo.complete)
      setTodos(newTodos)
    }

  return(
    <>
 
    <div className="parent">
        <div className="head">
  
              <img src={icon} alt="notes keeper icon" className="icon"/>
              <h4 className="title">Work to be done</h4>

        </div>
    

    <hr/>
    <div className="task"> 
        <input type="text" ref={todoNameRef} className="myinput"/>
    </div>
    <br/>
    <div className="buttons">
        <span>

        <button type="button" className="add" 
        onClick={handleAddTodo}
        >Add task</button>
        <button type="button" className="done">Tasks done</button>
       
        <button type="button" className="clear"
        onClick={handleClearTodos}
        >Clear complete</button>
    </span>

        
    </div> 

    <div className='stats'>
              
              <div>{todos.filter(todo=>todo.complete).length} done</div>
              <div> {todos.filter(todo=>!todo.complete).length} still pending</div>
    </div>
    
                  <hr/>

    <div className="displayTasks">
        <TodoList todoList={todos} toggleTodo={toggleTodo  }/>
   </div>

</div> 
    </>
  );

  
}

export default App;
