// Основной файл JavaScript для Зеркала Будущего
let isAnalyzing = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aurora Mirror 4.0 загружен');
    
    // Инициализация только один раз
    initApplication();
});

function initApplication() {
    console.log('Инициализация приложения...');
    
    // Инициализация фона
    createParticles();
    
    // Инициализация слушателей событий
    initEventListeners();
    
    // Инициализация анализатора
    initLocalAnalyzer();
    
    // Плавное появление интерфейса
    setTimeout(() => {
        document.querySelector('.app-container').style.opacity = '1';
        document.querySelector('.app-container').style.transform = 'translateY(0)';
    }, 100);
    
    // Фокус на поле ввода
    setTimeout(() => {
        const input = document.getElementById('thought-input');
        if (input) {
            input.focus();
            input.addEventListener('input', updateCharCount);
            updateCharCount(); // Обновляем счётчик при загрузке
        }
    }, 500);
}

// ===== ИНИЦИАЛИЗАЦИЯ СЛУШАТЕЛЕЙ СОБЫТИЙ =====
function initEventListeners() {
    console.log('Инициализация слушателей событий...');
    
    // Анализ текста
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        console.log('Кнопка анализа найдена');
        analyzeBtn.addEventListener('click', handleAnalyzeClick);
    } else {
        console.error('Кнопка анализа не найдена!');
    }
    
    // Быстрые темы
    document.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            const input = document.getElementById('thought-input');
            if (input) {
                input.value = text;
                updateCharCount();
                input.focus();
                
                // Показываем уведомление
                showNotification(`Тема "${this.textContent}" добавлена`, 'info');
            }
        });
    });
    
    // Переключение секций
    const toggleResults = document.getElementById('toggle-results');
    if (toggleResults) {
        toggleResults.addEventListener('click', toggleResultsSection);
    }
    
    // Начало эксперимента
    const startExperimentBtn = document.getElementById('start-experiment');
    if (startExperimentBtn) {
        startExperimentBtn.addEventListener('click', startExperiment);
    }
    
    // Настройка эксперимента
    const customizeExperimentBtn = document.getElementById('customize-experiment');
    if (customizeExperimentBtn) {
        customizeExperimentBtn.addEventListener('click', customizeExperiment);
    }
    
    // Проверка приватности
    const verifyPrivacyBtn = document.getElementById('verify-privacy');
    if (verifyPrivacyBtn) {
        verifyPrivacyBtn.addEventListener('click', verifyPrivacy);
    }
    
    // Изменение временного промежутка
    const timeframeSelect = document.getElementById('timeframe-select');
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', function(e) {
            updateTimeline(parseInt(e.target.value));
        });
    }
    
    // Настройки
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showNotification('Настройки будут доступны в следующем обновлении', 'info');
        });
    }
    
    // Помощь
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            showNotification('Откройте DevTools (F12) → Network tab → убедитесь в 0 запросов', 'info');
        });
    }
    
    // Аватар
    const avatarBtn = document.querySelector('.avatar-button');
    if (avatarBtn) {
        avatarBtn.addEventListener('click', () => {
            showNotification('Профиль пользователя (функция в разработке)', 'info');
        });
    }
}

