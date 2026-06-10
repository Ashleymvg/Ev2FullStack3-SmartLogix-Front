import { getOrdersRequest } from "../api/orderApi"

export async function getOrders() {
    return getOrdersRequest()
}
