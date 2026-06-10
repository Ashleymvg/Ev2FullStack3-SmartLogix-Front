import { httpRequest } from "./httpClient"

export function getOrdersRequest(authorizationHeader) {
    return httpRequest("/api/orders", {
        headers: { Authorization: authorizationHeader }
    })
}

export function getOrderByNumberRequest(orderNumber, authorizationHeader) {
    return httpRequest(`/api/orders/${orderNumber}`, {
        headers: { Authorization: authorizationHeader }
    })
}

export function createOrderRequest(order, authorizationHeader) {
    return httpRequest("/api/orders", {
        method: "POST",
        headers: { Authorization: authorizationHeader },
        body: JSON.stringify(order)
    })
}
