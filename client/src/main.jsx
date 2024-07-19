import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import ServiceAdvisorScreen from './screens/ServiceAdvisorScreen.jsx'
import ManagerScreen from './screens/ManagerScreen.jsx'
import './output.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index ={true} path="/" element={<Login/>} />
      <Route path="/service-advisor/:id/dashboard" element={<ServiceAdvisorScreen />} />
      <Route path="/manager/:id/dashboard" element={<ManagerScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
