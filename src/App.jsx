import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import { clearLogin, getSaveToken, getSaveUser } from './service/authService'
import ShipmentsPage from './pages/Shipments'
import OrderPage from './pages/Order'
import InventoryPage from './pages/Inventory'

function getRouterFromHash() {
  return window.location.hash.replace("#/", "") || "inventory" // Por defecto a inventory
}

function App() {
  const [isLogin, setIsLogin] = useState(Boolean(getSaveToken()))
  const [showRegister, setShowRegister] = useState(false)
  const [current, setCurrent] = useState(getRouterFromHash())
  
  const currentUser = getSaveUser()

  useEffect(() => {
    function handleHashChange() {
      setCurrent(getRouterFromHash())
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  function renderPrivate() {
    if (current === "shipment") return <ShipmentsPage />
    if (current === "order") return <OrderPage />
    if (current === "inventory") return <InventoryPage />
    return <h1>Ruta no encontrada</h1>
  }

  function handleLoginSuccess() {
    setIsLogin(true)
    window.location.hash = "#/inventory"
  }

  if (!isLogin) {
    return showRegister ? 
      <RegisterPage onSwitchToLogin={() => setShowRegister(false)} /> : 
      <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '50px'}}>
        <LoginPage handleLoginSucces={handleLoginSuccess} />
        <button onClick={() => setShowRegister(true)} style={{ marginTop: '10px', width: '100%' }}>
          Crear una cuenta nueva
        </button>
      </div>
  }

  // Lógica de roles para el menú
  //const isAdmin = currentUser?.role === "ROLE_ADMIN"
  const isBodeguero = currentUser?.role === "ROLE_WAREHOUSE_MANAGER"

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>SmartLogix</h2>
        <p>Hola, <strong>{currentUser?.username}</strong></p>
        <p style={{fontSize: '12px', color: 'gray'}}>{currentUser?.role}</p>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <a href="#/inventory">Inventario</a>
          
          {/* Solo Admin y Usuarios normales gestionan pedidos */}
          {!isBodeguero && <a href="#/order">Pedidos</a>}
          
          {/* Todos pueden ver envíos, pero el rol define qué acciones tienen luego */}
          <a href="#/shipment">Envíos</a>
        </nav>

        <button onClick={() => { clearLogin(); setIsLogin(false) }} style={{ marginTop: '50px' }}>
          Cerrar Sesión
        </button>
      </aside>

      <section style={{ flex: 1, padding: '20px' }}>
        {renderPrivate()}
      </section>
    </div>
  )
}

export default App