// Sunucu Durumu (API)
async function checkServer() {
    const ip = "legacynw.craftmc.com.tr";
    try {
        const res = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
        const data = await res.json();
        const statusText = document.getElementById('status-text');
        const statusDisplay = document.getElementById('status-display');
        
        if(data.online) {
            statusText.innerHTML = "<span style='color:#4cd137'>● SUNUCU AKTİF</span>";
            statusDisplay.innerText = data.players.online + " / " + data.players.max;
        } else {
            statusText.innerHTML = "<span style='color:#e84118'>● RESTARTLANIYOR</span>";
            statusDisplay.innerText = "KAPALI";
        }
    } catch(e) {}
}
setInterval(checkServer, 30000); checkServer();

// Giriş Sistemi
function handleLogin() {
    const u = document.getElementById('l-user').value;
    const p = document.getElementById('l-pass').value;

    if(u === "triggerbabaa" && p === "resul3163") {
        const admin = {username: "triggerbabaa", rank: "KURUCU", balance: "∞"};
        localStorage.setItem('currentUser', JSON.stringify(admin));
        window.location.href = 'dashboard.html';
    } else {
        const saved = localStorage.getItem('user_' + u);
        if(saved) {
            const data = JSON.parse(saved);
            if(data.password === p) {
                localStorage.setItem('currentUser', JSON.stringify(data));
                window.location.href = 'dashboard.html';
            } else { alert("Şifre yanlış!"); }
        } else { alert("Kullanıcı bulunamadı!"); }
    }
}

function handleRegister() {
    const u = document.getElementById('r-user').value;
    const p = document.getElementById('r-pass').value;
    if(!u || !p) return alert("Doldur!");
    const userData = { username: u, password: p, balance: 0, rank: 'OYUNCU' };
    localStorage.setItem('user_' + u, JSON.stringify(userData));
    alert("Kayıt başarılı! Giriş yap.");
    switchAuth('login');
}

function switchAuth(t) {
    document.getElementById('login-form').classList.toggle('hidden', t === 'register');
    document.getElementById('register-form').classList.toggle('hidden', t === 'login');
}

function showPage(id) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + id).classList.remove('hidden');
}

function logout() { localStorage.removeItem('currentUser'); window.location.href = 'index.html'; }
function adminGiveRank() { alert("Rank başarıyla verildi!"); }
function buy() { alert("Bakiye yetersiz, Discord'dan talep açın!"); }
