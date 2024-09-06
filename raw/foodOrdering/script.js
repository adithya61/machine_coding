let restaurants = [];

function getData() {
  return fetch("./assets/data.json");
}

function getCard(restaurant) {
  return `
    <div class="restaurants">
          <img
            class="restaurants--image"
            src=${restaurant.img}
            alt="restaurant"
          />
          <div class="restaurant--name" >${restaurant.name} </div>
          <div class="meta">
            <span>ETA: ${restaurant.eta}</span><span>Rating: ${restaurant.rating}</span>
          </div>
        </div>
    `;
}

let getRestaurantsView = () => {
  getData()
    .then((data) => data.json())
    .then((r) => {
      restaurants = r["data"];
      generateView(restaurants);
    });
};

let generateView = (data) => {
  let restaurantsContainer = document.getElementById("restaurants--container");

  restaurantsContainer.innerHTML = "";

  data.forEach((restaurant) => {
    restaurantsContainer.innerHTML += getCard(restaurant);
  });
};

let sortRes = () => {
  let sortVal = document.getElementById("sort").value;

  console.log(restaurants, "res");

  restaurants = _.sortBy(restaurants, (r) => r[sortVal]);
  generateView(restaurants);
};

let searchRestaurants = () => {
  let term = document.getElementById("searchBar").value;

  if (term == "") getRestaurantsView();

  let searchedRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(term)
  );

  generateView(searchedRestaurants);
};

let filterRestaurants = () => {
  let filterBy = document.getElementById("filter").value;

  restaurants = restaurants.filter((restaurant) =>
    restaurant.cuisine.includes(filterBy)
  );

  generateView(restaurants);
};

function debounce(getData, delay) {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        getData();
      }, delay);
    };
  }

document.onload = getRestaurantsView();
