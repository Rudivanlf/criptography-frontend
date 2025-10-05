import { useState, useEffect } from 'react';
import './TodosUsuarios.css';

function TodosUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        fetch('http://localhost:3001/getAllUsers')
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

    if (erro) { // Corrigido de 'se' para 'if'
        return (
            <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                Erro: {erro}
            </div>
        );
    }

    if (carregando) { // Corrigido de 'se' para 'if'
        return (
            <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
                Carregando usuários...
            </div>
        );
    }

    return (
        <div className="App">
            <div className="card">
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
                                    <td>{usuario.username}</td>
                                    <td>{usuario.password || 'Hash não disponível'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default TodosUsuarios;