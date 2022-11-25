import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet ,useNavigate,Navigate
} from "react-router-dom";
import { useEffect } from 'react';
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Write from './pages/Write'
import Single from './pages/Single'
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Allblogs from './pages/Allblogs';
import './bootstrap.min.css';

var auth = JSON.parse(localStorage.getItem('details'));
//outlet it allows us to use parent elements to render their child elements

// function Redirect({ to }) {
//   let navigate = useNavigate();
//   useEffect(() => {
//     navigate(to);
//   });
//   return null;
// }

const Layout = ()=>{
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<Home  />
      }, {
        path:"/allblogs",
        element:<>{(auth)?<Allblogs />:<Navigate to='/' />}</>
      },
      {
        path:"/:cat",
        element:<Home  />
      },
      {
        path:"/profile",
        element:<>{(auth)?<Profile />:<Navigate to='/' />}</>
      },
      {
        path:"/post/:id",
        element:<Single />
      },
      {
        path:":cat/post/:id",
        element:<Single />
      },
      {
        path:"/write",
        element:<>{(auth)?<Write />:<Navigate to='/'/>}</>
      },
      {
        path:"/write/:id",
        element:<>{(auth)?<Write />:<Navigate to='/'/>}</>
      }
    ]
  },
  {
    path: "/register",
    element:<>{(auth)?<Navigate to='/' />: <Register />}</>
  },
  {
    path: "/login",
    element:<>{auth?<Navigate to='/'/>:<Login />}</>,
  }
]);

function App() {
  
  return (
    <>
  <RouterProvider router={router} />
    </>
  );
}

export default App;


