const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  beers = JSON.parse(jsonString);
  populateList(beers);
}

const populateList = function(beers) {
  const select = document.getElementById('beer-select')
  beers.forEach(function(beer, index) {
    let li = document.createElement('li');
    let pTag = document.createElement('p');
    pTag.innerText = beer.name;
    let img = document.createElement('img');
    img.src = beer.image_url;
    li.appendChild(pTag);
    li.appendChild(img);
    select.appendChild(li);
  })
};

const saveBeer = function(beer){
  const jsonString = JSON.stringify(beer);
  localStorage.setItem('currentBeer', jsonString);
}

const app = function(){
  const url = 'https://api.punkapi.com/v2/beers'
  makeRequest(url, requestComplete);
};


window.addEventListener('load', app);
