let inputUrl = document.querySelector('#inputUrl')
let botaoAncora = document.querySelector('#botaoAncora')
let botaoEncurtar = document.querySelector('#botaoEncurtar')
let divBotao = document.querySelector('#divBotao')
let divImgLoading = document.querySelector('#divImgLoading')
let pLink = document.querySelector('#pLink')
let opcoes = document.querySelector('#opcoes')
let divMensagem = document.querySelector('#divMensagem')
let pMensagem = document.querySelector('#pMensagem')
let divRedes = document.querySelector('#divRedes')
export let cancelar = document.querySelector('#cancelar')
let compZap = document.querySelector('#compZap')
let divBlob = document.querySelector('#divBlob')
let iconeLista = document.querySelector('#iconeLista')
let inicial = document.querySelector('#inicial')
let divInput = document.querySelector('#divInput')
let divTabela = document.querySelector('#divTabela')
let pDominio = document.querySelector('#pDominio')


import { getConfigs } from "./getConfigs.js";
import { postShortLink } from "./postShortLink.js";
import { getTabela } from "./getTabela.js"

getConfigs()

export function mostrarDivs() {
    esconde(botaoEncurtar)
    mostra(divImgLoading)
    inputUrl.setAttribute('placeholder', 'AGUARDE...')
}

export function ocultarDivs() {
    mostra(botaoEncurtar)
    esconde(divImgLoading)
    inputUrl.setAttribute('placeholder', 'INSIRA NOVA URL...')
    divBotao.classList.remove('divLink')
    esconde(pLink)
    esconde(opcoes)
}

export function mostra(e) {
    e.classList.remove('escondido')
}

export function esconde(e) {
    e.classList.add('escondido')
}

export function mostraOcultaMensagem(tipo, texto) {

    divMensagem.classList.remove('sucesso')
    divMensagem.classList.remove('erro')
    divMensagem.classList.add(tipo)
    pMensagem.innerHTML = texto
    divMensagem.appendChild(pMensagem)
    divMensagem.classList.add('fadeIn')
    setTimeout(() => {
        divMensagem.classList.remove('fadeIn')
        divMensagem.classList.add('fadeOut')
    }, 2000);
    divMensagem.classList.remove('fadeOut')
}

export function cancel() {
    esconde(divRedes)
    esconde(cancelar)
    esconde(compZap)
    esconde(divBlob)
}

export function compartilhaComRede(rede, site) {
    navigator.clipboard.writeText(pLink.innerHTML)
    if (confirm(`Seu link encurtado será copiado para a área de transferência e você será direcionado ao site da rede social ${rede}!`)) {
        mostraOcultaMensagem('sucesso', `Compartilhado com ${rede}!`)
        window.open(`${site}`, '_blank')
    }
}


export function validURL(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(str);
}

botaoEncurtar.onclick = () => {
    mostrarDivs()
    postShortLink(inputUrl.value)
}

botaoAncora.onclick = () => {
    ocultarDivs()
    mostrarDivs()
    postShortLink(inputUrl.value)
}

iconeLista.onclick = () => {
    inicial.style.display = 'none'
    esconde(divInput)
    esconde(inputUrl)
    esconde(botaoAncora)
    esconde(divBotao)
    esconde(botaoEncurtar)
    esconde(divImgLoading)
    mostra(divTabela)
    getTabela()
    pDominio.innerHTML = `Domínio: ${localStorage.getItem('hostname')}`
}