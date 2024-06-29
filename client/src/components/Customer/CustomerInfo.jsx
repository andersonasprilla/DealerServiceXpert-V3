import { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import Dropdown from "./Dropdown";
import getStatusColors from '../../helper/getStatusColors';

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

const CustomerInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Card className='mt-2'>
        <Accordion open={isOpen}>
          <AccordionHeader onClick={handleOpen} className='border-b-0'>
            <CardBody className='py-2 w-full'>
              {customers.map((customer, i) => (
                <div key={i} className="flex flex-cols-2 gap-4 mb-4 justify-between ">
                  {Object.entries(customer).map(([key, value]) => (
                    <div key={key}>
                      <Typography className="mb-1">{keyMapping[key] || key}</Typography>
                      {key === 'status' && value === 'Checked In!' ? (
                        <Dropdown />
                      ) : (
                        <Typography className=' font-semibold'>{value}</Typography>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </CardBody>
          </AccordionHeader >
          <AccordionBody >
            Edit Customer
          </AccordionBody>
        </Accordion>
      </Card>
    </>
  );
}

export default CustomerInfo;
