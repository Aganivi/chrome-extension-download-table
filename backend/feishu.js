import cloud from '@lafjs/cloud';
import * as lark from '@larksuiteoapi/node-sdk';
import axios from 'axios';

let tenantToken;
const getTenantToken = async () => {
  const url =
    'https://open.feishu.cn/open-apis/v3/auth/tenant_access_token/internal/';
  const res = await axios.post(url, {
    app_id: process.env.appId,
    app_secret: process.env.appSecret,
  });
  tenantToken = res.data.tenant_access_token;
  return res.data.tenant_access_token;
};
const createTeble = async (tableName) => {
  let data = JSON.stringify({
    title: tableName,
    folder_token: process.env.folderToken,
  });

  let config = {
    method: 'POST',
    url: 'https://open.feishu.cn/open-apis/sheets/v3/spreadsheets',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tenantToken}`,
    },
    data: data,
  };
  const res = await axios(config);
  return res.data;
};

const getSheetId = async (spreadsheet_token) => {
  let config = {
    method: 'GET',
    url: `https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}/sheets/query`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tenantToken}`,
    },
  };
  const res = await axios(config);
  console.log('id:', res.data.data.sheets);
  return res.data;
};

const insertData = async (spreadsheet_token, sheetId, values) => {
  let data = JSON.stringify({
    valueRange: {
      range: sheetId,
      values: values,
    },
  });

  let config = {
    method: 'POST',
    url: `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/values_prepend`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tenantToken}`,
    },
    data: data,
  };
  const res = await axios(config);
  return res.data;
};

const client = new lark.Client({
  appId: process.env.appId,
  appSecret: process.env.appSecret,
});

export default async function (ctx: FunctionContext) {
  console.log(ctx.body);
  const { tableName, tableValues } = ctx.body;
  const tenant_access_token = await getTenantToken();
  const result = await createTeble(tableName);
  const { spreadsheet_token, url } = result.data.spreadsheet;
  const sheetId = (await getSheetId(spreadsheet_token)).data.sheets[0].sheet_id;

  const res = await insertData(spreadsheet_token, sheetId, tableValues);

  return { data: url };
}