function initLocalAnalyzer() {
    // Проверка наличия локального анализатора
    if (typeof window.LocalAnalyzer === 'undefined') {
        console.warn('LocalAnalyzer не загружен. Будет использован упрощённый анализ.');
        window.LocalAnalyzer = {
            analyze: function(text) {
                return analyzeTextLocally(text);
            }
        };
    } else {
        console.log('LocalAnalyzer готов к работе');
    }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function handleAnalyzeClick() {
    if (isAnalyzing) {
        showNotification('Анализ уже выполняется...', 'warning');
        return;
    }
    
    const text = document.getElementById('thought-input').value.trim();
    if (text.length < 10) {
        showNotification('Пожалуйста, введите больше текста для анализа (минимум 10 символов)', 'warning');
        return;
    }
    
    performAnalysis(text);
}

function toggleResultsSection() {
    const resultsSection = document.getElementById('results-section');
    const toggleIcon = this.querySelector('i');
    
    if (resultsSection.style.display === 'none' || !resultsSection.style.display) {
        resultsSection.style.display = 'block';
        toggleIcon.className = 'fas fa-chevron-up';
        
        // Плавное появление
        resultsSection.style.opacity = '0';
        resultsSection.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            resultsSection.style.opacity = '1';
            resultsSection.style.transform = 'translateY(0)';
            resultsSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 10);
    } else {
        resultsSection.style.opacity = '0';
        resultsSection.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            resultsSection.style.display = 'none';
            toggleIcon.className = 'fas fa-chevron-down';
        }, 300);
    }
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====
function performAnalysis(text) {
    console.log('Запуск анализа текста...');
    isAnalyzing = true;
    
    // Показываем индикатор загрузки
    const analyzeBtn = document.getElementById('analyze-btn');
    const originalHTML = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Анализирую локально...</span>';
    analyzeBtn.disabled = true;
    
    // Показываем секцию с результатами
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '1';
    
    const toggleBtn = document.getElementById('toggle-results');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
    
    // Имитация анализа с задержкой
    setTimeout(() => {
        try {
            // Используем LocalAnalyzer или упрощённый анализ
            const analysis = typeof window.LocalAnalyzer !== 'undefined' 
                ? window.LocalAnalyzer.analyze(text)
                : analyzeTextLocally(text);
            
            console.log('Анализ завершён:', analysis);
            
            // Обновляем интерфейс
            updateAnalysisResults(analysis);
            updateScenarios(analysis);
            generateExperiment(analysis);
            
            // Анимация результатов
            animateResults();
            
            showNotification('✅ Анализ завершён локально! Проверьте Network tab → 0 запросов', 'success');
            
        } catch (error) {
            console.error('Ошибка анализа:', error);
            showNotification('Ошибка при анализе. Попробуйте ещё раз.', 'error');
        } finally {
            // Восстанавливаем кнопку
            analyzeBtn.innerHTML = originalHTML;
            analyzeBtn.disabled = false;
            isAnalyzing = false;
        }
    }, 1500);
}

function analyzeTextLocally(text) {
    console.log('Локальный анализ текста:', text.substring(0, 50) + '...');
    
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const negativeWords = ['стресс', 'усталость', 'тревог', 'беспокойств', 'выгорание', 'конфликт', 'проблем', 'сложн', 'тяжел', 'плох', 'грустн', 'один', 'страх'];
    const positiveWords = ['радость', 'счастье', 'успех', 'легк', 'хорош', 'отличн', 'прекрасн', 'доволен', 'интересн', 'мотивац', 'энерг', 'сил'];
    
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
    if (text.match(/работ|карьер|начальник|коллег|проект|задач|офис|должност|зарплат/i)) themes.push('Работа / Карьера');
    if (text.match(/отношен|партнёр|семь|друг|близк|любов|семей|общен/i)) themes.push('Отношения');
    if (text.match(/тревог|стресс|эмоци|чувств|психолог|депресс|настроен/i)) themes.push('Психология');
    if (text.match(/энерг|сил|усталост|сон|здоров|отдых|бодр|утомлен/i)) themes.push('Энергия');
    if (text.match/(деньг|финанс|бюджет|заработ|трат|экономи)/i)) themes.push('Финансы');
    if (text.match/(цел|мечт|планы|будущ|развит|рост)/i)) themes.push('Развитие');
    
    // Уникальные темы
    const uniqueThemes = [...new Set(themes)];
    
    // Определяем когнитивные искажения
    const patterns = [];
    if (text.match(/всегд|никогда|все|ничего|полностью|абсолютно|каждый раз/i)) {
        patterns.push({name: 'Абсолютизация', intensity: 'high'});
    }
    if (text.match(/проблем|сложн|трудн|невозможн|никуда|тупик/i)) {
        patterns.push({name: 'Негативный фокус', intensity: 'medium'});
    }
    if (text.match(/катастроф|ужасн|кошмарн|конец|погиб|смерт/i)) {
        patterns.push({name: 'Катастрофизация', intensity: 'low'});
    }
    if (text.match(/должен|обязан|надо|нужно|необходимо/i)) {
        patterns.push({name: 'Долженствование', intensity: 'medium'});
    }
    
    // Если паттернов мало, добавляем базовые
    if (patterns.length < 2) {
        patterns.push({name: 'Эмоциональное мышление', intensity: 'low'});
        patterns.push({name: 'Чтение мыслей', intensity: 'low'});
    }
    
    return {
        emotion: emotionValue,
        themes: uniqueThemes,
        patterns: patterns,
        wordCount: words.length,
        negativeRatio: negativeCount / Math.max(words.length, 1),
        mainTheme: uniqueThemes[0] || 'Общее',
        timestamp: new Date().toISOString()
    };
}

