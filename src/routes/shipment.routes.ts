import { Router } from "express";
import { ShipmentController } from "../controllers/shipment.controller";
import type { Request, Response, NextFunction } from "express";
const app = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// POST Requests
app.post("/shipments", asyncHandler(ShipmentController.createShipment));
app.post("/shipments/:id/update-location", asyncHandler(ShipmentController.updateShipmentLocation));

// GET Requests
app.get("/shipments", asyncHandler(ShipmentController.getAllShipments));
app.get("/shipments/:id", asyncHandler(ShipmentController.getShipmentById));
app.get("/shipments/:id/eta", asyncHandler(ShipmentController.getShipmentETA));


export { app as shipmentRoutes };