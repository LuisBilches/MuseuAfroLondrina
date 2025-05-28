// JavaScript específico para a página de contato
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há parâmetro de sucesso na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('enviado') === 'sucesso') {
        showSuccessMessage();
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensagem de carregamento
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Restaurar botão após 3 segundos (caso haja erro)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
            // Obter dados do formulário
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validação básica
            if (!name || !email || !subject || !message) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validação de email
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio (aqui você integraria com um serviço real)
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpar formulário
            this.reset();
        });
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para mostrar mensagens
    function showMessage(message, type) {
        // Remover mensagem anterior se existir
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Estilos da mensagem
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            animation: slideIn 0.3s ease;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Inserir mensagem após o formulário
        contactForm.insertAdjacentElement('afterend', messageDiv);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 5000);
    }
    
    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        .form-group input:invalid,
        .form-group select:invalid,
        .form-group textarea:invalid {
            border-color: #dc3545;
        }
        
        .form-group input:valid,
        .form-group select:valid,
        .form-group textarea:valid {
            border-color: #28a745;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar efeitos de foco nos campos
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

function showSuccessMessage() {
    // Criar modal de sucesso
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    modalContent.innerHTML = `
        <div style="color: #2c1810; margin-bottom: 20px;">
            <div style="font-size: 4rem; color: #D4AF37; margin-bottom: 20px;">✓</div>
            <h2 style="font-family: 'Pfennig', serif; margin-bottom: 15px;">Mensagem Enviada!</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px;">
                Sua mensagem foi enviada com sucesso para <strong>mmp.londrina@gmail.com</strong>. 
                Entraremos em contato em breve!
            </p>
            <button onclick="closeSuccessModal()" style="
                background: linear-gradient(135deg, #8B4513, #D4AF37);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            ">Fechar</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Fechar modal clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSuccessModal();
        }
    });
    
    // Remover parâmetro da URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

function closeSuccessModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .form-group input:invalid,
    .form-group select:invalid,
    .form-group textarea:invalid {
        border-color: #dc3545;
    }
    
    .form-group input:valid,
    .form-group select:valid,
    .form-group textarea:valid {
        border-color: #28a745;
    }
`;
document.head.appendChild(style);

// Adicionar efeitos de foco nos campos
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}); 