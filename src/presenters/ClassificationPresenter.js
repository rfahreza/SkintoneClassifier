const ClassificationPresenter = {
  async analyze(file) {
    // Simulasi proses analisis (delay 3 detik)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock data hasil analisis
    const mockResults = [
      {
        undertone: 'warm',
        confidence: 87,
        colorPalette: {
          primary: ['#D4A574', '#E6B887'],
          secondary: ['#CD853F', '#DEB887'],
          accent: ['#FF6B35', '#FFA07A']
        },
        description: 'Kulitmu memiliki undertone warm (hangat)...',
        tips: [
          'Pilih foundation dengan undertone kuning atau golden',
          'Warna coral dan peach cocok untukmu'
        ]
      },
      {
        undertone: 'cool',
        confidence: 82,
        colorPalette: {
          primary: ['#F5C6CB', '#FCE4EC'],
          secondary: ['#E1BEE7', '#CE93D8'],
          accent: ['#FF69B4', '#DC143C']
        },
        description: 'Kulitmu memiliki undertone cool (dingin)...',
        tips: [
          'Pilih foundation dengan undertone pink atau netral',
          'Gunakan warna berry dan plum'
        ]
      },
      {
        undertone: 'neutral',
        confidence: 90,
        colorPalette: {
          primary: ['#E8D5C4', '#F0E6D2'],
          secondary: ['#D2B48C', '#E8C4A0'],
          accent: ['#CD919E', '#DBB5B5']
        },
        description: 'Kulitmu memiliki undertone neutral (netral)...',
        tips: [
          'Gunakan foundation warm atau cool',
          'Eksperimen dengan berbagai warna makeup'
        ]
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];

    // Simpan ke localStorage (atau panggil API backend jika tersedia)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.undertoneResult = {
        type: result.undertone,
        confidence: result.confidence,
        date: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(user));
    }

    return result;
  },

  renderResult(result) {
    return `
      <div class="card p-4 shadow">
        <h3 class="text-center mb-3">Hasil Analisis Undertone</h3>
        <p class="text-center">Confidence: <strong>${result.confidence}%</strong></p>
        <p class="text-center">Undertone kamu adalah: <strong class="text-capitalize">${result.undertone}</strong></p>
        <p class="mt-3">${result.description}</p>

        <h5 class="mt-4">Color Palette</h5>
        ${['primary', 'secondary', 'accent'].map(group => `
          <div class="mt-2">
            <small class="text-muted text-capitalize">${group}</small>
            <div class="d-flex gap-2 flex-wrap">
              ${result.colorPalette[group].map(color => `
                <div class="text-center">
                  <div style="width: 40px; height: 40px; background-color: ${color}" class="rounded border"></div>
                  <small class="d-block text-muted">${color}</small>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <h5 class="mt-4">Tips</h5>
        <ul class="list-group list-group-flush">
          ${result.tips.map(tip => `<li class="list-group-item">${tip}</li>`).join('')}
        </ul>

        <div class="text-center mt-4">
          <a href="/products?undertone=${result.undertone}" class="btn btn-outline-pink">Lihat Rekomendasi Produk</a>
        </div>
      </div>
    `;
  }
};

export default ClassificationPresenter;
