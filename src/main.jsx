import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './components/Signup.jsx'
import Signup from './components/Signup.jsx'
import{Profile} from './components/profile/index.js'
import ShareItem from './components/services/ShareItem.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      // {
      //       path: "/Signup",
      //       element: <Signup />,
      //   },
      {
            path: "/Login",
            element: <Login />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/Share-Item",
          element: <ShareItem />,
        },
        
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
