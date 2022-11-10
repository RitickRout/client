import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
function Menu({category ,refresh}) {
  const [data, setData] = useState("");
  const [start, setStart] = useState(0);
  let temp;
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts').then(
      (success) => {
        if(category){
         temp = success.data.filter((item=>{
          return item.Category === category
         }))
         setData(temp)
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])

  const handleClick = (ind) => {
    navigate(`/post/${ind}`)
    refresh((prev)=>!prev)
  }
  const handleIncrement = ()=>{
    if(start < data.length-3 ){
      setStart((prev)=>(prev+1))
    }
  }
const handleDecrement =()=>{
  if(start >0){
    setStart((prev)=>(prev-1))
  }
}
  
  return (
    <div className="menu">
      <h2>Other posts you may like</h2>
      <div className='my-3' onClick={handleDecrement}><i className="bi bi-arrow-up-square-fill h3 ">Prev...</i></div>
      {
        (data) ? <div >
          {(data).slice(start, start + 3).map((item) => (
            <div className="Post" style={{"height":"350px"}} key={item.id}>
              <img src={item.img} alt="" />
              <h4>{item.title}</h4>
              <button onClick={() => { handleClick(item.id) }}>Read More</button>
            </div>
          ))}
          <div onClick={handleIncrement}><i className="bi bi-arrow-down-square-fill h3"><span className='mx-2'>Next...</span></i></div>
        </div> : <div className='position-absolute top-50 end-50'>
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }

    </div>
  )
}

export default Menu