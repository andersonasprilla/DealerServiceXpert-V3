import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getCustomers } from "../api/api"

const formatCustomersData = (customersData) => {
  return customersData.map(customer => {
    const { hatNumber, repairOrder, createdAt, customerName, vehicle, contact, priority, status } = customer
    return { hatNumber, repairOrder, createdAt, customerName, vehicle, contact, priority, status }
  })
}

const ServiceAdvisorScreen = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuthStatus()
        if (!user) {
          navigate('/')
          return
        }
        const customersData = await getCustomers()
        const formattedCustomers = formatCustomersData(customersData)
        setCustomers(formattedCustomers)
      } catch (error) {
        console.error('Authentication failed:', error)
        navigate('/')
      } 
    }
    verifyAuth()
  }, [navigate])

  return (
    <Layout>
      {/* Map over customers and render Container for each cusotmer */}
      {customers.map((customer, index) => (
        <Container key={index} data={customer} />
      ))}
    </Layout>
  )
}

export default ServiceAdvisorScreen
