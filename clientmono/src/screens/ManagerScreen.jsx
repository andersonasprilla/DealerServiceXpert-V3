import React from 'react';
import { getUsers } from "../api/api";
import UserContent from "../components/UserContent/UserContent";
import useAuthVerification from "../middleware/useAuthVerification";
import useDataFetching from '../hooks/useDataFetching';
import AuthenticatedLayout from '../components/Layout/AuthenticatedLayout';
import Container from "../components/Container/Container";

const ManagerScreen = () => {
  // Use custom hook for authentication verification
  const { user, isLoading: authLoading } = useAuthVerification('Manager');

  // Use custom hook for fetching service advisors data
  const { data: serviceAdvisors, isLoading, error } = useDataFetching(
    () => getUsers({role: 'Service Advisor'}),
    [user],
    !!user?._id  // Only fetch when user ID is available
  );

  // Render the manager dashboard
  return (
    <AuthenticatedLayout isLoading={authLoading || isLoading} error={error}>
      {serviceAdvisors.length > 0 ? (
        // Map through service advisors and render each one
        serviceAdvisors.map((advisor, index) => (
          <Container key={advisor._id || index}>
            <UserContent user={advisor} />
          </Container>
        ))
      ) : (
        // Display message if no service advisors found
        <Container>
          <div>No Service Advisors found.</div>
        </Container>
      )}
    </AuthenticatedLayout>
  );
};

export default ManagerScreen;