import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getRepairOrders } from "../api/api"



const ServiceAdvisorScreen = () => {
  const navigate = useNavigate()
  // State to store customer data
  const [repairOders, setRepairOrders] = useState([])

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check authentication status
        const user = await checkAuthStatus()
        if (!user) {
          // Redirect to home if not authenticated
          navigate('/')
          return
        }
        // Fetch customer data
        const repairOrderdata = await getRepairOrders()
        // Update state with formatted customer data
        setRepairOrders(repairOrderdata)
      } catch (error) {
        console.error('Authentication failed:', error)
        // Redirect to home on authentication failure
        navigate('/')
      } 
    }
    // Call the authentication and data fetching function
    verifyAuth()
  }, [navigate]) // Re-run effect if navigate function changes

  return (
    <Layout>
      {/* Map over customers and render Container for each customer */}
      {/* {repairOders.map((repairOrder, index) => (
        <Container key={index} data={repairOrder} />
      ))} */}
    </Layout>
  )
}

export default ServiceAdvisorScreen