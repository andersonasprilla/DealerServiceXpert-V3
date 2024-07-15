import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getCustomers } from "../api/api"

const formatCustomersData = (customersData) => {
  return customersData.map(customer => {
    const { hatNumber, repairOrder, createdAt, customerName, vehicle, contact, priority, status } = customer
    return { 
      Hat: hatNumber, 
      repairOrder, 
      Opened: createdAt, 
      customerName, 
      vehicle, 
      contact, 
      priority, 
      status 
    }
  })
}


const ServiceAdvisorScreen = () => {
  const navigate = useNavigate()
  // State to store customer data
  const [customers, setCustomers] = useState([])

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
        const customersData = await getCustomers()
        // Format customer data
        const formattedCustomers = formatCustomersData(customersData)
        // Update state with formatted customer data
        setCustomers(formattedCustomers)
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
      {customers.map((customer, index) => (
        <Container key={index} data={customer} />
      ))}
    </Layout>
  )
}

export default ServiceAdvisorScreen