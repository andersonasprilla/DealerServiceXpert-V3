import RepairOrder from "../models/repairOrderSchema.js";
import createQueryHandler from "../utils/createQueryHandler.js";

const allowedFields = ['repairOrderNumber'];

const queryRepairOrders = createQueryHandler(RepairOrder, allowedFields);

export { queryRepairOrders };