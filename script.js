function toggleOpacity(id) {
    const imagem = document.getElementById(id);
    imagem.classList.toggle('opacity');
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

function triggerFileInput(inputId) {
    var input = document.getElementById(inputId);
    input.click();
} 

function showContextMenu(event) {
    event.preventDefault();
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';

    window.addEventListener('click', function hideContextMenu() {
        contextMenu.style.display = 'none';
        window.removeEventListener('click', hideContextMenu);
    });
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
        if(imagem.classList.contains('chosen')){
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
            if(imagem.classList.contains('opacity')){
            toggleOpacity(id);
            }    
        });
    }, 2000);
}

function borderChosen(id){
    var imagem = document.getElementById(id);
    imagem.classList.toggle('chosen');
}

function Help(id){
    var help = document.getElementById(id);
    help.classList.toggle('disappear');
}

function createInputs(){
    const div = document.getElementById('input');
    for(let i = 1; i <= 18; i++){
        const input = document.createElement('input');
        input.type = 'file';
        input.id = 'fileInput' + i;
        input.accept = 'image/*';
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

        const img = document.createElement('img');
        img.id = `user${i}`;
        img.src = 'user.jpg';
        card.onclick = () => card.classList.toggle('verso');
        img.oncontextmenu = (event) => {
            event.preventDefault();
            triggerFileInput(`fileInput${i}`);
            return false;
        };

        const icon = document.createElement('img');
        icon.src = 'icon.png';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        front.appendChild(icon);
        back.appendChild(img);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createInputs();
    createImagesInGrid();
});