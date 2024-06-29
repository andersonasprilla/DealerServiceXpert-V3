import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const customers = [
  {
    hatNumber: "6209",
    repairOrder: "497263",
    opened: "4h 15m",
    customerName: "Daniel Taylor",
    vehicle: "Ridgeline 2019",
    contact: "(305)-890-1234",
    priority: "Waiter",
    description: "Maintenance, Recall, Diagnostic",
    status: "Checked In!"
  },
];

const keyMapping = {
  hatNumber: "Hat",
  repairOrder: "Repair Order",
  opened: "Opened",
  customerName: "Customer Name",
  vehicle: "Vehicle",
  contact: "Contact",
  priority: "Priority",
  description: "Description",
  status: "Status"
};

const Customer = () => {
  return (
    <Card>
      <CardBody>
        {customers.map((customer, i) => (
          <div key={i} className="flex flex-cols-2 gap-4 mb-4 justify-between">
            {Object.entries(customer).map(([key, value]) => (
              <div key={key}>
                <Typography className="font-bold mb-1">{keyMapping[key] || key}</Typography>
                <Typography>{value}</Typography>
              </div>
            ))}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

export default Customer;
