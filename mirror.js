// Основной файл JavaScript для Зеркала Будущего
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initEventListeners();
    initLocalAnalyzer();
    initBackgroundEffects();
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
function initEventListeners() {
    // Анализ текста
    const analyzeBtn = document.getElementById('analyze-btn');
    const thoughtInput = document.getElementById('thought-input');
    
    analyzeBtn.addEventListener('click', () => {
        const text = thoughtInput.value.trim();
        if (text.length < 10) {
            showNotification('Пожалуйста, введите больше текста для анализа (минимум 10 символов)', 'warning');
            return;
        }
        performAnalysis(text);
    });
    
    // Быстрые темы
    document.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            thoughtInput.value = tag.getAttribute('data-text');
            updateCharCount();
            thoughtInput.focus();
        });
    });
    
    // Счётчик символов
    thoughtInput.addEventListener('input', updateCharCount);
    
    // Переключение секций
    const toggleResults = document.getElementById('toggle-results');
    const resultsSection = document.getElementById('results-section');
    
    toggleResults.addEventListener('click', () => {
        const isVisible = resultsSection.style.display !== 'none';
        resultsSection.style.display = isVisible ? 'none' : 'block';
        toggleResults.innerHTML = isVisible ? 
            '<i class="fas fa-chevron-down"></i>' : 
            '<i class="fas fa-chevron-up"></i>';
    });
    
    // Начало эксперимента
    const startExperimentBtn = document.getElementById('start-experiment');
    startExperimentBtn.addEventListener('click', () => {
        startExperiment();
    });
    
    // Настройка эксперимента
    const customizeExperimentBtn = document.getElementById('customize-experiment');
    customizeExperimentBtn.addEventListener('click', () => {
        customizeExperiment();
    });
    
    // Проверка приватности
    const verifyPrivacyBtn = document.getElementById('verify-privacy');
    verifyPrivacyBtn.addEventListener('click', () => {
        verifyPrivacy();
    });
    
    // Изменение временного промежутка
    const timeframeSelect = document.getElementById('timeframe-select');
    timeframeSelect.addEventListener('change', (e) => {
        updateTimeline(parseInt(e.target.value));
    });
}

function initLocalAnalyzer() {
    // Проверка наличия локального анализатора
    if (typeof window.LocalAnalyzer === 'undefined') {
        console.warn('LocalAnalyzer не загружен. Проверьте подключение local-analyzer.js');
    } else {
        console.log('LocalAnalyzer готов к работе');
    }
}

