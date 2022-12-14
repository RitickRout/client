import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // const [user, setUser] = useState();
  const [values, setValues] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const notify = () => {
    toast("Successfully Loggedin! ");
    setTimeout(() => {
      navigate("/")
      window.location.reload();
    },
      1500)
  }

  const handleChange = async e => {
    setError("")
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const removeError = (event) => {
    if (event.target.value === '')
      setValues((prev) => ({ ...prev, [event.target.name + 'Error']: "" }));
  }

  let validate = (selecteditem) => {

    if ((selecteditem.target.name === 'email')) {
      if (!(selecteditem.target.value)) setValues((prev) => ({ ...prev, [selecteditem.target.name + 'Error']: `Please Enter email / Username it Cannot be empty` }))
    }
    else if (!(selecteditem.target.value)) setValues((prev) => ({ ...prev, [selecteditem.target.name + 'Error']: `Please Enter ${selecteditem.target.name} it Cannot be empty` }))

  }


  const handleSubmit = async e => {
    e.preventDefault();

    if (!values.email) setValues((prev) => ({ ...prev, ['emailError']: "Please Enter email / Username it Cannot be empty" }));
    if (!values.password) setValues((prev) => ({ ...prev, ['passwordError']: "Please password it Cannot be empty" }));



    if (values.email && values.password)
      axios.post("http://localhost:8000/api/auth/login", values).then(
        (success) => {
          console.log("inside success", success)
          // setUser(success.other)
          window.localStorage.setItem("details", JSON.stringify(success.data.other))
          window.localStorage.setItem("auth_token", success.data.token)
          notify()
        },
        (error) => {
          setError(error.response.data)
          console.log("inside error", error)
        }
      )
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='container'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-5 border border-primary px-5 py-3 teal-bg rounded-2">
            <h1 className='text-center text-light mt-4'>Login Page</h1>
            <form >
              <div className="form-group">
                <label className="form-label mt-4 text-light">Email address / Username</label>
                <input type="email" className="form-control" placeholder="Enter email / Username" name='email' onChange={handleChange} onBlur={(e) => { validate(e) }} onFocus={removeError} />
                <small className="form-text text-light">We'll never share your email with anyone else.</small>
                {(values.emailError) ? <p className=' text-light dark'>{values.emailError}</p> : <div></div>}
              </div>
              <div className="form-group">
                <label className="form-label mt-4 text-light">Password</label>
                <input type="password" className="form-control" placeholder="Password" name='password' autoComplete='on' onChange={handleChange} onBlur={(e) => { validate(e) }} onFocus={removeError} />
              </div>
              {(values.passwordError) ? <p className=' text-light dark'>{values.passwordError}</p> : <div></div>}
              <div className='form-group mt-2'>
                <button className='btn btn-primary mb-2' onClick={handleSubmit}>Login </button>

                {(error) ? <p className=' text-light dark'>{error}</p> : <div></div>}

                <div className='mb-5 mt-2'>Don't you have an account ? <Link className='text-light' to='/register'>Register</Link></div>
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}




export default Login

export { Login }