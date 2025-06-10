import Layout from "../components/Layout.js";

const tips = [
  "Gunakan pencahayaan natural (dekat jendela)",
  "Pastikan wajah terlihat jelas tanpa makeup tebal",
  "Hindari pencahayaan lampu kuning atau putih berlebihan",
  "Foto dari depan dengan ekspresi natural",
];

const mockResults = [
  {
    undertone: "warm",
    confidence: 87,
    colorPalette: {
      primary: ["#D4A574", "#E6B887", "#F2CC9A", "#FFDEAD"],
      secondary: ["#CD853F", "#DEB887", "#F5DEB3", "#FFE4B5"],
      accent: ["#FF6B35", "#FF8C42", "#FFA07A", "#FFCCCB"],
    },
    description:
      "Kulitmu memiliki undertone warm (hangat) dengan dominasi warna kuning dan emas. Ini membuat kamu terlihat lebih glowing dengan warna-warna hangat.",
    tips: [
      "Pilih foundation dengan undertone kuning atau golden",
      "Warna coral, peach, dan bronze sangat cocok untukmu",
      "Hindari warna dengan base pink atau cool tones",
      "Gunakan blush warna peach atau coral untuk hasil natural",
    ],
  },
  {
    undertone: "cool",
    confidence: 82,
    colorPalette: {
      primary: ["#F5C6CB", "#F8D7DA", "#FCE4EC", "#F3E5F5"],
      secondary: ["#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC"],
      accent: ["#FF69B4", "#FF1493", "#DC143C", "#B22222"],
    },
    description:
      "Kulitmu memiliki undertone cool (dingin) dengan dominasi warna pink dan biru. Kamu akan terlihat fresh dengan warna-warna cool.",
    tips: [
      "Pilih foundation dengan undertone pink atau neutral",
      "Warna berry, plum, dan rose sangat flattering",
      "Hindari warna dengan base orange atau yellow",
      "Gunakan blush warna pink atau berry untuk hasil natural",
    ],
  },
  {
    undertone: "neutral",
    confidence: 90,
    colorPalette: {
      primary: ["#E8D5C4", "#F0E6D2", "#F5F0E8", "#FAF5F0"],
      secondary: ["#D2B48C", "#DDB892", "#E8C4A0", "#F2D0A7"],
      accent: ["#CD919E", "#D4A5A5", "#DBB5B5", "#E8C5C5"],
    },
    description:
      "Kulitmu memiliki undertone neutral (netral) dengan keseimbangan antara warm dan cool. Kamu beruntung karena bisa menggunakan berbagai warna!",
    tips: [
      "Kamu bisa menggunakan foundation warm atau cool",
      "Hampir semua warna cocok untukmu",
      "Eksperimen dengan berbagai warna makeup",
      "Focus pada intensity warna yang sesuai dengan occasion",
    ],
  },
];

