import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { ocultarDivs } from "./index.js";

export function postEditShortLink(idString, urlInput) {
    const options = {
        method: 'POST',
        headers: {
            accept: APP_JSON,
            'content-type': APP_JSON,
            Authorization: API_KEY
        },
        body: JSON.stringify({ domain: HOSTNAME, originalURL: urlInput })
    };

    fetch(`https://api.short.io/links/${idString}`, options)
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.ok) {
                return response.json()
            } else {
                ocultarDivs()   
                throw new Error('A RESPOSTA DA APLICAÇÃO NÃO FOI OBTIDA!')
            }
        })
        .then(response => {
            console.log(response)
            // if(response.idString == idString) {
            //     alert("OK")
            // } else {
            //     alert("NÃO OK")
            // }
        })
        .catch(err => console.error(err));

}
