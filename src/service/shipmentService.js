import { getShipmentsRequest, updateShipmentStatusRequest } from "../api/shipmentApi";

export async function getShipments() {
    return await getShipmentsRequest();
}

export async function updateShipmentStatus(trackingCode, status) {
    return await updateShipmentStatusRequest(trackingCode, status);
}