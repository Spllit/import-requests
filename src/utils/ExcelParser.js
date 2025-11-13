export default class ExcelParser {
  parse(workbook) {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true,
    });
    if (!json || !json.length) {
      return { headers: [], rows: [], columns: {} };
    }
    const headers = json[0];
    const rows = json.slice(1);
    const columns = {};
    headers.forEach((header, i) => {
      columns[header] = rows.map((row) => row[i]);
    });
    return { headers, rows, columns };
  }
}
