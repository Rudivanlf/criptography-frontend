import { useState, useEffect } from 'react';
import './VerUmUsuario.css';

/**
 * Componente para buscar e exibir os dados de um usuário específico do backend.
 * @param {object} props - As propriedades do componente.
 * @param {string|number} props.userId - O ID do usuário a ser buscado.
 */
function VerUmUsuario({ userId }) {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        // Função para buscar os dados do usuário no backend.
        const buscarUsuario = async () => {
            if (!userId) {
                setUsuario(null);
                return;
            }

            setCarregando(true);
            setErro('');
            setUsuario(null);

            try {
                // Substitua 'http://localhost:5000/api/usuarios' pela URL real da sua API.
                const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`);

                if (!response.ok) {
                    throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
                }

                const data = await response.json();
                // Assume que a API retorna um objeto com 'username' e 'senhaCriptografada'.
                setUsuario(data);
            } catch (error) {
                console.error('Falha na requisição:', error);
                setErro('Não foi possível carregar os dados do usuário.');
            } finally {
                setCarregando(false);
            }
        };

        buscarUsuario();
    }, [userId]);

    if (carregando) { // Corrigido de 'se' para 'if'
        return (
            <div className="card">
                <p style={{ textAlign: 'center', padding: '20px' }}>Carregando dados do usuário...</p>
            </div>
        );
    }

    if (erro) { 
        return (
            <div className="card">
                <p style={{ textAlign: 'center', padding: '20px', color: '#b00020' }}>{erro}</p>
            </div>
        );
    }

    if (!usuario) { 
        return (
            <div className="card">
                <p style={{ textAlign: 'center', padding: '20px' }}>Selecione um usuário para ver os detalhes.</p>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="card">
                <h1>Detalhes do Usuário</h1>
                <div className="user-details">
                    <div className="detail-item">
                        <label>Username:</label>
                        <span>{usuario.username}</span>
                    </div>
                    <div className="detail-item">
                        <label>Senha Criptografada:</label>
                        <span>{usuario.password || 'Hash não disponível'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerUmUsuario;