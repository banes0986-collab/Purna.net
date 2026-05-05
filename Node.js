// server.js (Basit Minecraft Bot Mantığı)
const mineflayer = require('mineflayer');

function createBot(name) {
    const bot = mineflayer.createBot({
        host: 'localhost', // Sadece kendi sunucunda dene!
        port: 25565,
        username: name
    });

    bot.on('login', () => console.log(`${name} sunucuya giriş yaptı.`));
    bot.on('error', (err) => console.log(`Hata: ${err.message}`));
}

// 10 adet botu sırayla sokma simülasyonu
for(let i=0; i<10; i++) {
    setTimeout(() => createBot(`TriggerBot_${i}`), i * 1000);
}
