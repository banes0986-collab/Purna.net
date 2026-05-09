// Sunucu API Bağlantısı
async function updateStatus() {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/legacynw.craftmc.com.tr`);
    const data = await res.json();
    document.getElementById('status-text').innerText = data.online ? "● AKTİF" : "● RESTARTTA";
    document.getElementById('s-players').innerText = data.online ? `${data.players.online}/${data.players.max}` : "0/0";
}
setInterval(updateStatus, 30000); updateStatus();

// BAKİYE SİSTEMİ (LocalStorage üzerinden gerçekçi simülasyon)
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user) return window.location.href = 'index.html';
    
    // Verileri ekrana bas
    document.getElementById('user-display').innerText = user.username;
    document.getElementById('welcome-name').innerText = user.username;
    document.getElementById('u-balance').innerText = user.balance + " TL";
    document.getElementById('u-rank').innerText = user.rank;
    
    if(user.rank === 'KURUCU') document.getElementById('admin-menu').classList.remove('hidden');
    loadLogs();
}

// ADMIN: Bakiye Ekleme
function adminAddBalance() {
    const target = document.getElementById('target-user').value;
    const amount = parseInt(document.getElementById('target-amt').value);
    
    if(!target || !amount) return alert("Bilgileri gir kanka!");
    
    let targetData = JSON.parse(localStorage.getItem('user_' + target));
    if(!targetData) return alert("Oyuncu bulunamadı!");
    
    targetData.balance += amount;
    localStorage.setItem('user_' + target, JSON.stringify(targetData));
    alert(`${target} adlı oyuncuya ${amount} TL eklendi!`);
}

// SATIN ALMA & LOG SİSTEMİ
function buy(itemName, price) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user.balance < price) return alert("Bakiyen yetersiz agam, Discord'dan yükle!");
    
    user.balance -= price;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Log kaydet
    let logs = JSON.parse(localStorage.getItem('shop_logs')) || [];
    logs.unshift({ user: user.username, item: itemName, date: new Date().toLocaleString() });
    localStorage.setItem('shop_logs', JSON.stringify(logs));
    
    alert(`${itemName} başarıyla alındı!`);
    location.reload();
}

function loadLogs() {
    let logs = JSON.parse(localStorage.getItem('shop_logs')) || [];
    let html = "";
    logs.forEach(log => {
        html += `<tr><td>${log.user}</td><td>${log.item}</td><td>${log.date}</td></tr>`;
    });
    document.getElementById('log-body').innerHTML = html;
}

function showPage(id) {
    document.querySelectorAll('.page-container').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + id).classList.remove('hidden');
    document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
    document.getElementById('l-' + id).classList.add('active');
}

function sendTicket() {
    alert("Talebin başarıyla gönderildi! Yetkililer en kısa sürede inceleyecek.");
    document.getElementById('t-msg').value = "";
}

function logout() { localStorage.removeItem('currentUser'); window.location.href = 'index.html'; }
window.onload = loadUserData;
