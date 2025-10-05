import { useState } from 'react';   
import { Link } from 'react-router-dom';

// ATENÇÃO: SUBSTITUA PELA URL REAL DO SEU BACKEND NO RENDER
const RENDER_API_URL = import.meta.env.VITE_RENDER_API_URL;  

function Register() {
    // 1. Alterado: email foi substituído por username no estado
    const [formData, setFormData] = useState({
        name: '',
        username: '', 
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. CORREÇÃO: Usar a URL base para o endpoint de cadastro
    const registerUrl = `${VITE_RENDER_API_URL}/users`; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 2. CORRIGIDO: A submissão AGORA é apenas a chamada à API
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verifica se há campos vazios (mesmo com 'required' no input)
        if (!formData.name || !formData.username || !formData.password) {
            setMessage('Preencha todos os campos.');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
             const response = await fetch(registerUrl, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 // 3. CORRIGIDO: Envia o formData com nome, username e password
                 body: JSON.stringify(formData),
             });

             const data = await response.json();

             if (!response.ok) {
                 // A API retornou um erro (ex: 400 Bad Request, 409 Conflict)
                 throw new Error(data.message || 'Ocorreu um erro ao cadastrar.');
             }

             // Cadastro bem-sucedido
             setMessage('Usuário cadastrado com sucesso! Você pode fazer login agora.');
             setFormData({ name: '', username: '', password: '' }); // Limpa o formulário

         } catch (error) {
             // Erro de CORS ou de rede
             console.error('Erro de cadastro:', error);
             setMessage(error.message);
         } finally {
             // 4. GARANTIDO: Desativa o botão de loading
             setIsSubmitting(false); 
         }
        
    };

    return (
        <div className="card">
            <h1>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* 3. Campo Nome de Usuário (username) */}
                <div>
                    <label htmlFor="username">Nome de Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Simulando Envio...' : 'Cadastrar'}
                </button>
            </form>
            
            {message && <p style={{ color: message.includes('sucesso') ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}
            
            {/* 4. Botão de navegação para a Login.jsx */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Já tem uma conta?</p>
                <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    Ir para Login
                </Link>
            </div>
        </div>
    );
}

export default Register;