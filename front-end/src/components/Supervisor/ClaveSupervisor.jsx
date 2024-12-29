import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ClaveSupervisor({ username }) {
    const navigate = useNavigate();
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Validar que el archivo tenga la extensión .ayd
        if (file && file.name.endsWith('.ayd')) {
            setFileName(file.name); // Guardar el nombre del archivo

            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result.trim()); // Guardar el contenido del archivo
            };
            reader.readAsText(file); // Leer el archivo como texto
        } else {
            Swal.fire('Error', 'Por favor, seleccione una clave .ayd', 'error');
            setFileContent('');
            setFileName('');
        }
    };

    const handleLogin = async () => {
        if (!fileContent) {
            Swal.fire('Error', 'Debe seleccionar un archivo válido', 'error');
            return;
        }

        if (!username) {
            Swal.fire('Error', 'Debe ingresar el nombre de usuario', 'error');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/login_supervisor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password: fileContent,
                }),
            });

            const result = await response.json();

            if (result.status === 200) {
                Swal.fire('Éxito', result.message, 'success');

                navigate('/menu');
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            console.error('Error al realizar el login:', error);
            Swal.fire('Error', 'Error en la conexión con el servidor', 'error');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
            <h2>Login Supervisor</h2>
            <input
                type="file"
                accept=".ayd"
                onChange={handleFileChange}
                style={{ marginBottom: '20px', display: 'block' }}
            />
            {fileName && (
                <div>
                    <h4>Archivo Seleccionado:</h4>
                    <p>{fileName}</p>
                </div>
            )}
            <button className="btn btn-primary" onClick={handleLogin}>
                Iniciar Sesión
            </button>
        </div>
    );
}

export default ClaveSupervisor;
