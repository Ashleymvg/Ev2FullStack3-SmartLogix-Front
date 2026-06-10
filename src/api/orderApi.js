import { httpRequest } from "./httpClient";

export function getOrdersRequest() {
    return httpRequest("/api/orders"); 
}

export function createOrderRequest(orderData) {
    return httpRequest("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData)
    });
}