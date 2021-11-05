// function fetchFunction (urlForFetch) {

//     const options = {
//       method: 'GET',
//     }

//     return fetch(urlForFetch, options)
//       .then(response => response.json())
//     //   .then(console.log)
//       .catch(err => err)
//   }

//   let varURL='https://parallelum.com.br/fipe/api/v1/carros/marcas';

// //   fetchFunction(varURL)
// //     .then(() => console.log('cadastrado'))
// //     .catch(() => console.log('falha ao cadastrar'))

async function requestPost(varResource, dataToSend) {
    const response = await fetch('https://192.168.0.5' + varResource, {
        rejectUnauthorized: false,
        method: "POST",
        //mode: 'no-cors', //desabilitando o CORS
        headers: {//ATENÇÃO, O headers tem q vir depois do body para funcionar
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
  
        body: JSON.stringify(dataToSend)
    });
    const responseData = await response.json();
  
    return  responseData;
  }


function handleLoginSubmit(e) {
    e.preventDefault(); //não deixa a pagina recarregar ao submeter

    (async () => {
        
        let dataToSend = {
            funcao: 'ler',
            bd_cliente: this.state.bd_cliente,
            login: this.state.loginUser,
            senha: this.state.password
        };

        //console.log("JSON a enviar: " + JSON.stringify(dataToSend));

        let responseData = await requestPost('/usuarios', dataToSend);

        //console.log(responseData);
        //sconsole.log(responseData.sessao);
        
        if (responseData.sessao === 'true'){
            alert('Usuário Logado!');
            //ReactDOM.render(<Menu />, document.getElementById('root'));
            this.setState({ varRedirect: true });
        }
        else{
            alert('Usuário ou senha incorretos!')
        }
    
    })();

    e.target.reset()
}





let varURL='https://parallelum.com.br/fipe/api/v1/carros/marcas';

function fetchFunction(urlForFetch){

    const options = {
        method: 'GET',
    }

    return fetch(urlForFetch, options)
    .then((response) => response.json())
    .then((responseData) => {
        //console.log(responseData);
        return responseData;
    })
    .catch(error => console.warn(error));
  }
  
// fetchFunction(varURL).then(response => console.log(response));
// let varJSONFetchData=fetchFunction(varURL);

let varJSONFetchData = JSON.stringify(fetchFunction(varURL));

console.log(varJSONFetchData);
