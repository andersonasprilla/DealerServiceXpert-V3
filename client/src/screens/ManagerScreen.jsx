import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { getUsers } from "../api/api"
import UserContent from "../components/UserContent/UserContent"
import useAuthVerification from "../middleware/useAuthVerification"

const ManagerScreen = () => {
  const { user, isLoading: authLoading } = useAuthVerification('Manager');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const response = await getUsers();
          setUsers(response.results || []);
        } catch (error) {
          console.error('Failed to fetch users:', error);
          setError('Failed to fetch users. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();
  }, [user]);

  if (authLoading) {
    return <div>Verifying authentication...</div>;
  }

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Container key={index}>
            <UserContent user={user} />
          </Container>
        ))
      ) : (
        <div>No users found.</div>
      )}
    </Layout>
  )
}

export default ManagerScreen