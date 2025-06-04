import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ClassificationPresenter from '../../presenters/ClassificationPresenter.js';

const ClassificationView = {
  async render() {
    const header = await Header.render();
    const footer = await Footer.render();

    return `
      ${header}
      <main class="bg-light py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h1 class="display-5 fw-bold">Analisis Undertone Kulit</h1>
            <p class="lead">Upload foto wajahmu, dan AI kami akan menganalisis undertone kulitmu.</p>
          </div>

          <div id="classification-section" class="text-center">
            <label class="form-label">Upload Foto</label>
            <input type="file" id="image-input" accept="image/*" class="form-control mb-3 mx-auto" style="max-width: 400px">
            <div id="image-preview" class="mb-4"></div>
            <button id="analyze-btn" class="btn btn-pink px-4 py-2">Analisis Sekarang</button>
            <div id="loading-spinner" class="mt-4" style="display: none">
              <div class="spinner-border text-pink" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2">Menganalisis foto, mohon tunggu...</p>
            </div>
          </div>

          <div id="result-section" class="mt-5" style="display: none"></div>
        </div>
      </main>
      ${footer}
    `;
  },

  async afterRender() {
    const fileInput = document.getElementById('image-input');
    const previewContainer = document.getElementById('image-preview');
    const analyzeButton = document.getElementById('analyze-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultSection = document.getElementById('result-section');

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        previewContainer.innerHTML = `<img src="${reader.result}" class="img-fluid rounded shadow" style="max-height: 300px">`;
      };
      reader.readAsDataURL(file);
    });

    analyzeButton.addEventListener('click', async () => {
      if (!selectedFile) return alert('Silakan upload foto terlebih dahulu.');

      analyzeButton.disabled = true;
      loadingSpinner.style.display = 'block';

      const result = await ClassificationPresenter.analyze(selectedFile);

      loadingSpinner.style.display = 'none';
      resultSection.innerHTML = ClassificationPresenter.renderResult(result);
      resultSection.style.display = 'block';
      analyzeButton.disabled = false;
    });
  }
};

export default ClassificationView;
