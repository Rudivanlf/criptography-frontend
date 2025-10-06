import { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Defina a URL BASE DA SUA API DO RENDER aqui!
const apiUrl = import.meta.env.VITE_RENDER_API_URL;

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        username: '', // CORRIGIDO para usar username, conforme seu projeto
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Endpoint correto para cadastro
    const apiUrl = `${VITE_API_URL}/users`; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação básica para evitar requisições vazias
        if (!formData.name || !formData.username || !formData.password) {
            setMessage('Por favor, preencha todos os campos.');
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
                 // 3. Envia os dados do formulário
                 body: JSON.stringify(formData),
             });

             const data = await response.json();

             if (!response.ok) {
                 // Trata erros da API, como username já existe (409)
                 throw new Error(data.message || 'Ocorreu um erro ao cadastrar.');
             }

             setMessage('Usuário cadastrado com sucesso! Faça login.');
             // Limpa o formulário após o sucesso
             setFormData({ name: '', username: '', password: '' });

         } catch (error) {
             console.error('Falha de comunicação/API:', error);
             setMessage(error.message);
         } finally {
             setIsSubmitting(false);
         }
    };

    return (
        // 4. Componente envolve o formulário no container de estilo (Ex: App/card)
        <div className="App">
            <div className="card"> 
                <h1>Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    
                    {/* Campos de formulário (use username em vez de email) */}
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="username">Nome de Usuário:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Cadastrar'}
                    </button>
                </form>
                
                {message && <p className="msg" style={{ color: message.includes('sucesso') ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}
                
                {/* INCLUÍDO: Link de navegação para Login */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Já tem uma conta?</p>
                    <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                        Ir para Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;