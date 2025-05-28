// Funcionalidade do menu lateral
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Função para abrir/fechar menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (email && message) {
                // Aqui você pode implementar o envio do formulário
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards
    document.querySelectorAll('.nav-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Destacar link ativo no menu
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === currentPage || 
                (currentPage === 'index.html' && href === '#inicio') ||
                (currentPage === '' && href === '#inicio')) {
                link.classList.add('active');
            }
        });
    }

    updateActiveLink();
}); 