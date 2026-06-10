import { httpRequest } from "./httpClient"

export function getShipmentRequest(authorizationHeader) {
    return httpRequest("/api/shipments", {
        headers: { Authorization: authorizationHeader }
    })
}

export function getShipmentByTrackingRequest(trackingCode, authorizationHeader) {
    return httpRequest(`/api/shipments/${trackingCode}`, {
        headers: { Authorization: authorizationHeader }
    })
}

export function createShipmentRequest(shipment, authorizationHeader) {
    return httpRequest("/api/shipments", {
        method: "POST",
        headers: { Authorization: authorizationHeader },
        body: JSON.stringify(shipment)
    })
}

export function updateShipmentStatusRequest(trackingCode, status, authorizationHeader) {
    return httpRequest(`/api/shipments/${trackingCode}/status?value=${status}`, {
        method: "PATCH",
        headers: { Authorization: authorizationHeader }
    })
}