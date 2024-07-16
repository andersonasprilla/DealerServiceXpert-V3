import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getUsers } from "../api/api"

// Function to filter and format users with role 'service advisor'
const formatServiceAdvisorsData = (usersData) => {
  return usersData
    .filter(user => user.role === 'Service Advisor')
    .map(user => {
      const { username, email, role } = user
      return { 
        Name: username, 
        Email: email, 
        Role: role, 

      }
    })
}

const ManagerScreen = () => {
  const navigate = useNavigate()
  // State to store user data
  const [users, setUsers] = useState([])

  useEffect(() => {
    const verifyAuthAndFetchUsers = async () => {
      try {
        // Check authentication status
        const user = await checkAuthStatus()
        if (!user || user.role !== 'Manager') {
          // Redirect to home if not authenticated or not a manager
          navigate('/')
          return
        }
        // Fetch user data
        const usersData = await getUsers()
        // Format service advisor data
        const formattedUsers = formatServiceAdvisorsData(usersData)
        // Update state with formatted user data
        setUsers(formattedUsers)
      } catch (error) {
        console.error('Authentication failed:', error)
        // Redirect to home on authentication failure
        navigate('/')
      } 
    }
    // Call the authentication and data fetching function
    verifyAuthAndFetchUsers()
  }, [navigate]) // Re-run effect if navigate function changes

  return (
    <Layout>
      {/* Map over users and render Container for each service advisor */}
      {users.map((user, index) => (
        <Container key={index} data={user} />
      ))}
    </Layout>
  )
}

export default ManagerScreen
