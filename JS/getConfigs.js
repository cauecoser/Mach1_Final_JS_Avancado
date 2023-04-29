import { API_KEY, APP_JSON, HOSTNAME, ID_DOMAIN, URL_API } from "./config.js";

export function getConfigs() {

    if (!HOSTNAME || !ID_DOMAIN) {

        const options = {
            method: 'GET',
            headers: { accept: APP_JSON, Authorization: API_KEY }
        };

        fetch(`${URL_API}/domains`, options)
            .then(response => {
                console.log(response)
                if (response.status === 200 && response.ok) {
                    return response.json()
                } else {
                    throw new Error('ERRO NA COMUNICAÇÃO COM O SERVIDOR!')
                }
            })
            .then(response => {
                console.log(response)
                if (!Array.isArray(response)) {
                    throw new Error('DADOS NÃO ENCONTRADOS NA RESPOSTA DO SERVIDOR!')
                }
                localStorage.setItem('id', response[0].id);
                localStorage.setItem('hostname', response[0].hostname);
            })
            .catch(err => {
                console.error(err) //começar as mensagens de erro (tratamento e exibição)
            });
    }
}