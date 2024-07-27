import Customer from "../models/customerSchema.js";
import createQueryHandler from "../utils/createQueryHandler.js";

const allowedFields = ['firstName', 'lastName', 'phone'];

const queryCustomers = createQueryHandler(Customer, allowedFields);

export { queryCustomers };