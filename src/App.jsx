import { useState,useEffect } from 'react'
import Navbar from './component/Navbar'
import { MdEditDocument } from "react-icons/md";    
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

 
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
    
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }

  
  



  const handleedit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    saveToLS()

  }


  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    saveToLS()

  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })  
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    saveToLS()

  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5   p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your  todos at one place</h1>
        <div className="add todo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold '>Add todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-2' />
          <button onClick={handleadd} disabled={todo.length<=3}  className='bg-violet-800 mx-2 rounded-full
hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold 
text-white'>Save</button>
             </div> 
        </div>
        <input className='my-4'  onChange={toggleFinished}  type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-serif m-5'>No Todos to display</div>}


          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleedit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-lg mx-2 font-bold text-sm'><MdEditDocument /></button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-lg mx-2 font-bold text-sm'><MdDelete /></button>
              </div>
            </div>

          })}
        </div>


      </div>
    </>
  )
}

export default App
