// Use constants for API endpoint and limit
const API_URL = "https://jsonplaceholder.typicode.com/comments";
const PAGE_LIMIT = 50;

let pageNumber = 1;

// Debounce function with default delay
const debounce = (getData, delay = 200) => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        getData();
      }, delay);
    }
  };
};

// Fetch and handle data using async/await
const getData = async () => {
  pageNumber++;
  console.log(`Fetching page: ${pageNumber}`);

  const url = `${API_URL}?_page=${pageNumber}&_limit=${PAGE_LIMIT}`;
  const response = await fetch(url);
  const data = await response.json();

  // Update content
  const container = document.getElementById("content");
  data.forEach((item) => {
    container.innerHTML += `${item.name}<br>`;
  });
};

// Load initial data on page load
document.onload = getData();

// Debounce data loading on scroll
window.addEventListener("scroll", handleScroll);

const debouncedFunction = debounce(getData);

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.body;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    debouncedFunction();
  }
}

// ? Another way of throttling.
// const throttle = (getData, delay) => {
//     return () => {
//       const currentTime = Date.now();
//       const timeSinceLastRequest = currentTime - lastRequestTime;
//       if (timeSinceLastRequest >= delay) {
//         lastRequestTime = currentTime;
//         getData();
//       }
//     };
//   };