function initBackgroundEffects() {
    // Создание частиц для фона
    createParticles();
    
    // Плавное появление интерфейса
    setTimeout(() => {
        document.querySelector('.app-container').style.opacity = '1';
        document.querySelector('.app-container').style.transform = 'translateY(0)';
    }, 100);
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====
function performAnalysis(text) {
    // Показываем индикатор загрузки
    const analyzeBtn = document.getElementById('analyze-btn');
    const originalHTML = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Анализирую...</span>';
    analyzeBtn.disabled = true;
    
    // Показываем секцию с результатами
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    document.getElementById('toggle-results').innerHTML = '<i class="fas fa-chevron-up"></i>';
    
    // Симуляция анализа (в реальности здесь будет вызов LocalAnalyzer)
    setTimeout(() => {
        // Пример анализа (в реальном приложении здесь будет вызов LocalAnalyzer.analyze(text))
        const mockAnalysis = analyzeTextLocally(text);
        
        // Обновляем интерфейс с результатами
        updateAnalysisResults(mockAnalysis);
        
        // Обновляем сценарии на основе анализа
        updateScenarios(mockAnalysis);
        
        // Генерируем эксперимент
        generateExperiment(mockAnalysis);
        
        // Восстанавливаем кнопку
        analyzeBtn.innerHTML = originalHTML;
        analyzeBtn.disabled = false;
        
        // Показываем уведомление
        showNotification('Анализ завершён локально! Проверьте Network tab → 0 запросов', 'success');
        
        // Анимация результатов
        animateResults();
        
    }, 1500); // Имитация времени анализа
}

function analyzeTextLocally(text) {
    // Упрощённый локальный анализ (в реальности будет сложнее)
    const words = text.toLowerCase().split(/\s+/);
    
    // Определяем эмоциональный тон
    const negativeWords = ['стресс', 'усталость', 'тревог', 'беспокойств', 'выгорание', 'конфликт', 'проблем', 'сложн', 'тяжел'];
    const positiveWords = ['радость', 'счастье', 'успех', 'легк', 'хорош', 'отличн', 'прекрасн'];
    
    let negativeCount = 0;
    let positiveCount = 0;
    
    words.forEach(word => {
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    });
    
    const totalRelevant = negativeCount + positiveCount;
    const emotionValue = totalRelevant > 0 ? 
        Math.round((negativeCount / totalRelevant) * 100) : 50;
    
    // Определяем темы
    const themes = [];
    if (text.match(/работ|карьер|начальник|коллег|проект|задач/i)) themes.push('Работа / Карьера');
    if (text.match(/отношен|партнёр|семь|друг|близк/i)) themes.push('Отношения');
    if (text.match(/тревог|стресс|эмоци|чувств|психолог/i)) themes.push('Психология');
    if (text.match(/энерг|сил|усталост|сон|здоров/i)) themes.push('Энергия');
    
    // Определяем когнитивные искажения
    const patterns = [];
    if (text.match(/всегд|никогда|все|ничего|полностью/i)) patterns.push({name: 'Абсолютизация', intensity: 'high'});
    if (text.match(/проблем|сложн|трудн|невозможн/i)) patterns.push({name: 'Негативный фокус', intensity: 'medium'});
    if (text.match(/катастроф|ужасн|кошмарн/i)) patterns.push({name: 'Катастрофизация', intensity: 'low'});
    
    return {
        emotion: emotionValue,
        themes: themes,
        patterns: patterns,
        wordCount: words.length,
        negativeRatio: negativeCount / words.length,
        mainTheme: themes[0] || 'Общее'
    };
}

function updateAnalysisResults(analysis) {
    // Обновляем эмоциональный спектр
    document.getElementById('emotion-fill').style.width = analysis.emotion + '%';
    document.getElementById('emotion-value').textContent = analysis.emotion + '%';
    
    // Обновляем эмоциональные теги
    const emotionTags = document.getElementById('emotion-tags');
    emotionTags.innerHTML = '';
    
    if (analysis.emotion > 70) {
        emotionTags.innerHTML += '<span class="emotion-tag negative">Тревога</span>';
        emotionTags.innerHTML += '<span class="emotion-tag negative">Усталость</span>';
    } else if (analysis.emotion > 40) {
        emotionTags.innerHTML += '<span class="emotion-tag neutral">Нейтральность</span>';
        emotionTags.innerHTML += '<span class="emotion-tag neutral">Смешанные чувства</span>';
    } else {
        emotionTags.innerHTML += '<span class="emotion-tag positive">Спокойствие</span>';
        emotionTags.innerHTML += '<span class="emotion-tag positive">Баланс</span>';
    }
    
    // Обновляем когнитивные искажения
    const patternsList = document.getElementById('patterns-list');
    patternsList.innerHTML = '';
    
    analysis.patterns.forEach(pattern => {
        patternsList.innerHTML += `
            <div class="pattern-item">
                <span class="pattern-name">${pattern.name}</span>
                <div class="pattern-intensity ${pattern.intensity}">${getIntensityText(pattern.intensity)}</div>
            </div>
        `;
    });
    
    // Добавляем общие паттерны, если их мало
    if (analysis.patterns.length < 2) {
        patternsList.innerHTML += `
            <div class="pattern-item">
                <span class="pattern-name">Эмоциональное мышление</span>
                <div class="pattern-intensity low">Низкая</div>
            </div>
        `;
    }
    
    // Обновляем темы
    const topicsContainer = document.getElementById('topics-container');
    topicsContainer.innerHTML = '';
    
    analysis.themes.forEach((theme, index) => {
        const type = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
        topicsContainer.innerHTML += `<span class="topic-tag ${type}">${theme}</span>`;
    });
    
    if (analysis.themes.length === 0) {
        topicsContainer.innerHTML = '<span class="topic-tag tertiary">Общая рефлексия</span>';
    }
}

function getIntensityText(intensity) {
    const map = {
        'high': 'Высокая',
        'medium': 'Средняя', 
        'low': 'Низкая'
    };
    return map[intensity] || intensity;
}

function updateScenarios(analysis) {
    // На основе анализа корректируем вероятности сценариев
    const redProb = Math.min(95, Math.max(50, analysis.emotion + 10));
    const orangeProb = Math.min(40, Math.max(10, 100 - redProb - 5));
    const blueProb = Math.max(1, 100 - redProb - orangeProb);
    
    // Обновляем вероятности
    document.querySelectorAll('.probability-value')[0].textContent = redProb + '%';
    document.querySelectorAll('.probability-value')[1].textContent = orangeProb + '%';
    document.querySelectorAll('.probability-value')[2].textContent = blueProb + '%';
    
    // Обновляем описания на основе темы
    const mainTheme = analysis.mainTheme;
    const descriptions = getScenarioDescriptions(mainTheme, analysis);
    
    document.querySelectorAll('.scenario-description p')[0].textContent = descriptions.red;
    document.querySelectorAll('.scenario-description p')[1].textContent = descriptions.orange;
    document.querySelectorAll('.scenario-description p')[2].textContent = descriptions.blue;
}

function getScenarioDescriptions(theme, analysis) {
    const scenarios = {
        'Работа / Карьера': {
            red: `При сохранении текущих паттернов: усиление выгорания на ${analysis.emotion}%, снижение продуктивности, риск профессионального истощения.`,
            orange: `При внедрении практик саморегуляции: улучшение состояния на ${100 - analysis.emotion}%, восстановление энергии, развитие стрессоустойчивости.`,
            blue: `При трансформации подхода: переосмысление карьерного пути, поиск новых возможностей, качественный скачок в развитии.`
        },
        'Отношения': {
            red: 'Эскалация конфликтов, накопление обид, эмоциональное отдаление, риск разрыва отношений.',
            orange: 'Улучшение коммуникации, понимание потребностей друг друга, укрепление эмоциональной связи.',
            blue: 'Глубокое переосмысление отношений, переход на новый уровень близости, совместный рост.'
        },
        'Психология': {
            red: 'Усиление негативных симптомов, снижение качества жизни, возможное развитие расстройств.',
            orange: 'Стабилизация состояния, развитие навыков саморегуляции, улучшение эмоционального фона.',
            blue: 'Глубинная трансформация, преодоление ограничивающих убеждений, качественное изменение жизни.'
        },
        'default': {
            red: `При сохранении текущих паттернов: усиление негативных тенденций, снижение качества жизни на ${analysis.emotion}%.`,
            orange: `При внедрении практик саморегуляции: улучшение состояния на ${Math.round((100 - analysis.emotion) / 2)}%, развитие resilience.`,
            blue: 'При трансформации подхода: качественный прорыв, переход на новый уровень осознанности и жизни.'
        }
    };
    
    return scenarios[theme] || scenarios.default;
}

function generateExperiment(analysis) {
    const theme = analysis.mainTheme;
    const experiments = {
        'Работа / Карьера': {
            title: '10-минутная медитация утром + цифровой детокс вечером',
            description: 'Прямо влияет на вероятность сценариев: уменьшает красный путь на 15%, увеличивает оранжевый на 10%.',
            metrics: [
                { value: '-35%', label: 'Стресса' },
                { value: '+2ч', label: 'Качественного сна' },
                { value: '+20%', label: 'Продуктивности' }
            ]
        },
        'Отношения': {
            title: '15-минутный разговор без отвлечений каждый вечер',
            description: 'Улучшает коммуникацию, снижает вероятность конфликтов на 25%, усиливает эмоциональную связь.',
            metrics: [
                { value: '-40%', label: 'Непонимания' },
                { value: '+35%', label: 'Близости' },
                { value: '+25%', label: 'Доверия' }
            ]
        },
        'Психология': {
            title: 'Дневник благодарности + дыхательные практики',
            description: 'Переключает фокус с проблем на возможности, снижает тревожность, повышает осознанность.',
            metrics: [
                { value: '-45%', label: 'Тревожности' },
                { value: '+50%', label: 'Осознанности' },
                { value: '+30%', label: 'Спокойствия' }
            ]
        },
        'default': {
            title: 'Ежедневная рефлексия + маленькие шаги к изменениям',
            description: 'Систематический подход к саморазвитию, постепенное улучшение всех сфер жизни.',
            metrics: [
                { value: '-30%', label: 'Негатива' },
                { value: '+25%', label: 'Контроля' },
                { value: '+15%', label: 'Удовлетворения' }
            ]
        }
    };
    
    const experiment = experiments[theme] || experiments.default;
    
    document.getElementById('experiment-title').textContent = experiment.title;
    document.querySelector('.experiment-description p').textContent = experiment.description;
    
    const metricsContainer = document.querySelector('.experiment-metrics');
    metricsContainer.innerHTML = '';
    
    experiment.metrics.forEach(metric => {
        metricsContainer.innerHTML += `
            <div class="metric">
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
            </div>
        `;
    });
}

function startExperiment() {
    showNotification('Эксперимент запущен! Вы получите уведомления о прогрессе.', 'success');
    
    // Анимация кнопки
    const btn = document.getElementById('start-experiment');
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    btn.disabled = true;
    
    // Планируем напоминание
    setTimeout(() => {
        if (confirm('Напоминание: как проходит ваш эксперимент? Хотите добавить заметку?')) {
            document.getElementById('thought-input').focus();
        }
    }, 30000); // 30 секунд для демо (в реальности будет 24 часа)
}

function customizeExperiment() {
    showNotification('Функция настройки эксперимента будет доступна в следующем обновлении!', 'info');
}

function verifyPrivacy() {
    showNotification('Откройте DevTools (F12) → вкладка Network → убедитесь в 0 запросов при анализе!', 'info');
    
    // Подсветка элементов проверки
    const steps = document.querySelectorAll('.verification-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transform = 'scale(1.05)';
            step.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
            
            setTimeout(() => {
                step.style.transform = '';
                step.style.boxShadow = '';
            }, 500);
        }, index * 300);
    });
}

