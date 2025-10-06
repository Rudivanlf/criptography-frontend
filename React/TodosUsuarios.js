import { useState, useEffect } from 'react';
// 1. INCLUÍDO: Importação do hook de navegação
import { useNavigate } from 'react-router-dom'; 

// 2. Defina a URL BASE DA SUA API DO RENDER aqui!
const apiUrl = import.meta.env.VITE_RENDER_API_URL; 

function TodosUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    // 3. INCLUÍDO: Inicialização do hook de navegação
    const navigate = useNavigate();

    // 4. INCLUÍDO: Definição da função de voltar
    const handleVoltar = () => {
        // Redireciona para a rota raiz (Dashboard)
        navigate('/'); 
    };

    useEffect(() => {
        setCarregando(true);

        // 5. CORRIGIDO: Usa a URL do Render
        fetch(`${VITE_API_URL}/getAllUsers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados da API');
                }
                return response.json();
            })
            .then(data => {
                setUsuarios(data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
                setErro(error.message);
            })
            .finally(() => setCarregando(false));
    }, []);

    if (erro) { 
        return (
            <div className="App">
                <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    <h1>Erro ao Carregar</h1>
                    <p className="msg error">Ocorreu um erro: {erro}</p>
                    {/* 6. CORRIGIDO: O botão usa a função definida */}
                    <button onClick={handleVoltar}>Voltar</button> 
                </div>
            </div>
        );
    }

    if (carregando) {
        return (
            <div className="App">
                <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    Carregando usuários...
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="card user-list-card">
                <h1>Lista de Usuários</h1>
                {usuarios.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Nenhum usuário cadastrado.</p>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Senha (Criptografada)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    {/* ATENÇÃO: Confirme se seu backend retorna 'username' e 'password' */}
                                    <td>{usuario.username}</td>
                                    <td>{usuario.password || 'Hash não disponível'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="actions">
                    <button onClick={handleVoltar}>
                        Voltar para o Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodosUsuarios;