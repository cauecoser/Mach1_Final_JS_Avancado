import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { mostraOcultaMensagem, mostra, cancelar } from "./main.js";

let imgQrCode = document.querySelector('#imgQrCode')
let divBotaoSalvar = document.querySelector('#divBotaoSalvar')
let linkDowloadQr = document.querySelector('#linkDowloadQr')

export function postQrCode(id, urlInput) {

    const options = {
        method: 'POST',
        headers: {
            accept: APP_JSON,
            'content-type': APP_JSON,
            Authorization: API_KEY
        },
        body: JSON.stringify({ domain: HOSTNAME, originalURL: urlInput })
    };

    fetch(`https://api.short.io/links/qr/${id}`, options)
        .then(response => {
            if ((response.status === 201) && response.ok) {
                return response.blob()
            } else {
                throw new Error('LINK QR CODE NÃO ENCONTRADO!')
            }
        })
        .then(blob => {
            mostra(divBlob)
            mostra(divBotaoSalvar)
            let objectURL = URL.createObjectURL(blob)
            imgQrCode.src = objectURL
            linkDowloadQr.href = objectURL
            linkDowloadQr.download = 'Short-It_Link.png'
            linkDowloadQr.onclick = () => mostraOcultaMensagem('sucesso', 'QR CODE BAIXADO COM SUCESSO!')
            mostra(cancelar)
            mostraOcultaMensagem('sucesso', 'QR CODE GERADO COM SUCESSO!')
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}