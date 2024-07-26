import RepairOrder from "../models/repairOrderSchema.js";
import createQueryHandler from "../utils/createQueryHandler.js";

const allowedFields = ['repairOrderNumber', 'user', 'hatNumber'];

const queryRepairOrders = createQueryHandler(RepairOrder, allowedFields);

export { queryRepairOrders };