import dotenv from "dotenv";
import users from "./data/users.js";
import customers from "./data/customers.js";
import User from "./models/userModel.js";
import Customer from "./models/customerModel.js";
import connectDB from "./config/db.js";
import pkg from 'colors'

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Function to get a random service advisor from the list of users
const getRandomServiceAdvisor = (users) => {
    const serviceAdvisors = users.filter(user => user.role === 'Service Advisor');
    return serviceAdvisors[Math.floor(Math.random() * serviceAdvisors.length)];
};

// Function to import data into the database
const importData = async () => {
    try {
        // Delete all existing users and customers from the database
        await Promise.all([User.deleteMany(), Customer.deleteMany()]);

        // Insert the sample users into the database
        const createdUsers = await User.insertMany(await users());

        // Map the sample customers, assigning a random service advisor to each customer
        const sampleCustomers = customers.map((customer) => {
            return { ...customer, user: getRandomServiceAdvisor(createdUsers)._id };
        });

        // Insert the sample customers into the database
        const createdCustomers = await Customer.insertMany(sampleCustomers);

        // Update each service advisor's customers field
        await Promise.all(createdUsers.map(async (user) => {
            if (user.role === 'Service Advisor') {
                const userCustomers = createdCustomers.filter(customer => customer.user.toString() === user._id.toString());
                user.customers = userCustomers.map(customer => customer._id);
                await user.save(); // Save the updated user
            }
        }));

        // Find the manager and assign all service advisors to the manager's users field
        const manager = createdUsers.find(user => user.role === 'Manager');
        if (manager) {
            const serviceAdvisors = createdUsers.filter(user => user.role === 'Service Advisor');
            manager.users = serviceAdvisors.map(user => user._id);
            await manager.save(); // Save the updated manager
        }

        console.log('Data Imported!'.green.inverse); // Log success message
        process.exit(); // Exit the process
    } catch (error) {
        console.error(`${error}`.red.inverse); // Log error message
        process.exit(1); // Exit the process with failure code
    }
};

// Function to destroy data in the database
const destroyData = async () => {
    try {
        // Delete all existing users and customers from the database
        await Promise.all([User.deleteMany(), Customer.deleteMany()]);

        console.log('Data Destroyed!'.red.inverse); // Log success message
        process.exit(); // Exit the process
    } catch (error) {
        console.error(`${error}`.red.inverse); // Log error message
        process.exit(1); // Exit the process with failure code
    }
};

// Check if the script was run with the '-d' argument to destroy data
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}