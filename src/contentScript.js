'use strict';
import * as XLSX from 'xlsx/xlsx.mjs';

const tables = document.body.querySelectorAll('.mytable');

if (tables) {
  tables.forEach((table) => {
    const search = table.parentNode.querySelector('.range');
    const fileTitle = getTableTitle(search);
    const download = createDownloadBtn();
    search.append(download);

    // Ensure that at least two tr elements exist.
    // Otherwise, an error will occur in the first row of the table
    const thead = table.querySelector('thead');
    if (thead.children.length <= 1)
      thead.appendChild(document.createElement('tr'));

    download.addEventListener('click', function () {
      let table_elt = table.querySelector('table');
      table_elt && downloadHTMLTableAsXLSX(table_elt, fileTitle);
    });
  });
}

function createDownloadBtn() {
  const download = document.createElement('div');
  download.setAttribute('id', 'download-table');
  download.setAttribute('class', 'search-btn');
  download.style.marginLeft = '10px';

  const button = document.createElement('button');
  button.setAttribute('id', 'download-btn');
  button.setAttribute('class', 'jzlyClass');
  button.setAttribute('type', 'button');
  button.innerText = '下载';
  download.appendChild(button);

  return download;
}

function getTableTitle(el) {
  const titleEl = el.closest('.in-content').querySelector('.inContent-title');
  return titleEl ? titleEl.innerText : 'Table';
}

function downloadHTMLTableAsXLSX(table_elt, title) {
  let workbook = XLSX.utils.table_to_book(table_elt);
  console.log(`workbook:`, workbook);
  var ws = workbook.Sheets['Sheet1'];
  console.log(`ws:`, ws);
  XLSX.utils.sheet_add_aoa(ws, [['Created ' + new Date().toISOString()]], {
    origin: -1,
  });
  XLSX.writeFile(workbook, `${title}.xlsx`);
}
