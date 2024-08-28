import React from 'react';
import Layout from './Layout';
import Container from '../Container/Container';

const AuthenticatedLayout = ({ isLoading, error, children }) => {
  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the main layout
  return (
    <Layout>
      {React.Children.count(children) > 0 ? (
        // Render children if they exist
        children
      ) : (
        // Show a "No data found" message if there are no children
        <Container>
          <div>No data found.</div>
        </Container>
      )}
    </Layout>
  );
};

export default AuthenticatedLayout;