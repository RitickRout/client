import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet ,useNavigate
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
import 'bootstrap/dist/css/bootstrap.min.css';

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
        element:<Allblogs />
      },
      {
        path:"/:cat",
        element:<Home  />
      },
      {
        path:"/profile",
        element:<Profile />
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
        element:<Write />
      },
      {
        path:"/write/:id",
        element:<Write />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
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


