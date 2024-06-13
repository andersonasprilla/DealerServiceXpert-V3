import bcrypt from 'bcryptjs';

const users = [
    {
        username: 'Luis Asprilla',
        email: 'luis@gmail.com',
        role : 'Service Advisor',
        password : bcrypt.hashSync('123456', 10),
    },
    {
        username: 'Anica Barrios',
        email: 'anica@gmail.com',
        role : 'Service Advisor',
        password : bcrypt.hashSync('123456', 10),
    }
];

export default users;
