
console.log('Projeto em execução')

const loading = document.querySelector('#alert');
const tabelaUsuarios = document.querySelector("#tabela-usuarios");
const botaoCarregar = document.querySelector("#botao-carregar");

botaoCarregar.addEventListener('click', () => carregarDadosClickBotao())

// const DADOS_USUARIOS = null
const DADOS_USUARIOS = [
  { id: 1, name: "Amanda", email: "amanda@lovemail.com", company: { name: 'Lets Code'}},
  { id: 2, name: "Igor", email: "igor@bol.com", company: { name: 'Santander'}},
  { id: 3, name: "Mar cos", email: "marcos1234@outlook.com", company: { name: 'Microsoft'}},
  { id: 4, name: "Lucas", email: "lucasflores@hotmail.com", company: { name: 'Google'}},
];

const buscarUsuariosNoBancoDeDados = (segundos) => {
  return new Promise((resolve, reject) => {
    // Simula o tempo que levará para executar o carregamento de um banco de dados
    setTimeout(() => {
      if(!DADOS_USUARIOS) {
        reject('Não existem usuário a serem exibidos')
      } 
      resolve(DADOS_USUARIOS);
    }, segundos * 1000);  // 1 segundo é igual a 1 * 1000 no set timeout, aguarda x tempo * 1000 = segundos
  });
};

const buscarUsuariosNoBancoDeDadosFetchApi = () => {
 //  Stream Object => que significa que quando chamamos o método json (), uma Promise é retornada, pois a leitura do stream acontecerá de forma assíncrona.
  return fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .catch(err => err)
}

async function consultaUsuariosAsync() {
  try {
    loading.textContent = "Carregando..."
    return await buscarUsuariosNoBancoDeDados(segundos = 14); 
    // return await buscarUsuariosNoBancoDeDadosFetchApi();
  } catch (err) {
    loading.textContent = err
    console.log(err)
  }
}

// Alterando o DOM
const novaLinha = ({id, name, email, company}) => `
   <tr id="${id}">
      <td>${name}</td>
      <td>${email}</td>
      <td>${company.name ? company.name : 'Não definido'}</td>
   </tr>
`;

const preencherTabela = (usuarios) => {
  if(!usuarios) {
    loading.textContent = "Não existem registros a serem exibidos."
    return
  } else {
    const listaDeUsuariosHTML = usuarios.map(usuario => novaLinha(usuario)).join('') 
    tabelaUsuarios.innerHTML = listaDeUsuariosHTML
    loading.textContent = `Foram encontrados ${usuarios.length} registros.`
  }
 
};

const carregarDadosClickBotao = () => {
  // consultaUsuariosAsync()
  //   .then(resultado => preencherTabela(resultado))
  //   .catch(err => console.log('O sistema detectou o seguinte erro => ', err))

  Promise.all([buscarUsuariosNoBancoDeDados(), buscarUsuariosNoBancoDeDadosFetchApi()])
    .then((values) => {
      const novosItems = [...values[0], ...values[1]]
      adicionarArrayAoStorage('usuarios', JSON.stringify(novosItems))
      preencherTabela(novosItems)
    })
}


const rodaAutomaticamenteAoInicializar = () => {
  preencherTabela(buscaDadosDoStorage('usuarios'))
}
rodaAutomaticamenteAoInicializar()