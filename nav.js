// --- 1. GLOBAL HAPTICS ENGINE (True Native Feel) ---
window.Haptics = {
    light: () => { if(navigator.vibrate) navigator.vibrate(30); },
    success: () => { if(navigator.vibrate) navigator.vibrate([40, 30, 40]); },
    warning: () => { if(navigator.vibrate) navigator.vibrate([50, 50, 50, 50, 50]); }
};

// --- 2. PREMIUM AMOLED DARK ENGINE ---
const darkCSS = `
body, div, p, span, h1, h2, h3, h4, input, button, nav, svg { transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, color 0.4s ease !important; }

html.dark { background-color: #000000; color: #ffffff; }
html.dark body { background-color: #000000 !important; color: #ffffff !important; }
html.dark .bg-white { background-color: #0a0a0a !important; border-color: rgba(255, 255, 255, 0.12) !important; color: #ffffff !important; }
html.dark .bg-gray-50 { background-color: rgba(255, 255, 255, 0.03) !important; border-color: rgba(255, 255, 255, 0.12) !important; }
html.dark .bg-gray-100 { background-color: rgba(255, 255, 255, 0.06) !important; border-color: rgba(255, 255, 255, 0.12) !important; }
html.dark .bg-gray-200 { background-color: rgba(255, 255, 255, 0.12) !important; color: #cbd5e1 !important; }

html.dark .text-gray-900, html.dark .text-gray-800 { color: #ffffff !important; }
html.dark .text-gray-700 { color: #f1f5f9 !important; }
html.dark .text-gray-600 { color: #cbd5e1 !important; }
html.dark .text-gray-500 { color: #9ca3af !important; }
html.dark .text-gray-400 { color: #6b7280 !important; }

html.dark .border-gray-100, html.dark .border-gray-200, html.dark .border-gray-50, html.dark .border-t, html.dark .border-b { border-color: rgba(255, 255, 255, 0.12) !important; }
html.dark .shadow-sm, html.dark .shadow-md, html.dark .shadow-lg { box-shadow: none !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; }

html.dark input { background-color: #0a0a0a !important; color: #ffffff !important; border-color: rgba(255, 255, 255, 0.12) !important; }
html.dark input::placeholder { color: #4b5563 !important; }
html.dark .bg-gray-900 { background-color: #ef4444 !important; color: #ffffff !important; border-color: #ef4444 !important;} 
html.dark .bg-white\\/80 { background-color: rgba(10, 10, 10, 0.85) !important; border-top-color: rgba(255, 255, 255, 0.12) !important; backdrop-filter: blur(16px); }

/* Bottom Sheet Specific Dark Adjustments */
html.dark #bs-container { background-color: #0a0a0a !important; border-top: 1px solid rgba(255,255,255,0.12); }
html.dark #bs-backdrop { background-color: rgba(0,0,0,0.8); }
#bs-amount-container:focus-within { border-color: #fca5a5; box-shadow: 0 0 0 4px rgba(254, 226, 226, 0.5); }
html.dark #bs-amount-container:focus-within { border-color: #ef4444 !important; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2) !important; }
`;

const styleEl = document.createElement('style');
styleEl.innerHTML = darkCSS;
document.head.appendChild(styleEl);

if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

// --- 3. SMART NAVIGATION ROUTING ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isHome = currentPage === 'index.html' || currentPage === '';

window.navTo = function(targetPage) {
    window.Haptics.light();
    if (targetPage === currentPage) return;
    if (isHome) window.location.href = targetPage;
    else window.location.replace(targetPage);
};

