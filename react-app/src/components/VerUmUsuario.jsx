import { useState, useEffect } from 'react';
// INCLUÍDO: useParams para ler a URL e Link para o botão de voltar
import { useParams, Link } from 'react-router-dom'; 

// ATENÇÃO: SUBSTITUA PELA URL BASE DO SEU BACKEND NO RENDER
const apiUrl = import.meta.env.VITE_RENDER_API_URL; 

function VerUmUsuario() {
    // 1. CORRIGIDO: Obtém o parâmetro 'username' da URL
    const { username } = useParams(); 
    
    // O estado do usuário não precisa mais de um nome de ID, apenas dos dados
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        // Se o username for nulo (o que não deve acontecer se a rota estiver correta)
        if (!username) { 
            setUsuario(null);
            return;
        }

        const buscarUsuario = async () => {
            setCarregando(true);
            setErro('');
            setUsuario(null);

            try {
                // 2. CORRIGIDO: Usa a URL base do Render e o username do useParams
                const response = await fetch(`${import.meta.env.VITE_RENDER_API_URL}/users/${username}`); 

                
                if (!response.ok) {
                    // Trata o caso em que o usuário não é encontrado (404)
                    throw new Error(`Usuário não encontrado: ${username}`);
                }

                const data = await response.json();
                
                // 3. ATENÇÃO: Confirme se o campo é 'senha_criptografada' ou 'password'
                // Assumindo que o backend retorna o objeto do usuário (data)
                setUsuario(data); 

            } catch (error) {
                console.error('Falha na requisição:', error);
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        };

        buscarUsuario();
    // O hook é executado sempre que o 'username' (do useParams) mudar.
    }, [username]); 

    

    // Este componente renderiza a UI com os dados do usuário.
    // A lógica de seleção do usuário (que define o `userId`) deve estar em um componente pai.
    if (carregando) {
        return <div className="App"><div className="card">Carregando dados de {username}...</div></div>;
    }

    if (erro) {
        return <div className="App"><div className="card"><p className="msg error">{erro}</p></div></div>;
    }

    if (!usuario) {
        // Caso a busca retorne null
        return <div className="App"><div className="card">Usuário não encontrado ou erro de carregamento.</div></div>;
    }

    return (
        <div className="App">
            <div className="card user-details-card"> {/* Classe específica para estilizar */}
                <h1>Detalhes do Usuário</h1>
                <div className="user-details">
                    <div className="detail-item">
                        <label>Username:</label>
                        {/* 4. CORRIGIDO: Assume que o backend retorna 'username' */}
                        <span className="detail-value">{usuario.username}</span> 
                    </div>
                    <div className="detail-item">
                        <label>Senha Criptografada:</label>
                        {/* 5. ATENÇÃO: Use o nome exato do campo que o backend retorna */}
                        <span className="encryption-data detail-value">{usuario.senha_criptografada || usuario.password || 'Hash não disponível'}</span>
                    </div>
                </div>
                
                <div className="actions" style={{ marginTop: '30px' }}>
                    {/* Link para o Dashboard (rota raiz) */}
                    <Link to="/" className="button-link secondary">
                        Voltar 
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VerUmUsuario;