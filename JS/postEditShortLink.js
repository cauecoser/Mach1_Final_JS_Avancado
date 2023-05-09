import { API_KEY, APP_JSON } from "./config.js";
import { getTabela } from "./getTabela.js";

export function postEditShortLink(originalURL, path, idString) {
    const options = {
        method: 'POST',
        headers: {
            accept: APP_JSON,
            'content-type': APP_JSON,
            Authorization: API_KEY
        },
        body: JSON.stringify({ originalURL: originalURL, path: path })
    };

    fetch(`https://api.short.io/links/${idString}`, options)
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.ok) {
                return response.json()
            } else {
                throw new Error('NÃO FOI POSSÍVEL COMUNICAR COM A APLICAÇÃO.')
            }
        })
        .then(response => {
            console.log(response)
            getTabela()
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}