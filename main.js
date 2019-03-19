const modal = document.querySelector('#modalWindow'),
      renameModal = document.querySelector('#reModalWindow'),
      btnCloseWindow = document.querySelector('.close'),
      btnModalCancel = document.querySelector('#modal-cancel'),
      btnModalOk = document.querySelector('#modal-ok'),
      btnCloseRenWind = document.querySelector('.btn-close-rename-wind'),
      btnCancelRenWind = document.querySelector('#btnRename-cancel'),
      btnRenameModalOk = document.querySelector('#btnRename-ok'),
      btnAddFolder = document.querySelector('#btn-add-folder'),
      btnAddFile = document.querySelector('#btn-add-file'),
      btnEdit = document.querySelector('#btn-edit'),
      btnDelete = document.querySelector('#btn-delete'),
      btnSearch = document.querySelector('#btn-search'),
      inputSearch = document.querySelector('#inp-search'),
      inputDate = document.querySelector('#selected-date'),
      showOlnyDir = document.querySelector('#show-directories'),
      btnFilterDate = document.querySelector('#btn-filter-date'),
      textNameItem = document.querySelector('#text-name'),
      showHideDir = document.querySelector('#show-hide-dir'),
      listDir = document.querySelector('.list-directories'),
      /* Icons */
      stateOpen = "img/state-dir/state-open.png",
      stateClose = "img/state-dir/state-close.png";
      /* Table with foolders and files */
      table = document.querySelector('#table-with-data'),
      tbody = table.getElementsByTagName('tbody')[0];

const rootDirectory = {
  0: {
    name: "test1",
    date: "2002-12-07",
    type: "folder",
    size: "O Kb",
    /*   11:{
        name: "test->1",
        date: "07.12.2019",
        type: "folder",
        size: "0 Kb",
        21:{
          name: "test->1",
          date: "07.12.2019",
          type: "folder",
          size: "0 Kb",
          31:{
            name: "31",
            date: "1996.09.20",
            type: "folder",
            size: "0 Kb",
          }
        }
      } */
  },
  1: {
    name: "test2",
    date: "2015-06-03",
    type: "folder",
    size: "O Kb"
  },
  2: {
    name: "test3",
    date: "2010-06-03",
    type: "folder",
    size: "O Kb"
  },
  3: {
    name: "file_1",
    date: "2001-08-25",
    type: "file",
    size: "O Kb"
  },
  4: {
    name: "file_2",
    date: "1996-07-25",
    type: "file",
    size: "O Kb"
  },
  5: {
    name: "file_3",
    date: "1992-07-12",
    type: "file",
    size: "O Kb"
  }
}

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == renameModal) {
    return renameModal.style.display = "none";
  }
});

const toggelWindow = () => {
  modal.style.display = (modal.style.display == 'none' ? 'block' : 'none');
}

const renderDirInRoot = () => {
  listDir.innerHTML = " ";

  Object.keys(rootDirectory).forEach((key) => {
    const dir = rootDirectory[key];
    const tagLi = document.createElement('li'),
          tagSpan = document.createElement('span'),
          tagA = document.createElement('a'),
          tagImgSpan = document.createElement('img'),
          tagImgA = document.createElement('img');

    const icon = (dir.type === "folder") ? "img/folder.png" : "img/file.png";

    if (dir.type === "folder") {
      tagImgSpan.setAttribute("src", stateClose);
      tagSpan.append(tagImgSpan);
    }
    tagA.innerText = `${dir.name}`;
    tagImgA.setAttribute("src", icon);
    tagA.prepend(tagImgA)
    tagLi.append(tagSpan, tagA);
    listDir.append(tagLi);
  });
  renderDirInTable();
}

showHideDir.addEventListener("dblclick", function () {
  let state = showHideDir.previousElementSibling.firstElementChild;
  const newState = (state.getAttribute("src") == stateClose ? stateOpen : stateClose);
  state.setAttribute("src", `${newState}`);
  listDir.classList.toggle('show-list-directories');
  renderDirInRoot();
  renderDirInTable();
});

