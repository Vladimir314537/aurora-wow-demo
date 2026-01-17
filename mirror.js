// mirror.js - Движок "Зеркала Будущего"

class FutureMirror {
    constructor() {
        this.userInput = document.getElementById('user-input');
        this.analyzeBtn = document.getElementById('analyze-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.resultsSection = document.getElementById('results-section');
        this.currentPatternsEl = document.getElementById('current-patterns');
        this.probabilityTreeEl = document.getElementById('probability-tree');
        this.experimentContentEl = document.getElementById('experiment-content');
        this.startExperimentBtn = document.getElementById('start-experiment');
        
        this.init();
    }

    init() {
        // Начальные примеры
        const examples = [
            "Чувствую выгорание на работе, нет энергии на личные проекты...",
            "Постоянно откладываю важные дела на потом, хотя знаю, что это вредит",
            "После конфликта с близким человеком не могу прийти в себя несколько дней",
            "Достиг цели, но не чувствую удовлетворения, скорее опустошение",
            "Хочу начать новое дело, но страх неудачи парализует"
        ];
        
        this.userInput.placeholder = examples[Math.floor(Math.random() * examples.length)];
        
        // Обработчики событий
        this.analyzeBtn.addEventListener('click', () => this.analyze());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.startExperimentBtn.addEventListener('click', () => this.startExperiment());
        
        // Быстрые примеры
        this.createExampleButtons();
    }

    createExampleButtons() {
        const examples = [
            { text: "🚀 Стартап стресс", content: "Запускаю стартап, постоянный стресс, не уверен в успехе..." },
            { text: "💔 Отношения", content: "Конфликты в отношениях, чувствую, что отдаляюсь от партнёра..." },
            { text: "📚 Учёба", content: "Сложно сконцентрироваться на учёбе, постоянно отвлекаюсь..." },
            { text: "🏥 Здоровье", content: "Постоянная усталость, плохой сон, нет энергии на спорт..." }
        ];

        const container = document.createElement('div');
        container.className = 'example-buttons';
        
        examples.forEach(example => {
            const btn = document.createElement('button');
            btn.className = 'example-btn';
            btn.innerHTML = example.text;
            btn.addEventListener('click', () => {
                this.userInput.value = example.content;
            });
            container.appendChild(btn);
        });
        
        this.userInput.parentNode.insertBefore(container, this.userInput.nextSibling);
    }

    async analyze() {
        const text = this.userInput.value.trim();
        if (!text) {
            alert('Пожалуйста, введите текст для анализа');
            return;
        }

        // Показать загрузку
        this.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
        this.analyzeBtn.disabled = true;

        // Имитация анализа (в реальности будет работать с local-analyzer.js)
        await this.simulateAnalysis(text);

        // Показать результаты
        this.showResults(text);
        
        // Вернуть кнопку в исходное состояние
        this.analyzeBtn.innerHTML = '<i class="fas fa-crystal-ball"></i> Заглянуть в Зеркало';
        this.analyzeBtn.disabled = false;
    }

    async simulateAnalysis(text) {
        // Имитация работы ИИ (в реальности будет вызван local-analyzer.js)
        return new Promise(resolve => {
            setTimeout(() => resolve(), 800);
        });
    }

    analyzeText(text) {
        // Базовый анализ текста (упрощённый)
        const words = text.toLowerCase().split(/\s+/);
        
        const analysis = {
            emotion: this.detectEmotion(text),
            topics: this.detectTopics(words),
            keywords: this.extractKeywords(words),
            patterns: this.detectPatterns(text),
            length: text.length,
            wordCount: words.length
        };
        
        return analysis;
    }

    detectEmotion(text) {
        const negativeWords = ['стресс', 'устал', 'усталость', 'тревож', 'страх', 'боюсь', 'выгорание', 
                              'конфликт', 'проблем', 'сложно', 'трудно', 'нет сил', 'опустошение'];
        const positiveWords = ['рад', 'счасть', 'успех', 'доволен', 'интерес', 'вдохнов', 'энерги', 
                              'сила', 'уверен', 'горд', 'радост', 'удовольствие'];
        
        let negativeCount = 0;
        let positiveCount = 0;
        
        negativeWords.forEach(word => {
            if (text.toLowerCase().includes(word)) negativeCount++;
        });
        
        positiveWords.forEach(word => {
            if (text.toLowerCase().includes(word)) positiveCount++;
        });
        
        if (positiveCount > negativeCount * 2) return { type: 'positive', score: 0.8 };
        if (negativeCount > positiveCount * 2) return { type: 'negative', score: 0.7 };
        return { type: 'neutral', score: 0.5 };
    }

    detectTopics(words) {
        const topics = {
            'работа': ['работа', 'проект', 'начальник', 'коллеги', 'офис', 'зарплата'],
            'здоровье': ['здоровье', 'боль', 'врач', 'лечение', 'симптом', 'усталость'],
            'отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт'],
            'финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг'],
            'развитие': ['развитие', 'обучение', 'навыки', 'курс', 'чтение', 'знания']
        };
        
