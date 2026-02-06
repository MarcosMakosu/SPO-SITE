// Mock Data (Since we have no backend in this pure static version)
const MOCK_DATA = {
    doctors: [
        {
            id: "1",
            name: "Dr. Carlos Mendes",
            city: "Belém",
            specialty: "Cirurgia de Catarata",
            contact_info: "(91) 3222-1234",
            image_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "2",
            name: "Dra. Ana Paula Souza",
            city: "Ananindeua",
            specialty: "Oftalmopediatria",
            contact_info: "(91) 3255-5678",
            image_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "3",
            name: "Dr. Roberto Silva",
            city: "Santarém",
            specialty: "Retina e Vítreo",
            contact_info: "(93) 3522-9090",
            image_url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
        }
    ],
    events: [
        {
            id: "1",
            title: "V Congresso Paraense",
            date: "15-17 Out, 2025",
            time: "08:00 - 18:00",
            location: "Hangar",
            description: "O maior evento da oftalmologia no norte.",
            status: "Inscrições Abertas",
            image_url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
            external_link: "https://example.com"
        }
    ]
};

// State Management
let state = {
    doctors: JSON.parse(localStorage.getItem('spo_doctors')) || MOCK_DATA.doctors,
    events: JSON.parse(localStorage.getItem('spo_events')) || MOCK_DATA.events,
    user: JSON.parse(localStorage.getItem('spo_user')) || null
};

// Router
function navigate(route) {
    window.location.hash = route;
    render(route);
    // Close mobile menu
    document.getElementById('mobile-menu').classList.add('hidden');
    window.scrollTo(0,0);
}

window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1) || 'home';
    render(route);
});

// Main Render Function
function render(route) {
    const app = document.getElementById('app');
    
    // Refresh Icons after render
    setTimeout(() => lucide.createIcons(), 50);

    switch(route) {
        case 'home':
            app.innerHTML = renderHome();
            break;
        case 'directory':
            app.innerHTML = renderDirectory();
            break;
        case 'about':
            app.innerHTML = renderAbout();
            break;
        case 'events':
            app.innerHTML = renderEvents();
            break;
        case 'join':
            app.innerHTML = renderJoin();
            break;
        case 'admin':
            if (!state.user) renderLogin(app);
            else renderAdmin(app);
            break;
        default:
            app.innerHTML = renderHome();
    }
}

// --- Views ---

