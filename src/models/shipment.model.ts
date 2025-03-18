import mongoose, { Schema, Document } from "mongoose";

interface Location {
    id: string;
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    timestamp: Date;
}

enum ShipmentStatus {
    PENDING = "PENDING",
    IN_TRANSIT = "IN_TRANSIT",
    DELAYED = "DELAYED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

interface Shipment extends Document {
    userEmail: string;
    shipmentId: string;
    containerId: string[];
    route: Location[];
    origin: Location;
    destination: Location;
    currentLocation: Location;
    currentETA: Date;
    shipmentStatus: ShipmentStatus;
    shipmentDepartureDate: Date;
}

const ShipmentSchema = new Schema({
    userEmail: { type: String, required: true },
    shipmentId: { type: String, required: true },
    containerId: [{ type: String, required: true }],
    route: [{ type: String, required: true }],
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    currentLocation: { type: String, required: true },
    currentETA: { type: Date, required: true },
    shipmentStatus: { type: String, enum: ["In Transit", "Arrived", "Cancelled"], required: true },
    shipmentDepartureDate: { type: Date, required: true },
}, { timestamps: true });

export const Shipment = mongoose.model<Shipment>("Shipment", ShipmentSchema);
