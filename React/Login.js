
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// 1. Defina a URL BASE DA SUA API DO RENDER aqui!
const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
    // CORREÇÃO CRÍTICA: Definindo o valor do estado E a função de atualização (setter)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para o botão
    
    const navigate = useNavigate();

    // Funções de manipulação de input, agora com acesso aos setters
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Endpoint para login no backend (ex: /login)
            const loginUrl = `${VITE_API_URL}/login`; 
            
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Envia os dados corretos do formulário
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login BEM-SUCEDIDO
                const data = await response.json();
                
                // Redireciona para a rota raiz (Dashboard)
                navigate('/'); 
                
            } else {
                // Trata erros de login (ex: 401 Unauthorized)
                const errorData = await response.json();
                setError(errorData.message || 'Falha no login. Verifique suas credenciais.');
            } 
            
        } catch (err) {
            // Trata erros de rede (CORS ou Servidor Offline)
            console.error('Erro de login:', err);
            setError('Não foi possível conectar ao servidor. Verifique o console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="App"> 
            <div className="card">
                
                <h1>Fazer Login</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Campos de Input (usam as funções corrigidas) */}
                    <div>
                        <label htmlFor="username">Nome de Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
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
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    
                    {/* Botão de Login (usa isSubmitting) */}
                    <div className="actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                    
                </form>
                
                {/* Mensagem de Erro */}
                {error && <p className="msg error">{error}</p>}
                
                {/* Link para o Cadastro */}
                <div className="secondary-action">
                    <p>Não tem uma conta?</p>
                    {/* O 'to="/register"' é o link que o levará de volta ao cadastro */}
                    <Link to="/register">Crie sua conta</Link>
                </div>
            </div>
        </div>
    );
   
}

export default Login;