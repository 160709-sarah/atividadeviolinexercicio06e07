import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [ erro, setErro] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuarioUnico, setUsuarioUnico] = useState(null);

  const API = 'https://jsonplaceholder.typicode.com/users'


// Buscar usuarios
  useEffect(() => { 
    async function buscarUsuarios() {
      try {
        const resposta = await fetch ('https://jsonplaceholder.typicode.com/users/5')

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

  // Excluir usuario

  async function excluirUsuario(id) {
    try{
      const resposta = await fetch(`${API}/${id}`, 
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

// Abrir formulário de edição

function editarUsuario(usuario) {
  setUsuarioEditando(usuario);
  setNome(usuario.name);
  setEmail(usuario.email); 
}

// Salvar edição do usuário

async function salvarEdicao(event) { 
  event.preventDefault();

  try {
    const resposta = await fetch(
      `${API}/${usuarioEditando.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nome,
          email: email
        })
      }
    )
    if (!resposta.ok) {
      throw new Error('Erro ao atualizar usuário')
    }

    const usuarioAtualizado = await resposta.json()

    setUsuarios((listaAtual) =>
      listaAtual.map((usuario) =>
        usuario.id === usuarioEditando.id ? usuarioAtualizado : usuario
      )
    )

    setUsuarioEditando(null)
    setNome('')
    setEmail('')
  } catch (erro) {
    alert('Não foi possível atualizar o usuário.')
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
          <button onClick={() => editarUsuario(usuario)}>Editar</button>
          <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
        </div>
      ))}

      {usuarioEditando && (
        <form onSubmit={salvarEdicao}>
          <h2>Editar usuário</h2>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(e.target.value)}/>
           </label>

           <br />

           <label> 
              Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              />

            <br />

           </label>
           <button type="submit">Salvar</button>

           <button type="button" onClick={() => setUsuarioEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}

export default App;