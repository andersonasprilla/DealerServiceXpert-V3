import dotenv from 'dotenv';
import users from './data/users.js';
import customers from './data/customers.js';
import repair_orders from './data/repair_orders.js';
import User from './models/userSchema.js';
import Customer from './models/customerSchema.js';
import RepairOrder from './models/repairOrderSchema.js';

import connectDB from './config/db.js';
import 'colors';

dotenv.config();

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const importData = async () => {
    try {
        await connectDB();

        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            RepairOrder.deleteMany()
        ]);

        const createdUsers = await User.insertMany(await users());
        const customersData = await customers();
        let repairOrdersData = shuffleArray(await repair_orders());

        const serviceAdvisors = createdUsers.filter(user => user.role === 'Service Advisor');

        for (const customerData of customersData) {
            const newCustomer = await Customer.create(customerData);

            // Assign one repair order per customer if available
            if (repairOrdersData.length > 0) {
                const orderData = repairOrdersData.pop();
                const serviceAdvisor = serviceAdvisors[Math.floor(Math.random() * serviceAdvisors.length)];

                await RepairOrder.create({
                    user: serviceAdvisor._id,
                    customer: newCustomer._id,
                    hatNumber: orderData.hatNumber,
                    repairOrderNumber: orderData.repairOrderNumber,
                    repairDescription: orderData.repairDescription,
                    status: orderData.status,
                    specialOrder: orderData.specialOrder || ''
                });
            }
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
        await connectDB();
        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            RepairOrder.deleteMany()
        ]);
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