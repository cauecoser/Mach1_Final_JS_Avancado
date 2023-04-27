let inputUrl = document.querySelector('#inputUrl')
let botaoAncora = document.querySelector('#botaoAncora')
let botaoEncurtar = document.querySelector('#botaoEncurtar')
let divBotao = document.querySelector('#divBotao')
let divImgLoading = document.querySelector('#divImgLoading')
let pLink = document.querySelector('#pLink')
let opcoes = document.querySelector('#opcoes')

function mostra(e) {
    e.classList.remove('escondido')
}

function esconde(e) {
    e.classList.add('escondido')
}

function mostrarDivs() {
    esconde(botaoEncurtar)
    mostra(divImgLoading)
    inputUrl.setAttribute('placeholder', 'AGUARDE...')
    setTimeout(() => {
        inputUrl.setAttribute('placeholder', '')
        esconde(divImgLoading)
        divBotao.classList.add('divLink')
        mostra(pLink)
        mostra(opcoes)
    }, 2000);
}

function ocultarDivs() {
    mostra(botaoEncurtar)
    esconde(divImgLoading)
    divBotao.classList.remove('divLink')
    esconde(pLink)
    esconde(opcoes)
}

botaoEncurtar.addEventListener('click', mostrarDivs)
botaoAncora.addEventListener('click', () => {
    ocultarDivs()
    mostrarDivs()
})

