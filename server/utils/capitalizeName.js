const capitalizeName = name => {
    if (typeof name !== 'string') return name;
    return name
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

export default capitalizeName;
