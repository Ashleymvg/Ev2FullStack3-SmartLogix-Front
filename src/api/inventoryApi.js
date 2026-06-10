import { httpRequest } from "./httpClient";

export function getInventoryRequest() {
    return httpRequest("/api/inventory/items"); // Ajusta la ruta exacta de tu backend si es distinta
}

export function createInventoryItemRequest(itemData) {
    return httpRequest("/api/inventory", {
        method: "POST",
        body: JSON.stringify(itemData)
    });
}