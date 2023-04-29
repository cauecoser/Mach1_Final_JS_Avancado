let inputUrl = document.querySelector('#inputUrl')
let botaoAncora = document.querySelector('#botaoAncora')
let botaoEncurtar = document.querySelector('#botaoEncurtar')
let divBotao = document.querySelector('#divBotao')
let divImgLoading = document.querySelector('#divImgLoading')
let pLink = document.querySelector('#pLink')
let opcoes = document.querySelector('#opcoes')

import { getConfigs } from "./getConfigs.js";
import { postShortLink } from "./postShortLink.js";
import { mostra, esconde } from "./mostraEsconde.js";


getConfigs()

function mostrarDivs() {
    esconde(botaoEncurtar)
    mostra(divImgLoading)
    inputUrl.setAttribute('placeholder', 'AGUARDE...')

}

function ocultarDivs() {
    mostra(botaoEncurtar)
    esconde(divImgLoading)
    divBotao.classList.remove('divLink')
    esconde(pLink)
    esconde(opcoes)
}

botaoEncurtar.addEventListener('click', () => { //Assim que clicar preciso checar se inputUrl.value tem uma URL de fato
    mostrarDivs()
    postShortLink(inputUrl.value)
})

botaoAncora.addEventListener('click', () => {
    ocultarDivs()
    mostrarDivs()
    postShortLink(inputUrl.value)
    // ocultarDivs()
})

