// import/ImportController.js
import { importModalFirstPage, importModalSecondPage } from '../ui/ImportDataForm.js';

export default class ImportController {
  constructor(manager) {
    this.manager = manager;
    this.modal = document.querySelector('#importModal');
    
    // Проверка существования элементов
    if (!this.modal) {
      console.error('Modal #importModal not found');
      return;
    }
    
    this.modalBody = this.modal.querySelector('[name="importModalBody"]');
    
    if (!this.modalBody) {
      console.error('Modal body [name="importModalBody"] not found');
    }

    // state
    this.fileLoaded = false;
    this.currentPage = 1;

    // nav buttons
    this.pagePrevBtn = null;
    this.pageNextBtn = null;
  }

  // ----------------- Handlers -----------------
  handleClick = (e) => {
    if (e.target.closest('.close_modal_btn') || e.target.closest('[name="closeModal"]')) {
      this.close();
    }
  };
  handeInput = (e) => {
    if(e.target.closest('textarea[name="handleImportData"]')){
      this.manager.handleImportData = e.target.value.split('\n')
    }
  }
  onCategoryChange = (e) => {
    if(e.target.closest('[name="handleImportCategory"]')){
      this.manager.handleImportCategory = e.target.value ? e.target.value : null
    }
  }
  handleKeyDown = (e) => {
    if (e.key === 'Escape') this.close();
  };

  onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    // Проверка типа файла
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      alert('Пожалуйста, выберите файл Excel (.xlsx или .xls)');
      return;
    }
    
    this.manager.readFile(file, () => {
      this.currentPage = 2  
      this.fileLoaded = true;
      this.renderSecondPage();
      this.updateNavButtons();
    });
  };

  onDrop = (e) => {
    e.preventDefault();
    const dz = e.currentTarget;
    dz.classList.remove('border-blue-400', 'bg-blue-50');
    
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      alert('Пожалуйста, перетащите файл Excel (.xlsx или .xls)');
      return;
    }
    
    this.manager.readFile(file, () => {
      this.fileLoaded = true;
      this.currentPage = 2
      this.renderSecondPage();
      this.updateNavButtons();
    });
  };

  onDragOver = (e) => {
    e.preventDefault();
    const dz = e.currentTarget;
    dz.classList.add('border-blue-400', 'bg-blue-50');
  };

  onDragLeave = (e) => {
    const dz = e.currentTarget;
    dz.classList.remove('border-blue-400', 'bg-blue-50');
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    // const selects = this.modalBody?.querySelectorAll('select[name="matchingHeaderSelector"]');
    // if (!selects || selects.length === 0) {
    //   // Ручной импорт
    //   // this.handleManualImport();
    //   return;
    // }
    if(this.currentPage === 1){
      this.manager.insertHandeData()
      this.close();
    }
    else{
      // Автоматический импорт
      const pairs = this.manager.collectMatchingPairs(this.modalBody);
      if (!pairs.length && this.currentPage === 2) {
        alert('Пожалуйста, выберите хотя бы одно соответствие');
        return;
      }
      
      this.manager.insertData(pairs);
      this.close();
    }
    
  };


  goPrev = () => {
    this.currentPage = 1;
    this.renderFirstPage();
    this.updateNavButtons();
  };

  goNext = () => {
    if (!this.fileLoaded) return;
    this.currentPage = 2;
    this.renderSecondPage();
    this.updateNavButtons();
  };

  // ----------------- Public API -----------------
  open() {
    if (!this.modal) return;
    
    this.currentPage = 1;
    this.fileLoaded = !!(this.manager?.getHeaders?.()?.length);
    this.modal.classList.remove('hidden');

    this.renderFirstPage();

    // Добавляем обработчики
    this.modal.addEventListener('click', this.handleClick);
    this.modal.addEventListener('input', this.handeInput)
    document.addEventListener('keydown', this.handleKeyDown);
    
  }

  close() {
    if (!this.modal) return;
    
    this.removeNavButtons();
    this.modal.classList.add('hidden');
    this.modal.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Сброс состояния
    this.fileLoaded = false;
    this.currentPage = 1;
  }

  // ----------------- Rendering -----------------
  renderFirstPage() {
    if (!this.modalBody) return;
    
    this.modalBody.innerHTML = importModalFirstPage();

    const dropZone = this.modalBody.querySelector('#dropZone');
    const fileInput = this.modalBody.querySelector('#fileInput');
    const category = this.modalBody.querySelector('[name="handleImportCategory"]')

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', this.onFileChange);

      dropZone.addEventListener('dragover', this.onDragOver);
      dropZone.addEventListener('dragleave', this.onDragLeave);
      dropZone.addEventListener('drop', this.onDrop);
    }
    if(category){
      category.addEventListener('change', this.onCategoryChange)
    }
    const submitBtn = this.modalBody.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', this.onSubmit);
    }

    this.addNavButtons();
    this.updateNavButtons();
  }

  renderSecondPage() {
    if (!this.modalBody) return;
    
    const headers = this.manager?.getHeaders?.() || [];
    this.modalBody.innerHTML = importModalSecondPage(headers);

    const submitBtn = this.modalBody.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', this.onSubmit);
    }

    this.addNavButtons();
    this.updateNavButtons();
  }

  // ----------------- Nav buttons -----------------
  addNavButtons() {
  // Ищем контейнер в шапке
  const header = this.modal.querySelector('.flex.items-center.justify-between.p-4');
  if (!header) return;

  // Удаляем предыдущие кнопки, если были
  const oldPrev = header.querySelector('[name="pagePrev"]');
  const oldNext = header.querySelector('[name="pageNext"]');
  oldPrev?.remove();
  oldNext?.remove();

  // Создаём prev
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.name = 'pagePrev';
  prev.className = 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white text-white opacity-70 hover:opacity-100 transition disabled:opacity-30 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center hidden';
  prev.innerHTML = `
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1 3 7l6 6"></path>
    </svg>
  `;
  prev.addEventListener('click', this.goPrev);

  // Создаём next
  const next = document.createElement('button');
  next.type = 'button';
  next.name = 'pageNext';
  next.className = 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white text-white opacity-70 hover:opacity-100 transition disabled:opacity-30 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center hidden';
  next.innerHTML = `
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 6-6L5 1"></path>
    </svg>
  `;
  next.addEventListener('click', this.goNext);

  // Вставляем кнопки в левую часть шапки
  header.prepend(prev);
  header.prepend(next);

  this.pagePrevBtn = prev;
  this.pageNextBtn = next;
}


removeNavButtons() {
  const prev = this.modal?.querySelector('[name="pagePrev"]');
  const next = this.modal?.querySelector('[name="pageNext"]');

  prev?.remove();
  next?.remove();

  this.pagePrevBtn = null;
  this.pageNextBtn = null;
}


  updateNavButtons() {
  if (!this.pagePrevBtn || !this.pageNextBtn) {
    this.addNavButtons();
  }

  // Страница 1 → только NEXT
  if (this.currentPage === 1) {
    this.pagePrevBtn.classList.add('hidden');
    this.pageNextBtn.classList.toggle('hidden', !this.fileLoaded);
  }

  // Страница 2 → только PREV
  if (this.currentPage === 2) {
    this.pageNextBtn.classList.add('hidden');
    this.pagePrevBtn.classList.remove('hidden');
  }
}

}