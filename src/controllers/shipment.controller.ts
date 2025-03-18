import type { Request, Response } from "express";
import { Shipment } from "../models/shipment.model";


class ShipmentController {
    static async createShipment(req: Request, res: Response) {
        const { shipmentId, containerId, route, currentLocation, currentETA, shipmentStatus, shipmentDepartureDate, origin, destination, userEmail } = req.body;

        const shipment = new Shipment({
            userEmail,
            shipmentId,
            containerId,
            route,
            currentLocation, // routeId
            currentETA,
            origin,
            destination,
            shipmentStatus,
            shipmentDepartureDate
        });

        const newShipment = await shipment.save();
        res.status(201).json(newShipment);
    }

    static async updateShipmentLocation(req: Request, res: Response) {
        const { shipmentId, currentLocation } = req.body;

        const shipment = await Shipment.findByIdAndUpdate(shipmentId, { currentLocation }, { new: true });

        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" });
        }

        res.status(200).json(shipment);
    }

    static async getAllShipments(req: Request, res: Response) {
        try {
            const shipments = await Shipment.find(req.body.userEmail);
            res.status(200).json(shipments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching shipments" });
        }
    }

    static async getShipmentById(req: Request, res: Response) {
        try {
            const shipment = await Shipment.findById(req.body.shipmentId);
            if (!shipment) {
                return res.status(404).json({ message: "Shipment not found" });
            }
            res.status(200).json(shipment);
        } catch (error) {
            res.status(500).json({ message: "Error fetching shipment" });
        }
    }

    static async getShipmentETA(req: Request, res: Response) {
        try {
            const shipmentETA = await Shipment.findById(req.body.shipmentId);
            if (!shipmentETA) {
                return res.status(404).json({ message: "Shipment not found" });
            }
            res.status(200).json(shipmentETA.currentETA);
        } catch (error) {
            res.status(500).json({ message: "Error fetching shipment ETA" });
        }
    }
}

export { ShipmentController };