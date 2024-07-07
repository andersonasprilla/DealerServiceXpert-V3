import ServiceAdvisorScreen from "./screens/ServiceAdvisorScreen";
import ManagerScreen from "./screens/ManagerScreen";


const customerData = [
  {
    hatNumber: "6209",
    repairOrder: "497263",
    opened: "4h 15m",
    customerName: "Daniel Taylor",
    vehicle: "Ridgeline 2019",
    contact: "(305)-890-1234",
    priority: "Waiter",
    description: "Maintenance",
    status: "Checked In!",
  },
  {
    hatNumber: "6210",
    repairOrder: "497264",
    opened: "2h 30m",
    customerName: "Emily Johnson",
    vehicle: "Civic 2020",
    contact: "(305)-987-6543",
    priority: "Drop Off",
    description: "Oil Change, Inspection",
    status: "In Progress",
  },
  {
    hatNumber: "6211",
    repairOrder: "497265",
    opened: "1h 45m",
    customerName: "Michael Brown",
    vehicle: "Accord 2018",
    contact: "(305)-123-4567",
    priority: "Waiter",
    description: "Maintenance, Diagnostic",
    status: "Checked In!",
  },
  {
    hatNumber: "6212",
    repairOrder: "497266",
    opened: "1h 15m",
    customerName: "Olivia Smith",
    vehicle: "Pilot 2017",
    contact: "(305)-456-7890",
    priority: "Drop Off",
    description: "Oil Change, Inspection",
    status: "In Progress",
  },
  {
    hatNumber: "6213",
    repairOrder: "497267",
    opened: "45m",
    customerName: "James Wilson",
    vehicle: "CR-V 2019",
    contact: "(305)-678-9012",
    priority: "Waiter",
    description: "Maintenance, Recall",
    status: "Checked In!",
  },
];

const userData = [
  {
    username: 'Luis Asprilla',
    email: 'luis@gmail.com',
    role: 'Service Advisor',
},
{
    username: 'Anica Barrios',
    email: 'anica@gmail.com',
    role: 'Service Advisor',
},
{
    username: 'John Boss',
    email: 'boss@gmail.com',
    role: 'Manager',
}
];

const App = () => {
  return (
    <>
    {/* Render only the screen of the corresponding logged in user */}
    <ServiceAdvisorScreen customerData={customerData} />
    {/* <ManagerScreen userData={userData} /> */}
    </>
        
  )
};

export default App;
