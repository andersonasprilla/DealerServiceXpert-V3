import Customer from "../models/customerSchema.js";
import createQueryHandler from "../utils/createQueryHandler.js";

const allowedFields = ['firstName', 'lastName', 'phone'];
const customFilters = {
    phone: (value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return { phone: { $regex: new RegExp(digitsOnly, 'i') } };
    }
};

const queryCustomers = createQueryHandler(Customer, allowedFields, customFilters);

export { queryCustomers };