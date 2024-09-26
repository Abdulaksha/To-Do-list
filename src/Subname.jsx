import axios from "axios";
import React, {  useEffect,  useState } from "react";
import "./Subname.css"
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

function Subname(){
  const[groce,setgroce]=useState([])
   const[input,setinput]=useState("")
  const han=async()=>{
    let andd=await axios.get("http://localhost:3000/todoList");
    setgroce(andd.data);
    
    
  }

  useEffect(()=>{
    han();

  },[]);
  
  const had=(e)=>{
    setinput(e.target.value)
  }
  
  const handpost=()=>{
    
if(input==""){
  return;
}
     
    let body ={
      
        grocery:input,  
          
    }

    

   
  
  
    setinput("");
    
    let post=axios.post("http://localhost:3000/todoList",body);
    
 alert("success");

han(); 
 
}

const handledelete=async(id)=>{
  let del=await axios.delete(`http://localhost:3000/todoList/${id}`)
  han()

}


 const handleedit=async(i)=>{

      let rs=prompt("enter ur grocery",groce[i].grocery)
      let body={
        id: groce[i].id,
        grocery:rs
         
      }
       let update=await axios.put(`http://localhost:3000/todoList/${groce[i].id}`,body)
          han()
 }





        return(
            <>
             {/* http://localhost:3000/todoList */}
                <h1>GROCERY LISTS</h1>

                <input onChange={had}  placeholder="enter groceries" value={input}/>
                <button onClick={handpost}  > submit</button>
             {groce.map((cf,i)=>(
            <div>
                <ul>{i+1}.{cf.grocery}<span className="a" onClick={()=>handleedit(i)}><CiEdit /></span>
               <span   onClick={()=>handledelete(cf.id)}> <MdOutlineDelete /></span>
                
                </ul>
                
            </div>
            ))}

            </>
        )


}
export default React.memo(Subname);