// --- 4. INJECT BOTTOM NAV BAR & BOTTOM SHEET OVERLAY ---
const navHTML = `
<div id="bs-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] opacity-0 pointer-events-none transition-opacity duration-500 ease-out" onclick="closeSheet()"></div>
<div id="bs-container" class="fixed bottom-0 left-0 w-full bg-gray-50 rounded-t-[32px] z-[70] transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pb-safe pt-2 flex flex-col max-h-[90vh] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 opacity-60"></div>
    <div class="px-6 pb-20 overflow-y-auto">
        <h2 id="bs-title" class="text-2xl font-bold tracking-tight mb-5">New Entry</h2>
        <form id="bs-form" class="flex flex-col gap-5">
            <div id="bs-amount-container" class="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-center py-8 transition-all">
                <span class="text-3xl font-bold text-gray-300 mr-2">৳</span>
                <input id="bs-amount" type="number" step="0.01" placeholder="0.00" class="text-5xl font-bold bg-transparent outline-none w-full text-center placeholder-gray-200 text-gray-900" required>
            </div>
            
            <div id="bs-expense-options" class="flex flex-col gap-5">
                <div>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Priority</p>
                    <div class="flex gap-2 p-1 bg-gray-200/50 rounded-[20px]">
                        <div onclick="selectBsTile('priority', 'Must')" data-bs-group="priority" data-value="Must" class="flex-1 text-center py-3 rounded-[16px] font-bold text-sm text-gray-500 transition-all duration-300 cursor-pointer">Must</div>
                        <div onclick="selectBsTile('priority', 'Need')" data-bs-group="priority" data-value="Need" class="flex-1 text-center py-3 rounded-[16px] font-bold text-sm text-gray-500 transition-all duration-300 cursor-pointer">Need</div>
                        <div onclick="selectBsTile('priority', 'Want')" data-bs-group="priority" data-value="Want" class="flex-1 text-center py-3 rounded-[16px] font-bold text-sm text-gray-500 transition-all duration-300 cursor-pointer">Want</div>
                    </div>
                </div>
                <div>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Category</p>
                    <div class="grid grid-cols-3 gap-2">
                        <div onclick="selectBsTile('category', 'Food & Dining')" data-bs-group="category" data-value="Food & Dining" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Food</div>
                        <div onclick="selectBsTile('category', 'Transport')" data-bs-group="category" data-value="Transport" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Transport</div>
                        <div onclick="selectBsTile('category', 'Shopping')" data-bs-group="category" data-value="Shopping" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Shopping</div>
                        <div onclick="selectBsTile('category', 'Bills')" data-bs-group="category" data-value="Bills" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Bills</div>
                        <div onclick="selectBsTile('category', 'Entertainment')" data-bs-group="category" data-value="Entertainment" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Entertain</div>
                        <div onclick="selectBsTile('category', 'Other')" data-bs-group="category" data-value="Other" class="bg-white border border-gray-100 text-center py-4 rounded-2xl font-bold text-[11px] text-gray-500 transition-all duration-300 cursor-pointer">Other</div>
                    </div>
                </div>
            </div>

            <input id="bs-desc" type="text" placeholder="Description / Note" class="w-full p-4 bg-white border border-gray-100 rounded-[20px] shadow-sm focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all font-bold" required>
            <button id="bs-save-btn" type="submit" class="w-full bg-gray-900 text-white p-4 rounded-[20px] font-bold active:scale-95 transition-transform shadow-lg flex justify-center items-center gap-2 mt-2">Complete Entry</button>
        </form>
    </div>
</div>

<div class="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50">
    <button onclick="navTo('index.html')" class="flex flex-col items-center p-2 text-gray-400 active:scale-95 transition-transform" id="nav-home">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span class="text-[10px] font-bold">Home</span>
    </button>
    <button onclick="navTo('reports.html')" class="flex flex-col items-center p-2 text-gray-400 active:scale-95 transition-transform" id="nav-reports">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        <span class="text-[10px] font-bold">Reports</span>
    </button>
    
    <button onclick="openSheet()" class="relative -top-5 bg-gray-900 text-white p-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-90 transition-transform">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
    </button>

    <button onclick="navTo('expenses.html')" class="flex flex-col items-center p-2 text-gray-400 active:scale-95 transition-transform" id="nav-history">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="text-[10px] font-bold">History</span>
    </button>
    <button onclick="navTo('profile.html')" class="flex flex-col items-center p-2 text-gray-400 active:scale-95 transition-transform" id="nav-profile">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span class="text-[10px] font-bold">Profile</span>
    </button>
</div>
`;

document.body.insertAdjacentHTML('beforeend', navHTML);

