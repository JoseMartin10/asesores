async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    return result.url;
}

document.querySelector('button').addEventListener('click', async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (file) {
            const imageUrl = await uploadImage(file);
            displayImage(imageUrl);
        }
    };

    fileInput.click();
});

function displayImage(url) {
    const img = document.createElement('img');
    img.src = url;
    document.getElementById('imageContainer').appendChild(img);
}
