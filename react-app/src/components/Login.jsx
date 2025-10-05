import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

// ATENÇÃO: SUBSTITUA PELA URL REAL DO SEU BACKEND NO RENDER
const RENDER_API_URL = 'https://SUA-URL-RENDER-AQUI.onrender.com'; 

function Login() {
    // ... (Hooks de estado e funções de manipulação de input) ...
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const navigate = useNavigate();

  
    // FUNÇÕES: Adicionadas para controlar os inputs
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const loginUrl = `${RENDER_API_URL}/login`; 
            
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), 
            });

            if (response.ok) {
                // Login BEM-SUCEDIDO
                const data = await response.json();
                
                // Opcional: Salvar token de autenticação, se o backend retornar
                // localStorage.setItem('authToken', data.token);

                console.log("Login BEM-SUCEDIDO.");
                
                // ALTERAÇÃO CRÍTICA AQUI: Redireciona para a rota raiz (Dashboard)
                navigate('/dashboard'); 
                
            } else {
                // ... (Tratamento de erro se as credenciais estiverem erradas)
                const errorData = await response.json();
                setError(errorData.message || 'Falha no login. Verifique suas credenciais.');
            }
        } catch (err) {
            console.error('Erro de login:', err);
            setError('Não foi possível conectar ao servidor. Verifique se o CORS está configurado.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="App"> 
            <div className="card">
                
                <h1>Fazer Login</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Campos de Input */}
                    <div>
                        <label htmlFor="username">Nome de Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            // CORRIGIDO: usa o handler correto
                            onChange={handleUsernameChange}
                            required
                            autoFocus
                        />
                    </div>
                    
                    {/* Campo Senha */}
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            // CORRIGIDO: usa o handler correto
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    
                    {/* Botão de Login */}
                    <div className="actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                    
                </form>
                
                {/* Mensagem de Erro/Sucesso */}
                {error && <p className="msg error">{error}</p>}
                
                {/* Link para o Cadastro */}
                <div className="secondary-action">
                    <p style={{ fontSize: '14px', margin: '15px 0 5px' }}>Não tem uma conta?</p>
                    {/* INCLUÍDO: Link do react-router-dom */}
                    <Link to="/register">Crie sua conta</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;