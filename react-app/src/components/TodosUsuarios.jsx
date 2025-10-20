import { useState, useEffect } from 'react'; // 1. Adicionado useEffect
import { useNavigate } from 'react-router-dom'; 
import EncryptedPasswordDisplay from './EncryptedPasswordDisplay';

// 2. Defina a URL BASE DA SUA API DO RENDER aqui!
const apiUrl = import.meta.env.VITE_RENDER_API_URL; 

function TodosUsuarios() {
    // 3. Inicializado com array vazio
    const [usuarios, setUsuarios] = useState([]); 
    const [erro, setErro] = useState(null);
    // Adicionado estado de carregamento
    const [isLoading, setIsLoading] = useState(true); 
    
    // INCLUÍDO: Inicialização do hook de navegação
    const navigate = useNavigate(); 

    // INCLUÍDO: Definição da função para voltar
    const handleVoltar = () => {
        // Redireciona para a rota raiz (Dashboard)
        navigate('/'); 
    };

    // 4. Lógica de BUSCA DE DADOS (useEffect)
    useEffect(() => {
        // Funções assíncronas dentro do useEffect são uma boa prática
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                // Endpoint para buscar todos os usuários
                const response = await fetch(`${import.meta.env.VITE_RENDER_API_URL}/users/all`); 
                
                if (!response.ok) {
                    // Lança um erro para ser pego pelo catch
                    throw new Error('Falha ao buscar dados da API. Status: ' + response.status);
                }
                
                const data = await response.json();
                setUsuarios(data);
                setErro(null);
                
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setErro(error.message);
                
            } finally {
                setIsLoading(false); // Fim do carregamento, sucesso ou falha
            }
        };

        fetchUsers();
    }, []); // Array vazio garante que o fetch seja executado apenas uma vez.


    if (erro) {
        // Reutiliza o estilo de erro do App.css
        return (
            <div className="App">
                <div className="card user-list-card">
                    <h1>Erro ao Carregar</h1>
                    <p className="msg error">Ocorreu um erro: {erro}</p>
                    <button onClick={handleVoltar}>Voltar</button>
                </div>
            </div>
        );
    }
    
    // 5. Estado de Carregamento
    if (isLoading) {
        return <div className="App"><div className="card user-list-card">Carregando usuários...</div></div>;
    }

    return (
        // Reutiliza a classe .App para centralizar
        <div className="App">
            {/* Usa a classe .user-list-card para estilo de lista, definida anteriormente no seu App.css */}
            <div className="card user-list-card"> 
                
                <h1>Todos os Usuários Cadastrados</h1>
                
                {/* Exibe a lista se houver usuários, ou a mensagem de vazio */}
                {usuarios.length > 0 ? (
    <ul className="user-list">
        {usuarios.map(user => (
            <li key={user.id} className="user-item">
                <div className="user-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <div className="encryption-data-wrapper">
                        <strong>Senha Criptografada:</strong>
                        <EncryptedPasswordDisplay password={user.password} />
                    </div>
                </div>
            </li>
        ))}
    </ul>
) : (
    <p>Nenhum usuário cadastrado para exibir.</p>
)}

                <div className="actions">
                    <button onClick={handleVoltar}>
                        Voltar 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodosUsuarios;