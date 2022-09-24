var items = [];
var globalId = 0;
var tableBody = document.getElementById("tableBody");
var itemInput = document.getElementById("inputVal");
var ascSortButton = document.getElementById("asc");
var descSortButton = document.getElementById("desc");
var inputButton = document.getElementById("addItem");

// trigger on ENTER

inputButton.addEventListener("click", addItemToTable);
itemInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    inputButton.click();
  }
});

// ADD ITEMS TO TABLE

function addItemToTable() {
  let itemFromForm = itemInput.value;
  //validare
  if (!(itemFromForm === "")) {
    let newItem = {
      id: globalId++,
      itemName: itemFromForm,
      bought: false,
    };

    items.push(newItem);
  }

  renderTable();
  resetForm();
}

function resetForm() {
  itemInput.value = "";
}

function renderTable() {
  tableBody.innerText = "";
  for (let i = 0; i < items.length; i++) {
    addLine(items[i]);
  }
}

function addLine(item) {
  var itemCell = document.createElement("td");
  itemCell.innerText = item.itemName;
  itemCell.setAttribute("id", "item-" + item.id);
  if (item.bought) {
    itemCell.classList.add("linethrough");
  }

  var modifyCell = document.createElement("td");
  modifyCell.innerHTML =
    "<button onClick='linethroughEntry(" +
    item.id +
    ")' >Mark as buyed</button>";

  var row = document.createElement("tr");
  row.appendChild(itemCell);
  row.appendChild(modifyCell);

  tableBody.appendChild(row);
}

function linethroughEntry(entryId) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === entryId) {
      items[i].bought = true;
      break;
    }
  }
  renderTable();
}

//SORTING TABLE

// function sortItems(input1, input2, key) {
//     const a = input1[key];
//     const b = input2[key];

//     if (a < b) {
//         return -1;
//     }
//     if (a > b) {
//         return 1;
//     }
//     return 0;
// }

function sortItems(input1, input2, key) {
  const a = input1[key].toLowerCase();
  const b = input2[key].toLowerCase();

  return a > b ? 1 : -1;
}

//ASCENDING

ascSortButton.addEventListener("click", function (event) {
  items.sort((item1, item2) => {
    return sortItems(item1, item2, "itemName");
  });
  renderTable();
});

//DESCENDING

descSortButton.addEventListener("click", function (event) {
  items.sort((item1, item2) => {
    return sortItems(item1, item2, "itemName");
  });
  items.reverse();
  renderTable();
});
