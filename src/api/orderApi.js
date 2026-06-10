import { httpRequest } from "./httpClient"

export function getOrdersRequest() {
    return httpRequest("/api/orders") 
}