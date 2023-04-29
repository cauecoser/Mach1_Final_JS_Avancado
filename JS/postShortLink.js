import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { mostra, esconde } from "./mostraEsconde.js";

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
            pLink.innerHTML = response.shortURL
            mostra(pLink)
            mostra(opcoes)
        })
        .catch(err => console.error(err));
}