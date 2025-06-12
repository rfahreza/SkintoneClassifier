import Layout from "../components/Layout.js";
import ClassificationPresenter from "../../presenters/ClassificationPresenter.js";


const tips = [
  'Gunakan pencahayaan natural (dekat jendela)',
  'Pastikan wajah terlihat jelas tanpa makeup tebal',
  'Hindari pencahayaan lampu kuning atau putih berlebihan',
  'Foto dari depan dengan ekspresi natural',
];

const ClassificationView = {
  async render() {
    const contentHtml = `
      <section class="py-5 min-vh-100" style="background:  #fce7f3">
        <div class="container" style="max-width: 900px;">
          <div class="text-center mb-5" style="padding-top: 80px;">
            <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 80px; height: 80px; background: linear-gradient(90deg,#f43f5e,#ec4899);">
              <i class="bi bi-camera-fill text-white fs-1"></i>
            </div>
            <h1 class="display-5 fw-bold">Analisis Skintone Kulit</h1>
            <p class="lead mx-auto" style="max-width: 900px;">Upload foto wajahmu dengan pencahayaan yang baik, dan AI kami akan menganalisis skintone kulitmu untuk memberikan rekomendasi produk yang tepat.</p>
          </div>

          <div id="classification-section" class="mb-4">
            <div class="card shadow-sm p-4 mx-auto" style="max-width: 900px;">
              <div id="upload-section">
                <label class="form-label fw-semibold">Upload Foto Wajah</label>
                <input type="file" id="image-input" accept="image/*" class="form-control mb-3">
                <button id="camera-btn" class="btn btn-outline-pink w-100 mb-3" type="button"><i class="bi bi-camera me-2"></i>Gunakan Kamera</button>
                <video id="camera-preview" class="w-100 mb-3 d-none" style="max-height: 300px; border-radius: 0.75rem;"></video>
                <canvas id="camera-canvas" class="d-none"></canvas>
                <div id="image-preview" class="mb-4"></div>
                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button id="analyze-btn" class="btn btn-pink px-4 py-2" disabled>
                    <i class="bi bi-stars me-2"></i>Analisis Skintone
                  </button>
                </div>
              </div>
              <div id="loading-spinner" class="text-center mt-4" style="display: none;">
                <div class="spinner-border text-pink" role="status"></div>
                <p class="mt-3">Menganalisis foto, mohon tunggu...</p>
              </div>
              <div id="result-section" style="display: none;"></div>
            </div>
          </div>

          <div class="card p-4 shadow-sm mb-4 mx-auto" style="max-width: 900px;">
            <h3 class="mb-3 fw-semibold">Tips untuk Hasil Terbaik:</h3>
            <div class="row">
              ${tips
                .map(
                  (tip) => `
                <div class="col-md-6 mb-2 d-flex align-items-center" style="gap: 0.5rem;">
                  <i class="bi bi-check-circle-fill text-success" style="font-size: 1.15rem;"></i>
                  <span class="small" style="font-size: 1rem; line-height: 1.2;">${tip}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>
      <style>
        .btn-pink {
          background: #ec4899;
          color: #fff !important;
          border: none;
          border-radius: 1.5rem !important;
        }
        .btn-pink:hover {
          background: #be185d;
          color: #fff !important;
        }
        .btn-outline-pink {
          background: #fff;
          color: #ec4899 !important;
          border: 2.5px solid #ec4899;
          border-radius: 1.5rem !important;
        }
        .btn-outline-pink:hover {
          background: #fbcfe8;
          color: #ec4899 !important;
        }
        .card {
          border-radius: 1.5rem !important;
        }
        .min-vh-100 {
          min-height: 100vh;
        }
      </style>
    `;
    return await Layout.wrap(contentHtml);
  },

  async afterRender() {
    const fileInput = document.getElementById('image-input');
    const previewContainer = document.getElementById('image-preview');
    const analyzeButton = document.getElementById('analyze-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultSection = document.getElementById('result-section');

    const cameraBtn = document.getElementById('camera-btn');
    const cameraPreview = document.getElementById('camera-preview');
    const cameraCanvas = document.getElementById('camera-canvas');
    let stream = null;
    let selectedFile = null;
    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        cameraPreview.pause();
        cameraPreview.classList.add('d-none');
        cameraBtn.textContent = 'Gunakan Kamera';
        cameraBtn.classList.remove('btn-pink');
        cameraBtn.classList.add('btn-outline-pink');
        cameraBtn.onclick = null;
      }
    }

    // Matikan kamera saat pindah halaman
    window.addEventListener('hashchange', stopCamera);

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        fileInput.value = '';
        return;
      }
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        previewContainer.innerHTML = `<div class="d-flex justify-content-center"><img src="${reader.result}" class="img-fluid rounded shadow" style="max-height: 300px"></div>`;
        analyzeButton.disabled = false;
      };
      reader.readAsDataURL(file);
    });

    cameraBtn.addEventListener('click', async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Browser kamu tidak mendukung kamera langsung.');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraPreview.srcObject = stream;
        cameraPreview.classList.remove('d-none');
        cameraPreview.play();
        cameraBtn.textContent = 'Ambil Foto';
        cameraBtn.classList.add('btn-pink');
        cameraBtn.classList.remove('btn-outline-pink');

        cameraBtn.onclick = async () => {
          cameraCanvas.width = cameraPreview.videoWidth;
          cameraCanvas.height = cameraPreview.videoHeight;
          cameraCanvas.getContext('2d').drawImage(cameraPreview, 0, 0);
          const dataUrl = cameraCanvas.toDataURL('image/png');
          previewContainer.innerHTML = `<img src="${dataUrl}" class="img-fluid rounded shadow" style="max-height: 300px">`;
          analyzeButton.disabled = false;
          stopCamera(); 
          window.selectedFile = dataURLtoFile(dataUrl, 'capture.png');
        };
      } catch (err) {
        alert('Tidak dapat mengakses kamera: ' + err.message);
      }
    });

    analyzeButton.addEventListener('click', async () => {
      const fileToAnalyze = selectedFile || window.selectedFile;
      if (!fileToAnalyze) return alert('Silakan upload foto terlebih dahulu.');
      analyzeButton.disabled = true;
      loadingSpinner.style.display = 'block';
      resultSection.style.display = 'none';

      try {
        const result = await ClassificationPresenter.analyze(fileToAnalyze);

        loadingSpinner.style.display = "none";
        resultSection.innerHTML = renderResult(result);
        resultSection.style.display = "block";
      } catch (err) {
        loadingSpinner.style.display = "none";
        alert("Gagal menganalisis gambar: " + err.message);
      }
      
      analyzeButton.disabled = false;
      stopCamera(); 
    });

    function renderResult(result) {
      return `
        <div class="mt-4">
          <div class="text-center mb-4">
            <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px; background: linear-gradient(90deg,#f43f5e,#ec4899);">
              <i class="bi bi-stars text-white fs-1"></i>
            </div>
            <h2 class="fw-bold mb-2">Hasil Analisis Skintone</h2>
            <p class="lead mb-1">Confidence Level: <span class="fw-semibold text-danger">${
              result.confidence
            }%</span></p>
            <h4 class="mb-3">Skintone kamu adalah: <span class="text-capitalize ${
              result.skintone === 'warm'
                ? 'text-warning'
                : result.skintone === 'cool'
                ? 'text-primary'
                : 'text-success'
            }">${result.skintone}</span></h4>
            <p class="mb-4">${result.description}</p>
          </div>
          <div class="mb-4">
            <h5 class="fw-semibold mb-3"><i class="bi bi-palette-fill me-2 text-danger"></i>Color Palette untuk Kamu</h5>
            <div class="row mb-2">
              <div class="col-12 mb-2"><strong>Warna Utama:</strong></div>
              <div class="col-12 d-flex flex-wrap gap-2 mb-3">
                ${result.colorPalette.primary
                  .map(
                    (color) => `
                  <div style="width:48px;height:48px;background:${color};border-radius:0.75rem;border:2px solid #fff;box-shadow:0 2px 8px #0001"></div>
                `,
                  )
                  .join('')}
              </div>
              <div class="col-12 mb-2"><strong>Warna Pendukung:</strong></div>
              <div class="col-12 d-flex flex-wrap gap-2 mb-3">
                ${result.colorPalette.secondary
                  .map(
                    (color) => `
                  <div style="width:48px;height:48px;background:${color};border-radius:0.75rem;border:2px solid #fff;box-shadow:0 2px 8px #0001"></div>
                `,
                  )
                  .join('')}
              </div>
              <div class="col-12 mb-2"><strong>Warna Aksen:</strong></div>
              <div class="col-12 d-flex flex-wrap gap-2 mb-3">
                ${result.colorPalette.accent
                  .map(
                    (color) => `
                  <div style="width:48px;height:48px;background:${color};border-radius:0.75rem;border:2px solid #fff;box-shadow:0 2px 8px #0001"></div>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
          <div class="mb-4">
            <h5 class="fw-semibold mb-3">Tips Makeup & Fashion</h5>
            <ul class="list-unstyled">
              ${result.tips
                .map(
                  (tip) => `
                <li class="mb-2 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-2 mt-1"></i> ${tip}</li>
              `,
                )
                .join('')}
            </ul>
          </div>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button id="analyze-again-btn" class="btn btn-outline-pink px-4 py-2"><i class="bi bi-arrow-repeat me-2"></i>Analisis Lagi</button>
            <a href="/products?skintone=${
              result.skintone
            }" class="btn btn-pink px-4 py-2 d-flex align-items-center gap-2">
              <i class="bi bi-bag-heart"></i>
              <span>Lihat Rekomendasi Produk</span>
            </a>
          </div>
        </div>
      `;
    }

    resultSection.addEventListener('click', function (e) {
      if (e.target.closest('#analyze-again-btn')) {
        resultSection.style.display = 'none';
        previewContainer.innerHTML = '';
        fileInput.value = '';
        selectedFile = null;
        analyzeButton.disabled = true;
      }
    });

    await Layout.afterRender?.();
  },
};

export default ClassificationView;

function dataURLtoFile(dataURL, fileName) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}
