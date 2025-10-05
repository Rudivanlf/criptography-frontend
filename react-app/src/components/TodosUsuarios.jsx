import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


// DADOS MOCKADOS: Usuários de teste para testar o design da lista
const mockUsers = [
    { id: 1, username: 'tester_alice', senha_criptografada: 'a8s7df9h8s7df9h8s7df9h' },
    { id: 2, username: 'tester_bob', senha_criptografada: 'b3g4j5k6l7m8n9o0p1q2r3' },
    { id: 3, username: 'tester_charlie', senha_criptografada: 'c1w2e3r4t5y6u7i8o9p0a1' },
    { id: 4, username: 'tester_david', senha_criptografada: 'd2s3d4f5g6h7j8k9l0z1x2' },
];

function TodosUsuarios() {
    // CORRIGIDO: Agora definimos 'usuarios' corretamente, inicializando com dados mockados
    const [usuarios, setUsuarios] = useState(mockUsers); 
    const [erro, setErro] = useState(null);
    
    // INCLUÍDO: Inicialização do hook de navegação
    const navigate = useNavigate(); 

    // INCLUÍDO: Definição da função para voltar
    const handleVoltar = () => {
        // Redireciona para a rota raiz (Dashboard)
        navigate('/'); 
    };

    /* O useEffect com o fetch (chamada à API) permanece COMENTADO */

    if (erro) {
        // Reutiliza o estilo de erro do App.css
        return (
            <div className="App">
                <div className="card">
                    <h1>Erro ao Carregar</h1>
                    <p className="msg error">Ocorreu um erro: {erro}</p>
                    <button onClick={handleVoltar}>Voltar</button>
                </div>
            </div>
        );
    }
    
    return (
        // Reutiliza a classe .App para centralizar
        <div className="App">
            {/* Usa a classe .user-list-card para estilo de lista, definida anteriormente no seu App.css */}
            <div className="card user-list-card"> 
                
                <h1>Todos os Usuários Cadastrados</h1>
                
                {usuarios.length > 0 ? (
                    <ul className="user-list">
                        {usuarios.map(user => (
                            <li key={user.id} className="user-item">
                                <div className="user-info">
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p className="encryption-data">
                                        <strong>Senha Criptografada:</strong> {user.senha_criptografada}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum usuário cadastrado para exibir.</p>
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