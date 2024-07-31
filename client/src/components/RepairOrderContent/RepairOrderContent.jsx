import { Typography } from "@material-tailwind/react";
import Dropdown from "../Container/Dropdown";
import formatFieldName from "../../helper/formatFieldName";
import formatTime from "../../helper/formatTime";

const RepairOrderContent = ({ repairOrder }) => {
    const dataOrder = [
      { key: 'hatNumber', label: 'Hat Number' },
      { key: 'repairOrderNumber', label: 'Repair Order' },
      { key: 'createdAt', label: 'Created At' },
      { key: 'vin', label: 'VIN' },
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'repairDescription', label: 'Repair Description' },
      { key: 'status', label: 'Status' }
    ];
  
    const renderField = (key, value) => {
      if (key === 'status') {
        return <Dropdown initialStatus={value} />;
      } else if (key === 'createdAt') {
        return <Typography className='font-semibold text-left'>{formatTime(value)}</Typography>;
      } else {
        return <Typography className='font-semibold text-left'>{value}</Typography>;
      }
    };
  
    return (
      <div className="flex ">
        {dataOrder.map(({ key, label }) => {
          let value = repairOrder[key];
          if (key === 'firstName' || key === 'lastName' || key === 'phone' || key === 'vin') {
            value = repairOrder.customer[key];
          }
          return (
            <div key={key} className="flex-1">
                    <Typography className="mb-1 text-left">{label}</Typography>
                    {renderField(key, value)}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default RepairOrderContent;1