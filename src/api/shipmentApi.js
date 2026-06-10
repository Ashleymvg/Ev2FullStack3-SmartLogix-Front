import { httpRequest } from "./httpClient"

export function getShipmentRequest() {
    return httpRequest("/api/shipments")
}