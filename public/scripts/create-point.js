function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

  fetch(url)
    .then(res => res.json())
    .then(states => {

      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    });
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;


  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false;
    });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)



const itemsTocollect = document.querySelectorAll(".items-grid li");

for (const item of itemsTocollect) {
  item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]");

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const indexOfItem = selectedItems.findIndex(item => item == itemId);

  if (indexOfItem == -1) {
    selectedItems.push(itemId)
  }
  else {
    selectedItems.splice(indexOfItem, 1)
  }

  collectedItems.value = selectedItems;



}