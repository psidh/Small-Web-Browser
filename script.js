const addressBar = document.getElementById('addressBar');
const goButton = document.getElementById('goButton');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const refreshButton = document.getElementById('refreshButton');
const browserViewport = document.getElementById('browserViewport');

goButton.addEventListener('click', navigate);
addressBar.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    navigate();
  }
});
backButton.addEventListener('click', goBack);
forwardButton.addEventListener('click', goForward);
refreshButton.addEventListener('click', refresh);

function navigate() {
  const url = addressBar.value.trim();

  if (!url) {
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.text();
    })
    .then((html) => {
      browserViewport.innerHTML = html;

      return fetchCss(url);
    })
    .then((css) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    })
    .catch((error) => {
      console.error('Error fetching URL:', error);
      browserViewport.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function fetchCss(url) {
  const baseUrl = new URL(url);

  const cssUrl = new URL(url.replace(/\.html?$/, '.css'), baseUrl);

  return fetch(cssUrl).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.text();
  });
}

function goBack() {
  window.history.back();
  console.log(window.history.back());
}

function goForward() {
  window.history.forward();
}

function refresh() {
  window.location.reload();
}