function renderHome() {
    return `
        <div class="max-w-7xl mx-auto px-6 space-y-24 py-12">
            <!-- Hero -->
            <section class="relative rounded-3xl bg-primary-900 text-white py-16 px-8 md:px-16 overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385180-1ea55f6196e0')] opacity-20 bg-cover bg-center"></div>
                <div class="relative z-10 max-w-3xl">
                    <h1 class="font-serif text-4xl md:text-6xl font-light mb-6 leading-tight">
                        Excelência em <br/> <span class="font-bold">Oftalmologia no Pará</span>
                    </h1>
                    <p class="text-xl text-primary-50 mb-10 max-w-2xl opacity-90">
                        Conectando você aos especialistas mais qualificados da região com ética e tecnologia.
                    </p>
                    <div class="flex flex-wrap gap-4 items-center">
                        <a href="#join" onclick="navigate('join')" class="bg-white text-primary-900 hover:bg-slate-100 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all flex items-center gap-2">
                            Seja um Associado <i data-lucide="arrow-right"></i>
                        </a>
                        
                        <!-- Instagram Glass Card -->
                        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 pr-6 flex items-center gap-4 hover:bg-white/20 transition-all cursor-pointer group">
                            <div class="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
                                <i data-lucide="instagram" class="text-white"></i>
                            </div>
                            <a href="https://www.instagram.com/spo.ofc" target="_blank" class="flex flex-col">
                                <span class="text-xs text-blue-100 uppercase tracking-wider font-bold">Siga-nos</span>
                                <span class="text-white font-bold text-lg">@spo.ofc</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- President Message -->
            <section class="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10 items-start">
                <div class="md:w-1/3 flex flex-col items-center text-center">
                    <div class="relative mb-4">
                        <div class="absolute inset-0 bg-primary/10 rounded-full translate-x-2 translate-y-2"></div>
                        <img src="https://customer-assets.emergentagent.com/job_6e125dd0-724d-42ad-90c4-2b3d56d9357e/artifacts/ymnppwu0_image.png" 
                             class="w-48 h-48 rounded-full object-cover shadow-lg relative z-10 border-4 border-white">
                    </div>
                    <h3 class="font-serif text-xl font-bold text-primary">Dr. Robson Seiji T. Koyama</h3>
                    <span class="text-sm text-slate-500 font-bold uppercase tracking-wider">Gestão 2025-2026</span>
                </div>
                <div class="md:w-2/3 space-y-6">
                    <div class="flex items-center gap-3">
                        <i data-lucide="quote" class="text-primary/20 rotate-180 w-8 h-8"></i>
                        <h2 class="font-serif text-3xl text-primary font-bold">Palavra do Presidente</h2>
                    </div>
                    <div class="text-slate-600 leading-relaxed space-y-4 text-justify">
                        <p>A Sociedade Paraense de Oftalmologia tem como missão promover a excelência no cuidado com a saúde ocular...</p>
                        <p class="font-medium text-primary">"Juntos, seguimos trabalhando para elevar o padrão da Oftalmologia em nosso estado."</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderDirectory() {
    const cards = state.doctors.map(doc => `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-xl transition-all group">
            <div class="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-100">
                <img src="${doc.image_url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/400x300?text=Foto'">
                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">Membro S.P.O</div>
            </div>
            <h3 class="font-serif text-xl font-bold text-primary mb-1">${doc.name}</h3>
            <div class="text-accent font-medium text-sm mb-2 flex items-center gap-1"><i data-lucide="stethoscope" class="w-4"></i> ${doc.specialty}</div>
            <div class="text-slate-500 text-sm mb-4 flex items-center gap-1"><i data-lucide="map-pin" class="w-4"></i> ${doc.city}</div>
            <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span class="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-1 rounded-lg">${doc.contact_info}</span>
                <a href="https://wa.me/55${doc.contact_info.replace(/\D/g,'')}" target="_blank" class="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors">
                    <i data-lucide="message-circle" class="w-5 h-5"></i>
                </a>
            </div>
        </div>
    `).join('');

    return `
        <div class="max-w-7xl mx-auto px-6 py-12">
            <h1 class="font-serif text-4xl text-center text-primary font-bold mb-12">Diretório Médico</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${cards}
            </div>
        </div>
    `;
}

function renderEvents() {
    const cards = state.events.map(evt => `
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all">
            <div class="md:w-1/3 h-48 md:h-auto relative">
                <img src="${evt.image_url}" class="w-full h-full object-cover">
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg font-bold text-primary text-sm shadow">
                    <i data-lucide="calendar" class="w-4 inline mr-1"></i> ${evt.date}
                </div>
            </div>
            <div class="p-6 md:w-2/3 flex flex-col">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">${evt.status}</span>
                    <span class="text-sm text-slate-500 flex items-center gap-1"><i data-lucide="clock" class="w-4"></i> ${evt.time}</span>
                </div>
                <h3 class="font-serif text-2xl font-bold text-primary mb-2">${evt.title}</h3>
                <p class="text-slate-600 mb-4 line-clamp-2">${evt.description}</p>
                <div class="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span class="text-sm text-slate-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-4"></i> ${evt.location}</span>
                    ${evt.external_link ? `<a href="${evt.external_link}" target="_blank" class="text-primary font-bold flex items-center gap-1 hover:text-accent">Saiba Mais <i data-lucide="arrow-right" class="w-4"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="max-w-5xl mx-auto px-6 py-12 space-y-12">
            <div class="text-center">
                <h1 class="font-serif text-4xl text-primary font-bold mb-4">Eventos e Congressos</h1>
                <p class="text-slate-500 text-lg">Fique por dentro da agenda oficial da oftalmologia paraense.</p>
            </div>
            <div class="space-y-8">
                ${cards}
            </div>
        </div>
    `;
}

function renderAbout() {
    return `
        <div class="max-w-5xl mx-auto px-6 py-12 space-y-16">
            <div class="text-center space-y-4">
                <h1 class="font-serif text-4xl text-primary font-bold">Sobre a Sociedade</h1>
                <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                    Fundada com o compromisso de elevar os padrões da oftalmologia no Pará.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all">
                    <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary"><i data-lucide="shield" class="w-8 h-8"></i></div>
                    <h3 class="font-serif text-xl font-bold text-primary mb-2">Ética Médica</h3>
                    <p class="text-slate-500">Compromisso inegociável com a integridade.</p>
                </div>
                <div class="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all">
                    <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary"><i data-lucide="target" class="w-8 h-8"></i></div>
                    <h3 class="font-serif text-xl font-bold text-primary mb-2">Excelência</h3>
                    <p class="text-slate-500">Incentivo constante à pesquisa e educação.</p>
                </div>
                <div class="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all">
                    <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary"><i data-lucide="users" class="w-8 h-8"></i></div>
                    <h3 class="font-serif text-xl font-bold text-primary mb-2">Social</h3>
                    <p class="text-slate-500">Democratizar o acesso à saúde visual.</p>
                </div>
            </div>
        </div>
    `;
}

function renderJoin() {
    return `
        <div class="max-w-3xl mx-auto px-6 py-12">
            <div class="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl">
                <div class="text-center mb-10">
                    <span class="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Para Médicos</span>
                    <h1 class="font-serif text-3xl md:text-4xl text-primary font-bold mt-4 mb-2">Associe-se à S.P.O.</h1>
                    <p class="text-slate-500">Faça parte de uma comunidade de excelência.</p>
                </div>
                
                <form onsubmit="alert('Solicitação enviada (Simulação)!'); return false;" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                            <input type="text" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Dr. Nome Sobrenome">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">CRM / UF</label>
                            <input type="text" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="0000 PA">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
                        <input type="email" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" placeholder="medico@email.com">
                    </div>
                    <button class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-900 transition-all shadow-lg">
                        Enviar Solicitação
                    </button>
                </form>
            </div>
        </div>
    `;
}

// --- Admin (Client-side Logic) ---

function renderLogin(target) {
    target.innerHTML = `
        <div class="max-w-md mx-auto px-6 py-20">
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center">
                <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><i data-lucide="lock" class="w-8 h-8"></i></div>
                <h2 class="font-serif text-2xl font-bold text-primary mb-6">Acesso Admin</h2>
                <form onsubmit="handleLogin(event)" class="space-y-4">
                    <input type="email" name="email" placeholder="admin@medassoc.com" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary">
                    <input type="password" name="password" placeholder="admin123" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary">
                    <button class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-900 transition-colors">Entrar</button>
                </form>
            </div>
        </div>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    
    if (email === 'admin@medassoc.com' && pass === 'admin123') {
        state.user = { name: 'Admin', email };
        localStorage.setItem('spo_user', JSON.stringify(state.user));
        renderAdmin(document.getElementById('app'));
    } else {
        alert('Credenciais inválidas! (Use: admin@medassoc.com / admin123)');
    }
}

function renderAdmin(target) {
    target.innerHTML = `
        <div class="max-w-4xl mx-auto px-6 py-12">
            <div class="flex justify-between items-center mb-8">
                <h1 class="font-serif text-3xl font-bold text-primary">Painel Admin</h1>
                <button onclick="logout()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold transition-colors">Sair</button>
            </div>
            
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg mb-8">
                <h3 class="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2"><i data-lucide="plus-circle" class="text-primary"></i> Adicionar Médico</h3>
                <form onsubmit="addDoctor(event)" class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Nome (Ex: Dr. Silva)" required class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl w-full">
                        <input name="specialty" placeholder="Especialidade" required class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl w-full">
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <input name="city" placeholder="Cidade" required class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl w-full">
                        <input name="contact" placeholder="Telefone" required class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl w-full">
                    </div>
                    <input name="image" placeholder="URL da Foto (https://...)" class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl w-full">
                    <button class="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-900 transition-colors w-full md:w-auto">Salvar Médico</button>
                </form>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function addDoctor(e) {
    e.preventDefault();
    const form = e.target;
    const newDoc = {
        id: Date.now().toString(),
        name: form.name.value,
        specialty: form.specialty.value,
        city: form.city.value,
        contact_info: form.contact.value,
        image_url: form.image.value || "https://placehold.co/400x300?text=Sem+Foto"
    };
    
    state.doctors.push(newDoc);
    localStorage.setItem('spo_doctors', JSON.stringify(state.doctors));
    alert('Médico adicionado com sucesso!');
    form.reset();
}

function logout() {
    state.user = null;
    localStorage.removeItem('spo_user');
    navigate('home');
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
    document.getElementById('mobile-menu').classList.toggle('flex');
}

// Start App
navigate(window.location.hash.substring(1) || 'home');
