const listElement = document.querySelector('.list');
const templateElement = document.getElementById('repoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
const requiredFields = ['name', 'description', 'html_url', 'created_at', 'updated_at'];

function getRepoElement(repo) {
  const newElement = templateContainer.querySelector('.repo').cloneNode(true);

  requiredFields.forEach(field => {
    const fieldValue = repo[field];
    const newFieldElement = newElement.querySelector('.repo__' + field);

    newFieldElement.textContent = fieldValue;
    newElement.dataset[field] = fieldValue;
  });

  return newElement;
}

function renderList(repos = []) {
  const fragment = document.createDocumentFragment();

  repos.forEach(repo => {
    fragment.appendChild(getRepoElement(repo));
  });

  listElement.appendChild(fragment);
}

function makeGetRequest(url, successCallback, errorCallback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      const error = new Error('Ошибка ' + xhr.status);

      error.code = xhr.statusText;
      errorCallback(error);
    } else {
      successCallback(xhr.responseText);
    }
  };
  xhr.send();
}

function onScrollHandler() {
  let lastLoadedPage = 1;
  const urlWithoutPage = 'https://api.github.com/orgs/facebook/repos?page=';

  function onScrollHandlerWrapper() {
    lastLoadedPage += 1;

    makeGetRequest(urlWithoutPage + lastLoadedPage, request => {
      let data;

      try {
        data = JSON.parse(request);
      } catch (err) {
        console.error(new Error('Ошибка при чтении из json'));
      }
      if (data) {
        renderList(data);
      }
    }, error => {
      console.error(error);
    });
  }

  onScrollHandlerWrapper();
}

makeGetRequest('https://api.github.com/orgs/facebook/repos?page=1', request => {
  let data;

  try {
    data = JSON.parse(request);
  } catch (err) {
    console.error(new Error('Ошибка при чтении из json'));
  }
  if (data) {
    renderList(data);
  }
}, error => {
  console.error(error);
});

window.addEventListener('scroll', onScrollHandler);
