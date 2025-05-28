// JavaScript específico para a página de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
            
            // Simular envio (aqui você implementaria o envio real)
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