import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import customers from "./data/customers.js";
import User from "./models/userModel.js";
import Customer from "./models/customerModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const getRandomUser = (users) => {
    return users[Math.floor(Math.random() * users.length)];
};

const importData = async () => {
    try {
        await User.deleteMany();
        await Customer.deleteMany();

        const createdUsers = await User.insertMany(users);

        const sampleCustomers = customers.map((customer) => {
            return { ...customer, user: getRandomUser(createdUsers)._id };
        });

        const createdCustomers = await Customer.insertMany(sampleCustomers);

        for (let user of createdUsers) {
            const userCustomers = createdCustomers.filter(customer => customer.user.toString() === user._id.toString());
            user.customers = userCustomers.map(customer => customer._id);
            await user.save();
        }

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Customer.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
