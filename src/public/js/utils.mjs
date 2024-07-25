const apiKey = ''; 
const jsonBaseUrl = '../json/';

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export async function makeRequest(endpoint) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2EzOTUyNTU1OWU0YjFiNzQzN2RmN2M3MTc3ZmRlNCIsIm5iZiI6MTcyMTE3ODA2Ni4xODQzMTcsInN1YiI6IjY2ODliNDlmYTE5ZmM3MjFkNjBjNmYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wwbD5htaEkniY70YRyVntpI_IDDTz4mQlh22oYBpFO4`
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`, options);
    const data = await convertToJson(response);
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
}

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}


export function searchMovies(query) {

  makeRequest(`search/movie?query=${query}&include_adult=false`, (response) => {
    return response.results;
  });
}	

export function getPopularMovies() {
  makeRequest('movie/popular', (response) => {
    return response.results;
  });
}

export function getNowPlaying() {
  makeRequest('movie/now_playing', (response) => {
    return response.results;
  });
}


export function getRandomQuote() {
  fetch('../json/movie-quotes.json')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      document.getElementById('quote').innerText = randomQuote;
    })
    .catch(err => console.error(err));
}

export function readJSONFile(file) {
  fetch(jsonBaseUrl + file)
    // if it works return data
    .then(response => response.json())
    .then(data => {
      console
      return data;
    })
    // if it fails log the error
    .catch(err => console.error(err));

}