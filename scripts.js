const API_URL = 'https://apis.is/company?name=';

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('section');

  program.init(companies);
});
/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companies;

  function displayCompany(companyList) {
    if (companyList.length === 0) {
      displayError('Ekkert fyrirtæki fannst fyrir leitarstreng');
      return;
    }
    const container = companies.querySelector('.results')

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    companyList.forEach((obj) => {
      const companyElement = document.createElement('div');
      companyElement.classList.add('company');
      const listElement = document.createElement('dl');
      const nameT = document.createElement('dt');
      const nameD = document.createElement('dd');
      const snT = document.createElement('dt');
      const snD = document.createElement('dd');

      nameT.innerHTML = 'Nafn:';
      nameD.innerHTML = obj.name;
      snT.innerHTML = 'Kennitala:';
      snD.innerHTML = obj.sn;

      listElement.appendChild(nameT);
      listElement.appendChild(nameD);
      listElement.appendChild(snT);
      listElement.appendChild(snD);
      if (obj.active === 1) {
        companyElement.classList.add('company--active');
        const addressT = document.createElement('dt');
        addressT.innerHTML = 'Heimilisfang:';
        const addressD = document.createElement('dd');
        addressD.innerHTML = obj.address;
        listElement.appendChild(addressT);
        listElement.appendChild(addressD);
      } else {
        companyElement.classList.add('company--inactive');
      }
      companyElement.appendChild(listElement);
      container.appendChild(companyElement);
    });
  }
  function loadResults() {
    const container = companies.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const loadElement = document.createElement('div');
    loadElement.classList.add('loading');
    const loadImg = document.createElement('img');
    loadImg.src = 'loading.gif';
    const loadText = document.createElement('p');
    loadText.innerHTML = 'Leita að fyrirtækjum...';

    loadElement.appendChild(loadImg);
    loadElement.appendChild(loadText);

    container.appendChild(loadElement);
  }

  function displayError(error) {
    const container = companies.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }
  function fetchData(company) {
    fetch(`${API_URL}${company}`)
      .then((result) => {
        if (result.ok) {
          return result.json();
        }

        throw new Error('Villa kom upp!')
      })
      .then((data) => {
        console.log(data.results);
        displayCompany(data.results);
      })
      .catch((error) => {
        displayError('villa!!');
        console.error(error);
      })
  }
  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    fetchData(input.value);

  }
  function init(_companies) {
    companies = _companies;

    const form = companies.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();