import RepairOrder from "../models/repairOrderSchema.js";
import createQueryHandler from "../utils/createQueryHandler.js";

const allowedFields = ['repairOrderNumber', 'userId'];

const queryRepairOrders = createQueryHandler(RepairOrder, allowedFields);

export { queryRepairOrders };