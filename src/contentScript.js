'use strict';
import * as XLSX from 'xlsx/xlsx.mjs';
import axios from 'axios';

const tables = document.body.querySelectorAll('table');
if (tables) {
  tables.forEach((table) => {
    const t = table;
    t.style.width = '100%';
    t.style.position = 'relative';

    const search = table.parentNode.querySelector('.range');
    const fileTitle = search ? getTableTitle(search) : 'Table';
    const download = createDownloadBtn();
    t.append(download);

    // Ensure that at least two tr elements exist.
    // Otherwise, an error will occur in the first row of the table
    const thead = table.querySelector('thead');
    if (thead && thead.children.length <= 1)
      thead.appendChild(document.createElement('tr'));

    download.addEventListener('click', function () {
      table && downloadHTMLTableAsXLSX(table, fileTitle);
    });

    t.addEventListener('mouseenter', function () {
      download.style.display = 'flex';
    });
    t.addEventListener('mouseleave', function () {
      download.style.display = 'none';
    });
  });
}

function createDownloadBtn() {
  const download = document.createElement('div');
  download.setAttribute('id', 'download-table');
  download.setAttribute('class', 'search-btn');
  download.style.display = 'none';
  download.style.position = 'absolute';
  download.style.right = '10px';
  download.style.top = '10px';
  download.style.justifyContent = 'center';
  download.style.alignItems = 'center';
  download.style.padding = '2px';
  download.style.width = '38px';
  download.style.height = '38px';
  download.style.cursor = 'pointer';
  download.style.backgroundColor = '#fff';
  download.style.border = '1px solid #ccc';
  download.style.borderRadius = '50%';

  const image = document.createElement('img');
  image.setAttribute('id', 'download-btn');
  image.src = chrome.runtime.getURL('icons/icon_32.png');
  download.appendChild(image);

  return download;
}

function getTableTitle(el) {
  const titleEl = el.closest('.in-content').querySelector('.inContent-title');
  return titleEl ? titleEl.innerText : 'Table';
}

async function downloadHTMLTableAsXLSX(table_elt, title) {
  let workbook = XLSX.utils.table_to_book(table_elt, { raw: true });
  let ws = workbook.Sheets['Sheet1'];
  XLSX.utils.sheet_add_aoa(ws, [['Created ' + new Date().toISOString()]], {
    origin: -1,
  });
  XLSX.writeFile(workbook, `${title}.xlsx`);
  // feishu 导入
  // const tableValues = XLSX.utils.sheet_to_json(ws, { header: 1 });
  // const res = await importTableIntoFeishu(title, tableValues);
}

const importTableIntoFeishu = async (tableName, tableValues) => {
  const config = {
    method: 'POST',
    url: 'https://s0h4nj.laf.dev/feishu.js',
    data: {
      tableName,
      tableValues,
    },
  };
  const res = await axios(config);
  return res.data;
};
