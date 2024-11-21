import { useState } from 'react';
import {
  Card,
  CardBody,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography
} from "@material-tailwind/react";

const Container = ({ children, repairDescription }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Card className='mt-2'>
        <Accordion open={isOpen}>
          <AccordionHeader onClick={handleOpen} className='border-b-0'>
            <CardBody className='py-0 w-full'>
                {children}            
            </CardBody>
          </AccordionHeader>
          <AccordionBody className= 'p-6'>
            <Typography className="mb-1 text-left">Job Description</Typography>
            <Typography className='font-semibold text-left'>{repairDescription}</Typography>
          </AccordionBody>
        </Accordion>
      </Card>
    </>
  );
};

export default Container;