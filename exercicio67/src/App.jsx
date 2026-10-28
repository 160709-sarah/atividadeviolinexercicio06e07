import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [ erro, setErro] = useState('');

  useEffect(() => { 
    async function buscarUsuarios() {
      try {
        const resposta = await fetch ('https://jsonplaceholder.typicode.com/users')

        if (!resposta.ok) {
          throw new Error('Erro ao buscar usuários')
        }

        const dados = await resposta.json()
        setUsuarios(dados)
      } catch (erro) {
        setErro('Não foi possível buscar os usuários')
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()
  }, [])

  async function excluirUsuario(id) {
    try{
      const resposta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, 
        {
          method: 'DELETE'
    }
  )

  if(!resposta.ok) {
    throw new Error('Erro ao excluir usuário')
  }

  console.log(`Usuário com id ${id} excluído com sucesso.`)

  setUsuarios((listaAtual) =>
    listaAtual.filter((usuario) => usuario.id !== id)
  )
} catch (erro) {
    alert('Não foi possível excluir o usuário.')
  }
}

if (carregando) {
  return <p>Carregando usuários...</p>
}

if (erro) {
  return <p>{erro}</p>
}

  return (
    <div>
      <h1>Lista de usuários</h1>
      
      {usuarios.map((usuario) => (
        <div className="usuario" key={usuario.id}> 
          <div>
          <strong>{usuario.name}</strong> 
          <p>{usuario.email}</p>
          </div>

          <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
        </div>
      ))}
    </div>
  )
}

export default App;