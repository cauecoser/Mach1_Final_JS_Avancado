import { API_KEY, APP_JSON, HOSTNAME } from "./config.js";
import { mostra, esconde } from "./mostraEsconde.js";
import { postQrCode } from "./postQrCode.js";

export function getTabela() {
    const options = {
        method: 'GET',
        headers: { accept: APP_JSON, Authorization: API_KEY }
    };

    fetch('https://api.short.io/api/links?domain_id=713784&limit=100&dateSortOrder=desc', options)
        .then(response => {
            if ((response.status === 200 || response.status === 201) && response.ok) {
                return response.json()
            } else {
                throw new Error('NÃO FOI POSSÍVEL OBTER OS LINKS')
            }
        })
        .then(response => {
            const corpo = document.querySelector('#corpo')
            console.log(response)
            let HtmlToAppend = ''
            response.links.forEach(element => {
                const created = new Date(element.createdAt)
                created.setUTCMinutes(created.getUTCMinutes()-180)
                const updated = new Date(element.updatedAt)
                updated.setUTCMinutes(updated.getUTCMinutes()-180)
                HtmlToAppend += `<tr>
                    <td>${element.secureShortURL}</td>
                    <td>${element.originalURL}</td>
                    <td>${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()}, às ${created.getHours()}:${created.getMinutes()}:${created.getSeconds()}</td>
                    <td>${updated.getDate()}/${updated.getMonth() + 1}/${updated.getFullYear()}, às ${updated.getHours()}:${updated.getMinutes()}:${updated.getSeconds()}</td>
                    <td>BT EDIT</td>
                    <td>BT EXCL</td>
                </tr>`
            });
            corpo.innerHTML = HtmlToAppend
        })
        .catch(err => console.error(err));
}