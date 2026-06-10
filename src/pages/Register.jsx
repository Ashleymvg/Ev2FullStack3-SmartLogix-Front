import { useState } from "react"
import { registerUser } from "../service/authService"

function RegisterPage({ onSwitchToLogin }) {
    const [form, setForm] = useState({ username: "", email: "", password: "" })
    const [message, setMessage] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        setMessage("Registrando...")
        try {
            await registerUser(form)
            setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.")
            setTimeout(onSwitchToLogin, 2000)
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <main style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Crear nueva cuenta</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    placeholder="Usuario" 
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})} 
                />
                <input 
                    placeholder="Correo (ej: correo@smartlogix.cl)" 
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})} 
                />
                <input 
                    placeholder="Contraseña" 
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})} 
                />
                <button type="submit">Registrarse</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={onSwitchToLogin} style={{ marginTop: '10px', background: 'none', color: 'blue' }}>
                ¿Ya tienes cuenta? Inicia sesión
            </button>
        </main>
    )
}

export default RegisterPage