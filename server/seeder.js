import dotenv from 'dotenv';
import users from './data/users.js';
import customers from './data/customers.js';
import User from './models/userSchema.js';
import Customer from './models/customerSchema.js';
import Vehicle from './models/vehicleSchema.js';
import RepairOrder from './models/repairOrderSchema.js';
import connectDB from './config/db.js';
import 'colors';

dotenv.config();
connectDB();

const getRandomUser = (users, role) => {
    const filteredUsers = users.filter(user => user.role === role);
    return filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
};

const importData = async () => {
    try {
        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            Vehicle.deleteMany(),
            RepairOrder.deleteMany()
        ]);

        const createdUsers = await User.insertMany(await users());
        const customersData = await customers();

        for (const customerData of customersData) {
            const newCustomer = await Customer.create({
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                phone: customerData.phone,
            });

            for (const vehicleData of customerData.vehicles) {
                const newVehicle = await Vehicle.create({
                    vin: vehicleData.vin,
                    make: vehicleData.make,
                    model: vehicleData.model,
                    year: vehicleData.year,
                    customerId: newCustomer._id
                });

                newCustomer.vehicleIds.push(newVehicle._id);

                for (const orderData of vehicleData.repairOrders) {
                    const serviceAdvisor = getRandomUser(createdUsers, 'Service Advisor');
                    const newRepairOrder = await RepairOrder.create({
                        userId: serviceAdvisor._id,
                        vehicleId: newVehicle._id,
                        customerId: newCustomer._id,
                        hatNumber: orderData.hatNumber,
                        repairOrderNumber: orderData.repairOrderNumber,
                        repairDescription: orderData.repairDescription,
                        specialOrderParts: orderData.specialOrderParts
                    });
                
                    newCustomer.repairOrderIds.push(newRepairOrder._id);
                }
            }

            await newCustomer.save();
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
