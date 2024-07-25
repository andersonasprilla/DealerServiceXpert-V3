import dotenv from 'dotenv';
import users from './data/users.js';
import customers from './data/customers.js';
import repair_orders from './data/repair_orders.js';
import vehicles from './data/vehicles.js';
import special_orders from './data/special_orders.js';
import User from './models/userSchema.js';
import Customer from './models/customerSchema.js';
import Vehicle from './models/vehicleSchema.js';
import RepairOrder from './models/repairOrderSchema.js';
import SpecialOrder from './models/specialOrdersSchema.js';

import connectDB from './config/db.js';
import 'colors';

dotenv.config();
connectDB();

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const importData = async () => {
    try {
        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            Vehicle.deleteMany(),
            RepairOrder.deleteMany(),
            SpecialOrder.deleteMany()
        ]);

        const createdUsers = await User.insertMany(await users());
        const customersData = await customers();
        let vehiclesData = shuffleArray(await vehicles());
        let repairOrdersData = shuffleArray(await repair_orders());
        let specialOrdersData = shuffleArray(await special_orders());

        const serviceAdvisors = createdUsers.filter(user => user.role === 'Service Advisor');

        for (const customerData of customersData) {
            const newCustomer = await Customer.create(customerData);

            // Assign up to 2 vehicles per customer
            for (let i = 0; i < 2 && vehiclesData.length > 0; i++) {
                const vehicleData = vehiclesData.pop();
                const newVehicle = await Vehicle.create({
                    ...vehicleData,
                    customer: newCustomer._id
                });

                // Assign one repair order per vehicle
                if (repairOrdersData.length > 0) {
                    const orderData = repairOrdersData.pop();
                    const serviceAdvisor = serviceAdvisors[Math.floor(Math.random() * serviceAdvisors.length)];
                    
                    let specialOrders = [];
                    if (Math.random() < 0.3 && specialOrdersData.length >= 2) {  // 30% chance of having special orders
                        specialOrders = [
                            await SpecialOrder.create(specialOrdersData.pop()),
                            await SpecialOrder.create(specialOrdersData.pop())
                        ];
                    }

                    await RepairOrder.create({
                        user: serviceAdvisor._id,
                        vehicle: newVehicle._id,
                        customer: newCustomer._id,
                        specialOrders: specialOrders.map(so => so._id),
                        ...orderData
                    });
                }
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
        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            Vehicle.deleteMany(),
            RepairOrder.deleteMany(),
            SpecialOrder.deleteMany()
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