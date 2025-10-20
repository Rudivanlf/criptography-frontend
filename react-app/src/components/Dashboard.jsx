    import { useState } from 'react'; // Importa useState do React
    import { useNavigate,Link } from 'react-router-dom';

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

        return (
            // Reutilizamos a classe .App para centralização
            <div className="App">
                <div className="card dashboard-card"> 
                    
                    <h1>Bem-vindo! Escolha uma opção:</h1>

                    {/* --- Opção 1: Ver Todos os Usuários --- */}
                    <div className="dashboard-option">
                        <p>Clique abaixo para ver a lista completa de usuários cadastrados no sistema.</p>
                        {/* Link direto para a rota da lista */}
                        <Link to="/todosusuarios" className="button-link">
                            Ver Todos os Usuários
                        </Link>
                    </div>

                    <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />

                    {/* --- Opção 2: Ver um Usuário Específico --- */}
                    <div className="dashboard-option">
                        <h2>Ver Login de um Usuário Específico</h2>
                        <p>Digite o nome de usuário (username) para consultar as informações:</p>
                        
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
