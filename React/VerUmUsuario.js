import { useState, useEffect } from 'react';

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
    }, [userId]); // O hook é executado sempre que o `userId` mudar.

    // Este componente renderiza a UI com os dados do usuário.
    // A lógica de seleção do usuário (que define o `userId`) deve estar em um componente pai.
    if (carregando) {
        return <div>Carregando dados do usuário...</div>;
    }

    if (erro) {
        return <div>{erro}</div>;
    }

    if (!usuario) {
        return <div>Selecione um usuário para ver os detalhes.</div>;
    }

    return (null);
        
}

export default VerUmUsuario;