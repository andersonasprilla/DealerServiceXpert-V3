// Desc: Helper function to format field names
const formatFieldName = (fieldName) => {
    // Split camelCase string into words
    let words = fieldName.split(/(?=[A-Z])/);
    
    // Capitalize the first letter of each word and join with space
    let formattedString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return formattedString;
};

export default formatFieldName;