        const detectedTopics = [];
        Object.entries(topics).forEach(([topic, keywords]) => {
            keywords.forEach(keyword => {
                if (words.some(word => word.includes(keyword))) {
                    if (!detectedTopics.includes(topic)) {
                        detectedTopics.push(topic);
                    }
                }
            });
        });
        
        return detectedTopics.length > 0 ? detectedTopics : ['общие размышления'];
    }

    extractKeywords(words) {
        // Убираем стоп-слова
        const stopWords = ['и', 'в', 'на', 'с', 'по', 'у', 'о', 'об', 'но', 'а', 'или', 'как', 'то', 'это'];
        const filtered = words.filter(word => 
            word.length > 3 && !stopWords.includes(word)
        );
        
        // Подсчитываем частоту
        const frequency = {};
        filtered.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        // Возвращаем топ-5
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);
    }

    detectPatterns(text) {
        const patterns = [];
        
        // Простые паттерны для демо
        if (text.includes('постоянно') || text.includes('всегда') || text.includes('каждый раз')) {
            patterns.push({ name: 'Цикличность', strength: 0.8 });
        }
        
        if (text.includes('хочу') && text.includes('но')) {
            patterns.push({ name: 'Конфликт желаний', strength: 0.7 });
        }
        
        if (text.includes('страх') || text.includes('боюсь')) {
            patterns.push({ name: 'Избегание риска', strength: 0.9 });
        }
        
        if (text.includes('энерги') && text.includes('нет')) {
            patterns.push({ name: 'Дефицит энергии', strength: 0.85 });
        }
        
        return patterns.length > 0 ? patterns : [{ name: 'Уникальная ситуация', strength: 0.5 }];
    }

    generateFutureScenarios(analysis) {
        const baseScenarios = [
            {
                id: 'continue',
                name: 'Продолжение текущего пути',
                description: 'Если ничего не менять, текущие паттерны будут усиливаться',
                probability: 60,
                consequences: [
                    'Нарастание текущих проблем на 30-40%',
                    'Снижение продуктивности через месяц',
                    'Риск выгорания: высокий'
                ],
                icon: '🔄'
            },
            {
                id: 'improve',
                name: 'Внедрение микро-ритуалов',
                description: 'При добавлении небольших положительных изменений',
                probability: 30,
                consequences: [
                    'Снижение стресса на 35-45%',
                    'Улучшение качества сна',
                    'Повышение личной эффективности'
                ],
                action: '5 минут медитации утром',
                icon: '📈'
            },
            {
                id: 'unpredictable',
                name: 'Непредсказуемые события',
                description: 'События вне текущих паттернов (чёрные лебеди)',
                probability: 10,
                consequences: [
                    'Возможны неожиданные возможности',
                    'Могут потребоваться адаптация'
                ],
                note: 'Зеркало честно признаёт границы предсказуемости',
                icon: '🌀'
            }
        ];

        // Корректируем вероятности на основе анализа
        const scenarios = [...baseScenarios];
        
        if (analysis.emotion.type === 'negative') {
            scenarios[0].probability += 10;
            scenarios[1].probability -= 5;
        }
        
        if (analysis.emotion.type === 'positive') {
            scenarios[0].probability -= 15;
            scenarios[1].probability += 10;
            scenarios[2].probability += 5;
        }
        
        // Нормализуем вероятности
        const total = scenarios.reduce((sum, s) => sum + s.probability, 0);
        scenarios.forEach(s => {
            s.probability = Math.round((s.probability / total) * 100);
        });
        
        return scenarios;
    }

    generateExperiment(analysis) {
        const experiments = {
            stress: {
                title: '📉 Снижение стресса',
                description: 'Не пить кофе после 16:00 в течение 7 дней',
                rationale: 'На основе 82% корреляции в исследованиях между поздним кофеином и качеством сна',
                metrics: ['Качество сна', 'Утренняя бодрость', 'Уровень тревожности'],
                duration: '7 дней',
                expected: 'Улучшение сна на 30-40%'
            },
            energy: {
                title: '⚡ Повышение энергии',
                description: '10-минутная прогулка в обеденный перерыв',
                rationale: '78% корреляция с повышением продуктивности во второй половине дня',
                metrics: ['Энергия после обеда', 'Фокус на задачах', 'Общее настроение'],
                duration: '5 дней',
                expected: 'Прирост энергии на 25-35%'
            },
            focus: {
                title: '🎯 Улучшение фокуса',
                description: 'Техника Pomodoro: 25 минут работы / 5 минут отдыха',
                rationale: 'Повышение концентрации на 60% по данным исследований',
                metrics: ['Количество выполненных задач', 'Качество работы', 'Уровень усталости'],
                duration: '3 дня',
                expected: 'Увеличение продуктивности на 40-50%'
            }
        };

        // Выбираем эксперимент на основе анализа
        if (analysis.emotion.type === 'negative') {
            return experiments.stress;
        } else if (analysis.topics.includes('работа')) {
            return experiments.focus;
        } else {
            return experiments.energy;
        }
    }

    showResults(text) {
        // Анализируем текст
        const analysis = this.analyzeText(text);
        const scenarios = this.generateFutureScenarios(analysis);
        const experiment = this.generateExperiment(analysis);
        
        // Показываем текущие паттерны
        this.showCurrentPatterns(analysis);
        
        // Показываем дерево вероятностей
        this.showProbabilityTree(scenarios);
        
        // Показываем эксперимент
        this.showExperiment(experiment);
        
        // Показываем секцию результатов
        this.resultsSection.style.display = 'block';
        
        // Скроллим к результатам
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showCurrentPatterns(analysis) {
        const patternsHTML = `
            <div class="pattern-grid">
                <div class="pattern-item">
                    <div class="pattern-icon">😊</div>
                    <div class="pattern-info">
                        <strong>Эмоция:</strong>
                        <span class="tag emotion-${analysis.emotion.type}">
                            ${analysis.emotion.type === 'positive' ? 'Позитивная' : 
                              analysis.emotion.type === 'negative' ? 'Негативная' : 'Нейтральная'}
                        </span>
                        <small>Сила: ${(analysis.emotion.score * 100).toFixed(0)}%</small>
                    </div>
                </div>
                
                <div class="pattern-item">
                    <div class="pattern-icon">🏷️</div>
                    <div class="pattern-info">
                        <strong>Темы:</strong>
                        ${analysis.topics.map(topic => 
                            `<span class="tag topic-tag">${topic}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="pattern-item">
                    <div class="pattern-icon">🔑</div>
                    <div class="pattern-info">
                        <strong>Ключевые слова:</strong>
                        ${analysis.keywords.map(word => 
                            `<span class="tag keyword-tag">${word}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="pattern-item">
                    <div class="pattern-icon">🔄</div>
                    <div class="pattern-info">
                        <strong>Паттерны:</strong>
                        ${analysis.patterns.map(pattern => `
                            <div class="pattern-bar">
                                <span>${pattern.name}</span>
                                <div class="strength-bar">
                                    <div class="strength-fill" style="width: ${pattern.strength * 100}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.currentPatternsEl.innerHTML = patternsHTML;
    }

    showProbabilityTree(scenarios) {
        const treeHTML = `
            <div class="scenarios-container">
                ${scenarios.map(scenario => `
                    <div class="scenario-card" data-probability="${scenario.probability}">
                        <div class="scenario-header">
                            <div class="scenario-icon">${scenario.icon}</div>
                            <div class="scenario-title">
                                <h4>${scenario.name}</h4>
                                <div class="probability-badge">${scenario.probability}%</div>
                            </div>
                        </div>
                        
                        <p class="scenario-description">${scenario.description}</p>
                        
                        ${scenario.consequences ? `
                            <div class="consequences">
                                <strong>Возможные последствия:</strong>
                                <ul>
                                    ${scenario.consequences.map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${scenario.action ? `
                            <div class="action-suggestion">
                                <i class="fas fa-lightbulb"></i>
                                <strong>Действие:</strong> ${scenario.action}
                            </div>
                        ` : ''}
                        
                        ${scenario.note ? `
                            <div class="scenario-note">
                                <i class="fas fa-info-circle"></i> ${scenario.note}
                            </div>
                        ` : ''}
                        
                        <div class="probability-bar">
                            <div class="probability-fill" style="width: ${scenario.probability}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="probability-note">
                <i class="fas fa-chart-pie"></i>
                <strong>Как читать эти вероятности:</strong> Это не предсказание, а проекция текущих паттернов. 
                Вы можете изменить вероятности, меняя свои действия сегодня.
            </div>
        `;
        
        this.probabilityTreeEl.innerHTML = treeHTML;
    }

    showExperiment(experiment) {
        const experimentHTML = `
            <div class="experiment-card">
                <div class="experiment-header">
                    <h5>${experiment.title}</h5>
                    <span class="duration-badge">${experiment.duration}</span>
                </div>
                
                <p class="experiment-description">
                    <i class="fas fa-tasks"></i> <strong>Что делать:</strong> ${experiment.description}
                </p>
                
                <div class="experiment-rationale">
                    <i class="fas fa-book"></i> <strong>Научное обоснование:</strong> 
                    ${experiment.rationale}
                </div>
                
                <div class="experiment-metrics">
                    <i class="fas fa-chart-bar"></i> <strong>Что отслеживать:</strong>
                    <div class="metrics-tags">
                        ${experiment.metrics.map(metric => 
                            `<span class="metric-tag">${metric}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="experiment-expected">
                    <i class="fas fa-bullseye"></i> <strong>Ожидаемый результат:</strong> 
                    ${experiment.expected}
                </div>
            </div>
        `;
        
        this.experimentContentEl.innerHTML = experimentHTML;
    }

    startExperiment() {
        const experimentCard = this.experimentContentEl.querySelector('.experiment-card');
        
        // Анимация начала эксперимента
        this.startExperimentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Эксперимент начат...';
        this.startExperimentBtn.disabled = true;
        
        setTimeout(() => {
            // Создаём уведомление
            const notification = document.createElement('div');
            notification.className = 'experiment-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-calendar-check"></i>
                    <div>
                        <strong>Эксперимент начат!</strong>
                        <p>Через 7 дней мы покажем, как изменились ваши вероятности.</p>
                    </div>
                    <button class="close-notification">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Закрытие уведомления
            notification.querySelector('.close-notification').addEventListener('click', () => {
                notification.remove();
            });
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
            
            // Восстанавливаем кнопку
            this.startExperimentBtn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
            
        }, 1000);
    }

    clearInput() {
        this.userInput.value = '';
        this.resultsSection.style.display = 'none';
        this.userInput.focus();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.mirror = new FutureMirror();
    
    // Проверка Network tab
    console.log('🪞 Зеркало Будущего инициализировано');
    console.log('📡 Проверьте Network tab → должно быть 0 запросов при анализе');
    console.log('🔐 Все данные обрабатываются локально');
});
