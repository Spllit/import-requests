// import/ImportManager.js
import ExcelParser from '../utils/ExcelParser.js';
import {normalizeDate} from "../utils/dateUtils.js";

export default class ImportManager {
  constructor(state, formsManager) {
    this.state = state
    this.formsManager = formsManager;
    this.parser = new ExcelParser();
    this.data = { headers: [], rows: [], columns: {} };
    this.handleImportCategory = null
    this.handleImportData = []
  }

  getHeaders() {
    return this.data.headers;
  }

  readFile(file, onDone) {
    // Проверка доступности XLSX
    if (typeof XLSX === 'undefined') {
      console.error('XLSX library not loaded');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const { headers, rows, columns } = this.parser.parse(workbook);
        this.data = { headers, rows, columns };

        onDone?.();
      } catch (err) {
        console.error('Ошибка чтения файла:', err);
        alert('Ошибка при чтении файла. Проверьте формат файла.');
      }
    };

    reader.onerror = () => {
      console.error('Ошибка чтения файла');
      alert('Ошибка при чтении файла.');
    };

    reader.readAsArrayBuffer(file);
  }

  collectMatchingPairs(modalBody) {
    if (!modalBody) return [];
    
    const selects = modalBody.querySelectorAll('select[name="matchingHeaderSelector"]');
    return Array.from(selects)
      .filter(s => s.value && s.value !== '')
      .map(s => [s.dataset.headerFrom, s.value]);
  }
  async insertHandeData(){
    if(this.handleImportData[this.handleImportData.length -1] === '') this.handleImportData.pop()
    
    if(this.handleImportData.length && this.handleImportCategory){
      this.formsManager.set(this.handleImportData.length, 'newSize')
      await this.formsManager.mountManager()
      const forms = this.state.forms
      forms.forEach((form, i) => {
        if(this.handleImportData[i]) {
          if(this.handleImportCategory === 'requestDate'){
            this.handleImportData[i] = normalizeDate(this.handleImportData[i])
          }
          form.set(this.handleImportCategory, this.handleImportData[i])
          this.formsManager.updateSingleInput(i, this.handleImportCategory, this.handleImportData[i])
        }
      })
    }
  }
  async insertData(pairs) {
    if (!this.formsManager) {
      console.error('FormsManager not available');
      return;
    }

    const columns = this.data.columns || {};
    let maxRows = 1;
    
    pairs.forEach(([from]) => {
      if (Array.isArray(columns[from])) {
        maxRows = Math.max(maxRows, columns[from].length);
      }
    });

    // Используем formsManager API
    if (typeof this.formsManager.set === 'function') {
      this.formsManager.set(maxRows, 'newSize');
    }
    if (typeof this.formsManager.mountManager === 'function') {
      await this.formsManager.mountManager()

      const forms = this.state.forms

      forms.forEach((form, i) => {
        pairs.forEach(([from, to]) => {
            let cell = columns[from]?.[i];
            if (cell !== undefined && cell !== null && cell !== '') {
              if(to ==='requestDate') cell = normalizeDate(cell)
                this.fillFormField(form, to, cell, i);
            }
        });
      });
    }

    
  }

  fillFormField(form, fieldName, value, formId) {
    // const input = form.querySelector(`[name="${fieldName}"]`);
    if (form && fieldName && value) {
      form.set(fieldName, value)
      this.formsManager.updateSingleInput(formId, fieldName, value)
      // Триггерим события для обновления UI
    //   input.dispatchEvent(new Event('input', { bubbles: true }));
    //   input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}