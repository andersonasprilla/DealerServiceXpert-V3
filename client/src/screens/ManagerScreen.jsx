import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"

const ManagerScreen = ({ userData }) => {
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
