import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
    // Estado para capturar o nome de usuário que o usuário quer pesquisar
    const [searchUsername, setSearchUsername] = useState('');
    const navigate = useNavigate();

    // Função para lidar com o input de pesquisa
    const handleInputChange = (e) => {
        setSearchUsername(e.target.value);
    };

    // Função para navegar para a tela de usuário específico
    const handleSearch = () => {
        if (searchUsername.trim()) {
            // Navega para a rota de visualização do usuário, injetando o nome de usuário na URL
            navigate(`/ver-usuario/${searchUsername}`);
        }
    };

    // Permite buscar ao pressionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchUsername.trim()) {
            handleSearch();
        }
    };

    return (
        <div className="App">
            <div className="card dashboard-card"> 
                
                <h1>Bem-vindo! Escolha uma opção:</h1>

                {/* --- Opção 1: Ver Todos os Usuários --- */}
                <div className="dashboard-option">
                    <p>Clique abaixo para ver a lista completa de usuários cadastrados no sistema.</p>
                    <Link to="/todosusuarios" className="button-link">
                        Ver Todos os Usuários
                    </Link>
                </div>

                <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />

                {/* --- Opção 2: Ver um Usuário Específico --- */}
                <div className="dashboard-option">
                    <h2>Ver Login de um Usuário Específico</h2>
                    <p>Digite o nome de usuário (username) para consultar as informações:</p>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Nome de Usuário"
                            value={searchUsername}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            required
                        />
                    </div>

                    <div className="actions">
                        <button 
                            onClick={handleSearch}
                            disabled={!searchUsername.trim()}
                        >
                            🔍 Buscar Usuário
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;