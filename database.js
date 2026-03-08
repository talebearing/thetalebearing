const DB_CLIENTS = 'ttb_db_clients_v25'; const DB_ADMINS = 'ttb_db_admins_v25';
const DB_SETTINGS = 'ttb_db_settings_v25'; const DB_PACKAGES = 'ttb_db_packages_v25'; 
const DB_BOOKINGS = 'ttb_db_bookings_v25'; const DB_ADDONS = 'ttb_db_addons_v25';
const DB_TERMS = 'ttb_db_terms_v25'; const DB_BLOCKED = 'ttb_db_blocked_v25';
const SESSION_KEY = 'ttb_session';

function initDB() {
    // 1. GEMBOK MIGRASI: Cek apakah setting V25 sudah ada. Jika belum, ambil dari V24/V23/V22.
    // Jika V25 sudah ada, JANGAN DITIMPA LAGI agar perubahan Admin tidak hilang saat di-refresh!
    
    if (!localStorage.getItem(DB_SETTINGS)) {
        let oldSettings = localStorage.getItem('ttb_db_settings_v24') || localStorage.getItem('ttb_db_settings_v23') || localStorage.getItem('ttb_db_settings_v22');
        if (oldSettings) {
            let parsed = JSON.parse(oldSettings);
            if(!parsed.locations) parsed.locations = "UNSOED Purwokerto\nUMP Purwokerto\nUIN SAIZU Purwokerto\nUniversitas Amikom Purwokerto\nITTP Purwokerto\nUHB Purwokerto\nJava Heritage Hotel\nAston Imperium Purwokerto\nLuminor Hotel\nMeotel Purwokerto\nGrand Karlita Hotel\nStudio Thetalebearing";
            localStorage.setItem(DB_SETTINGS, JSON.stringify(parsed));
        } else {
            localStorage.setItem(DB_SETTINGS, JSON.stringify({ wa: '6287854238061', brandName: 'Thetalebearing', primaryColor: '#4338CA', bgColor: '#F3F4F6', bankAccount: 'BCA 1234567890 a.n Thetalebearing\nMANDIRI 0987654321 a.n Thetalebearing', maxOrderPerDay: 0, maxConcurrent: 0, opStart: '08:00', opEnd: '20:00', locations: "UNSOED Purwokerto\nUMP Purwokerto\nUIN SAIZU Purwokerto\nUniversitas Amikom Purwokerto\nITTP Purwokerto\nUHB Purwokerto\nJava Heritage Hotel\nAston Imperium Purwokerto\nLuminor Hotel\nMeotel Purwokerto\nGrand Karlita Hotel\nStudio Thetalebearing" }));
        }
    }

    if (!localStorage.getItem(DB_CLIENTS)) {
        let old = localStorage.getItem('ttb_db_clients_v24') || localStorage.getItem('ttb_db_clients_v23') || localStorage.getItem('ttb_db_clients_v22');
        localStorage.setItem(DB_CLIENTS, old || JSON.stringify([]));
    }

    if (!localStorage.getItem(DB_ADMINS)) {
        let old = localStorage.getItem('ttb_db_admins_v24') || localStorage.getItem('ttb_db_admins_v23') || localStorage.getItem('ttb_db_admins_v22');
        if (old) localStorage.setItem(DB_ADMINS, old);
        else localStorage.setItem(DB_ADMINS, JSON.stringify([{user: 'admin', pass: 'admin', role: 'superadmin', email: 'admin@thetalebearing.com', phone: '087854238061'}]));
    }

    if (!localStorage.getItem(DB_BOOKINGS)) {
        let old = localStorage.getItem('ttb_db_bookings_v24') || localStorage.getItem('ttb_db_bookings_v23') || localStorage.getItem('ttb_db_bookings_v22');
        localStorage.setItem(DB_BOOKINGS, old || JSON.stringify([]));
    }

    if (!localStorage.getItem(DB_BLOCKED)) {
        let old = localStorage.getItem('ttb_db_blocked_v24') || localStorage.getItem('ttb_db_blocked_v23') || localStorage.getItem('ttb_db_blocked_v22');
        localStorage.setItem(DB_BLOCKED, old || JSON.stringify([]));
    }

    // Mengamankan Data Paket Lengkap
    if (!localStorage.getItem(DB_PACKAGES)) {
        let oldPkgs = localStorage.getItem('ttb_db_packages_v24') || localStorage.getItem('ttb_db_packages_v23') || localStorage.getItem('ttb_db_packages_v22');
        if(oldPkgs && JSON.parse(oldPkgs).length > 3) { 
            localStorage.setItem(DB_PACKAGES, oldPkgs); 
        } else {
            localStorage.setItem(DB_PACKAGES, JSON.stringify([
                // GRADUATION
                { id: 1, category: "Graduation", name: "Quick Session", price: 250000, quota: 30, duration: "30 Menit", details: "Sesi personal. 30 foto edit & semua softfile (G-Drive)." },
                { id: 2, category: "Graduation", name: "Personal Package", price: 375000, quota: 30, duration: "60 Menit", details: "Sesi personal/keluarga. 30 foto edit & semua softfile." },
                { id: 3, category: "Graduation", name: "Couple Package", price: 475000, quota: 30, duration: "60 Menit", details: "Sesi berpasangan. 30 foto edit & semua softfile." },
                { id: 4, category: "Graduation", name: "Group 1 (Maks 4 Lulusan)", price: 600000, quota: 30, duration: "60 Menit", details: "Hingga 4 lulusan. 30 foto edit & semua softfile." },
                { id: 5, category: "Graduation", name: "Group 2 (Maks 7 Lulusan)", price: 900000, quota: 40, duration: "90 Menit", details: "Hingga 7 lulusan. 40 foto edit & semua softfile." },
                { id: 6, category: "Graduation", name: "Group 3 (Maks 12 Lulusan)", price: 1500000, quota: 60, duration: "90 Menit", details: "Hingga 12 lulusan. 60 foto edit & semua softfile." },
                { id: 7, category: "Graduation", name: "Bundling Package", price: 1200000, quota: 30, duration: "120 Menit", details: "Sesi foto & video personal. 30 foto edit, video 40-60 detik." },
                
                // ENGAGEMENT
                { id: 8, category: "Wedding", name: "Engagement - Lengkap", price: 1750000, quota: 100, duration: "4 Jam", details: "Liputan 4 jam, 100+ foto edit, dan video sinematik 1 menit." },
                { id: 9, category: "Wedding", name: "Engagement - Foto Saja", price: 1000000, quota: 80, duration: "4 Jam", details: "Liputan 4 jam dan 80+ foto edit." },
                { id: 10, category: "Wedding", name: "Engagement - Video Saja", price: 1000000, quota: 0, duration: "4 Jam", details: "Liputan 4 jam dan video sinematik 1 menit." },
                
                // PREWEDDING
                { id: 11, category: "Wedding", name: "Prewedding - Lengkap", price: 2000000, quota: 100, duration: "6 Jam", details: "Liputan 6 jam, 100+ foto edit, dan video sinematik 1 menit." },
                { id: 12, category: "Wedding", name: "Prewedding - Foto Saja", price: 1250000, quota: 100, duration: "4 Jam", details: "Liputan 4 jam dan 100+ foto edit." },
                { id: 13, category: "Wedding", name: "Prewedding - Video Saja", price: 1000000, quota: 0, duration: "4 Jam", details: "Liputan 4 jam dan video sinematik 1 menit." },

                // WEDDING
                { id: 14, category: "Wedding", name: "Saga Package", price: 3250000, quota: 150, duration: "6 Jam", details: "150+ foto, video sinematik 1 mnt. 2 FG, 1 VG. Cetak 12R + bingkai, smart album." },
                { id: 15, category: "Wedding", name: "Novela Package", price: 4500000, quota: 200, duration: "8 Jam", details: "200+ foto, video 2-3 mnt. 2 FG, 2 VG. Cetak 16R + bingkai, magazine album, story book." },
                { id: 16, category: "Wedding", name: "Matrimony Package", price: 5750000, quota: 250, duration: "8 Jam", details: "250+ foto, video 2-3 mnt + teaser 30 dtk. 2 FG, 2 VG. 16R + bingkai, 2 smart album, 2 magazine album, 2 story book." }
            ]));
        }
    }

    if (!localStorage.getItem(DB_ADDONS)) {
        let oldAddons = localStorage.getItem('ttb_db_addons_v24') || localStorage.getItem('ttb_db_addons_v23') || localStorage.getItem('ttb_db_addons_v22');
        if(oldAddons && JSON.parse(oldAddons).length > 0) {
            localStorage.setItem(DB_ADDONS, oldAddons);
        } else {
            localStorage.setItem(DB_ADDONS, JSON.stringify([
                { id: 1, category: "Graduation", name: "Penambahan Lulusan", price: 150000, time: 0 },
                { id: 2, category: "Graduation", name: "Tambahan Lokasi", price: 150000, time: 0 },
                { id: 3, category: "Graduation", name: "Edit Foto Tambahan", price: 100000, time: 0 },
                { id: 4, category: "Graduation", name: "Same Day Edit", price: 100000, time: 0 },
                { id: 5, category: "Graduation", name: "Waktu (+30 Menit)", price: 175000, time: 30 },
                { id: 6, category: "Graduation", name: "Waktu (+60 Menit)", price: 200000, time: 60 },
                { id: 7, category: "Wedding", name: "Tambahan 1 Fotografer", price: 700000, time: 0 },
                { id: 8, category: "Wedding", name: "Tambahan 1 Videografer", price: 700000, time: 0 },
                { id: 9, category: "Wedding", name: "Layanan Siraman", price: 250000, time: 0 },
                { id: 10, category: "Wedding", name: "Drone (FPV/Aerial)", price: 1000000, time: 0 },
                { id: 11, category: "Wedding", name: "Realtime Photo", price: 750000, time: 0 }
            ]));
        }
    }

    if (!localStorage.getItem(DB_TERMS)) {
        let old = localStorage.getItem('ttb_db_terms_v24') || localStorage.getItem('ttb_db_terms_v23') || localStorage.getItem('ttb_db_terms_v22');
        localStorage.setItem(DB_TERMS, old || JSON.stringify({}));
    }

    if(!localStorage.getItem('ttb_lang')) localStorage.setItem('ttb_lang', 'id');
}

// GETTERS
function getClients() { return JSON.parse(localStorage.getItem(DB_CLIENTS)) || []; }
function getAdmins() { 
    let adms = JSON.parse(localStorage.getItem(DB_ADMINS)) || []; 
    let master = adms.find(a => a.user === 'admin');
    if(master && master.role !== 'superadmin') { master.role = 'superadmin'; localStorage.setItem(DB_ADMINS, JSON.stringify(adms)); }
    return adms;
}
function getSettings() { return JSON.parse(localStorage.getItem(DB_SETTINGS)) || {}; }
function getPackages() { return JSON.parse(localStorage.getItem(DB_PACKAGES)) || []; }
function getBookings() { return JSON.parse(localStorage.getItem(DB_BOOKINGS)) || []; }
function getAddons() { return JSON.parse(localStorage.getItem(DB_ADDONS)) || []; }
function getTerms() { return JSON.parse(localStorage.getItem(DB_TERMS)) || {}; }
function getBlocked() { return JSON.parse(localStorage.getItem(DB_BLOCKED)) || []; }

// SETTERS
function saveClients(data) { localStorage.setItem(DB_CLIENTS, JSON.stringify(data)); }
function saveAdmins(data) { localStorage.setItem(DB_ADMINS, JSON.stringify(data)); }
function saveSettings(data) { localStorage.setItem(DB_SETTINGS, JSON.stringify(data)); applyTheme(); }
function savePackages(data) { localStorage.setItem(DB_PACKAGES, JSON.stringify(data)); }
function saveBookings(data) { localStorage.setItem(DB_BOOKINGS, JSON.stringify(data)); }
function saveAddons(data) { localStorage.setItem(DB_ADDONS, JSON.stringify(data)); }
function saveTerms(data) { localStorage.setItem(DB_TERMS, JSON.stringify(data)); }
function saveBlocked(data) { localStorage.setItem(DB_BLOCKED, JSON.stringify(data)); }

