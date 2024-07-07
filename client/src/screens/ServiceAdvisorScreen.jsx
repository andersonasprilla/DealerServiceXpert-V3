import Layout from "../components/Layout/Layout"
import Container from "../components/Container/Container"

const ServiceAdvisorScreen = ({ customerData }) => {
  return (
    <Layout>
      {/* Map over customerData and render Container for each customer */}
      {customerData.map((customer, index) => (
        <Container key={index} data={customer} />
      ))}
    </Layout>
  )
}

export default ServiceAdvisorScreen
