import { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import Dropdown from "./Dropdown.jsx";
import formatFieldName from "../../helper/formatFieldName.js";

const Container = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Card className='mt-2'>
        <Accordion open={isOpen}>
          <AccordionHeader onClick={handleOpen} className='border-b-0'>
            <CardBody className='py-0 w-full'>
              <div className="flex justify-between">
                {data && Object.entries(data).map(([key, value]) => (
                  <div key={key} className="flex-1">
                    <Typography className="mb-1 text-left">{formatFieldName(key)}</Typography>
                    {key === 'status' ? (
                      <Dropdown />
                    ) : (
                      <Typography className='font-semibold text-left'>{value}</Typography>
                    )}
                  </div>
                ))}
              </div>
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

