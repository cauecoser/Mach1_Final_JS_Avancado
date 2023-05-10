import { compartilhaComRede, mostra, esconde, ocultarDivs, cancel, validURL, mostraOcultaMensagem, cancelar} from "./main.js";
import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { postQrCode } from "./postQrCode.js"

let inputUrl = document.querySelector('#inputUrl')
let botaoCopiar = document.querySelector('#botaoCopiar')
let botaoCompartilhar = document.querySelector('#botaoCompartilhar')
let botaoQrcode = document.querySelector('#botaoQrcode')
let pData = document.querySelector('#pData')
let botaoZap = document.querySelector('#botaoZap')
let botaoFace = document.querySelector('#botaoFace')
let botaoInsta = document.querySelector('#botaoInsta')
let botaoTwt = document.querySelector('#botaoTwt')
let botaoLin = document.querySelector('#botaoLin')
let divCompartilhamento = document.querySelector('#divCompartilhamento')
let botaoCompZap = document.querySelector('#botaoCompZap')
let numeroZap = document.querySelector('#numeroZap')

export function postShortLink(urlInput) {
    const options = {
        method: 'POST',
        headers: {
            accept: APP_JSON,
            'content-type': APP_JSON,
            Authorization: API_KEY
        },
        body: JSON.stringify({ domain: HOSTNAME, originalURL: urlInput })
    };

    fetch('https://api.short.io/links', options)
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.ok) {
                return response.json()
            } else {
                ocultarDivs()   
                throw new Error('NÃO FOI POSSÍVEL COMUNICAR COM A APLICAÇÃO!')
            }
        })
        .then(response => {
            if (validURL(urlInput)) {
                inputUrl.setAttribute('placeholder', '')
                esconde(divImgLoading)
                divBotao.classList.add('divLink')
                botaoCopiar.onclick = () => {
                    cancel()
                    mostraOcultaMensagem('sucesso', 'LINK COPIADO COM SUCESSO!')
                }
                botaoCompartilhar.onclick = () => {
                    cancel()
                    mostra(divRedes)
                    mostra(cancelar)
                    cancelar.onclick = () => cancel()
                    botaoZap.onclick = () => {
                        mostra(divCompartilhamento)
                        mostra(compZap)
                        numeroZap.value = ''
                        botaoCompZap.onclick = () => {
                            if (numeroZap.value.length < 12) {
                                mostraOcultaMensagem('erro', 'FORMATO DE NÚMERO INCORRETO!')
                                numeroZap.value = ''
                                numeroZap.focus()
                            } else {
                                window.open(`http://wa.me/${numeroZap.value}?text=Acesse%20meu%20link!:%20${response.secureShortURL}`, "_blank")
                                esconde(compZap)
                            }
                        }
                    }

                    botaoFace.onclick = () => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${response.secureShortURL}&amp;src=sdkpreparse`)
                    }

                    botaoInsta.onclick = () => {
                        compartilhaComRede('Instagram', 'https://www.instagram.com/')
                    }

                    botaoTwt.onclick = () => {
                        window.open(`https://twitter.com/intent/tweet?text=SHORT-IT!&url=${response.secureShortURL}&via=shortit`)
                    }

                    botaoLin.onclick = () => {
                        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${response.secureShortURL}`)
                    }
                }
                botaoQrcode.onclick = () => {
                    cancel()
                    postQrCode(`${response.idString}`, urlInput)
                }
                pLink.innerHTML = `<p>${response.shortURL}</p>`
                let data = new Date(response.createdAt)
                pData.innerHTML = `<p>Link criado em: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}, às ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}.</p>`
                mostra(pLink)
                mostra(pData)
                mostra(opcoes)
                mostraOcultaMensagem('sucesso', 'LINK CURTO GERADO COM SUCESSO!')
            } else {
                ocultarDivs()
                throw new Error('A URL INSERIDA É INVÁLIDA!')
            }
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}