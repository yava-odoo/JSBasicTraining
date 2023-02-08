const dropList = document.querySelectorAll("form select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const amount = document.querySelector("form input");
const exchange_rate_txt = document.querySelector("form .exchange-rate");
const get_data = async () => {
  const q = await fetch(
    `https://v6.exchangerate-api.com/v6/017737e14600c97ed188d9c3/latest/${fromCurrency.value}`
  )
    .then((response) => {
      fromCurrency.removeChild(fromCurrency.firstElementChild);
      return response.json();
    })
    .then((data) => {
      let entries = Object.entries(data.conversion_rates);
      entries.map(([key, val]) => {
        fromCurrency.innerHTML += `<option value="${key}">${key}</option>`;
        toCurrency.innerHTML += `<option value="${val}">${key}</option>`;
      });
    });
};

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const getExchangeRate = async () => {
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/017737e14600c97ed188d9c3/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.options[toCurrency.selectedIndex].text];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchange_rate_txt.innerText = `${amountVal} ${
        fromCurrency.options[fromCurrency.selectedIndex].text
      } = ${totalExRate} ${toCurrency.options[toCurrency.selectedIndex].text}`;
    });
};
