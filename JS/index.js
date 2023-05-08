let inputUrl = document.querySelector('#inputUrl')
let botaoAncora = document.querySelector('#botaoAncora')
let botaoEncurtar = document.querySelector('#botaoEncurtar')
let divBotao = document.querySelector('#divBotao')
let divImgLoading = document.querySelector('#divImgLoading')
let pLink = document.querySelector('#pLink')
let opcoes = document.querySelector('#opcoes')
let divMensagem = document.querySelector('#divMensagem')
let botaoCopiar = document.querySelector('#botaoCopiar')
let botaoCompartilhar = document.querySelector('#botaoCompartilhar')
export let botaoQrcode = document.querySelector('#botaoQrcode')
let pMensagem = document.querySelector('#pMensagem')
let pData = document.querySelector('#pData')
let divRedes = document.querySelector('#divRedes')
export let cancelar = document.querySelector('#cancelar')
let botaoZap = document.querySelector('#botaoZap')
let botaoFace = document.querySelector('#botaoFace')
let botaoInsta = document.querySelector('#botaoInsta')
let botaoTwt = document.querySelector('#botaoTwt')
let botaoLin = document.querySelector('#botaoLin')
let divCompartilhamento = document.querySelector('#divCompartilhamento')
let compZap = document.querySelector('#compZap')
let botaoCompZap = document.querySelector('#botaoCompZap')
let numeroZap = document.querySelector('#numeroZap')
let divBlob = document.querySelector('#divBlob')
let imgQrCode = document.querySelector('#imgQrCode')
let divBotaoSalvar = document.querySelector('#divBotaoSalvar')
let linkDowloadQr = document.querySelector('#linkDowloadQr')
let iconeLista = document.querySelector('#iconeLista')
let inicial = document.querySelector('#inicial')
let divInput = document.querySelector('#divInput')
let divTabela = document.querySelector('#divTabela')
let pDominio = document.querySelector('#pDominio')
let modalEdicao = document.querySelector('#modalEdicao')
let slugInput = document.querySelector('#slugInput')
let urlInput = document.querySelector('#urlInput')

import { getConfigs } from "./getConfigs.js";
import { postShortLink } from "./postShortLink.js";
import { mostra, esconde } from "./mostraEsconde.js";
import { postQrCode } from "./postQrCode.js"
import { HOSTNAME } from "./config.js"
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
    divBotao.classList.remove('divLink')
    esconde(pLink)
    esconde(opcoes)
}

export function mostraOcultaMensagem(tipo, texto) {
    divMensagem.classList.remove('sucesso')
    divMensagem.classList.remove('erro')
    divMensagem.classList.add(tipo)
    pMensagem.innerHTML = texto
    divMensagem.classList.remove('escondido')
    setTimeout(() => {
        divMensagem.classList.add('escondido')
    }, 3000);
}

export function cancel() {
    esconde(divRedes)
    esconde(cancelar)
    esconde(compZap)
    esconde(divBlob)
}

export function compartilhaComRede(rede, site) {
    navigator.clipboard.writeText(pLink.innerHTML)
    alert(`Seu link encurtado foi copiado para a área de transferência e você será direcionado ao site da rede social ${rede}!`)
    mostraOcultaMensagem('sucesso', `Compartilhado com ${rede}!`)
    window.open(`${site}`, '_blank')
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

export function abreModalEdicao(path, url) {
    mostra(modalEdicao) //?????????????????????????????????????
    slugInput.value = path
    urlInput.value = url
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


// botaoQrcode.addEventListener('click', () => {
//     imgQrCode.setAttribute('src', `${objectURL}`)
//     mostra(divBlob)
//     postQrCode(inputUrl.value)
// })