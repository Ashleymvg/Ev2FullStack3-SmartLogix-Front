import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './pages/Login'
import ShipmentsPage from './pages/Shipments'
import OrderPage from './pages/Order'
import InventoryPage from './pages/Inventory'
import DashboardLayout from './layouts/DashboardLayout'
import { getSaveToken, clearLogin } from './service/authService'

function getRouterFromHash() {
  const hash = window.location.hash.replace("#/", "");
  return hash || "inventory";
}

function App() {
  const [isLogin, setIsLogin] = useState(Boolean(getSaveToken()))
  const [current, setCurrent] = useState(getRouterFromHash())

  useEffect(() => {
    function handleHashChange() {
      setCurrent(getRouterFromHash())
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  function handleLoginSucces() {
    setIsLogin(true)
    window.location.hash = "#/inventory"
  }

  function handleLogout() {
    clearLogin()
    setIsLogin(false)
    window.location.hash = "#/"
  }

  function renderPrivate() {
    switch (current) {
      case "shipment": return <ShipmentsPage />
      case "order": return <OrderPage />
      case "inventory": return <InventoryPage />
      default: return <InventoryPage />
    }
  }

  if (isLogin) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        {renderPrivate()}
      </DashboardLayout>
    )
  }

  return <LoginPage handleLoginSucces={handleLoginSucces} />
}

export default App