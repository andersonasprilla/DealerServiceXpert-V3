import argon2 from 'argon2';

const users = async () => {
    return [
        {
            username: 'Luis Asprilla',
            email: 'luis@gmail.com',
            role: 'Service Advisor',
            password: await argon2.hash('123456'),
        },
        {
            username: 'Anica Barrios',
            email: 'anica@gmail.com',
            role: 'Service Advisor',
            password: await argon2.hash('123456'),
        },
        {
            username: 'John Boss',
            email: 'boss@gmail.com',
            role: 'Manager',
            password: await argon2.hash('123456'),
        }
    ];
};

export default users;
