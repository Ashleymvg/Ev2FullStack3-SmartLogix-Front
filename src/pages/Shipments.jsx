import { useShipments } from '../hooks/useShipments';

export default function ShipmentsPage() {
    const { shipments, loading, error, updateStatus } = useShipments();

    return (
        <div>
            <h1 style={{ color: 'var(--text-h)' }}>Gestión de Envíos</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {loading ? <p>Cargando envíos...</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#333' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '12px' }}>Seguimiento</th>
                            <th style={{ padding: '12px' }}>Transporte</th>
                            <th style={{ padding: '12px' }}>Estado</th>
                            <th style={{ padding: '12px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((s) => (
                            <tr key={s.trackingCode} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{s.trackingCode}</td>
                                <td style={{ padding: '12px' }}>{s.carrier}</td>
                                <td style={{ padding: '12px' }}>{s.status}</td>
                                <td style={{ padding: '12px' }}>
                                    <select onChange={(e) => updateStatus(s.trackingCode, e.target.value)}>
                                        <option value="">Cambiar estado</option>
                                        <option value="PICKED_UP">Recogido</option>
                                        <option value="IN_TRANSIT">En Tránsito</option>
                                        <option value="DELIVERED">Entregado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}