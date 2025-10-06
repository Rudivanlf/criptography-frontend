import { useState, useEffect } from 'react';
// IMPORTANTE: Adicione useParams e Link do react-router-dom
import { useParams, Link } from 'react-router-dom'; 

// 1. Defina a URL BASE DA SUA API DO RENDER aqui!
const RENDER_API_URL = import.meta.env.VITE_API_URL; 

// 2. CORRIGIDO: Não espera mais a prop 'userId'.
function VerUmUsuario() {
    // Obtém o parâmetro 'username' da rota (ex: /ver-usuario/nome_aqui)
    const { username } = useParams(); 
    
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        // Função para buscar os dados do usuário no backend.
        const buscarUsuario = async () => {
            if (!username) {
                setUsuario(null);
                setCarregando(false);
                return;
            }

            setCarregando(true);
            setErro('');
            setUsuario(null);

            try {
                // 3. CORRIGIDO: Usa a URL do Render e o username da URL
                const response = await fetch(`${VITE_RENDER_API_URL}/getUserByUsername/${username}`);

                if (!response.ok) {
                    // Se o usuário não for encontrado (404), lança erro.
                    throw new Error(`Erro ao buscar usuário: ${username}`);
                }

                const data = await response.json();
                // Assume que a API retorna um objeto com 'username' e 'password' ou 'senha_criptografada'.
                setUsuario(data);
            } catch (error) {
                console.error('Falha na requisição:', error);
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        };

        buscarUsuario();
    }, [username]); // O hook é executado sempre que o `username` na URL mudar.

    // --- Lógica de Renderização ---

    if (carregando) {
        return (
            <div className="App">
                <div className="card user-details-card">
                    <p style={{ textAlign: 'center', padding: '20px' }}>Carregando dados de {username}...</p>
                </div>
            </div>
        );
    }

    if (erro) { 
        return (
            <div className="App">
                <div className="card user-details-card">
                    <p className="msg error" style={{ textAlign: 'center', padding: '20px' }}>{erro}</p>
                    <div className="actions"><Link to="/" className="button-link secondary">Voltar</Link></div>
                </div>
            </div>
        );
    }

    if (!usuario) { 
        // Retorna esta mensagem se a busca falhar ou se o username for nulo
        return (
            <div className="App">
                <div className="card user-details-card">
                    <p style={{ textAlign: 'center', padding: '20px' }}>Usuário não encontrado.</p>
                    <div className="actions"><Link to="/" className="button-link secondary">Voltar</Link></div>
                </div>
            </div>
        );
    }

    // Se o usuário for encontrado
    return (
        <div className="App">
            <div className="card user-details-card">
                <h1>Detalhes do Usuário</h1>
                <div className="user-details">
                    <div className="detail-item">
                        <label>Username:</label>
                        <span className="detail-value">{usuario.username}</span>
                    </div>
                    <div className="detail-item">
                        <label>Senha Criptografada:</label>
                        {/* 4. ATENÇÃO: Use o nome exato do campo que o backend retorna */}
                        <span className="encryption-data detail-value">{usuario.password || usuario.senha_criptografada || 'Hash não disponível'}</span>
                    </div>
                </div>
                <div className="actions" style={{ marginTop: '30px' }}>
                    {/* Botão de voltar para o Dashboard (rota raiz) */}
                    <Link to="/" className="button-link secondary">
                        Voltar 
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VerUmUsuario;