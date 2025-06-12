const ClassificationPresenter = {
  async analyze(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5050/api/classify', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server');
    }

    const result = await response.json();

    // Simpan ke localStorage (atau panggil API backend jika tersedia)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.skintoneResult = {
        type: result.skintone,
        confidence: result.confidence,
        date: new Date().toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(user));
    }

    return result;
  },

  renderResult(result) {
    return `
      <div class="card p-4 shadow">
        <h3 class="text-center mb-3">Hasil Analisis Skintone</h3>
        <p class="text-center">Confidence: <strong>${result.confidence}%</strong></p>
        <p class="text-center">Skintone kamu adalah: <strong class="text-capitalize">${
          result.skintone
        }</strong></p>
        <p class="mt-3">${result.description}</p>

        <h5 class="mt-4">Color Palette</h5>
        ${['primary', 'secondary', 'accent']
          .map(
            (group) => `
          <div class="mt-2">
            <small class="text-muted text-capitalize">${group}</small>
            <div class="d-flex gap-2 flex-wrap">
              ${result.colorPalette[group]
                .map(
                  (color) => `
                <div class="text-center">
                  <div style="width: 40px; height: 40px; background-color: ${color}" class="rounded border"></div>
                  <small class="d-block text-muted">${color}</small>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        `,
          )
          .join('')}

        <h5 class="mt-4">Tips</h5>
        <ul class="list-group list-group-flush">
          ${result.tips.map((tip) => `<li class="list-group-item">${tip}</li>`).join('')}
        </ul>

        <div class="text-center mt-4">
          <a href="/products?skintone=${
            result.skintone
          }" class="btn btn-outline-pink">Lihat Rekomendasi Produk</a>
        </div>
      </div>
    `;
  },
};

export default ClassificationPresenter;
