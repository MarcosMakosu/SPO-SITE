// SPA Router
const app = document.getElementById('app');

function router(route) {
    window.location.hash = route;
    render(route);
}

window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1) || 'home';
    render(route);
});

async function render(route) {
    // Basic Router Switch
    if (route === 'home') renderHome();
    else if (route === 'directory') renderDirectory();
    else if (route === 'about') renderAbout();
    else if (route === 'events') renderEvents();
    else if (route === 'admin') renderAdmin();
    else if (route === 'join') renderJoin();
    else renderHome();
    
    // Update Icons
    lucide.createIcons();
    
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('active');
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// --- VIEWS ---

function renderHome() {
    app.innerHTML = `
        <div class="container">
            <section class="hero">
                <h1>Excelência em <br> Oftalmologia no Pará</h1>
                <p>Conectando você aos especialistas mais qualificados da região.</p>
                <div class="cta-group">
                    <a href="#directory" onclick="router('directory')" class="btn-hero">
                        Encontrar Médico <i data-lucide="arrow-right"></i>
                    </a>
                    <a href="https://instagram.com/spo.ofc" target="_blank" class="social-glass">
                        <i data-lucide="instagram"></i>
                        <div>
                            <small>Siga-nos</small>
                            <div>@spo.ofc</div>
                        </div>
                    </a>
                </div>
            </section>
            
            <section class="president-msg" style="background: white; padding: 40px; border-radius: 24px; margin-top: 40px; display: flex; gap: 40px; align-items: start;">
                <div style="text-align: center; min-width: 200px;">
                    <img src="https://customer-assets.emergentagent.com/job_6e125dd0-724d-42ad-90c4-2b3d56d9357e/artifacts/ymnppwu0_image.png" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h3 style="margin-top: 15px; color: var(--primary);">Dr. Robson Seiji</h3>
                    <small>Gestão 2025-2026</small>
                </div>
                <div>
                    <h2 style="font-family: var(--font-serif); color: var(--primary); margin-bottom: 20px;">Palavra do Presidente</h2>
                    <p style="line-height: 1.6; color: #475569;">
                        A Sociedade Paraense de Oftalmologia tem como missão promover a excelência no cuidado com a saúde ocular.
                        Vivemos um momento de constante evolução... (Texto completo aqui)
                    </p>
                </div>
            </section>
        </div>
    `;
}

async function renderDirectory() {
    app.innerHTML = '<div class="container"><h2>Carregando...</h2></div>';
    
    try {
        const res = await fetch('/api/doctors');
        const doctors = await res.json();
        
        const html = doctors.map(doc => `
            <div class="card">
                <img src="${doc.image_url}" alt="${doc.name}">
                <h3>${doc.name}</h3>
                <span class="tag">${doc.specialty}</span>
                <p><i data-lucide="map-pin" style="width:14px"></i> ${doc.city}</p>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <span>${doc.contact_info}</span>
                    <a href="https://wa.me/55${doc.contact_info.replace(/\D/g,'')}" target="_blank" style="color: #16a34a;"><i data-lucide="message-circle"></i></a>
                </div>
            </div>
        `).join('');
        
        app.innerHTML = `
            <div class="container">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: var(--font-serif); color: var(--primary); font-size: 2.5rem;">Diretório Médico</h1>
                </div>
                <div class="grid">
                    ${html}
                </div>
            </div>
        `;
    } catch (e) {
        app.innerHTML = '<div class="container">Erro ao carregar dados.</div>';
    }
}

async function renderEvents() {
    try {
        const res = await fetch('/api/events');
        const events = await res.json();
        
        const html = events.map(evt => `
            <div class="card">
                <img src="${evt.image_url}" alt="${evt.title}">
                <h3>${evt.title}</h3>
                <p><strong>${evt.date}</strong> - ${evt.time}</p>
                <p>${evt.location}</p>
                <span class="tag">${evt.status}</span>
            </div>
        `).join('');
        
        app.innerHTML = `
            <div class="container">
                <h1 style="text-align: center; margin-bottom: 40px;">Eventos</h1>
                <div class="grid">
                    ${html}
                </div>
            </div>
        `;
    } catch(e) {}
}

function renderAdmin() {
    // Check Auth
    const token = localStorage.getItem('token');
    if (!token) {
        renderLogin();
        return;
    }
    
    app.innerHTML = `
        <div class="container">
            <div class="admin-header">
                <h1>Painel Administrativo</h1>
                <button onclick="logout()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Sair</button>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 16px; margin-bottom: 40px;">
                <h3>Adicionar Médico</h3>
                <form onsubmit="addDoctor(event)">
                    <div class="form-group"><input type="text" name="name" placeholder="Nome" required></div>
                    <div class="form-group"><input type="text" name="specialty" placeholder="Especialidade" required></div>
                    <div class="form-group"><input type="text" name="city" placeholder="Cidade" required></div>
                    <div class="form-group"><input type="text" name="contact_info" placeholder="Contato" required></div>
                    <div class="form-group"><input type="text" name="image_url" placeholder="URL da Imagem"></div>
                    <button type="submit" class="btn-join">Salvar</button>
                </form>
            </div>
        </div>
    `;
}

function renderLogin() {
    app.innerHTML = `
        <div class="container" style="max-width: 400px; margin-top: 100px;">
            <div style="background: white; padding: 40px; border-radius: 16px; text-align: center;">
                <h2>Login Admin</h2>
                <form onsubmit="login(event)" style="margin-top: 20px;">
                    <div class="form-group"><input type="text" id="username" placeholder="Email" required></div>
                    <div class="form-group"><input type="password" id="password" placeholder="Senha" required></div>
                    <button type="submit" class="btn-join" style="width: 100%;">Entrar</button>
                </form>
            </div>
        </div>
    `;
}

// --- ACTIONS ---

async function login(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
    
    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        renderAdmin();
    } else {
        alert('Erro no login');
    }
}

function logout() {
    localStorage.removeItem('token');
    renderHome();
}

async function addDoctor(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    await fetch('/api/doctors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    
    alert('Médico adicionado!');
    e.target.reset();
}

// Init
render(window.location.hash.substring(1) || 'home');
