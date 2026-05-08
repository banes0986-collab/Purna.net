// Market Veritabanı
const DATABASE = {
    vips: [
        {id: 1, name: "VIP", price: "50 TL", icon: "fa-star", features: ["VIP Kiti", "Sohbet Rengi", "Özel Giriş Mesajı"]},
        {id: 2, name: "VIP+", price: "75 TL", icon: "fa-crown", features: ["VIP+ Kiti", "Fly Yetkisi", "3 Adet Kasa Anahtarı"]},
        {id: 3, name: "LEGACY VIP", price: "120 TL", icon: "fa-dragon", features: ["Legacy Kiti", "Sınırsız Fly", "Özel Pet Sistemi"]}
    ],
    kits: [
        {id: 4, name: "Warden Set", price: "30 TL", icon: "fa-shield-halved", features: ["Full P5 Set", "Keskinlik 6 Kılıç"]},
        {id: 5, name: "Madenci Paketi", price: "15 TL", icon: "fa-pickaxe", features: ["Verimlilik 10 Kazma", "Hız II İksiri"]}
    ],
    swords: [
        {id: 6, name: "Excalibur", price: "200 TL", icon: "fa-sword", features: ["Geri Tepme 3", "Alevden Çehre 2"]}
    ]
};

// Sayfa Yükleme
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader-wrapper').style.opacity = '0';
        setTimeout(() => document.getElementById('loader-wrapper').style.display = 'none', 1000);
    }, 1500);
    loadMarket('vips');
});

// Dinamik Market Yükleyici
function loadMarket(category) {
    const grid = document.getElementById('dynamic-grid');
    grid.innerHTML = ''; // Temizle

    // Buton aktiflik kontrolü
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category.slice(0, -1))) btn.classList.add('active');
    });

    DATABASE[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card-v2 animate__animated animate__fadeInUp';
        card.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <h3 style="font-family:Syncopate; font-size:22px; margin-bottom:15px">${item.name}</h3>
            <ul style="list-style:none; color:#888; margin-bottom:30px; font-size:14px">
                ${item.features.map(f => `<li><i class="fas fa-check" style="color:#00ff88; font-size:10px"></i> ${f}</li>`).join('')}
            </ul>
            <div style="font-size:32px; font-weight:900; margin-bottom:30px; color:#00ff88">${item.price}</div>
            <button class="btn-primary-v2" style="width:100%" onclick="openPayment('${item.name}')">Hemen Al</button>
        `;
        grid.appendChild(card);
    });
}

function openPayment(name) {
    document.getElementById('item-target').innerText = name;
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePayment() {
    document.getElementById('payment-modal').style.display = 'none';
}

function copyServerIP() {
    navigator.clipboard.writeText("89.47.113.47:25573");
    const span = document.getElementById('ip-display');
    span.innerText = "IP KOPYALANDI!";
    setTimeout(() => span.innerText = "89.47.113.47:25573", 2000);
}
