import { API_KEY, APP_JSON, HOSTNAME, ID_DOMAIN, URL_API } from "./config.js";

export function getConfigs() {

    if (!HOSTNAME || !ID_DOMAIN) {

        const options = {
            method: 'GET',
            headers: { accept: APP_JSON, Authorization: API_KEY }
        };

        fetch(`${URL_API}/domains`, options)
            .then(response => {
                if (response.status === 200 && response.ok) {
                    return response.json()
                } else {
                    throw new Error('NÃO FOI POSSÍVEL COMUNICAR COM A APLICAÇÃO!')
                }
            })
            .then(response => {
                if (!Array.isArray(response)) {
                    throw new Error('DADOS NÃO ENCONTRADOS NA RESPOSTA DO SERVIDOR!')
                }
                localStorage.setItem('id', response[0].id);
                localStorage.setItem('hostname', response[0].hostname);
            })
            .catch(err => {
                mostraOcultaMensagem('erro', `${err.message}`)
            });
    }
}