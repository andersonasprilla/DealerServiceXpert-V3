import { Typography } from "@material-tailwind/react";
import Dropdown from "../Container/Dropdown";
import formatTime from "../../helper/formatTime";
import formatPhoneNumber from "../../helper/formatPhoneNumber";

const RepairOrderContent = ({ repairOrder }) => {
  const dataOrder = [
    { key: 'hatNumber', label: 'Hat Number' },
    { key: 'repairOrderNumber', label: 'Repair Order' },
    { key: 'createdAt', label: 'Opened' },
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status' }
  ];

  const renderField = (key, value) => {
    if (key === 'status') {
      return <Dropdown initialStatus={value} />;
    } else if (key === 'createdAt') {
      return <Typography className='font-semibold text-left'>{formatTime(value)}</Typography>;
    } else if (key === 'phone') {
      return <Typography className='font-semibold text-left'>{formatPhoneNumber(value)}</Typography>;
    } else {
      return <Typography className='font-semibold text-left'>{value}</Typography>;
    }
  };

  return (
    <div className="flex">
      {dataOrder.map(({ key, label }) => {
        let value = repairOrder[key];
        if (key === 'customerName') {
          value = `${repairOrder.customer.firstName} ${repairOrder.customer.lastName}`;
        } else if (key === 'phone') {
          value = repairOrder.customer[key];
        } else if (key === 'vehicle') {
          const { model, year } = repairOrder.customer.vehicle;
          value = `${model} ${year}`;
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

export default RepairOrderContent;