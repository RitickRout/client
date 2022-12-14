import React, { useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import logo from '../assets/image/logo.png'
import '../App.css'
import Categories from './Categories'


export const Navbar = () => {
  const navigate = useNavigate()
  let user =JSON.parse(localStorage.getItem('details'))
  let userAuth =localStorage.getItem('auth_token')
  var [refesh,setrefresh] = useState(false)
    useEffect(()=>{
     },[refesh])

  //    function parseJwt (token) {
  //     var base64Url = token.split('.')[1];
  //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));
  //     return JSON.parse(jsonPayload);
  // }


  
  const clickHandler = () => {
    window.localStorage.removeItem("details");
    window.localStorage.removeItem("auth_token");
    navigate('/')
    window.location.reload();
    setrefresh(!refesh)
  }
  return (
    <>
      <div className="bs-component sticky-top col-md-12 ">
        <nav className="navbar navbar-expand-lg navbar-dark teal-bg p-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>
              <img src={logo} className='logo' onClick={()=>{ window.scrollTo(0, 0) ;navigate('/'); window.location.reload()}}  alt=''/>
            </Link>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto ">
                {/* <li className="nav-item">
                  <Link className="nav-link" to='/'> <i className="bi bi-house-door-fill mx-2"></i> Home </Link>
                  <span className="visually-hidden">(current)</span>
                </li> */}
                {(user)? <li className="nav-item">
                  <Link className="nav-link" to='/write'> <i className="bi bi-pencil-square mx-2" ></i> Write</Link>
                </li>:<li></li>}
               
                <li className='nav-item'>
                  <span className="nav-link"><Categories /></span>
                </li>
                {(user)?<li className='nav-item'>
                  <Link to='/allblogs' className="nav-link"> My Blogs</Link>
                </li>:<li></li>}
              </ul>
              <form className="d-flex navbar-nav mx-5 px-5 w-25 justify-content-end ">
                {(user) ?
                  <Link className="nav-link "  >
               <span className="dropdown">
               <img src={user.profile} className='userprofile dropdown-toggle' dropdown-toggle   aria-expanded="false" alt='' />
                <ul className='dropdown-menu '>
                  <li className='dropdown-item'><Link className='text-decoration-none' to="/profile"><i className="bi bi-person-circle h5"></i>  <span className='mx-2'>{user.username}</span> </Link></li>
                  <li className='dropdown-item' onClick={clickHandler} > <Link to="/" className='nav-link'><i className="bi bi-box-arrow-right h5 red "></i> <span className='mx-2 text-danger'>Logout</span></Link></li>
                </ul>
               </span>
                  </Link>
                  : <Link className="nav-link " to='/login' >
                   Login
                  </Link>}
              </form>
            </div>
          </div>
        </nav>
      </div>

    </>
  )
}