function updateAnalysisResults(analysis) {
    console.log('Обновление результатов анализа...');
    
    // Эмоциональный спектр
    const emotionFill = document.getElementById('emotion-fill');
    const emotionValue = document.getElementById('emotion-value');
    
    if (emotionFill) {
        emotionFill.style.width = analysis.emotion + '%';
        emotionFill.style.transition = 'width 1s ease';
    }
    
    if (emotionValue) {
        emotionValue.textContent = analysis.emotion + '%';
    }
    
    // Эмоциональные теги
    const emotionTags = document.getElementById('emotion-tags');
    if (emotionTags) {
        emotionTags.innerHTML = '';
        
        if (analysis.emotion > 70) {
            emotionTags.innerHTML += '<span class="emotion-tag negative">Тревога</span>';
            emotionTags.innerHTML += '<span class="emotion-tag negative">Усталость</span>';
            if (analysis.emotion > 85) {
                emotionTags.innerHTML += '<span class="emotion-tag negative">Выгорание</span>';
            }
        } else if (analysis.emotion > 40) {
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Нейтральность</span>';
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Смешанные чувства</span>';
        } else {
            emotionTags.innerHTML += '<span class="emotion-tag positive">Спокойствие</span>';
            emotionTags.innerHTML += '<span class="emotion-tag positive">Баланс</span>';
        }
    }
    
    // Когнитивные искажения
    const patternsList = document.getElementById('patterns-list');
    if (patternsList) {
        patternsList.innerHTML = '';
        
        analysis.patterns.slice(0, 3).forEach(pattern => {
            patternsList.innerHTML += `
                <div class="pattern-item">
                    <span class="pattern-name">${pattern.name}</span>
                    <div class="pattern-intensity ${pattern.intensity}">
                        ${getIntensityText(pattern.intensity)}
                    </div>
                </div>
            `;
        });
    }
    
    // Темы
    const topicsContainer = document.getElementById('topics-container');
    if (topicsContainer) {
        topicsContainer.innerHTML = '';
        
        analysis.themes.slice(0, 4).forEach((theme, index) => {
            const type = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
            topicsContainer.innerHTML += `<span class="topic-tag ${type}">${theme}</span>`;
        });
        
        if (analysis.themes.length === 0) {
            topicsContainer.innerHTML = '<span class="topic-tag tertiary">Общая рефлексия</span>';
        }
    }
}

function getIntensityText(intensity) {
    const map = {
        'high': 'Высокая',
        'medium': 'Средняя', 
        'low': 'Низкая',
        'very-high': 'Очень высокая'
    };
    return map[intensity] || intensity;
}

function updateScenarios(analysis) {
    console.log('Обновление сценариев...');
    
    // Рассчитываем вероятности на основе анализа
    let redProb, orangeProb, blueProb;
    
    if (analysis.emotion > 70) {
        redProb = Math.min(90, Math.max(60, analysis.emotion + 5));
        orangeProb = Math.min(35, Math.max(15, 100 - redProb - 3));
        blueProb = Math.max(2, 100 - redProb - orangeProb);
    } else if (analysis.emotion > 40) {
        redProb = Math.min(70, Math.max(40, analysis.emotion));
        orangeProb = Math.min(45, Math.max(25, 100 - redProb - 5));
        blueProb = Math.max(5, 100 - redProb - orangeProb);
    } else {
        redProb = Math.min(50, Math.max(20, analysis.emotion + 10));
        orangeProb = Math.min(60, Math.max(30, 100 - redProb - 10));
        blueProb = Math.max(10, 100 - redProb - orangeProb);
    }
    
    // Обновляем вероятности
    const probabilityValues = document.querySelectorAll('.probability-value');
    if (probabilityValues.length >= 3) {
        probabilityValues[0].textContent = Math.round(redProb) + '%';
        probabilityValues[1].textContent = Math.round(orangeProb) + '%';
        probabilityValues[2].textContent = Math.round(blueProb) + '%';
        
        // Анимация изменения
        probabilityValues.forEach((el, i) => {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.transition = 'transform 0.3s ease';
            }, 300);
        });
    }
    
    // Обновляем описания
    const descriptions = getScenarioDescriptions(analysis.mainTheme, analysis);
    const scenarioDescriptions = document.querySelectorAll('.scenario-description p');
    
    if (scenarioDescriptions.length >= 3) {
        scenarioDescriptions[0].textContent = descriptions.red;
        scenarioDescriptions[1].textContent = descriptions.orange;
        scenarioDescriptions[2].textContent = descriptions.blue;
    }
}

