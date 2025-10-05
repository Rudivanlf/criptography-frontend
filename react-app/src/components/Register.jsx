import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    // 1. Alterado: email foi substituído por username no estado
    const [formData, setFormData] = useState({
        name: '',
        username: '', // Novo campo para Nome de Usuário
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Substitua pela URL da sua API no Render (mantido comentado para foco na UI)
    // const backendUrl = 'https://seu-backend.onrender.com/users';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 2. Simplificado: A submissão da API foi comentada para focar na UI
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simulação de lógica de cadastro para testes de UI/UX
        console.log("Dados de Cadastro (Simulado):", formData);
        
        setIsSubmitting(true);
        setMessage('');

        // Simula o tempo de espera do envio para testar o botão 'Enviando...'
        setTimeout(() => {
            setMessage('Cadastro simulado concluído!');
            setIsSubmitting(false);
            setFormData({ name: '', username: '', password: '' });
        }, 1500);

        // O BLOCO DE CÓDIGO ABAIXO ESTÁ COMENTADO PARA EVITAR O ERRO CORS E PERMITIR FOCO NO DESIGN
        /*
        try {
             const response = await fetch(backendUrl, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(formData),
             });

             const data = await response.json();

             if (!response.ok) {
                 throw new Error(data.message || 'Ocorreu um erro ao cadastrar.');
             }

             setMessage('Usuário cadastrado com sucesso!');
             setFormData({ name: '', username: '', password: '' });

         } catch (error) {
             setMessage(error.message);
         } finally {
             setIsSubmitting(false);
         }
        */
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