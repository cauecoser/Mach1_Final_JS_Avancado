import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { mostra, esconde } from "./mostraEsconde.js";
import { compartilhaComRede, ocultarDivs, mostrarDivs, botaoQrcode, cancel, validURL, mostraOcultaMensagem } from "./index.js";
import { postQrCode } from "./postQrCode.js"

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
                throw new Error('A RESPOSTA DA APLICAÇÃO NÃO FOI OBTIDA!')
            }
        })
        .then(response => {
            if (validURL(inputUrl.value)) {
                inputUrl.setAttribute('placeholder', '')
                esconde(divImgLoading)
                divBotao.classList.add('divLink')
                botaoCopiar.onclick = () => {
                    cancel()
                    mostraOcultaMensagem('sucesso', 'Link copiado com sucesso!')
                }
                botaoCompartilhar.onclick = () => {
                    cancel()
                    mostra(divRedes)
                    mostra(cancelar)
                    cancelar.onclick = () => cancel()
                    // cancelar.onclick = cancel()
                    botaoZap.onclick = () => {
                        mostra(divCompartilhamento)
                        mostra(compZap)
                        numeroZap.value = ''
                        botaoCompZap.onclick = () => {
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
            } else {
                ocultarDivs()
                throw new Error('A URL INSERIDA É INVÁLIDA!')
            }
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}