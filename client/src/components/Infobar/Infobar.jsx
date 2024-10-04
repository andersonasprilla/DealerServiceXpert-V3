import React, { useMemo } from 'react';
import useAuthVerification from '../../middleware/useAuthVerification';
import useDataFetching from '../../hooks/useDataFetching';
import { getRepairOrders, getUsers } from '../../api/api';

const Infobar = () => {
  const { user, isLoading: userLoading } = useAuthVerification();
  const isManager = user?.role === 'Manager';

  const { data, isLoading: dataLoading, error } = useDataFetching(
    isManager
      ? () => getUsers({ role: 'Service Advisor' })
      : () => getRepairOrders({ user: user?._id }),
    [user],
    !!user?._id
  );

  const dataCount = useMemo(() => {
    if (!data.length) return 0;
    return isManager ? data.length : data.filter(order => order.status === 'checked-in').length;
  }, [data, isManager]);

  const isLoading = userLoading || dataLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 text-red-600 p-3 rounded border border-red-400 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4 ml-4"> 

      <div className="flex items-center space-x-1 py-3 border-b border-gray-200">
        <span className="text-sm text-gray-600">
          {isManager ? 'Total Service Advisors:' : 'Open Orders:'}
        </span>
        <span className="text-lg font-semibold text-gray-800">
          {dataCount}
        </span>
      </div>
    </div>
  );
};

export default Infobar;