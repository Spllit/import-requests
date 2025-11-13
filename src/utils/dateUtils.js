import { parse, isValid } from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

export function normalizeDate(value) {
  let date;

  // 1. Если это число из Excel
  if (typeof value === "number") {
    const excelDate = XLSX.SSF.parse_date_code(value);
    if (excelDate) {
      date = new Date(
        excelDate.y, excelDate.m - 1, excelDate.d,
        excelDate.H ?? 0, excelDate.M ?? 0, excelDate.S ?? 0
      );
    }
  }

  // 2. Если это строка
  if (!date && typeof value === "string") {
    const str = value.trim();

    // Попробуем стандартные форматы
    const formatsToTry = [
      "dd.MM.yyyy HH:mm:ss",
      "dd.MM.yyyy HH:mm",
      "dd.MM.yyyy",
      "d.M.yyyy HH:mm:ss",
      "d.M.yyyy HH:mm",
      "d.M.yyyy",
      "yyyy-MM-dd HH:mm:ss",
      "yyyy-MM-dd HH:mm",
      "yyyy-MM-dd",
      "MM/dd/yyyy",
      "MM/dd/yyyy HH:mm:ss",
      "MM/dd/yyyy HH:mm",
      "dd/MM/yyyy",
      "dd/MM/yyyy HH:mm:ss",
      "dd/MM/yyyy HH:mm",
    ];

    for (const f of formatsToTry) {
      try {
        const parsed = parse(str, f, new Date());
        if (isValid(parsed)) {
          date = parsed;
          break;
        }
      } catch (e) {
        // Игнорируем ошибки
      }
    }

    // Если не распарсилось — используем динамическое форматирование «на лету»
    if (!date) {
      return formatLiveDate(str);
    }
  }

  // 3. Если удалось распарсить дату
  if (date && isValid(date)) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    if (year < 100) year += 2000; // 25 -> 2025

    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // 4. Если не удалось распарсить и это не число, возвращаем строку в динамическом формате
  if (typeof value === "string") {
    return formatLiveDate(value);
  }

  // 5. Всё остальное возвращаем как есть
  return value;
}

export function formatLiveDate(value) {
  // Оставляем только цифры и ограничиваем длину до 14
  const digits = value.replace(/\D/g, '').slice(0, 14);
  const parts = [];

  if (digits.length >= 1) parts.push(digits.slice(0, 2));       // День
  if (digits.length >= 3) parts[1] = digits.slice(2, 4);       // Месяц
  if (digits.length >= 5) parts[2] = digits.slice(4, 8);       // Год
  if (digits.length >= 9) parts[3] = digits.slice(8, 10);      // Часы
  if (digits.length >= 11) parts[4] = digits.slice(10, 12);    // Минуты
  if (digits.length >= 13) parts[5] = digits.slice(12, 14);    // Секунды

  let formatted = "";

  if (parts[0]) formatted += parts[0];
  if (parts[1] !== undefined) formatted += "-" + parts[1];
  if (parts[2] !== undefined) formatted += "-" + parts[2];
  if (parts[3] !== undefined) formatted += " " + parts[3];
  if (parts[4] !== undefined) formatted += ":" + parts[4];
  if (parts[5] !== undefined) formatted += ":" + parts[5];

  return formatted;
}
export function fullDateValidator(date){
  const regExp = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4} ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
  if(date.match(regExp)) return true
  return false
}
export function shortDateValidator(date){
  const regExp = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
  if(date.match(regExp)) return true
}


