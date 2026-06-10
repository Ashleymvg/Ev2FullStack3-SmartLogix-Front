// Nota: da eror con "import React from 'react';"

import { useInventory } from '../hooks/useInventory';
import InventoryForm from '../components/InventoryForm';

export default function InventoryPage() {
    const { items, loading, error, addItem } = useInventory();

    return (
        <div>
            <h1 style={{ color: 'var(--text-h)' }}>Gestión de Inventario</h1>
            
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
            
            <InventoryForm onSubmit={addItem} loading={loading} />

            {loading && items.length === 0 ? (
                <p>Cargando inventario...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: '#fff', color: '#333' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>Producto</th>
                            <th style={{ padding: '12px' }}>Stock</th>
                            <th style={{ padding: '12px' }}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.sku} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{item.id}</td>
                                <td style={{ padding: '12px' }}>{item.name}</td>
                                <td style={{ padding: '12px' }}>{item.quantity}</td>
                                <td style={{ padding: '12px' }}>${item.price}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>No hay productos en el inventario.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}