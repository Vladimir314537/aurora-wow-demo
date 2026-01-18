// Aurora Mirror 4.0 - Минимальный рабочий код
console.log('Aurora Mirror 4.0 загружается...');

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем...');
    initializeApp();
});

function initializeApp() {
    console.log('Инициализация приложения...');
    
    // 1. Счётчик символов
    const textInput = document.getElementById('thought-input');
    if (textInput) {
        textInput.addEventListener('input', function() {
            const count = this.value.length;
            const counter = document.getElementById('char-count');
            if (counter) counter.textContent = count;
        });
    }
    
    // 2. Кнопка анализа - ПРОСТОЙ РАБОЧИЙ КОД
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        console.log('Кнопка анализа найдена, добавляем обработчик');
        analyzeBtn.addEventListener('click', function() {
            console.log('Кнопка "Анализировать" нажата!');
            performSimpleAnalysis();
        });
    } else {
        console.error('Кнопка анализа не найдена!');
    }
    
    // 3. Быстрые темы
    document.querySelectorAll('.quick-tag').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            if (textInput) {
                textInput.value = text;
                textInput.dispatchEvent(new Event('input'));
                showSimpleMessage('Тема добавлена: ' + this.textContent);
            }
        });
    });
    
    // 4. Переключение результатов
    const toggleBtn = document.getElementById('toggle-results');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const results = document.getElementById('results-section');
            const icon = this.querySelector('i');
            
            if (results.style.display === 'none' || !results.style.display) {
                results.style.display = 'block';
                if (icon) icon.className = 'fas fa-chevron-up';
            } else {
                results.style.display = 'none';
                if (icon) icon.className = 'fas fa-chevron-down';
            }
        });
    }
    
    // 5. Начать эксперимент
    const startExpBtn = document.getElementById('start-experiment');
    if (startExpBtn) {
        startExpBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
            this.disabled = true;
            showSimpleMessage('Эксперимент запущен!');
        });
    }
    
    // 6. Проверить приватность
    const verifyBtn = document.getElementById('verify-privacy');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            showSimpleMessage('Откройте DevTools (F12) → вкладка Network → 0 запросов!');
            
            // Анимация проверки
            document.querySelectorAll('.verification-step').forEach((step, i) => {
                setTimeout(() => {
                    step.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        step.style.transform = '';
                    }, 300);
                }, i * 200);
            });
        });
    }
    
    // 7. Селектор времени
    const timeframeSelect = document.getElementById('timeframe-select');
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', function() {
            const days = this.value;
            showSimpleMessage('Проекция обновлена на ' + days + ' дней');
        });
    }
    
    console.log('Все обработчики добавлены!');
}

// Простой анализ
function performSimpleAnalysis() {
    console.log('Запуск простого анализа...');
    
    const textInput = document.getElementById('thought-input');
    const text = textInput ? textInput.value.trim() : '';
    
    if (text.length < 10) {
        showSimpleMessage('Введите минимум 10 символов', 'warning');
        return;
    }
    
    // Показываем загрузку
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        const originalText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализ...';
        analyzeBtn.disabled = true;
        
        // Имитация анализа
        setTimeout(() => {
            // Показываем результаты
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.style.display = 'block';
                document.getElementById('toggle-results').innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
            
            // Обновляем эмоциональный спектр (случайный пример)
            const emotionValue = Math.min(95, Math.max(20, Math.floor(Math.random() * 100)));
            document.getElementById('emotion-fill').style.width = emotionValue + '%';
            document.getElementById('emotion-value').textContent = emotionValue + '%';
            
            // Восстанавливаем кнопку
            analyzeBtn.innerHTML = originalText;
            analyzeBtn.disabled = false;
            
            showSimpleMessage('✅ Анализ завершён локально!', 'success');
            
            // Анимация
            animateResults();
            
        }, 1500);
    }
}

// Простая анимация результатов
function animateResults() {
    const cards = document.querySelectorAll('.result-card, .scenario-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

// Простое сообщение
function showSimpleMessage(message, type = 'info') {
    console.log('Сообщение:', message);
    
    // Создаём простой alert для отладки
    if (type === 'error') {
        console.error(message);
    } else if (type === 'warning') {
        console.warn(message);
    } else {
        console.log(message);
    }
    
    // Создаём всплывающее сообщение в интерфейсе
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#6366f1'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
    
    // Добавляем стили анимации
    if (!document.querySelector('#message-animation')) {
        const style = document.createElement('style');
        style.id = 'message-animation';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Проверяем, что все элементы на месте
function debugElements() {
    console.log('=== ОТЛАДКА ЭЛЕМЕНТОВ ===');
    console.log('Поле ввода:', document.getElementById('thought-input') ? '✓' : '✗');
    console.log('Кнопка анализа:', document.getElementById('analyze-btn') ? '✓' : '✗');
    console.log('Быстрые теги:', document.querySelectorAll('.quick-tag').length);
    console.log('Секция результатов:', document.getElementById('results-section') ? '✓' : '✗');
    console.log('Кнопка эксперимента:', document.getElementById('start-experiment') ? '✓' : '✗');
    console.log('=========================');
}

// Запускаем отладку при загрузке
setTimeout(debugElements, 100);
