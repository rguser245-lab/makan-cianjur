/* script.js */

// ==========================================
// 1. KONTROL SIDEBAR (HAMBURGER MENU) & TEMA GELAP
// ==========================================
const checkboxTema = document.getElementById('theme-checkbox');
const hamburgerToggle = document.getElementById('hamburger-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

if (hamburgerToggle && sidebar && sidebarOverlay) {
    hamburgerToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    });
}

const tutupMenuSamping = () => {
    if(sidebar) sidebar.classList.remove('active');
    if(sidebarOverlay) sidebarOverlay.classList.remove('active');
};

if (closeSidebar) closeSidebar.addEventListener('click', tutupMenuSamping);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', tutupMenuSamping);

if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark-theme');
    if (checkboxTema) checkboxTema.checked = true;
} else {
    document.body.classList.remove('dark-theme');
    if (checkboxTema) checkboxTema.checked = false;
}

if (checkboxTema) {
    checkboxTema.addEventListener('change', () => {
        if (checkboxTema.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('tema', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('tema', 'light');
        }
    });
}
