import { getOrdersRequest, createOrderRequest } from "../api/orderApi";

export async function getOrders() {
    return await getOrdersRequest();
}

export async function createOrder(orderData) {
    return await createOrderRequest(orderData);
}