import { useState } from 'react';
// INCLUÍDO: Link para o rodapé
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    // 1. CORRIGIDO: Definições corretas dos estados
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Correção: agora é 'error' e 'setError'
    const [isSubmitting, setIsSubmitting] = useState(false); // INCLUÍDO: Estado de envio
    
    const navigate = useNavigate();

    // DADOS DO USUÁRIO TESTE
    const TEST_USERNAME = 'teste';
    const TEST_PASSWORD = '123456';

    // FUNÇÕES: Adicionadas para controlar os inputs
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true); // Ativa o estado de carregamento

        // Simula o tempo de resposta da rede
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // 2. LÓGICA DO USUÁRIO TESTE
        if (username === TEST_USERNAME && password === TEST_PASSWORD) {
            
            console.log("Login de Teste BEM-SUCEDIDO. Redirecionando para o Dashboard.");
            // Redireciona para o Dashboard (rota raiz)
            navigate('/'); 

        } else {
            // Lógica de erro simulado
            setError('Credenciais de teste inválidas. Use "teste" e "123456".');
        }

        setIsSubmitting(false); // Desativa o estado de carregamento (sempre)
        
        // O bloco try/catch e o fetch permanecem ignorados.
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
                            {isSubmitting ? 'Verificando...' : 'Entrar'} 
                            <Link to="/dashboard"></Link>
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