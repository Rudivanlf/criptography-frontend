
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username] = useState('');
    const [password] = useState('');
    const [setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try { 
            /*
            // Substitua 'http://localhost:3001/login' pela URL real do seu endpoint de login no backend
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Supondo que o backend retorne um token ou confirmação de sucesso
                const data = await response.json();
                
                // Opcional: Salvar token de autenticação (ex: no localStorage)
                // localStorage.setItem('authToken', data.token);

                // Redireciona para a página de logado
                navigate('/logado');
            } else {
                // Trata erros de login (ex: usuário ou senha incorretos)
                const errorData = await response.json();
                setError(errorData.message || 'Falha no login. Verifique suas credenciais.');
            } 
            */
        } catch (err) {
            // Trata erros de rede ou do servidor
            setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            console.error('Erro de login:', err);
        }
    };
      return (
        // Usamos a classe 'App' para centralização e 'card' para o visual do container
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
                
                {/* Mensagem de Erro/Sucesso */}
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