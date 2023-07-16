const url = 'https://api.thecatapi.com/v1/breeds';
const url2 = 'https://api.thecatapi.com/v1/images/search';
const api_key =
  'live_ATkDsnwAvU937nPda3qiR2ikVv7ea9Bi3sQ0ez5BCTcp5A1d1bJkzyvl3CMZEOEb';

function sleeper(ms) {
  return function (x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

function fetchBreeds() {
  return fetch(`${url}?api_key=${api_key}`).then(response => {
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${url2}?breed_ids=${breedId}`).then(response => {
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };

let storedBreeds = [];

let breedSelect = document.getElementById('breed-select')
let loader = document.getElementById('loader')
let error = document.getElementById('error')
let catInfoBlock = document.getElementById('cat-info')

breedSelect.addEventListener('change', showBreedImage);

breedSelect.style.display = "none"
loader.style.display = "block"
catInfoBlock.style.display = 'none'


fetchBreeds()
  .then(sleeper(2000))
  .then(data => {
    //filter to only include those with an `image` object
    data = data.filter(img => img.image?.url != null);

    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      //skip any breeds that don't have an image
      if (!breed.image) continue;

      //use the current array index
      option.value = i;
      option.innerHTML = `${breed.name}`;
      document.getElementById('breed-select').appendChild(option);
    }
    breedSelect.style.display = "inline-block"
    loader.style.display = "none"

    showBreedImage()
  })
  .catch(showError);

function showBreedImage() {
  loader.style.display = "block"
  catInfoBlock.style.display = 'none'
  let index = breedSelect.selectedIndex;
  let breedId = storedBreeds[index].id;
  fetchCatByBreed(breedId)
    .then(sleeper(2000))
    .then(data => {
      let item = data[0]
      document.getElementById('breed_image').src = item.url;

      let catItem = storedBreeds[index]
      document.getElementById('bread_name').textContent = catItem.name;
      document.getElementById('bread_description').textContent = catItem.description;
      document.getElementById('bread_temperament').textContent = catItem.temperament;
      loader.style.display = "none"
      catInfoBlock.style.display = 'block'
    })
    .catch(showError);
}

function showError() {
  error.style.display = "block"
  loader.style.display = "none"
  catInfoBlock.style.display = "none"
}