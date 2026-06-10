// Nota: da eror con "import React from 'react';"

import { useOrders } from '../hooks/useOrders';
import OrderForm from '../components/OrderForm';

export default function OrderPage() {
    const { orders, loading, error, addOrder } = useOrders();

    return (
        <div>
            <h1 style={{ color: 'var(--text-h)' }}>Gestión de Órdenes</h1>
            
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
            
            <OrderForm onSubmit={addOrder} loading={loading} />

            {loading && orders.length === 0 ? (
                <p>Cargando órdenes...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: '#fff', color: '#333' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>ID Orden</th>
                            <th style={{ padding: '12px' }}>ID Cliente</th>
                            <th style={{ padding: '12px' }}>Estado</th>
                            <th style={{ padding: '12px' }}>Líneas de Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderNumber} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{order.orderNumber}</td>
                                <td style={{ padding: '12px' }}>{order.customerId}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold', color: order.status === 'APPROVED' ? 'green' : 'var(--text-h)' }}>
                                    {order.status}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {order.orderLines?.map((line, index) => (
                                        <div key={index}>
                                            Prod: {line.productId} | Cant: {line.quantity}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>No hay órdenes registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}