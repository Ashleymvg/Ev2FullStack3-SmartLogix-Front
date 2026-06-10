import { getInventoryRequest, createInventoryItemRequest } from "../api/inventoryApi";

export async function getInventory() {
    return await getInventoryRequest();
}

export async function createInventoryItem(itemData) {
    return await createInventoryItemRequest(itemData);
}