import { useEffect, useState } from "react";
import { inventoryService } from "../service/inventoryService";

function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    
    // El estado inicial ya es "cargando", así que no necesitamos hacer un setState sincrónico
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [actionQty, setActionQty] = useState(1);
    const [actionMessage, setActionMessage] = useState("");

    // 1. EFECTO DE CARGA INICIAL (Totalmente aislado para el linter)
    useEffect(() => {
        let isMounted = true;

        async function fetchInitialData() {
            try {
                const data = await inventoryService.fetchItems();
                if (isMounted) setInventory(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchInitialData();

        return () => {
            isMounted = false; // Evita fugas de memoria si el componente se desmonta
        };
    }, []);

    // 2. FUNCIÓN PARA EL BOTÓN "REFRESCAR" MANUALMENTE
    async function handleRefresh() {
        setLoading(true);
        setError("");
        try {
            const data = await inventoryService.fetchItems();
            setInventory(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // 3. CARGAR DETALLES DE UN ITEM ESPECÍFICO
    async function handleSelectItem(sku) {
        setActionMessage("");
        setActionQty(1);
        try {
            const data = await inventoryService.fetchItemBySku(sku);
            setSelectedItem(data);
        } catch (err) {
            alert("Error al cargar detalles: " + err.message);
        }
    }

    // 4. MANEJAR ACCIONES DE INVENTARIO
    async function handleAction(type) {
        if (!selectedItem) return;
        setActionMessage("Procesando...");
        try {
            if (type === 'reserve') await inventoryService.reserveItem(selectedItem.sku, actionQty);
            if (type === 'release') await inventoryService.releaseItem(selectedItem.sku, actionQty);
            if (type === 'dispatch') await inventoryService.dispatchItem(selectedItem.sku, actionQty);
            
            setActionMessage(`¡Acción '${type}' exitosa!`);
            
            // Recargamos silenciosamente los datos
            const newData = await inventoryService.fetchItems();
            setInventory(newData);
            handleSelectItem(selectedItem.sku);
        } catch (err) {
            setActionMessage("Error: " + err.message);
        }
    }

    // --- RENDERIZADO DE LA PANTALLA ---

    if (loading && inventory.length === 0) return <h3>Cargando inventario...</h3>;
    if (error) return <h3 style={{color: 'red'}}>Error: {error}</h3>;

    return (
        <main style={{ display: 'flex', gap: '20px', height: '100%' }}>
            
            {/* PANEL IZQUIERDO: MAESTRO (Lista) */}
            <section style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Catálogo de Productos</h2>
                    <button onClick={handleRefresh}>🔄 Refrescar</button>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {inventory.map((item) => (
                        <li 
                            key={item.sku} 
                            onClick={() => handleSelectItem(item.sku)}
                            style={{ 
                                padding: '15px', 
                                marginBottom: '10px', 
                                border: '1px solid #eee', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                backgroundColor: selectedItem?.sku === item.sku ? '#e6f7ff' : '#fff'
                            }}
                        >
                            <strong>{item.sku}</strong> - {item.productName}
                            <div style={{ fontSize: '14px', color: 'gray', marginTop: '5px' }}>
                                Stock: {item.availableQuantity} | Bodega: {item.warehouseCode}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* PANEL DERECHO: DETALLE Y ACCIONES */}
            <section style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fafafa' }}>
                {!selectedItem ? (
                    <div style={{ textAlign: 'center', color: 'gray', marginTop: '50px' }}>
                        <h3>Selecciona un producto de la lista</h3>
                        <p>Para ver sus detalles y realizar operaciones.</p>
                    </div>
                ) : (
                    <div>
                        <h2>Detalle del Producto</h2>
                        <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <p><strong>SKU:</strong> {selectedItem.sku}</p>
                            <p><strong>Nombre:</strong> {selectedItem.productName}</p>
                            <p><strong>Bodega:</strong> {selectedItem.warehouseCode}</p>
                            <p><strong>Stock Disponible:</strong> <span style={{color: 'green', fontWeight: 'bold'}}>{selectedItem.availableQuantity}</span></p>
                            <p><strong>Stock Reservado:</strong> <span style={{color: 'orange', fontWeight: 'bold'}}>{selectedItem.reservedQuantity}</span></p>
                            <p><strong>Punto de Reorden:</strong> {selectedItem.reorderLevel}</p>
                            <p style={{fontSize: '12px', color: 'gray'}}>Última act: {new Date(selectedItem.updatedAt).toLocaleString()}</p>
                        </div>

                        <h3 style={{ marginTop: '20px' }}>Operaciones Manuales</h3>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input 
                                type="number" 
                                min="1" 
                                value={actionQty} 
                                onChange={(e) => setActionQty(e.target.value)}
                                style={{ width: '80px', padding: '8px' }}
                            />
                            <button onClick={() => handleAction('reserve')} style={{ background: '#ffc107', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Reservar</button>
                            <button onClick={() => handleAction('release')} style={{ background: '#17a2b8', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Liberar</button>
                            <button onClick={() => handleAction('dispatch')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Despachar</button>
                        </div>

                        {actionMessage && (
                            <div style={{ marginTop: '15px', padding: '10px', background: '#e9ecef', borderRadius: '5px' }}>
                                {actionMessage}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

export default InventoryPage;