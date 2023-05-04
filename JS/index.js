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

import { getConfigs } from "./getConfigs.js";
import { postShortLink } from "./postShortLink.js";
import { mostra, esconde } from "./mostraEsconde.js";
import { postQrCode } from "./postQrCode.js"


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

function compartilhaComRede(rede, site) {
    navigator.clipboard.writeText(pLink.innerHTML)
    alert(`Seu link encurtado foi copiado para a área de transferência e você será direcionado ao site da rede social ${rede}!`)
    mostraOcultaMensagem('sucesso', `Compartilhado com ${rede}!`)
    window.open(`${site}`, '_blank')
}
// function checkUrl(string) {
//     try {
//         let nova = new URL(string)
//         // console.log(url)
//         console.log("Valid URL!")
//     } catch (err) {
//         // console.log(url)
//         console.log("Invalid URL!")
//     }
// }

botaoEncurtar.addEventListener('click', () => {
    // checkUrl(`${inputUrl.value}`)
    mostrarDivs()
    postShortLink(inputUrl.value)
})

botaoAncora.addEventListener('click', () => {
    ocultarDivs()
    mostrarDivs()
    postShortLink(inputUrl.value)
})

botaoCopiar.addEventListener('click', () => {
    mostraOcultaMensagem('sucesso', 'Link copiado com sucesso!')
})

botaoCompartilhar.addEventListener('click', () => {
    mostra(divRedes)
    mostra(cancelar)
})

cancelar.addEventListener('click', () => {
    esconde(divRedes)
    esconde(cancelar)
    esconde(compZap)
    esconde(divBlob)
})

botaoZap.addEventListener('click', () => {
    mostra(divCompartilhamento)
    mostra(compZap)
})

botaoFace.addEventListener('click', () => {
    compartilhaComRede('Facebook', 'https://pt-br.facebook.com/')
})

botaoInsta.addEventListener('click', () => {
    compartilhaComRede('Instagram', 'https://www.instagram.com/')
})

botaoTwt.addEventListener('click', () => {
    compartilhaComRede('twitter', 'https://twitter.com/home?lang=pt')

})

botaoLin.addEventListener('click', () => {
    compartilhaComRede('LinkedIn', 'https://www.linkedin.com/in/')
})

botaoCompZap.addEventListener('click', () => {
    // console.log(`https://wa.me/${numeroZap.value}`)
    if (numeroZap.value.length < 12) {
        mostraOcultaMensagem('erro', 'Formato de número incorreto!')
        numeroZap.value = ''
        numeroZap.focus()
    } else {
        window.open(`http://wa.me/${numeroZap.value}`, "_blank")
        mostraOcultaMensagem('sucesso', 'Compartilhado com WhatsApp!')
        esconde(compZap)
    }
})

// botaoQrcode.addEventListener('click', () => {
//     imgQrCode.setAttribute('src', `${objectURL}`)
//     mostra(divBlob)
//     postQrCode(inputUrl.value)
// })