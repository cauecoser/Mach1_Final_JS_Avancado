import { API_KEY } from './config.js'
import { getTabela } from './getTabela.js';
import { mostraOcultaMensagem } from './main.js';

export function deleteLink(idString) {
    const options = { method: 'DELETE', headers: { Authorization: API_KEY } };

    fetch(`https://api.short.io/links/${idString}`, options)
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.ok) {
                return response.json()
            } else {
                throw new Error('NÃO FOI POSSÍVEL COMUNICAR COM A APLICAÇÃO!')
            }
        })
        .then(response => { 
            if (response.success) {
                getTabela()
            } else {
                throw new Error('NÃO FOI POSSÍVEL EXCLUIR O LINK!')
            }
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}