import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('select.breed-select');
const catInfoDiv = document.querySelector('div.cat-info');
const loaderP = document.querySelector('p.loader');
const errorP = document.querySelector('p.error');

function showLoader() {
  loaderP.style.display = 'block';
}

function hideLoader() {
  loaderP.style.display = 'none';
}

function showError() {
  errorP.style.display = 'block';
}

function hideError() {
  errorP.style.display = 'none';
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function showCatInfo(cat) {
  const { name, description, temperament, url } = cat[0].breeds[0];
  const image = document.createElement('img');
  image.src = url;

  const nameP = document.createElement('p');
  nameP.textContent = `Name: ${name}`;

  const descriptionP = document.createElement('p');
  descriptionP.textContent = `Description: ${description}`;

  const temperamentP = document.createElement('p');
  temperamentP.textContent = `Temperament: ${temperament}`;

  catInfoDiv.innerHTML = '';
  catInfoDiv.appendChild(image);
  catInfoDiv.appendChild(nameP);
  catInfoDiv.appendChild(descriptionP);
  catInfoDiv.appendChild(temperamentP);
  catInfoDiv.style.display = 'block';
}

function hideCatInfo() {
  catInfoDiv.style.display = 'none';
}

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  hideError();
  hideCatInfo();
  showLoader();

  fetchCatByBreed(breedId)
    .then(cat => {
      hideLoader();
      showCatInfo(cat);
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
    });
});

showLoader();
fetchBreeds()
  .then(breeds => {
    hideLoader();
    populateBreedSelect(breeds);
    breedSelect.style.display = 'block';
  })
  .catch(error => {
    hideLoader();
    showError();
    console.error(error);
  });
