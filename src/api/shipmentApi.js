import { httpRequest } from "./httpClient";

export function getShipmentsRequest() {
    return httpRequest("/api/shipments");
}

export function updateShipmentStatusRequest(trackingCode, status) {
    // Es vital que el path y el parámetro query coincidan con el Controller
    return httpRequest(`/api/shipments/${trackingCode}/status?value=${status}`, {
        method: "PATCH"
    });
}