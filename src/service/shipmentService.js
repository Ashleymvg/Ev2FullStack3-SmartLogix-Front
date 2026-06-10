import {
    getShipmentRequest,
    getShipmentByTrackingRequest,
    createShipmentRequest,
    updateShipmentStatusRequest
} from "../api/shipmentApi"
import { getRequiredAuthorizationHeader } from "./authService"

export const SHIPMENT_STATUSES = ["PLANNED", "PICKED_UP", "IN_TRANSIT", "DELIVERED"]

export async function getShipment() {
    const authorizationHeader = getRequiredAuthorizationHeader()
    return getShipmentRequest(authorizationHeader)
}

export async function getShipmentByTracking(trackingCode) {
    const cleanCode = trackingCode?.trim()
    if (!cleanCode) {
        throw new Error("El codigo de tracking es obligatorio")
    }
    const authorizationHeader = getRequiredAuthorizationHeader()
    return getShipmentByTrackingRequest(cleanCode, authorizationHeader)
}

export async function createShipment({ orderNumber, destinationAddress, totalUnits }) {
    const cleanOrder = orderNumber?.trim()
    const cleanAddress = destinationAddress?.trim()

    if (!cleanOrder || !cleanAddress) {
        throw new Error("Numero de orden y direccion de destino son obligatorios")
    }

    const units = Number(totalUnits) >= 1 ? Number(totalUnits) : 1

    const authorizationHeader = getRequiredAuthorizationHeader()
    return createShipmentRequest({
        orderNumber: cleanOrder,
        destinationAddress: cleanAddress,
        totalUnits: units
    }, authorizationHeader)
}

export async function updateShipmentStatus(trackingCode, status) {
    if (!SHIPMENT_STATUSES.includes(status)) {
        throw new Error("Estado de envio no valido")
    }
    const authorizationHeader = getRequiredAuthorizationHeader()
    return updateShipmentStatusRequest(trackingCode, status, authorizationHeader)
}
