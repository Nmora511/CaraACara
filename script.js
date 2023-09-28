document.addEventListener('DOMContentLoaded', function() {
    createInputs();
    createImagesInGrid();
});

function createInputs(){
    const div = document.getElementById('input');
    for(let i = 1; i <= 18; i++){
        const input = document.createElement('input');
        input.type = 'file';
        input.id = 'fileInput' + i;
        input.accept = 'image/*';
        input.classList.add('input');
        input.onchange = function () {
            updateImage(`user${i}`, this);
        };
        div.appendChild(input);
    }
}

function createImagesInGrid() {
    const grid = document.querySelector('.grid');
    
    for (let i = 1; i <= 18; i++) {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        const name = document.createElement('p');
        name.classList.add('names');
        name.id = `nome${i}`;

        const img = document.createElement('img');
        img.id = `user${i}`;
        img.src = 'user.jpg';
        card.onclick = () => {
            card.classList.toggle('verso');
            name.classList.toggle('versop');
        };
        img.oncontextmenu = (event) => {
            event.preventDefault();
            triggerFileInput(`fileInput${i}`);
            updateNomes(`nome${i}`);
            return false;
        };

        const icon = document.createElement('img');
        icon.src = 'icon.png';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        front.appendChild(icon);
        back.appendChild(img);
        back.appendChild(name);
    }
}

function sortearImagem() {
    const idsImagens = [
        'user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8',
        'user9', 'user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'user17', 'user18'
    ];

    const indiceSorteado = Math.floor(Math.random() * idsImagens.length);
    const idImagemSorteada = idsImagens[indiceSorteado];

    idsImagens.forEach(id => {
        const imagem = document.getElementById(id);
        if(imagem.parentElement.classList.contains('chosen')){
            borderChosen(id);
        }
        if (id != idImagemSorteada) {
            toggleOpacity(id);
        }
        else{
            borderChosen(id);
        }
    });

    setTimeout(function () {
        idsImagens.forEach(id => {
            const imagem = document.getElementById(id);
            if(imagem.parentElement.classList.contains('opacity')){
            toggleOpacity(id);
            }    
        });
    }, 2000);
}

function toggleOpacity(id) {
    const imagem = document.getElementById(id);
    imagem.parentElement.classList.toggle('opacity');
}   

function borderChosen(id){
    var imagem = document.getElementById(id);
    imagem.parentElement.classList.toggle('chosen');
}
function txtToString(name){
    let txt = '';
    let locale = "/decks/" + name + ".txt";
    fetch(locale)
        .then(response => response.text())
        .then(text => pasteTxt(text))
}

function pasteTxt(text){
    const array = text.split('|');

    let j=0;
    for(let i=1; i<=18; i++){
        let img = document.getElementById(`user${i}`);
        let name = document.getElementById(`nome${i}`);

        img.src = array[j];
        name.textContent = array[j+1];
        j+=2;
    }
}

function resetImgs(){
    for(let i=1; i<=18; i++){
        let img = document.getElementById(`user${i}`);
        let name = document.getElementById(`nome${i}`);

        img.src = 'user.jpg';
        name.textContent = null;
    }
}

function criarTexto() {
    let text = document.getElementById('textcopy');
    let code = '';

    for(let i=1; i<=18; i++){
        let img = document.getElementById(`user${i}`);
        let name = document.getElementById(`nome${i}`);

        code += img.src + '|' + name.textContent + '|';
    }
    text.textContent = code;
    toggleNone('meuModal');
}

function toggleNone(id){
    document.getElementById(id).classList.toggle('modal-none');
}

function copiarTexto() {
    let textoCopiado = document.getElementById("textcopy");
    textoCopiado.select();
    document.execCommand("copy");
}

function pasteCode(){
    let text = document.getElementById('codeinput').value;
    const array = text.split('|');

    let j=0;
    for(let i=1; i<=18; i++){
        let img = document.getElementById(`user${i}`);
        let name = document.getElementById(`nome${i}`);

        img.src = array[j];
        name.textContent = array[j+1];
        j+=2;
    }
}

function triggerFileInput(inputImg) {
    var input = document.getElementById(inputImg);
    input.click();
}

function updateImage(imageId, input) {
    var image = document.getElementById(imageId);

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function updateNomes(textId) {
    const limite = 13;
    const input = prompt('Digite o nome:');
    const nome = document.getElementById(textId);

    if(input.length > limite) {
        alert('Nome maior que o limite de caracteres (13 caracteres)');
        updateNomes(textId);
    }
    else {
        nome.textContent = input;
    }
}