const ClassificationView = {
  async render() {
    const contentHtml = `
      <section class="bg-light py-3">
        <div class="container">
          <div class="text-center mb-5" style="padding-top: 100px;">
            <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 80px; height: 80px; background: linear-gradient(90deg,#f43f5e,#ec4899);">
              <i class="bi bi-camera-fill text-white fs-1"></i>
            </div>
            <h1 class="display-5 fw-bold">Analisis Undertone Kulit</h1>
            <p class="lead">Upload foto wajahmu dengan pencahayaan yang baik, dan AI kami akan menganalisis undertone kulitmu untuk memberikan rekomendasi produk yang tepat.</p>
          </div>

          <div id="classification-section" class="mb-3">
            <div class="card shadow-sm p-4 mx-auto" style="max-width: 440px;">
              <div id="upload-section">
                <label class="form-label fw-semibold">Upload Foto Wajah</label>
                <input type="file" id="image-input" accept="image/*" class="form-control mb-3">
                <button id="camera-btn" class="btn btn-outline-pink w-100 mb-3" type="button"><i class="bi bi-camera me-2"></i>Gunakan Kamera</button>
                <video id="camera-preview" class="w-100 mb-3 d-none" style="max-height: 300px; border-radius: 0.75rem;"></video>
                <canvas id="camera-canvas" class="d-none"></canvas>
                <div id="image-preview" class="mb-4"></div>
                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button id="analyze-btn" class="btn btn-pink px-4 py-2" disabled>
                    <i class="bi bi-stars me-2"></i>Analisis Undertone
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

          <div class="d-flex justify-content-center">
            <div class="card p-3 shadow-sm mb-4" style="max-width: 440px;">
              <h3 class="mb-3 fw-semibold">Tips untuk Hasil Terbaik:</h3>
              <div class="row">
                ${tips
                  .map(
                    (tip) => `
                  <div class="col-md-6 mb-2 d-flex align-items-start">
                    <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <span class="small">${tip}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
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
      </style>
    `;
    return await Layout.wrap(contentHtml);
  },

  async afterRender() {
    const fileInput = document.getElementById("image-input");
    const previewContainer = document.getElementById("image-preview");
    const analyzeButton = document.getElementById("analyze-btn");
    const loadingSpinner = document.getElementById("loading-spinner");
    const resultSection = document.getElementById("result-section");

    const cameraBtn = document.getElementById("camera-btn");
    const cameraPreview = document.getElementById("camera-preview");
    const cameraCanvas = document.getElementById("camera-canvas");
    let stream = null;
    let selectedFile = null;

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        cameraPreview.pause();
        cameraPreview.classList.add("d-none");
        cameraBtn.textContent = "Gunakan Kamera";
        cameraBtn.classList.remove("btn-pink");
        cameraBtn.classList.add("btn-outline-pink");
        cameraBtn.onclick = null;
      }
    }

    window.addEventListener("hashchange", stopCamera);

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        fileInput.value = "";
        return;
      }
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        previewContainer.innerHTML = `<img src="${reader.result}" class="img-fluid rounded shadow" style="max-height: 300px">`;
        analyzeButton.disabled = false;
      };
      reader.readAsDataURL(file);
    });

    cameraBtn.addEventListener("click", async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Browser kamu tidak mendukung kamera langsung.");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraPreview.srcObject = stream;
        cameraPreview.classList.remove("d-none");
        cameraPreview.play();
        cameraBtn.textContent = "Ambil Foto";
        cameraBtn.classList.add("btn-pink");
        cameraBtn.classList.remove("btn-outline-pink");

        cameraBtn.onclick = async () => {
          cameraCanvas.width = cameraPreview.videoWidth;
          cameraCanvas.height = cameraPreview.videoHeight;
          cameraCanvas.getContext("2d").drawImage(cameraPreview, 0, 0);
          const dataUrl = cameraCanvas.toDataURL("image/png");
          previewContainer.innerHTML = `<img src="${dataUrl}" class="img-fluid rounded shadow" style="max-height: 300px">`;
          analyzeButton.disabled = false;
          stopCamera(); // pastikan kamera ditutup setelah ambil gambar
          window.selectedFile = dataURLtoFile(dataUrl, "capture.png");
        };
      } catch (err) {
        alert("Tidak dapat mengakses kamera: " + err.message);
      }
    });

    analyzeButton.addEventListener("click", async () => {
      const fileToAnalyze = selectedFile || window.selectedFile;
      if (!fileToAnalyze) return alert("Silakan upload foto terlebih dahulu.");
      analyzeButton.disabled = true;
      loadingSpinner.style.display = "block";
      resultSection.style.display = "none";

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result =
        mockResults[Math.floor(Math.random() * mockResults.length)];

      loadingSpinner.style.display = "none";
      resultSection.innerHTML = renderResult(result);
      resultSection.style.display = "block";
      analyzeButton.disabled = false;
    });

    function renderResult(result) {
      return `
        <div class="mt-4">
          <div class="text-center mb-4">
            <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px; background: linear-gradient(90deg,#f43f5e,#ec4899);">
              <i class="bi bi-stars text-white fs-1"></i>
            </div>
            <h2 class="fw-bold mb-2">Hasil Analisis Undertone</h2>
            <p class="lead mb-1">Confidence Level: <span class="fw-semibold text-danger">${
              result.confidence
            }%</span></p>
            <h4 class="mb-3">Undertone kamu adalah: <span class="text-capitalize ${
              result.undertone === "warm"
                ? "text-warning"
                : result.undertone === "cool"
                ? "text-primary"
                : "text-success"
            }">${result.undertone}</span></h4>
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
                `
                  )
                  .join("")}
              </div>
              <div class="col-12 mb-2"><strong>Warna Pendukung:</strong></div>
              <div class="col-12 d-flex flex-wrap gap-2 mb-3">
                ${result.colorPalette.secondary
                  .map(
                    (color) => `
                  <div style="width:48px;height:48px;background:${color};border-radius:0.75rem;border:2px solid #fff;box-shadow:0 2px 8px #0001"></div>
                `
                  )
                  .join("")}
              </div>
              <div class="col-12 mb-2"><strong>Warna Aksen:</strong></div>
              <div class="col-12 d-flex flex-wrap gap-2 mb-3">
                ${result.colorPalette.accent
                  .map(
                    (color) => `
                  <div style="width:48px;height:48px;background:${color};border-radius:0.75rem;border:2px solid #fff;box-shadow:0 2px 8px #0001"></div>
                `
                  )
                  .join("")}
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
              `
                )
                .join("")}
            </ul>
          </div>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button id="analyze-again-btn" class="btn btn-outline-pink px-4 py-2"><i class="bi bi-arrow-repeat me-2"></i>Analisis Lagi</button>
            <a href="/products?undertone=${
              result.undertone
            }" class="btn btn-pink px-4 py-2 d-flex align-items-center gap-2">
              <i class="bi bi-bag-heart"></i>
              <span>Lihat Rekomendasi Produk</span>
            </a>
          </div>
        </div>
      `;
    }

    // Reset untuk analisis ulang
    resultSection.addEventListener("click", function (e) {
      if (e.target.closest("#analyze-again-btn")) {
        resultSection.style.display = "none";
        previewContainer.innerHTML = "";
        fileInput.value = "";
        selectedFile = null;
        analyzeButton.disabled = true;
      }
    });

    await Layout.afterRender?.();
  },
};

export default ClassificationView;

function dataURLtoFile(dataURL, fileName) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}
