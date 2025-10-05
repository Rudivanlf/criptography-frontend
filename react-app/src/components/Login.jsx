import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    // 1. CORRIGIDO: Definição correta dos estados com seus setters
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Agora acessamos 'error' e sua função 'setError'
    const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para controlar o botão
    const navigate = useNavigate();

    // 2. FUNÇÕES: Definidas DENTRO do componente para acessar os setters
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true); // Ativa o estado de carregamento

        // --- SIMULAÇÃO PARA TESTE DE UI (Remova quando conectar a API) ---
        setTimeout(() => {
            console.log('Login Simulada. Redirecionando...');
            setIsSubmitting(false);
            // navigate('/logado'); // Descomente para testar o redirecionamento
        }, 1500);
        // -----------------------------------------------------------------

        // Bloco try...catch com a chamada fetch real (manter comentado por enquanto)
        /*
        try {
             // ... seu código fetch aqui ...
        } catch (err) {
             // ... lógica de erro ...
        }
        */
    };

    return (
        <div className="App"> 
            <div className="card">
                
                <h1>Fazer Login</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Campo Nome de Usuário */}
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
                    
                    {/* Botão de Login */}
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
                    <p style={{ fontSize: '14px', margin: '15px 0 5px' }}>Não tem uma conta?</p>
                    <Link to="/register">Crie sua conta</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;