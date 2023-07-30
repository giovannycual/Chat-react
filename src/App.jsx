import io from 'socket.io-client'
import {useState,useEffect} from 'react'
const socket=io("/")
function App(){
  const[message,setMessage]=useState('');
  const[messages,setMessages]=useState([]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const newMessage={
      body:message,
      from:'Me'
    }
    setMessages([...messages,newMessage])
    socket.emit('message',message);

  };
  
  useEffect(()=>{
    socket.on('message',
      reciveMessage)
    
    return()=>{
      socket.off('message',
      reciveMessage);
    };
  },[]);

  const reciveMessage=message=>setMessages(state=>[...state,message]);

  return(
    <div className="h-screen bg-zinc-800 text-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-arial my-2 text-white'>CHAT CON REACT</h1>
        <input className='border-2 border-zinc-500 text-black p-3 w-full' type="text" placeholder='escribe tu mensaje'
        onChange={(e)=>setMessage(e.target.value)} />
        <ul>
        {
          messages.map((message,i) =>(
            <li key ={i}className={
              `my-2 p-2 table text-sm rounded-md ${message.from =='Me' ? 'bg-sky-700 ':`bg-red-600	 ml-auto`}`
            }       
            ><span className='text-xs   block'>
              {message.from}</span>:
              <span className='text-sm'>{message.body}</span>
              </li>
          ))
        }
        
      </ul>
        <button className='border-slate-300 text-white'>
          enviar
        </button>
      </form>

      
    </div>
  )
}
export default App