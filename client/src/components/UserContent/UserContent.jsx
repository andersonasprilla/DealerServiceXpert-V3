import { Typography } from "@material-tailwind/react";

const UserContent = ({ user }) => {
  const dataOrder = [
    { key: 'username', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  const renderField = (key, value) => {
    return <Typography className='font-semibold text-left'>{value}</Typography>;
  };

  return (
    <div className="flex">
      {dataOrder.map(({ key, label }) => {
        let value = user[key];
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

export default UserContent;