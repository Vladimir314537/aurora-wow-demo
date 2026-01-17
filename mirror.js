// mirror.js - Профессиональная версия Зеркала Будущего

class FutureMirror {
    constructor() {
        this.examples = [
            "Чувствую выгорание на работе. Проекты накапливаются, дедлайны горят, а энергии уже нет. Постоянно откладываю важные задачи, хотя понимаю последствия. Вечером не могу уснуть из-за тревоги о завтрашнем дне.",
            "Конфликты в отношениях становятся чаще. Чувствую, что отдаляюсь от партнёра, но не знаю как это остановить. Стараюсь говорить о проблемах, но разговоры часто заканчиваются ссорами. Чувствую одиночество даже когда мы вместе.",
            "Не могу сконцентрироваться на учёбе. Открываю материал, но через 10 минут уже проверяю соцсети. Понимаю, что теряю время, но сила воли будто иссякла. Экзамены через месяц, а прогресс минимальный.",
            "Постоянная усталость уже несколько недель. Просыпаюсь разбитым, к вечеру нет сил даже на простые дела. Пытался заниматься спортом, но после тренировок чувствую себя ещё хуже. Сон не приносит отдыха."
        ];
        
        this.init();
    }

    init() {
        // Назначение обработчиков
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyze());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearInput());
        document.getElementById('startExperimentBtn').addEventListener('click', () => this.startExperiment());
        
        // Установка плейсхолдера
        const textarea = document.getElementById('userInput');
        textarea.placeholder = this.examples[Math.floor(Math.random() * this.examples.length)];
    }

    loadExample(index) {
        document.getElementById('userInput').value = this.examples[index];
    }

    async analyze() {
        const text = document.getElementById('userInput').value.trim();
        if (!text) {
            this.showNotification('Введите текст для анализа', 'warning');
            return;
        }

        // Показать состояние загрузки
        const btn = document.getElementById('analyzeBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
        btn.disabled = true;

        try {
            // Имитация анализа
            await this.simulateProcessing();
            
            // Получить анализ
            const analysis = this.performAnalysis(text);
            
            // Показать результаты
            this.displayResults(analysis);
            
            this.showNotification('Анализ завершён локально', 'success');
            
        } catch (error) {
            this.showNotification('Ошибка анализа', 'error');
        } finally {
            // Восстановить кнопку
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    simulateProcessing() {
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        });
    }

    performAnalysis(text) {
        // Реальный анализ текста
        const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        
        // Определение эмоций
        const emotion = this.detectEmotion(text);
        
        // Выявление тем
        const topics = this.detectTopics(text);
        
        // Паттерны
        const patterns = this.extractPatterns(text);
        
        // Статистика
        const stats = {
            wordCount: words.length,
            sentenceCount: (text.match(/[.!?]+/g) || []).length,
            readingTime: Math.ceil(words.length / 200),
            complexity: this.calculateComplexity(text)
        };
        
        // Генерация сценариев
        const scenarios = this.generateScenarios(emotion, patterns);
        
        // Рекомендации
        const experiment = this.generateExperiment(emotion, patterns, topics);
        
        return {
            text,
            emotion,
            topics,
            patterns,
            stats,
            scenarios,
            experiment,
            timestamp: new Date().toISOString()
        };
    }

    detectEmotion(text) {
        const emotions = {
            негативный: ['стресс', 'устал', 'усталость', 'тревож', 'страх', 'боюсь', 'выгорание', 
                        'конфликт', 'проблем', 'сложно', 'трудно', 'нет сил', 'одиночество', 'ссора'],
            позитивный: ['рад', 'счасть', 'успех', 'доволен', 'интерес', 'вдохнов', 'энерги', 
                        'сила', 'уверен', 'горд', 'радост', 'удовольствие', 'надежда'],
            нейтральный: ['думаю', 'считаю', 'планирую', 'анализирую', 'заметил', 'наблюдаю']
        };
        
        let scores = { негативный: 0, позитивный: 0, нейтральный: 0 };
        
        Object.entries(emotions).forEach(([emotion, words]) => {
            words.forEach(word => {
                if (text.toLowerCase().includes(word)) {
                    scores[emotion] += 1;
                }
            });
        });
        
        // Определяем доминирующую эмоцию
        const dominant = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
        
        return {
            type: dominant[0],
            score: dominant[1],
            confidence: Math.min(dominant[1] * 0.2, 0.95)
        };
    }

    detectTopics(text) {
        const topicKeywords = {
            'Работа/Карьера': ['работа', 'проект', 'карьера', 'начальник', 'коллеги', 'офис', 'задача', 'дедлайн'],
            'Отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт', 'ссора', 'близкий'],
            'Здоровье': ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'спорт', 'питание', 'самочувствие'],
            'Финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг', 'бюджет'],
            'Развитие': ['учёба', 'развитие', 'обучение', 'навыки', 'знания', 'чтение', 'курс', 'образование'],
            'Психология': ['эмоции', 'чувства', 'тревога', 'стресс', 'мотивация', 'цели', 'привычки']
        };
        
        const detectedTopics = [];
        const textLower = text.toLowerCase();
        
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
            const matchCount = keywords.filter(keyword => textLower.includes(keyword)).length;
            if (matchCount > 0) {
                detectedTopics.push({
                    name: topic,
                    relevance: Math.min(matchCount / keywords.length, 1),
                    matchCount
                });
            }
        });
        
        // Сортируем по релевантности
        return detectedTopics.sort((a, b) => b.relevance - a.relevance);
    }

    extractPatterns(text) {
        const patterns = [];
        const textLower = text.toLowerCase();
        
        // Анализ языка
        if ((textLower.match(/нет |не могу |не получается/g) || []).length > 2) {
            patterns.push({ name: 'Негативный фокус', strength: 0.8, type: 'язык' });
        }
        
        if ((textLower.match(/хочу |мечтаю |планирую/g) || []).length > 1) {
            patterns.push({ name: 'Ориентация на будущее', strength: 0.7, type: 'язык' });
        }
        
        if ((textLower.match(/всегда |постоянно |каждый раз/g) || []).length > 0) {
            patterns.push({ name: 'Абсолютизация', strength: 0.9, type: 'когнитивное искажение' });
        }
        
        // Анализ структуры
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 5) {
            patterns.push({ name: 'Детализированное описание', strength: 0.6, type: 'структура' });
        }
        
        return patterns;
    }

    calculateComplexity(text) {
        const words = text.split(/\s+/);
        const longWords = words.filter(w => w.length > 6).length;
        return Math.min(longWords / words.length * 10, 10).toFixed(1);
    }

    generateScenarios(emotion, patterns) {
        const baseScenarios = [
            {
                id: 'continuation',
                title: 'Продолжение текущего пути',
                description: 'Если сохранить текущие паттерны поведения',
                riskLevel: 'high',
                probability: 60,
                consequences: [
                    'Усиление текущих проблем на 30-40%',
                    'Снижение продуктивности и мотивации',
                    'Риск хронического выгорания'
                ],
                triggers: patterns.map(p => p.name).slice(0, 2)
            },
            {
                id: 'intervention',
                title: 'Внедрение изменений',
                description: 'При систематическом внедрении небольших улучшений',
                riskLevel: 'medium',
                probability: 30,
                consequences: [
                    'Снижение стресса на 35-45%',
                    'Улучшение качества жизни',
                    'Постепенное накопление положительных изменений'
                ],
                actionRequired: true
            },
            {
                id: 'transformation',
                title: 'Значительные изменения',
                description: 'При радикальном пересмотре подходов',
                riskLevel: 'low',
                probability: 10,
                consequences: [
                    'Возможность выйти на новый уровень',
                    'Требует значительных усилий',
                    'Высокая неопределённость'
                ],
                note: 'Требует внешней поддержки или кризиса как триггера'
            }
        ];

        // Корректируем на основе эмоций
        if (emotion.type === 'негативный') {
            baseScenarios[0].probability += 15;
            baseScenarios[1].probability -= 10;
        } else if (emotion.type === 'позитивный') {
            baseScenarios[0].probability -= 20;
            baseScenarios[1].probability += 15;
            baseScenarios[2].probability += 5;
        }

        // Нормализация вероятностей
        const total = baseScenarios.reduce((sum, s) => sum + s.probability, 0);
        baseScenarios.forEach(s => {
            s.probability = Math.round((s.probability / total) * 100);
        });

        return baseScenarios;
    }

    generateExperiment(emotion, patterns, topics) {
        const experiments = {
            стресс: {
                title: 'Управление стрессом',
                description: 'Ежедневная 10-минутная практика mindfulness-медитации утром',
                rationale: 'Исследования показывают снижение уровня кортизола на 25-30% при регулярной практике',
                metrics: ['Уровень тревожности', 'Качество сна', 'Фокус внимания'],
                duration: '7 дней',
                expectedResult: 'Снижение субъективного стресса на 40%',
                instructions: [
                    'Утром после пробуждения найдите тихое место',
                    'Сядьте удобно, закройте глаза',
                    'Фокусируйтесь на дыхании 10 минут',
                    'Фиксируйте ощущения после практики в Aurora'
                ]
            },
            продуктивность: {
                title: 'Повышение продуктивности',
                description: 'Техника Pomodoro: 25 минут фокуса / 5 минут отдыха',
                rationale: 'Увеличивает концентрацию и снижает умственную усталость',
                metrics: ['Выполненные задачи', 'Качество работы', 'Уровень усталости'],
                duration: '5 рабочих дней',
                expectedResult: 'Увеличение эффективности на 35-45%',
                instructions: [
                    'Разделите рабочий день на 25-минутные интервалы',
                    'Работайте без отвлечений в течение интервала',
                    'Делайте 5-минутный перерыв после каждого Pomodoro',
                    'После 4 интервалов — 15-минутный перерыв'
                ]
            },
            отношения: {
                title: 'Улучшение коммуникации',
                description: 'Ежедневный 15-минутный осмысленный разговор с близким человеком',
                rationale: 'Укрепляет эмоциональную связь и взаимопонимание',
                metrics: ['Качество общения', 'Эмоциональная близость', 'Уровень конфликтов'],
                duration: '7 дней',
                expectedResult: 'Улучшение качества отношений на 30%',
                instructions: [
                    'Выберите время без отвлечений',
                    'Фокусируйтесь на активном слушании',
                    'Используйте "Я-сообщения"',
                    'Избегайте критики и обвинений'
                ]
            }
        };

        // Выбираем эксперимент на основе анализа
        if (emotion.type === 'негативный') {
            return experiments.стресс;
        } else if (topics.some(t => t.name.includes('Работа'))) {
            return experiments.продуктивность;
        } else {
            return experiments.отношения;
        }
    }

    displayResults(analysis) {
        // Показать секцию результатов
        document.getElementById('results').style.display = 'block';
        
        // Показать текущую статистику
        this.displayCurrentStats(analysis);
        
        // Показать паттерны
        this.displayPatterns(analysis.patterns);
        
        // Показать сценарии
        this.displayScenarios(analysis.scenarios);
        
        // Показать эксперимент
        this.displayExperiment(analysis.experiment);
        
        // Прокрутить к результатам
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }

    displayCurrentStats(analysis) {
        const statsGrid = document.getElementById('currentStats');
        
        statsGrid.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Эмоциональный фон</div>
                <div class="stat-value" style="color: ${analysis.emotion.type === 'негативный' ? '#dc2626' : 
                                                   analysis.emotion.type === 'позитивный' ? '#059669' : '#374151'}">
                    ${analysis.emotion.type.charAt(0).toUpperCase() + analysis.emotion.type.slice(1)}
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${analysis.emotion.confidence * 100}%"></div>
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Основные темы</div>
                <div class="stat-value">${analysis.topics.slice(0, 2).map(t => t.name.split('/')[0]).join(', ')}</div>
                <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.topics.length} тем обнаружено
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Паттерны поведения</div>
                <div class="stat-value">${analysis.patterns.length}</div>
                <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.patterns.filter(p => p.strength > 0.7).length} сильных паттернов
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Статистика текста</div>
                <div class="stat-value">${analysis.stats.wordCount} слов</div>
                <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.stats.readingTime} мин чтения • Сложность: ${analysis.stats.complexity}/10
                </div>
            </div>
        `;
    }

    displayPatterns(patterns) {
        const patternsList = document.getElementById('patternsList');
        
        if (patterns.length === 0) {
            patternsList.innerHTML = '<p style="color: #6b7280; text-align: center;">Явных паттернов не обнаружено</p>';
            return;
        }
        
        patternsList.innerHTML = patterns.map(pattern => `
            <div class="pattern-item">
                <div>
                    <div class="pattern-name">${pattern.name}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">${pattern.type}</div>
                </div>
                <div>
                    <div class="pattern-strength">Сила: ${Math.round(pattern.strength * 100)}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pattern.strength * 100}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayScenarios(scenarios) {
        const scenariosGrid = document.getElementById('scenariosGrid');
        
        scenariosGrid.innerHTML = scenarios.map(scenario => `
            <div class="scenario-card ${scenario.riskLevel}-risk">
                <div class="scenario-probability">${scenario.probability}%</div>
                <div class="scenario-title">
                    <i class="fas fa-${scenario.riskLevel === 'high' ? 'exclamation-triangle' : 
                                      scenario.riskLevel === 'medium' ? 'balance-scale' : 'seedling'}"></i>
                    ${scenario.title}
                </div>
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem;">
                    ${scenario.description}
                </p>
                
                <div class="consequences">
                    <strong style="font-size: 0.875rem;">Вероятные последствия:</strong>
                    <ul>
                        ${scenario.consequences.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                
                ${scenario.triggers ? `
                    <div style="margin-top: 0.75rem;">
                        <strong style="font-size: 0.75rem; color: #6b7280;">Триггеры:</strong>
                        <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.25rem;">
                            ${scenario.triggers.map(t => 
                                `<span style="background: #e5e7eb; padding: 0.125rem 0.5rem; border-radius: 1rem; font-size: 0.75rem;">${t}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    displayExperiment(experiment) {
        const experimentContent = document.getElementById('experimentContent');
        
        experimentContent.innerHTML = `
            <div class="experiment-description">
                <strong>Что делать:</strong> ${experiment.description}
            </div>
            
            <div style="margin: 1rem 0;">
                <strong style="font-size: 0.875rem;">Научное обоснование:</strong>
                <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">
                    ${experiment.rationale}
                </p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong style="font-size: 0.875rem;">Метрики для отслеживания:</strong>
                <div class="metrics">
                    ${experiment.metrics.map(metric => 
                        `<span class="metric-tag">${metric}</span>`
                    ).join('')}
                </div>
            </div>
            
            ${experiment.instructions ? `
                <div style="margin: 1rem 0;">
                    <strong style="font-size: 0.875rem;">Инструкция:</strong>
                    <ol style="font-size: 0.875rem; color: #6b7280; margin-left: 1.25rem; margin-top: 0.5rem;">
                        ${experiment.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                </div>
            ` : ''}
            
            <div style="background: white; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1rem;">
                <strong>Ожидаемый результат:</strong> ${experiment.expectedResult}
            </div>
        `;
    }

    startExperiment() {
        const btn = document.getElementById('startExperimentBtn');
        const originalText = btn.innerHTML;
        
        // Показать состояние загрузки
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Запускаю...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Восстановить кнопку с новым текстом
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент запущен';
            btn.style.background = '#059669';
            btn.style.borderColor = '#059669';
            
            // Показать уведомление
            this.showNotification('Эксперимент запущен. Напоминание придёт через 7 дней.', 'success');
            
            // Создать уведомление в интерфейсе
            this.createExperimentNotification();
            
        }, 1000);
    }

    createExperimentNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background: white;
            border-radius: 0.75rem;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1000;
            max-width: 350px;
            border-left: 4px solid #059669;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <div style="background: #d1fae5; color: #059669; width: 2rem; height: 2rem; border-radius: 50%; 
                          display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div style="flex: 1;">
                    <strong>Эксперимент активирован</strong>
                    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;">
                        Напоминание придёт через 7 дней для анализа результатов.
                    </p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    clearInput() {
        document.getElementById('userInput').value = '';
        document.getElementById('results').style.display = 'none';
        document.getElementById('userInput').focus();
    }

    showNotification(message, type) {
        // Создать временное уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: ${type === 'success' ? '#d1fae5' : 
                        type === 'warning' ? '#fef3c7' : '#fee2e2'};
            color: ${type === 'success' ? '#059669' : 
                    type === 'warning' ? '#92400e' : '#dc2626'};
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#059669' : 
                                type === 'warning' ? '#f59e0b' : '#dc2626'};
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                 type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.mirror = new FutureMirror();
    
    // Глобальные функции
    window.loadExample = function(index) {
        window.mirror.loadExample(index);
    };
    
    console.log('🔮 Зеркало Будущего инициализировано');
    console.log('📊 Локальный анализ • 0 сетевых запросов');
});
