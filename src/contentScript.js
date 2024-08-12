'use strict';
import * as XLSX from 'xlsx/xlsx.mjs';

const tables = document.body.querySelectorAll('.mytable');

if (tables) {
  tables.forEach((table) => {
    console.log(`table1:`, table);
    let parent = table.parentNode;
    let search = parent.querySelector('.range');

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
    search.append(download);

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    // XLSX.writeFile(workbook, 'Report.xlsx');
    download.addEventListener('click', function () {
      let table_elt = table.querySelector('table');
      let workbook = XLSX.utils.table_to_book(table_elt);
      console.log(`workbook:`, workbook);
      var ws = workbook.Sheets['Sheet1'];
      console.log(`ws:`, ws);
      XLSX.utils.sheet_add_aoa(ws, [['Created ' + new Date().toISOString()]], {
        origin: -1,
      });
      XLSX.writeFile(workbook, 'Report.xlsx');
    });
  });
}
