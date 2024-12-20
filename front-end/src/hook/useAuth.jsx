// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";  // Para redirigir al login si el token no es válido

const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);  // Almacenará el usuario
    const [rol, setRol] = useState(null);  // Almacenará el rol del usuario

    useEffect(() => {
        // Obtener el token de las cookies
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

        if (token) {
            try {
                // Decodificar el token JWT
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;  // Hora actual en segundos

                // Verificar si el token ha expirado
                if (decodedToken.exp > currentTime) {
                    setUser(decodedToken.username); 
                    setRol(decodedToken.role); // 1: Admin, 2: Cajero, 3: Supervisor, 4: Agente Call Center
                } else {
                    navigate("/");  // Redirigir al login si el token ha expirado
                }
            } catch (error) {
                console.error("Token inválido:", error);
                navigate("/");  // Redirigir al login si el token es inválido
            }
        } else {
            navigate("/");  // Redirigir al login si no hay token
        }
    }, [navigate]);

    return { user, rol };
};

export default useAuth;
