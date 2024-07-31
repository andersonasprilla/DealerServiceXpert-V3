import { useState } from 'react';
import {
  Card,
  CardBody,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";

const Container = ({ children }) => {
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
          <AccordionBody>
            Edit data {/* Future implementation */}
          </AccordionBody>
        </Accordion>
      </Card>
    </>
  );
};

export default Container;