btnModalOk.addEventListener("click", () => {
  const nameItem = document.querySelector('.name-item').value,
    typeItem = document.querySelector('.type-item').value,
    now = new Date(),
    date = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${now.getDate()}`;

  let nextKey = 0;

  for (let key in rootDirectory) {
    nextKey = Number(key) + 1;
  }

  rootDirectory[nextKey] = {
    name: nameItem,
    date: date,
    type: typeItem,
    size: "O Kb"
  }
  toggelWindow();
  renderDirInRoot();

});

/* Render items in table*/
const renderDirInTable = () => {
  tbody.innerHTML = ' ';

  Object.keys(rootDirectory).forEach((key) => {
    const item = rootDirectory[key];
    const trTag = document.createElement('tr'),
          inputTag = document.createElement('input'),
          tdCheckbox = document.createElement('td'),
          imgTag = document.createElement('img'),
          icon = (item.type === "folder") ? "img/folder.png" : "img/file.png";
          
    inputTag.setAttribute("type", "checkbox");
    tdCheckbox.append(inputTag);
    imgTag.setAttribute("src", icon);

    for (let val in item) {
      let tdTag = document.createElement('td');
      tdTag.innerHTML = item[val];
      if (val === "name") {
        tdTag.prepend(imgTag);
      }
      trTag.id = key;
      trTag.prepend(tdCheckbox);
      trTag.append(tdTag);
      tbody.append(trTag);
    }
  });
  selectItem();
}

/* Filter for show folder only*/
const showFoldersOnly = () => {
  let trTable = table.getElementsByTagName('tr');
  [].forEach.call(trTable, (tr) => {
    let allTypeFolders = tr.getElementsByTagName('td')[3],
      checkType = allTypeFolders.innerText;

    if (checkType !== "folder") {
      tr.classList.toggle('tr-reflection');
    }
  });
}

const changeHandler = () => {
  if (showOlnyDir.checked) {
    showFoldersOnly();
  } else {
    showFoldersOnly();
  }
}

showOlnyDir.addEventListener("change", changeHandler);


const filterDate = () => {
  let getDatefromInp = inputDate.value,
      trTable = table.getElementsByTagName('tr');

  if (getDatefromInp !== "") {
    getDatefromInp = Date.parse(getDatefromInp);
    for (let i = 0; i < trTable.length; i++) {
      let tdTable = trTable[i].getElementsByTagName('td')[2],
          getDatefromTd = tdTable.innerText;
      getDatefromTd = Date.parse(getDatefromTd);
      if (getDatefromInp >= getDatefromTd) {
        trTable[i].style.display = '';
      } else {
        trTable[i].style.display = 'none';
      }
    }
  } else {
    alert("Enter the date!");
  }
}

btnFilterDate.addEventListener("click", () => filterDate());

const getSearchItems = () => {
  const filter = inputSearch.value.toUpperCase(),
        trTable = table.getElementsByTagName('tr');
  for (let i = 0; i < trTable.length; i++) {
    let tdInTable = trTable[i].getElementsByTagName('td')[1];
    if (tdInTable) {
      if (tdInTable.innerHTML.toUpperCase().indexOf(filter) > -1) {
        trTable[i].style.display = '';
      } else {
        trTable[i].style.display = 'none';
      }
    }
  }
}

btnSearch.addEventListener("click", () => getSearchItems());

/* Select row (select a folder or file) */
let indexItems, elForRename;

const selectItem = () => {
  function rowClick() {
    const checkbox = this.querySelector("input[type='checkbox']");

    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      const bgColor = this.classList;
      checkbox.checked == true ? bgColor.add("bg-selected-tr") : bgColor.remove("bg-selected-tr");
    }
    return rowClick;
  }

  let arrOfValues = [];

  const trInTable = table.getElementsByTagName('tr');
  [].forEach.call(trInTable, (tr) => {
    tr.addEventListener("click", function () {
      let idTr = Number(tr.id);
      /* Create new function */
      if ((arrOfValues.indexOf(idTr) === -1)) {
        arrOfValues.push(idTr);
      } else if ((arrOfValues.indexOf(idTr) !== -1 || arrOfValues.indexOf(idTr) >= 0)) {
        arrOfValues = arrOfValues.filter(function (item) {
          return item !== idTr;
        })
      }
      elForRename = renameFolderFile.bind(null, idTr);
      indexItems = deleteFolderFile.bind(null, arrOfValues);
      let click = rowClick.bind(this);
      click();
    });
  });
};

const showRenameModal = () => {
  renameModal.style.display = (renameModal.style.display == 'none' ? 'block' : 'none');
}

/* Combine with deleteFolderFile */
const renameFolderFile = (idTr) => {
  let rename = document.querySelector('.rename-item').value;

  for (let i = 0; i < table.rows.length; i++) {
    let firstTd = table.rows[i].getElementsByTagName('td')[0],
        inpCheckBox = firstTd.querySelector('input');
    if (inpCheckBox.type == "checkbox" && inpCheckBox.checked == true) {
      Object.keys(rootDirectory).forEach((key) => {
        if (Number(key) == idTr) {
          const item = rootDirectory[key];

          rootDirectory[key] = {
            name: rename,
            date: item.date,
            type: item.type,
            size: item.size
          }
        }
      });
    }
  }
  document.querySelector('.rename-item').value = ' ';
  renderDirInRoot();
};

btnEdit.addEventListener("click", () => {
  if (elForRename !== undefined) {
    showRenameModal();
  } else {
    alert(`You don't to choose item.`);
  }
});

btnRenameModalOk.addEventListener("click", () => {
  elForRename();
  showRenameModal();
});

/* Combine with deleteFolderFile */
const deleteFolderFile = (arrOfValues) => {
  for (let i = 0; i < table.rows.length; i++) {
    let firstTd = table.rows[i].getElementsByTagName('td')[0],
        inpCheckBox = firstTd.querySelector('input');
    if (inpCheckBox.type == "checkbox" && inpCheckBox.checked == true) {
      Object.keys(rootDirectory).forEach((key) => {
        arrOfValues.forEach(keyItem => {
          if (Number(key) == keyItem) {
            delete rootDirectory[key];
          }
        })
      });
      table.deleteRow(i);
      i--;
      renderDirInRoot();
    }
  }
};

btnDelete.addEventListener("click", () => {
  if (indexItems !== undefined) {
    return indexItems();
  } else {
    alert(`You don't to choose item.`);
  }
});

btnAddFolder.addEventListener("click", () => {
  document.querySelector('.name-item').value = "New Folder";
  document.querySelector('.type-item').value = "folder";
  textNameItem.innerText = "Folder";
  toggelWindow();
});

btnAddFile.addEventListener("click", () => {
  document.querySelector('.name-item').value = "New File";
  document.querySelector('.type-item').value = "file";
  textNameItem.innerText = "File";
  toggelWindow();
});

btnCloseWindow.addEventListener("click", () => {
  toggelWindow()
});
btnModalCancel.addEventListener("click", () => {
  toggelWindow()
});
btnCloseRenWind.addEventListener("click", () => {
  showRenameModal()
});
btnCancelRenWind.addEventListener("click", () => {
  showRenameModal()
});