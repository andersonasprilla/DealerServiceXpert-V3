import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus, getRepairOrders } from "../api/api"
import RepairOrderContent from "../components/RepairOrderContent/RepairOrderContent"

const ServiceAdvisorScreen = () => {
  const navigate = useNavigate()
  // State to store customer data
  const [repairOrders, setRepairOrders] = useState([])

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuthStatus();
        if (!user) {
          navigate('/');
          return;
        }
        const response = await getRepairOrders({ user: user._id });
        console.log(response.results)
        setRepairOrders(response.results);
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      }
    };
    verifyAuth();
  }, [navigate]);


  return (
    <Layout>
      {repairOrders.map((repairOrder) => (
        <Container key={repairOrder._id} >
          <RepairOrderContent repairOrder={repairOrder} />
        </Container>
      ))}
    </Layout>
  )
}

export default ServiceAdvisorScreen