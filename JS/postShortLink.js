import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { mostra, esconde } from "./mostraEsconde.js";
import { mostraOcultaMensagem } from "./index.js";
import { botaoQrcode } from "./index.js";
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
                throw new Error('LINK CURTO NÃO ENCONTRADO!')
            }
        })
        .then(response => {
            inputUrl.setAttribute('placeholder', '')
            esconde(divImgLoading)
            divBotao.classList.add('divLink')
            botaoQrcode.onclick = () => postQrCode(`${response.idString}`, urlInput)
            pLink.innerHTML = `<p>${response.shortURL}</p>`
            let data = new Date(response.createdAt)
            pData.innerHTML = `<p>Link criado em: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}, às ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}.</p>`
            mostra(pLink)
            mostra(pData)
            mostra(opcoes)
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}