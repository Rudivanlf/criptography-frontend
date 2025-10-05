import { useState, useEffect } from 'react';

function TodosUsuarios() {
    const [setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
/*
    useEffect(() => {
        // A URL foi atualizada para usar o endpoint 'getAllUsers'.
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
            });
    }, []); // O array vazio garante que o fetch seja executado apenas uma vez, quando o componente montar.
*/
    if (erro) {
        return <div>Erro: {erro}</div>;
    }

    return null;
}

export default TodosUsuarios;