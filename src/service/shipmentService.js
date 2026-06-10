import { getShipmentRequest } from "../api/shipmentApi"

export async function getShipments() {
    return getShipmentRequest()
}