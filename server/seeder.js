import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"; // For coloring console output
import users from "./data/users.js";
import customers from "./data/customers.js";
import User from "./models/userModel.js";
import Customer from "./models/customerModel.js";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Function to get a random user from the list of users
const getRandomUser = (users) => {
    return users[Math.floor(Math.random() * users.length)];
};

// Function to import data into the database
const importData = async () => {
    try {
        // Delete all existing users and customers from the database
        await User.deleteMany();
        await Customer.deleteMany();

        // Insert the sample users into the database
        const createdUsers = await User.insertMany(users);

        // Map the sample customers, assigning a random user to each customer
        const sampleCustomers = customers.map((customer) => {
            return { ...customer, user: getRandomUser(createdUsers)._id };
        });

        // Insert the sample customers into the database
        const createdCustomers = await Customer.insertMany(sampleCustomers);

        // For each created user, find their customers and update the user's customers field
        for (let user of createdUsers) {
            const userCustomers = createdCustomers.filter(customer => customer.user.toString() === user._id.toString());
            user.customers = userCustomers.map(customer => customer._id);
            await user.save(); // Save the updated user
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
        await User.deleteMany();
        await Customer.deleteMany();

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
