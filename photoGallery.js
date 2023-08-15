const galleryEl = document.getElementById('gallery');
const errorMessageEl = document.getElementById('errorMessage');
const inputValue = document.getElementById('input').value;
const buttonEl = document.getElementById('button');


const fetchImages = async () => {
    if (inputValue > 10 || inputValue < 1) {
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerHTML = 'Please enter a number between 1 and 10 inclusively';
        return;
    }
    imgs = "";
    try {
        buttonEl.style.display = 'none';
        const loading = `<img src="loader.svg">`
        galleryEl.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=s8veRZJyCk-8LpvMQpbTPnMG_20JmK1C0F8a5MSAUtg`).then((respnse)=>respnse.json())
    .then((data)=>{
        if (data) {
            data.forEach((image)=>{
                imgs += `<img src=${image.urls.small} alt="image">`
                galleryEl.style.display = 'block';
                galleryEl.innerHTML = imgs;
                buttonEl.style.display = 'block';
                errorMessageEl.style.display = 'none';
            })
        }
    })
    } catch (error) {
        buttonEl.style.display = 'none';
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerText = 'An error occured, please try again later'
        buttonEl.style.display = 'block';
        galleryEl.style.display = 'none';
    }
}
buttonEl.addEventListener('click', fetchImages);