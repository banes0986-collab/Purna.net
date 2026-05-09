// SUNUCU DURUMUNU ÇEKME (API)
async function updateServerStatus() {
    const ip = "legacynw.craftmc.com.tr";
    const statusText = document.getElementById('status-text');
    const statusDisplay = document.getElementById('status-display');

    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
        const data = await response.json();

        if (data.online) {
            const text = `AKTİF (${data.players.online}/${data.players.max})`;
            statusText.innerHTML = `<span class="online">● SUNUCU AKTİF</span>`;
            statusDisplay.innerHTML = text;
            statusDisplay.className = "online";
        } else {
            statusText.innerHTML = `<span class="offline">● RESTARTLANIYOR / KAPALI</span>`;
            statusDisplay.innerHTML = "RESTARTLANIYOR";
            statusDisplay.className = "offline";
        }
    } catch (e) {
        statusText.innerText = "Bağlantı Hatası";
    }
}

// 2 dakikada bir kontrol et
setInterval(updateServerStatus, 120000);
updateServerStatus();

// AUTH & RANK SİSTEMİ
function handleLogin() {
    const u = document.getElementById('l-user').value;
    const p = document.getElementById('l-pass').value;

    if (u === "triggerbabaa" && p === "resul3163") {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('admin-link').classList.remove('hidden'); // Admin menüsünü aç
        
        document.getElementById('user-display').innerText = u;
        document.getElementById('welcome-name').innerText = u;
        document.getElementById('user-rank').innerText = "KURUCU";
        document.getElementById('user-balance').innerText = "∞ TL";
    } else {
        alert("Giriş bilgileri hatalı!");
    }
}

function adminGiveRank() {
    const p = document.getElementById('rank-player').value;
    const r = document.getElementById('rank-type').value;
    if(!p) return alert("Oyuncu adı gir!");
    alert(`${p} oyuncusuna ${r} rankı başarıyla tanımlandı!`);
}

function switchAuth(type) {
    if(type === 'login') {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-tab').classList.add('active');
        document.getElementById('register-tab').classList.remove('active');
    } else {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('login-tab').classList.remove('active');
        document.getElementById('register-tab').classList.add('active');
    }
}

function showPage(id) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + id).classList.remove('hidden');
    document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function logout() { location.reload(); }
function buy() { alert("Bakiye yetersiz! Discord üzerinden talep açın."); }
