const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const cleaned = ('' + input).replace(/\D/g, '');
    
    // Add parentheses and dashes
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    
    if (match) {
      return (!match[2] ? match[1] : '(' + match[1] + ')') + (match[2] ? '-' + match[2] : '') + (match[3] ? '-' + match[3] : '');
    }

    return input;
};

export default formatPhoneNumber;
