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

function uploadImages() {
    for (var i = 1; i <= 18; i++) {
        var inputId = 'fileInput' + i;
        var imageId = 'user' + i;
        var input = document.getElementById(inputId);

        if (input.files && input.files[0]) {
            updateImage(imageId, input);
        }
    }
}

function triggerFileInput(inputId) {
    var input = document.getElementById(inputId);
    input.click();
}