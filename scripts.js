const btnCarregar = document.querySelector('#btnCarregar');
const divDados = document.querySelector('#divDados');
let urlForFetch='https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3'

btnCarregar.addEventListener("click", () => {
    fetchFunction(urlForFetch);
});

const preencherDados = (dados) => {
	if (!dados) {
		log.textContent = "Não existem registros a serem exibidos.";
		return;
	} else {
		return `
            ${dados}
     `;
	}
};

function toDo(obj){
    //console.log(obj)

    let objStrint='';
    Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        console.log(val + ': ' + obj[val]);
        objStrint = objStrint + val + ': ' + obj[val] + "<br/>";
      });
    divDados.innerHTML = preencherDados(objStrint);
}

function fetchFunction(urlForFetch){

    const options = {
        method: 'GET',
    }

    return fetch(urlForFetch, options)
    .then((response) => response.json())
    .then((responseData) => {
        toDo(responseData);
        //console.log(responseData);
        //return responseData;
    })
    .catch(error => console.warn(error));
  }

  
