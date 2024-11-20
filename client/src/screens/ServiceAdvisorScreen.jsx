import React from 'react';
import { getRepairOrders } from "../api/api";
import RepairOrderContent from "../components/RepairOrderContent/RepairOrderContent";
import useAuthVerification from "../middleware/useAuthVerification";
import useDataFetching from '../hooks/useDataFetching';
import AuthenticatedLayout from '../components/Layout/AuthenticatedLayout';
import Container from "../components/Container/Container";

const ServiceAdvisorScreen = () => {
  // Use custom hook for authentication verification
  const { user, isLoading: authLoading } = useAuthVerification('Service Advisor');

  // Use custom hook for fetching repair orders data
  const { data: repairOrders, isLoading, error } = useDataFetching(
    () => getRepairOrders({ user: user?._id }),
    [user],
    !!user?._id  // Only fetch when user ID is available
  );

  // Render the service advisor dashboard
  return (
    <AuthenticatedLayout isLoading={authLoading || isLoading} error={error}>
      {repairOrders.map((repairOrder) => (
        <Container key={repairOrder._id} repairDescription={repairOrder.repairDescription}>
          <RepairOrderContent repairOrder={repairOrder} />
        </Container>
      ))}
    </AuthenticatedLayout>
  );
};

export default ServiceAdvisorScreen;