function updateTimeline(days) {
    const scenarios = document.querySelectorAll('.scenario-card');
    const dayLabels = {
        7: ['День 2-3', 'День 4-5', 'День 6-7'],
        30: ['День 7-10', 'День 15-20', 'День 25-30'],
        90: ['Неделя 2-3', 'Месяц 1-2', 'Месяц 3']
    };
    
    const labels = dayLabels[days] || dayLabels[30];
    
    scenarios.forEach((scenario, scenarioIndex) => {
        const points = scenario.querySelectorAll('.timeline-day');
        points.forEach((point, pointIndex) => {
            point.textContent = labels[pointIndex] + ':';
        });
    });
    
    showNotification(`Таймлайн обновлён на ${days} дней`, 'info');
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function updateCharCount() {
    const input = document.getElementById('thought-input');
    const count = input.value.length;
    document.getElementById('char-count').textContent = count;
    
    // Изменение цвета при приближении к лимиту
    const countElement = document.getElementById('char-count');
    if (count > 1800) {
        countElement.style.color = 'var(--color-danger)';
    } else if (count > 1500) {
        countElement.style.color = 'var(--color-warning)';
    } else {
        countElement.style.color = 'var(--color-text)';
    }
}

function animateResults() {
    const results = document.querySelectorAll('.result-card, .scenario-card');
    results.forEach((result, index) => {
        result.style.animation = 'none';
        setTimeout(() => {
            result.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
        }, 10);
    });
}

function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    // Очищаем существующие частицы
    container.innerHTML = '';
    
    // Создаем 20 частиц
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные свойства
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Стили
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            filter: blur(${size / 2}px);
        `;
        
        container.appendChild(particle);
    }
    
    // Добавляем стили для анимации частиц
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                33% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 30 - 15}px) scale(1.2); opacity: 0.7; }
                66% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 30 - 15}px) scale(0.8); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease forwards;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Добавляем стили анимации, если их нет
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'rgba(16, 185, 129, 0.9)',
        'error': 'rgba(239, 68, 68, 0.9)',
        'warning': 'rgba(245, 158, 11, 0.9)',
        'info': 'rgba(99, 102, 241, 0.9)'
    };
    return colors[type] || 'rgba(99, 102, 241, 0.9)';
}

function getNotificationBorderColor(type) {
    const colors = {
        'success': 'var(--color-success)',
        'error': 'var(--color-danger)',
        'warning': 'var(--color-warning)',
        'info': 'var(--color-accent)'
    };
    return colors[type] || 'var(--color-accent)';
}

// ===== ГЛОБАЛЬНЫЙ ЭКСПОРТ =====
window.AuroraMirror = {
    analyze: performAnalysis,
    startExperiment: startExperiment,
    verifyPrivacy: verifyPrivacy,
    updateTimeline: updateTimeline
};

// Инициализация при загрузке
window.onload = function() {
    // Устанавливаем начальные стили для плавного появления
    document.querySelector('.app-container').style.opacity = '0';
    document.querySelector('.app-container').style.transform = 'translateY(20px)';
    document.querySelector('.app-container').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Фокус на поле ввода
    setTimeout(() => {
        document.getElementById('thought-input').focus();
    }, 1000);
};