function getScenarioDescriptions(theme, analysis) {
    const scenarios = {
        'Работа / Карьера': {
            red: `При сохранении текущих паттернов: усиление выгорания на ${analysis.emotion}%, снижение продуктивности на 40%, риск профессионального истощения.`,
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
            orange: `При внедрении практик саморегуляции: улучшение состояния на ${Math.round((100 - analysis.emotion) / 2)}%, развитие устойчивости.`,
            blue: 'При трансформации подхода: качественный прорыв, переход на новый уровень осознанности и жизни.'
        }
    };
    
    return scenarios[theme] || scenarios.default;
}

function generateExperiment(analysis) {
    console.log('Генерация эксперимента...');
    
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
            title: 'Дневник благодарности + дыхательные практики 3 раза в день',
            description: 'Переключает фокус с проблем на возможности, снижает тревожность на 45%, повышает осознанность.',
            metrics: [
                { value: '-45%', label: 'Тревожности' },
                { value: '+50%', label: 'Осознанности' },
                { value: '+30%', label: 'Спокойствия' }
            ]
        },
        'Финансы': {
            title: 'Ежедневный учёт расходов + недельное планирование бюджета',
            description: 'Повышает финансовую осознанность, снижает импульсивные траты, увеличивает сбережения.',
            metrics: [
                { value: '-30%', label: 'Импульсивных трат' },
                { value: '+25%', label: 'Контроля' },
                { value: '+15%', label: 'Сбережений' }
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
    
    const experimentTitle = document.getElementById('experiment-title');
    const experimentDescription = document.querySelector('.experiment-description p');
    
    if (experimentTitle) {
        experimentTitle.textContent = experiment.title;
    }
    
    if (experimentDescription) {
        experimentDescription.textContent = experiment.description;
    }
    
    // Обновляем метрики
    const metricsContainer = document.querySelector('.experiment-metrics');
    if (metricsContainer) {
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
}

function startExperiment() {
    console.log('Запуск эксперимента...');
    
    const btn = document.getElementById('start-experiment');
    if (!btn) return;
    
    // Сохраняем оригинальный текст
    const originalText = btn.innerHTML;
    
    // Показываем анимацию запуска
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Запускаю...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        
        showNotification('🎯 Эксперимент запущен! Вы получите уведомления о прогрессе.', 'success');
        
        // Планируем напоминание (для демо - 10 секунд)
        setTimeout(() => {
            if (confirm('Напоминание: как проходит ваш эксперимент? Хотите добавить заметку?')) {
                document.getElementById('thought-input').focus();
                document.getElementById('thought-input').value = 'День 1 эксперимента: ';
                updateCharCount();
            }
        }, 10000);
        
    }, 1000);
}

function customizeExperiment() {
    showNotification('⚙️ Функция настройки эксперимента будет доступна в следующем обновлении Aurora 4.1', 'info');
}

function verifyPrivacy() {
    console.log('Проверка приватности...');
    
    // Подсветка элементов проверки
    const steps = document.querySelectorAll('.verification-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transform = 'scale(1.05)';
            step.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
            step.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            setTimeout(() => {
                step.style.transform = '';
                step.style.boxShadow = '';
            }, 500);
        }, index * 300);
    });
    
    showNotification('🔒 Проверка приватности: Откройте DevTools (F12) → вкладка Network → убедитесь в 0 запросов при анализе!', 'info');
}

