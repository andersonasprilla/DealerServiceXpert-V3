const getStatusColors = (status) => {
    switch (status) {
      case 'In Repair':
        return 'bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100 focus:ring-red-500';
      case 'Finished':
        return 'bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100 focus:ring-green-500';
      default:
        return 'bg-blue-50 text-blue-700 ring-blue-600/20 hover:bg-blue-100 focus:ring-blue-500';
    }
  }
  export default getStatusColors