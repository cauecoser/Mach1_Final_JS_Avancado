import { compartilhaComRede, mostra, esconde, ocultarDivs, cancel, validURL, mostraOcultaMensagem, cancelar} from "./main.js";
import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { postQrCode } from "./postQrCode.js"

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
            if (validURL(inputUrl.value)) {
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
                            // console.log(`https://wa.me/${numeroZap.value}`)
                            if (numeroZap.value.length < 12) {
                                mostraOcultaMensagem('erro', 'FORMATO DE NÚMERO INCORRETO!')
                                numeroZap.value = ''
                                numeroZap.focus()
                            } else {
                                window.open(`http://wa.me/${numeroZap.value}`, "_blank")
                                mostraOcultaMensagem('sucesso', 'COMPARTILHADO COM WHATSAPP!')
                                esconde(compZap)
                            }
                        }
                    }

                    botaoFace.onclick = () => {
                        compartilhaComRede('Facebook', 'https://pt-br.facebook.com/')
                    }

                    botaoInsta.onclick = () => {
                        compartilhaComRede('Instagram', 'https://www.instagram.com/')
                    }

                    botaoTwt.onclick = () => {
                        compartilhaComRede('twitter', 'https://twitter.com/home?lang=pt')

                    }

                    botaoLin.onclick = () => {
                        compartilhaComRede('LinkedIn', 'https://www.linkedin.com/in/')
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