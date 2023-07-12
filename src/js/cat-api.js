import axios from 'axios';

const apiKey =
  'live_ATkDsnwAvU937nPda3qiR2ikVv7ea9Bi3sQ0ez5BCTcp5A1d1bJkzyvl3CMZEOEb';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  const loader = document.querySelector('.loader');
  const breedSelect = document.querySelector('.breed-select');

  loader.style.display = 'block';
  breedSelect.style.display = 'none';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      loader.style.display = 'none';
      breedSelect.style.display = 'block';
      return response.data;
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error(error);
      throw new Error('Не удалось получить список пород');
    });
}

export function fetchCatByBreed(breedId) {
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'block';
  catInfo.innerHTML = '';

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => {
      loader.style.display = 'none';
      const catData = response.data[0];
      showCatInfo(catData);
      return catData;
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error(error);
      throw new Error('Не удалось получить информацию о коте по породе');
    });
}

function showCatInfo(catData) {
  const catInfo = document.querySelector('.cat-info');

  const catImage = document.createElement('img');
  catImage.src = catData.url;
  catInfo.appendChild(catImage);

  const breedName = document.createElement('p');
  breedName.textContent = 'Название породы: ' + catData.breeds[0].name;
  catInfo.appendChild(breedName);

  const description = document.createElement('p');
  description.textContent = 'Описание: ' + catData.breeds[0].description;
  catInfo.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = 'Темперамент: ' + catData.breeds[0].temperament;
  catInfo.appendChild(temperament);
}