function updateTimeline(days) {
    console.log('Обновление таймлайна на', days, 'дней');
    
    const dayLabels = {
        7: ['День 2-3', 'День 4-5', 'День 6-7'],
        30: ['День 7-10', 'День 15-20', 'День 25-30'],
        90: ['Неделя 2-3', 'Месяц 1-2', 'Месяц 3']
    };
    
    const labels = dayLabels[days] || dayLabels[30];
    
    // Обновляем все сценарии
    document.querySelectorAll('.scenario-card').forEach((scenario, scenarioIndex) => {
        const points = scenario.querySelectorAll('.timeline-day');
        points.forEach((point, pointIndex) => {
            if (point && labels[pointIndex]) {
                point.textContent = labels[pointIndex] + ':';
                
                // Анимация изменения
                point.style.color = 'var(--color-accent)';
                setTimeout(() => {
                    point.style.color = '';
                    point.style.transition = 'color 0.5s ease';
                }, 500);
            }
        });
    });
    
    showNotification(`📅 Таймлайн обновлён на ${days} дней`, 'info');
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function updateCharCount() {
    const input = document.getElementById('thought-input');
    if (!input) return;
    
    const count = input.value.length;
    const countElement = document.getElementById('char-count');
    
    if (countElement) {
        countElement.textContent = count;
        
        // Изменение цвета при приближении к лимиту
        if (count > 1800) {
            countElement.style.color = 'var(--color-danger)';
        } else if (count > 1500) {
            countElement.style.color = 'var(--color-warning)';
        } else {
            countElement.style.color = 'var(--color-text)';
        }
    }
}

function animateResults() {
    const results = document.querySelectorAll('.result-card, .scenario-card');
    results.forEach((result, index) => {
        result.style.animation = 'none';
        void result.offsetWidth; // Trigger reflow
        result.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
    });
}

function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Создаем частицы
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out infinite ${delay}s;
            filter: blur(${size / 2}px);
            z-index: -1;
        `;
        
        container.appendChild(particle);
    }
    
    // Добавляем стили анимации
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: ${Math.random() * 0.3 + 0.1}; 
                }
                33% { 
                    transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 40 - 20}px) scale(1.3); 
                    opacity: ${Math.random() * 0.6 + 0.3}; 
                }
                66% { 
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 60 - 30}px) scale(0.8); 
                    opacity: ${Math.random() * 0.4 + 0.2}; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    document.querySelectorAll('.aurora-notification').forEach(el => el.remove());
    
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.className = `aurora-notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    const color = getNotificationColor(type);
    const borderColor = getNotificationBorderColor(type);
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 16px 20px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        z-index: 9999;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: notificationSlideIn 0.3s ease forwards;
        border-left: 4px solid ${borderColor};
        backdrop-filter: blur(10px);
    `;
    
    // Стили для внутренних элементов
    const style = document.createElement('style');
    style.textContent = `
        .notification-icon {
            font-size: 18px;
            opacity: 0.9;
        }
        
        .notification-message {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            transform: rotate(90deg);
        }
        
        @keyframes notificationSlideIn {
            from { 
                transform: translateX(100%); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0); 
                opacity: 1; 
            }
        }
        
        @keyframes notificationSlideOut {
            from { 
                transform: translateX(0); 
                opacity: 1; 
            }
            to { 
                transform: translateX(100%); 
                opacity: 0; 
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'rgba(16, 185, 129, 0.85)',
        'error': 'rgba(239, 68, 68, 0.85)',
        'warning': 'rgba(245, 158, 11, 0.85)',
        'info': 'rgba(99, 102, 241, 0.85)'
    };
    return colors[type] || 'rgba(99, 102, 241, 0.85)';
}

function getNotificationBorderColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#6366f1'
    };
    return colors[type] || '#6366f1';
}

// ===== ГЛОБАЛЬНЫЙ ЭКСПОРТ =====
window.AuroraMirror = {
    version: '4.0',
    analyze: performAnalysis,
    startExperiment: startExperiment,
    verifyPrivacy: verifyPrivacy,
    updateTimeline: updateTimeline,
    
    // Вспомогательные методы
    getAnalysis: function() {
        const text = document.getElementById('thought-input').value;
        return analyzeTextLocally(text);
    },
    
    resetExperiment: function() {
        const btn = document.getElementById('start-experiment');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-play-circle"></i> Начать эксперимент';
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
            btn.disabled = false;
            showNotification('Эксперимент сброшен', 'info');
        }
    },
    
    exportAnalysis: function() {
        const analysis = this.getAnalysis();
        const dataStr = JSON.stringify(analysis, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `aurora-analysis-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showNotification('Анализ экспортирован в JSON', 'success');
    }
};

// Отладочная информация
console.log('Aurora Mirror 4.0 инициализирован');
console.log('Доступные методы:', Object.keys(window.AuroraMirror));
