import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"
import { useState, useEffect } from "react"
import { getRepairOrders } from "../api/api"
import RepairOrderContent from "../components/RepairOrderContent/RepairOrderContent"
import useAuthVerification from "../middleware/useAuthVerification"

const ServiceAdvisorScreen = () => {
  const { user, isLoading } = useAuthVerification('Service Advisor');
  const [repairOrders, setRepairOrders] = useState([]);

  useEffect(() => {
    const fetchRepairOrders = async () => {
      if (user) {
        try {
          const response = await getRepairOrders({ user: user._id });
          setRepairOrders(response.results);
        } catch (error) {
          console.error('Failed to fetch repair orders:', error);
        }
      }
    };

    fetchRepairOrders();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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