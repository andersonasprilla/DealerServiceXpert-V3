import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { getUsers } from "../api/api"
import useAuthVerification from "../middleware/useAuthVerification"

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
  const { user, isLoading } = useAuthVerification('Manager');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          const usersData = await getUsers();
          const formattedUsers = formatServiceAdvisorsData(usersData);
          setUsers(formattedUsers); 
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      }
    };

    fetchUsers();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {users.map((user, index) => (
        <Container key={index} data={user} />
      ))}
    </Layout>
  )
}

export default ManagerScreen