function getSession() { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
function setSession(data) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)); }
function logout() { sessionStorage.removeItem(SESSION_KEY); window.location.href = 'index.html'; }

function formatRupiah(angka) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0); }
function maskRupiah(el) { let val = el.value.replace(/\D/g, ''); el.value = val ? new Intl.NumberFormat('id-ID').format(val) : ''; }
function unmask(val) { if(!val) return 0; return parseInt(val.toString().replace(/\D/g, '')) || 0; }
function timeToMins(t) { if(!t) return 0; let [h,m]=t.split(':'); return parseInt(h)*60+parseInt(m); }
function minsToTime(m) { let h=Math.floor(m/60); let min=m%60; return `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`; }
function parseDurationToMins(durStr) { if(!durStr) return 0; let str = durStr.toLowerCase(); let val = parseInt(str); return str.includes('jam') ? val * 60 : val; }

function isDayBlocked(date) { let blocked = getBlocked(); for(let b of blocked) { if(b.date === date && b.isFullDay) return true; } return false; }
function checkConflict(date, startStr, endStr, ignoreClientIdx = -1, ignoreBookingIdx = -1) {
    if(!date || !startStr || !endStr) return false;
    let reqS = timeToMins(startStr); let reqE = timeToMins(endStr);
    let blocked = getBlocked();
    for(let b of blocked) { if(b.date === date) { if(b.isFullDay) return true; let bS = timeToMins(b.start); let bE = timeToMins(b.end); if(reqS < bE && reqE > bS) return true; } }
    let maxC = parseInt(getSettings().maxConcurrent); if(isNaN(maxC) || maxC <= 0) return false;
    let conflicts = 0;
    getClients().forEach((c, i) => { if(c.date === date && i !== ignoreClientIdx && !c.isFinished) { let [cStart, cEnd] = (c.timeRange||"").split(' - '); if(cStart && cEnd) { if(reqS < timeToMins(cEnd) && reqE > timeToMins(cStart)) conflicts++; } } });
    getBookings().forEach((b, i) => { if(b.date === date && i !== ignoreBookingIdx && !b.isAccepted) { let [bStart, bEnd] = (b.timeRange||"").split(' - '); if(bStart && bEnd) { if(reqS < timeToMins(bEnd) && reqE > timeToMins(bStart)) conflicts++; } } });
    return conflicts >= maxC;
}

