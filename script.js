document.addEventListener("DOMContentLoaded", () => {
    // Cores vibrantes para as capas dos jogos manterem o charme e contraste com fundo branco
    const colors = ['#fa5252', '#339af0', '#51cf66', '#fcc419', '#845ef7', '#ff922b', '#20c997'];
    
    // Array com os Jogos Oficiais da Turma
    const games = [
        { id: 1, title: "ASCENDIA", description: "Uma jornada épica te aguarda.", icon: "fa-dragon", link: "https://ascendiagame.vercel.app" },
        { id: 2, title: "AURVEDAN", description: "Explore os reinos de fantasia.", icon: "fa-shield-halved", link: "https://aurvedan.netlify.app" },
        { id: 3, title: "BROSS VERSE", description: "Explore este universo alucinante.", icon: "fa-earth-americas", link: "https://brossverse.vercel.app" },
        { id: 4, title: "COELHO ADVENTURE", description: "Aventure-se com o coelhinho.", icon: "fa-carrot", link: "https://coelho-adventure.netlify.app" },
        { id: 5, title: "DARK BACKROOMS", description: "Tente escapar do labirinto.", icon: "fa-door-open", link: "https://darkbackrooms-rdbm.vercel.app" },
        { id: 6, title: "HOMEM ARANHA", description: "Salve a cidade com suas teias.", icon: "fa-spider", link: "https://homem-aranhaa.netlify.app" },
        { id: 7, title: "HOMEM DE FERRO", description: "Voe alto com a armadura.", icon: "fa-robot", link: "https://6abe7c0f0dd23fb3519bd41d--homem-ferro.netlify.app/" },
        { id: 8, title: "MAJESTIC TARTUFO", description: "Mágica e desafios surpreendentes.", icon: "fa-hat-wizard", link: "https://majestic-tartufo-4989ec.netlify.app" },
        { id: 9, title: "SONIC", description: "Velocidade máxima com o ouriço.", icon: "fa-bolt", link: "https://sonic-game-blue.vercel.app" },
        { id: 10, title: "STELLAR2", description: "Batalhas espaciais intensas.", icon: "fa-meteor", link: "https://stellar2.netlify.app" },
        { id: 11, title: "TETRIS", description: "O clássico quebra-cabeça de blocos.", icon: "fa-cubes", link: "https://tetris-anaj.netlify.app" },
        { id: 12, title: "TRUCO ONLINE", description: "Desafie seus amigos nas cartas.", icon: "fa-dice", link: "https://truco-paulista.netlify.app" }
    ];

    const gamesGrid = document.getElementById('gamesGrid');
    
    // Injetando os cards no HTML
    games.forEach((game, index) => {
        const gameCard = document.createElement('a');
        gameCard.href = game.link; 
        // Abre em uma nova guia se for um link real (não for "#")
        if (game.link !== "#") {
            gameCard.target = "_blank";
            gameCard.rel = "noopener noreferrer";
        }
        gameCard.className = 'game-card';
        
        // Define uma cor para o fundo da capa (traz a "criatividade" mas no layout claro)
        const coverColor = colors[index % colors.length];
        
        gameCard.innerHTML = `
            <div class="game-cartridge-label">
                <div class="game-cover" style="background-color: ${coverColor};">
                    <i class="fa-solid ${game.icon}"></i>
                </div>
            </div>
            <div class="game-info">
                <div class="game-title-wrap">
                    <h3>${game.title}</h3>
                </div>
                <p>${game.description}</p>
                <div class="play-btn-wrapper">
                    <span class="btn-text">START</span>
                    <span class="btn-indicator"><i class="fa-solid fa-play"></i></span>
                </div>
            </div>
        `;
        
        // Dispara o efeito explosivo ao clicar, antes do navegador ir para a próxima página
        gameCard.addEventListener('click', (e) => {
            // Nota: NÃO tem e.preventDefault() aqui, então o link VAI ABRIR NORMALMENTE
            createPixelBurst(e.clientX, e.clientY, coverColor);
            
            // Tremorzinho suave para impacto visual do clique
            document.body.style.transform = "translate(3px, 3px)";
            setTimeout(() => document.body.style.transform = "translate(-3px, -3px)", 50);
            setTimeout(() => document.body.style.transform = "translate(0, 0)", 100);
        });

        gamesGrid.appendChild(gameCard);
    });

    // --- Lógica da Tela de Entrada (Console Boot Sequence) ---
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const progressFill = document.getElementById('progressFill');
    const bootStatus = document.getElementById('bootStatus');

    let progress = 0;
    const statuses = ["LOADING ASSETS...", "MOUNTING GAMES...", "INITIALIZING UI...", "SYSTEM READY."];
    
    // Simula o carregamento retro (barra enchendo)
    const bootInterval = setInterval(() => {
        progress += Math.random() * 15; // Enche aos pouquinhos
        if (progress >= 100) progress = 100;
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        
        // Atualiza os textos baseado no progresso
        if (bootStatus) {
            if (progress < 30) bootStatus.innerText = statuses[0];
            else if (progress < 60) bootStatus.innerText = statuses[1];
            else if (progress < 90) bootStatus.innerText = statuses[2];
            else bootStatus.innerText = statuses[3];
        }
        
        // Finaliza o Boot
        if (progress >= 100) {
            clearInterval(bootInterval);
            
            // Pisca a tela de leve (efeito de transição 'ligando a tela')
            if (introScreen) introScreen.style.backgroundColor = "#f1f3f5";
            setTimeout(() => { if (introScreen) introScreen.style.backgroundColor = "#ffffff"; }, 100);
            
            // Depois de pronto, faz a abertura circular linda (Iris Wipe)
            setTimeout(() => {
                if (introScreen) introScreen.classList.add('hidden');
                if (mainContent) mainContent.classList.add('visible');
            }, 600); // pequeno delay final pra ler "SYSTEM READY"
        }
    }, 150); // Velocidade do boot

    // --- Função de Partículas (Explosão de Pixels) ---
    function createPixelBurst(x, y, color) {
        for(let i = 0; i < 12; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel-particle';
            pixel.style.backgroundColor = color;
            pixel.style.left = x + 'px';
            pixel.style.top = y + 'px';
            document.body.appendChild(pixel);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 40 + Math.random() * 80; 
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            setTimeout(() => {
                pixel.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(0)`;
                pixel.style.opacity = '0';
            }, 10);

            setTimeout(() => pixel.remove(), 600);
        }
    }

    // --- Gerador de Partículas de Fundo Clean ---
    const ambientContainer = document.getElementById('ambientParticles');
    if(ambientContainer) {
        for(let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            // Tamanho aleatório (pequeno e sutil)
            const size = 10 + Math.random() * 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição aleatória na tela
            particle.style.left = `${Math.random() * 100}vw`;
            
            // Duração da flutuação bem lenta
            const duration = 15 + Math.random() * 30; // 15 a 45 segundos
            particle.style.animationDuration = `${duration}s`;
            
            // Delay aleatório para não subirem juntas
            particle.style.animationDelay = `${Math.random() * 20}s`;
            
            // Algumas partículas sem borda, preenchidas bem suavemente
            if (Math.random() > 0.5) {
                particle.style.border = 'none';
                particle.style.backgroundColor = 'rgba(0, 0, 0, 0.015)';
            }
            
            ambientContainer.appendChild(particle);
        }
    }

    // --- Lógica do Theme Toggle (Modo Fliperama Escuro) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
            
            // Explosão de pixels no botão para dar um charme
            const rect = themeToggleBtn.getBoundingClientRect();
            for(let i=0; i<15; i++) {
                createPixelBurst(rect.left + rect.width/2, rect.top + rect.height/2, currentTheme === 'dark' ? '#fcc419' : '#00ffcc');
            }
        });
    }
});
