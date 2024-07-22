import vehicles from './vehicles.js';
import repair_orders from './repair_orders.js';

const customers = async () => {
  const vehiclesData = await vehicles();
  const repairOrdersData = await repair_orders();

  return [
    {
      firstName: "John",
      lastName: "Doe",
      phone: "(555)-123-4567",
      vehicles: [
        {
          ...vehiclesData[0],
          repairOrders: [repairOrdersData[0]]
        }
      ]
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      phone: "(555)-234-5678",
      vehicles: [
        {
          ...vehiclesData[1],
          repairOrders: [repairOrdersData[1]]
        }
      ]
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      phone: "(555)-345-6789",
      vehicles: [
        {
          ...vehiclesData[2],
          repairOrders: [repairOrdersData[2]]
        }
      ]
    },
    {
      firstName: "Alice",
      lastName: "Williams",
      phone: "(555)-456-7890",
      vehicles: [
        {
          ...vehiclesData[3],
          repairOrders: [repairOrdersData[3]]
        }
      ]
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      phone: "(555)-567-8901",
      vehicles: [
        {
          ...vehiclesData[4],
          repairOrders: [repairOrdersData[4]]
        }
      ]
    },
    {
      firstName: "David",
      lastName: "Wilson",
      phone: "(555)-678-9012",
      vehicles: [
        {
          ...vehiclesData[5],
          repairOrders: [repairOrdersData[5]]
        }
      ]
    },
    {
      firstName: "Emma",
      lastName: "Davis",
      phone: "(555)-789-0123",
      vehicles: [
        {
          ...vehiclesData[6],
          repairOrders: [repairOrdersData[6]]
        }
      ]
    },
    {
      firstName: "Frank",
      lastName: "Miller",
      phone: "(555)-890-1234",
      vehicles: [
        {
          ...vehiclesData[7],
          repairOrders: [repairOrdersData[7]]
        }
      ]
    },
    {
      firstName: "Grace",
      lastName: "Taylor",
      phone: "(555)-901-2345",
      vehicles: [
        {
          ...vehiclesData[8],
          repairOrders: [repairOrdersData[8]]
        }
      ]
    },
    {
      firstName: "Hannah",
      lastName: "Anderson",
      phone: "(555)-012-3456",
      vehicles: [
        {
          ...vehiclesData[9],
          repairOrders: [repairOrdersData[9]]
        }
      ]
    }
  ];
};

export default customers;