function getPendingBookingCount() { return getBookings().filter(b => !b.isAccepted).length; }
function updateNotifBadge() { const count = getPendingBookingCount(); const b = document.getElementById('notif-badge'); if(b) { if(count > 0) { b.innerText = count; b.classList.remove('hidden'); } else { b.classList.add('hidden'); } } }
function applyTheme() { const s = getSettings(); if(s.primaryColor) document.documentElement.style.setProperty('--primary', s.primaryColor); if(s.bgColor) document.documentElement.style.setProperty('--bg', s.bgColor); document.querySelectorAll('.brand').forEach(el => el.innerText = s.brandName || "Thetalebearing"); }

const i18n = {
    'id': { 't_lang': '🌐 Switch to English', 't_desc': 'Dokumentasikan momen terbaik Anda bersama layanan profesional kami.', 't_portal': 'Client Portal', 't_login_desc': 'Masuk untuk memilih dan mendownload foto.', 't_user': 'Username', 't_pass': 'Password', 't_login_btn': 'Masuk Aplikasi', 't_no_session': 'Belum Punya Sesi?', 't_book_btn': '📅 Pesan Jadwal Pemotretan Sekarang', 't_back': '← Kembali', 't_book_desc': 'Lengkapi data diri dan pilih paket impian Anda.', 't_name': 'Nama Lengkap / Instansi', 't_wa': 'Nomor WhatsApp Aktif', 't_cat': 'Kategori Sesi', 't_choose_pkg': 'Pilih Paket', 't_date': 'Tanggal Sesi', 't_start': 'Jam Mulai', 't_end': 'Jam Selesai', 't_addons': 'Layanan Tambahan / Add-ons', 't_est': 'ESTIMASI TAGIHAN (IDR)', 't_dp_info': '*Wajib melakukan konfirmasi pembayaran DP untuk mengunci jadwal.', 't_bank': 'Transfer Pembayaran ke Rekening Kami:', 't_submit_wa': 'Kirim & Konfirmasi via WA', 't_loc': 'Pilih Lokasi Pemotretan', 't_loc_other': 'Tulis Nama Lokasi Anda', 't_maps': 'Link Google Maps (Bila ada)', 't_grad_warn': '⚠️ <b>Perhatian Khusus Graduation:</b> Jika lokasi di luar area kampus atau hotel prosesi wisuda, admin/fotografer berhak meminta tambahan biaya transport. Mohon konfirmasi kembali kepada admin.' },
    'en': { 't_lang': '🌐 Ubah ke Indonesia', 't_desc': 'Document your best moments with our professional services.', 't_portal': 'Client Portal', 't_login_desc': 'Log in to select and download your photos.', 't_user': 'Username', 't_pass': 'Password', 't_login_btn': 'Login to Portal', 't_no_session': 'Don\'t have a session yet?', 't_book_btn': '📅 Book Your Session Now', 't_back': '← Back', 't_book_desc': 'Fill in your details and choose your dream package.', 't_name': 'Full Name / Agency', 't_wa': 'Active WhatsApp Number', 't_cat': 'Session Category', 't_choose_pkg': 'Choose Package', 't_date': 'Session Date', 't_start': 'Start Time', 't_end': 'End Time', 't_addons': 'Additional Services / Add-ons', 't_est': 'ESTIMATED BILL (IDR)', 't_dp_info': '*Down Payment confirmation is required to lock the schedule.', 't_bank': 'Transfer Payment to our Bank Account:', 't_submit_wa': 'Send & Confirm via WhatsApp', 't_loc': 'Choose Photoshoot Location', 't_loc_other': 'Type Your Location Name', 't_maps': 'Google Maps Link (Optional)', 't_grad_warn': '⚠️ <b>Graduation Notice:</b> If the location is outside the campus or graduation hotel area, the admin/photographer reserves the right to request an additional transportation fee. Please confirm with the admin.' }
};

function toggleLang() { let l = localStorage.getItem('ttb_lang') === 'id' ? 'en' : 'id'; localStorage.setItem('ttb_lang', l); applyLang(); }
function applyLang() { const lang = localStorage.getItem('ttb_lang') || 'id'; document.querySelectorAll('[data-i18n]').forEach(el => { let key = el.getAttribute('data-i18n'); if(i18n[lang][key]) { if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = i18n[lang][key]; else el.innerHTML = i18n[lang][key]; } }); }

initDB(); applyTheme(); document.addEventListener("DOMContentLoaded", applyLang);