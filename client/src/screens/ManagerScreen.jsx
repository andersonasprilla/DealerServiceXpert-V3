import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getUsers } from "../api/api"

const ManagerScreen = ({ userData }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuthStatus()
        if (!user) {
          navigate('/')
          return
        }
        const usersData = await getUsers()
        setUserData(usersData)
      } catch (error) {
        console.error('Authentication failed:', error)
        navigate('/')
      } 
    }
    verifyAuth()
  }, [navigate])
  
  return (
    <Layout>
        {/* Map over userData and render Container for each user */}
        {userData.map((user, index) => (
            <Container key={index} data={user} />
        ))}
    </Layout>
  )
}

export default ManagerScreen
