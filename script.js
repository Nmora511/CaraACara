function toggleOpacity(id) {
    var imagem = document.getElementById(id);
    imagem.classList.toggle("opacity");
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
    }, 5000);
}

function borderChosen(id){
    var imagem = document.getElementById(id);
    imagem.classList.toggle('chosen');
}

function Help(id){
    var help = document.getElementById(id);
    help.classList.toggle('disappear');
}