// Highlight Active Tab
if (currentPage.includes('index.html') || currentPage === '') {
    const el = document.getElementById('nav-home'); if(el) el.classList.replace('text-gray-400', 'text-red-600');
} else if (currentPage.includes('reports.html')) {
    const el = document.getElementById('nav-reports'); if(el) el.classList.replace('text-gray-400', 'text-red-600');
} else if (currentPage.includes('expenses.html')) {
    const el = document.getElementById('nav-history'); if(el) el.classList.replace('text-gray-400', 'text-red-600');
} else if (currentPage.includes('profile.html')) {
    const el = document.getElementById('nav-profile'); if(el) el.classList.replace('text-gray-400', 'text-red-600');
}

// --- 5. BOTTOM SHEET LOGIC & BACKGROUND SUPABASE SYNC ---
let navSupabase;
let navIsAdmin = false;
let navCurrentUser = null;
let bsPriority = 'Need';
let bsCategory = 'Food & Dining';

import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm').then(({ createClient }) => {
    navSupabase = createClient('https://xhcrkmmowcjsjiqdqcmb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoY3JrbW1vd2Nqc2ppcWRxY21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NzE2NjksImV4cCI6MjA5NjI0NzY2OX0.Pf71TqC4YZvvtcH17tH1CgWfDLPvKXodVP0FvPjXzIA');
    navSupabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            navCurrentUser = session.user;
            navIsAdmin = navCurrentUser.email.toLowerCase() === 'mh.nus123@gmail.com';
        }
    });
});

window.selectBsTile = (group, value) => {
    window.Haptics.light();
    if (group === 'priority') bsPriority = value;
    if (group === 'category') bsCategory = value;

    document.querySelectorAll(`[data-bs-group="${group}"]`).forEach(el => {
        if (el.dataset.value === value) {
            el.classList.remove('bg-transparent', 'text-gray-500');
            el.classList.add('bg-white', 'shadow-sm', 'text-gray-900', 'font-extrabold', 'scale-105');
        } else {
            el.classList.add('bg-transparent', 'text-gray-500');
            el.classList.remove('bg-white', 'shadow-sm', 'text-gray-900', 'font-extrabold', 'scale-105');
        }
    });
};

window.openSheet = () => {
    window.Haptics.light();
    
    if(navIsAdmin) {
        document.getElementById('bs-title').innerText = "Add Family Balance";
        document.getElementById('bs-expense-options').classList.add('hidden');
        document.getElementById('bs-desc').placeholder = "Description (e.g., Monthly Allowance)";
    } else {
        document.getElementById('bs-title').innerText = "Record Expense";
        document.getElementById('bs-expense-options').classList.remove('hidden');
        document.getElementById('bs-desc').placeholder = "Description / Note";
        selectBsTile('priority', 'Need');
        selectBsTile('category', 'Food & Dining');
    }
    
    document.getElementById('bs-backdrop').classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('bs-container').classList.remove('translate-y-full');
};

window.closeSheet = () => {
    window.Haptics.light();
    document.getElementById('bs-backdrop').classList.add('opacity-0', 'pointer-events-none');
    document.getElementById('bs-container').classList.add('translate-y-full');
    setTimeout(() => { document.getElementById('bs-form').reset(); }, 500); // Matches the new duration-500
};

document.getElementById('bs-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!navCurrentUser) return alert("System connecting, please try again in a moment.");

    const btn = document.getElementById('bs-save-btn');
    const amount = document.getElementById('bs-amount').value;
    const desc = document.getElementById('bs-desc').value;

    btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...`;
    
    const { error } = await navSupabase.from('transactions').insert([{
        type: navIsAdmin ? 'balance' : 'expense',
        priority: navIsAdmin ? null : bsPriority,
        amount: parseFloat(amount),
        category: navIsAdmin ? 'Global Deposit' : bsCategory,
        description: desc || (navIsAdmin ? 'Funds Added' : 'Expense'),
        user_id: navCurrentUser.id 
    }]);

    if (error) { 
        window.Haptics.warning();
        alert(error.message); 
        btn.innerText = "Complete Entry"; 
    } else { 
        window.Haptics.success();
        closeSheet();
        setTimeout(() => window.location.reload(), 300);
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
