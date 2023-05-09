import { API_KEY, APP_JSON } from "./config.js";
import { validURL, mostra, esconde } from "./main.js";
import { postEditShortLink } from "./postEditShortLink.js";

let slugInput = document.querySelector('#slugInput')
let urlInput = document.querySelector('#urlInput')
let modalEdicao = document.querySelector('#modalEdicao')
let fechaEdicao = document.querySelector('#fechaEdicao')
let salvaEdicao = document.querySelector('#salvaEdicao')


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
            response.links.forEach((element, index) => {
                const created = new Date(element.createdAt)
                created.setUTCMinutes(created.getUTCMinutes() - 180)
                const updated = new Date(element.updatedAt)
                updated.setUTCMinutes(updated.getUTCMinutes() - 180)
                HtmlToAppend += `<tr>
                    <td>${element.secureShortURL}</td>
                    <td>${element.originalURL}</td>
                    <td>${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()} - ${created.getHours()}:${created.getMinutes()}:${created.getSeconds()}</td>
                    <td>${updated.getDate()}/${updated.getMonth() + 1}/${updated.getFullYear()}, às ${updated.getHours()}:${updated.getMinutes()}:${updated.getSeconds()}</td>
                    <td>          
                        <img id="iconeEdita_${index}" idstring="${element.idString}" shortlink="${element.secureShortURL}" urloriginal="${element.originalURL}" path="${element.path}" class="edicao iconeOpcoes" src="../ICONS/editar.png" alt="record_edit" >
                    </td>
                    <td>
                        <img id="iconeExclui_${index}" class="exclusao iconeOpcoes transparente" src="../ICONS/excluir.png" alt="record_delete">
                    </td>
                </tr>`
            });
            corpo.innerHTML = HtmlToAppend
            document.querySelectorAll('.edicao').forEach(e => {
                e.onclick = () => {
                    mostra(modalEdicao)
                    linkInfo.innerHTML = `Editando: <a>${e.getAttribute('shortlink')}</a>`
                    urlInput.value = e.getAttribute('urloriginal')
                    slugInput.value = e.getAttribute('path')
                    fechaEdicao.onclick = () => {
                        esconde(modalEdicao)
                    }

                    salvaEdicao.onclick = () => {
                        esconde(modalEdicao)
                        if (slugInput.value.length != 6) {
                            throw new Error('O ATALHO (SLUG) DEVE TER 6 CARACTERES!')
                        } else if (!validURL(urlInput.value)) {
                            throw new Error('A URL INSERIDA É INVÁLIDA!')
                        } else {
                            postEditShortLink(urlInput.value, slugInput.value, e.getAttribute('idString'))
                        }
                    }
                }
            })
        })
        .catch(err => {
            mostraOcultaMensagem('erro', `${err.message}`)
        });
}




