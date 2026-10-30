import './App.css';
import { useState, useEffect } from 'react';
import ListaUsuarios from './ListaUsuarios';

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


return (
  <div>
    <h1>Lista de Usuários</h1>

    {carregando ? (
      <p>Carregando...</p>
    ) : (
      <ListaUsuarios usuarios={usuarios} />
    )}
  </div>
 )
}

export default App