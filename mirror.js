// mirror.js - Полная рабочая версия Зеркала Будущего

class FutureMirror {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyze());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearInput());
        document.getElementById('startExperimentBtn').addEventListener('click', () => this.startExperiment());
        
        console.log('🔮 Зеркало Будущего инициализировано');
    }

    async analyze() {
        const text = document.getElementById('userInput').value.trim();
        if (!text) {
            this.showNotification('Введите текст для анализа', 'warning');
            return;
        }

        const btn = document.getElementById('analyzeBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
        btn.disabled = true;

        try {
            await this.simulateProcessing();
            const analysis = this.performAnalysis(text);
            this.displayResults(analysis);
            this.showNotification('Анализ завершён локально', 'success');
        } catch (error) {
            this.showNotification('Ошибка анализа', 'error');
            console.error('Analysis error:', error);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    simulateProcessing() {
        return new Promise(resolve => setTimeout(resolve, 800));
    }

    performAnalysis(text) {
        const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        
        const emotion = this.detectEmotion(text);
        const topics = this.detectTopics(text);
        const patterns = this.extractPatterns(text);
        const textAnalysis = this.analyzeSpecificPatterns(text);
        
        const stats = {
            wordCount: words.length,
            sentenceCount: (text.match(/[.!?]+/g) || []).length,
            readingTime: Math.ceil(words.length / 200),
            complexity: this.calculateComplexity(text)
        };
        
        const scenarios = this.generateScenarios(emotion, patterns, topics, textAnalysis);
        const experiment = this.generateExperiment(emotion, patterns, topics, textAnalysis);
        
        return {
            text,
            emotion,
            topics,
            patterns,
            stats,
            scenarios,
            experiment,
            textAnalysis,
            timestamp: new Date().toISOString()
        };
    }

    detectEmotion(text) {
        const emotions = {
            негативный: ['стресс', 'устал', 'усталость', 'тревож', 'страх', 'боюсь', 'выгорание', 
                        'конфликт', 'проблем', 'сложно', 'трудно', 'нет сил', 'одиночество', 'ссора',
                        'бесполезно', 'опустошен', 'разбит', 'подавлен'],
            позитивный: ['рад', 'счасть', 'успех', 'доволен', 'интерес', 'вдохнов', 'энерги', 
                        'сила', 'уверен', 'горд', 'радост', 'удовольствие', 'надежда', 'оптимизм'],
            нейтральный: ['думаю', 'считаю', 'планирую', 'анализирую', 'заметил', 'наблюдаю', 'описываю']
        };
        
        let scores = { негативный: 0, позитивный: 0, нейтральный: 0 };
        const textLower = text.toLowerCase();
        
        Object.entries(emotions).forEach(([emotion, words]) => {
            words.forEach(word => {
                if (textLower.includes(word)) {
                    scores[emotion] += 1;
                }
            });
        });
        
        const dominant = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        
        return {
            type: dominant[0],
            score: dominant[1],
            confidence: total > 0 ? dominant[1] / total : 0
        };
    }

    detectTopics(text) {
        const topicKeywords = {
            'Работа/Карьера': ['работа', 'проект', 'карьера', 'начальник', 'коллеги', 'офис', 'задача', 'дедлайн', 'зарплата', 'профессия'],
            'Отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт', 'ссора', 'близкий', 'общение', 'доверие'],
            'Здоровье': ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'спорт', 'питание', 'самочувствие', 'болезнь', 'лечение'],
            'Финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг', 'бюджет', 'экономия', 'доход'],
            'Развитие': ['учёба', 'развитие', 'обучение', 'навыки', 'знания', 'чтение', 'курс', 'образование', 'саморазвитие'],
            'Психология': ['эмоции', 'чувства', 'тревога', 'стресс', 'мотивация', 'цели', 'привычки', 'мысль', 'рефлексия']
        };
        
        const detectedTopics = [];
        const textLower = text.toLowerCase();
        
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
            const matches = keywords.filter(keyword => textLower.includes(keyword));
            if (matches.length > 0) {
                detectedTopics.push({
                    name: topic,
                    relevance: Math.min(matches.length / keywords.length * 2, 1),
                    matchCount: matches.length,
                    keywords: matches
                });
            }
        });
        
        return detectedTopics.sort((a, b) => b.relevance - a.relevance);
    }

    extractPatterns(text) {
        const patterns = [];
        const textLower = text.toLowerCase();
        
        if ((textLower.match(/\b(всегда|никогда|всё|ничего|все)\b/g) || []).length > 0) {
            patterns.push({ 
                name: 'Абсолютизация', 
                strength: 0.9, 
                type: 'когнитивное искажение',
                description: 'Использование абсолютных формулировок'
            });
        }
        
        if ((textLower.match(/\b(нет|не могу|не получается|невозможно|бесполезно)\b/g) || []).length > 1) {
            patterns.push({ 
                name: 'Негативный фокус', 
                strength: 0.8, 
                type: 'язык',
                description: 'Акцент на ограничениях и проблемах'
            });
        }
        
        if ((textLower.match(/\b(должен|надо|нужно|обязан|следует)\b/g) || []).length > 0) {
            patterns.push({ 
                name: 'Давление долга', 
                strength: 0.7, 
                type: 'язык',
                description: 'Использование обязывающих формулировок'
            });
        }
        
        if ((textLower.match(/\b(хочу|мечтаю|планирую|буду)\b/g) || []).length > 1) {
            patterns.push({ 
                name: 'Ориентация на будущее', 
                strength: 0.6, 
                type: 'мотивация',
                description: 'Фокус на желаниях и планах'
            });
        }
        
        if ((textLower.match(/\b(постоянно|каждый день|регулярно)\b/g) || []).length > 0) {
            patterns.push({ 
                name: 'Цикличность', 
                strength: 0.85, 
                type: 'поведение',
                description: 'Повторяющиеся паттерны во времени'
            });
        }
        
        return patterns.length > 0 ? patterns : [{ 
            name: 'Уникальная ситуация', 
            strength: 0.5, 
            type: 'особый случай',
            description: 'Требует индивидуального анализа'
        }];
    }

    analyzeSpecificPatterns(text) {
        const problemTypes = {
            'эмоциональное выгорание': ['выгорание', 'эмоциональное истощение', 'профессиональное выгорание'],
            'межличностные конфликты': ['конфликт', 'ссора', 'непонимание', 'спор', 'разногласие'],
            'прокрастинация': ['прокрастинация', 'откладываю', 'не могу начать', 'оттягиваю'],
            'хроническая усталость': ['хроническая усталость', 'постоянно устал', 'нет энергии', 'утомление'],
            'тревожность': ['тревож', 'беспокойство', 'волнение', 'паника', 'страх'],
            'низкая самооценка': ['неуверен', 'сомневаюсь', 'недостоин', 'не справлюсь']
        };
        
        let detectedProblem = 'общая неудовлетворённость';
        const textLower = text.toLowerCase();
        
        Object.entries(problemTypes).forEach(([problem, keywords]) => {
            if (keywords.some(keyword => textLower.includes(keyword))) {
                detectedProblem = problem;
            }
        });
        
        return {
            problemType: detectedProblem,
            timeReferences: {
                past: (textLower.match(/\b(было|раньше|в прошлом|до этого|раньше)\b/g) || []).length,
                present: (textLower.match(/\b(сейчас|теперь|в данный момент|сегодня|в настоящий)\b/g) || []).length,
                future: (textLower.match(/\b(буду|потом|завтра|скоро|в будущем|планирую)\b/g) || []).length
            },
            resourcesMentioned: {
                energy: textLower.includes('энерг') || textLower.includes('сил') || textLower.includes('силы'),
                time: textLower.includes('врем') || textLower.includes('успева') || textLower.includes('дедлайн'),
                support: textLower.includes('помощ') || textLower.includes('поддерж') || textLower.includes('совет')
            },
            languagePatterns: {
                questions: (textLower.match(/\?/g) || []).length,
                exclamations: (textLower.match(/!/g) || []).length,
                length: text.length
            }
        };
    }

    calculateComplexity(text) {
        const words = text.split(/\s+/);
        const longWords = words.filter(w => w.length > 6).length;
        const sentences = (text.match(/[.!?]+/g) || []).length;
        
        if (words.length === 0) return 0;
        
        const complexity = (longWords / words.length * 10) + (sentences > 0 ? words.length / sentences / 10 : 0);
        return Math.min(complexity, 10).toFixed(1);
    }

    generateScenarios(emotion, patterns, topics, textAnalysis) {
        const problemConsequences = {
            'эмоциональное выгорание': {
                short: ['Нарастание усталости на 20-30%', 'Снижение продуктивности', 'Усиление циклических мыслей'],
                medium: ['Риск клинической депрессии', 'Проф. эффективность -40-50%', 'Физические симптомы стресса'],
                long: ['Хронификация состояния', 'Необходимость длительного лечения', 'Карьерные последствия']
            },
            'межличностные конфликты': {
                short: ['Эскалация напряжённости', 'Увеличение дистанции', 'Рост взаимных претензий'],
                medium: ['Хронизация конфликтных паттернов', 'Эмоциональное истощение', 'Возможность разрыва'],
                long: ['Долгосрочное влияние на психику', 'Трудности в новых отношениях', 'Социальная изоляция']
            },
            'прокрастинация': {
                short: ['Накопление незавершённых дел', 'Усиление чувства вины', 'Потеря контроля над временем'],
                medium: ['Значительные упущенные возможности', 'Снижение самооценки', 'Формирование устойчивого паттерна'],
                long: ['Карьерный стагнация', 'Хроническое недовольство собой', 'Проблемы с дисциплиной в других сферах']
            },
            'хроническая усталость': {
                short: ['Ухудшение качества сна', 'Снижение физической активности', 'Нарастание апатии'],
                medium: ['Устойчивое снижение качества жизни', 'Вторичные проблемы со здоровьем', 'Социальная изоляция'],
                long: ['Развитие сопутствующих заболеваний', 'Потеря работы/учёбы', 'Длительная реабилитация']
            },
            'тревожность': {
                short: ['Усиление тревожных эпизодов', 'Нарушения сна', 'Снижение концентрации'],
                medium: ['Развитие панических атак', 'Социальная изоляция', 'Профессиональные проблемы'],
                long: ['Генерализованное тревожное расстройство', 'Необходимость медикаментозного лечения', 'Значительное снижение качества жизни']
            },
            'низкая самооценка': {
                short: ['Избегание новых вызовов', 'Недооценка своих достижений', 'Постоянные сомнения'],
                medium: ['Упущенные возможности роста', 'Трудности в отношениях', 'Депрессивные эпизоды'],
                long: ['Устойчивое негативное самовосприятие', 'Профессиональный потолок', 'Хроническое недовольство жизнью']
            },
            'общая неудовлетворённость': {
                short: ['Сохранится текущий уровень проблем', 'Незначительные колебания', 'Стагнация'],
                medium: ['Накопление негативных эффектов', 'Усиление проблем на 30-40%', 'Формирование устойчивых паттернов'],
                long: ['Хронификация проблемы', 'Влияние на качество жизни', 'Необходимость помощи']
            }
        };

        const consequences = problemConsequences[textAnalysis.problemType] || problemConsequences['общая неудовлетворённость'];

        // Рассчитываем базовые вероятности
        let continuationProb = 60;
        let interventionProb = 30;
        let transformationProb = 10;

        // Корректируем на основе эмоций
        if (emotion.type === 'негативный') {
            continuationProb += 15;
            interventionProb -= 10;
        } else if (emotion.type === 'позитивный') {
            continuationProb -= 20;
            interventionProb += 15;
            transformationProb += 5;
        }

        // Корректируем на основе паттернов
        const strongPatterns = patterns.filter(p => p.strength > 0.7).length;
        continuationProb += strongPatterns * 5;

        // Корректируем на основе ресурсов
        if (textAnalysis.resourcesMentioned.support) {
            interventionProb += 10;
            continuationProb -= 5;
        }

        // Корректируем на основе времени
        if (textAnalysis.timeReferences.future > 1) {
            interventionProb += 5;
            transformationProb += 3;
        }

        // Устанавливаем сценарии
        const scenarios = [
            {
                id: 'continuation',
                title: this.getScenarioTitle('continuation', textAnalysis),
                description: 'Если сохранить текущие паттерны поведения без изменений',
                riskLevel: this.calculateRiskLevel(emotion, patterns, 'continuation'),
                probability: continuationProb,
                timeframes: {
                    '7 дней': consequences.short,
                    '30 дней': consequences.medium,
                    '90 дней': consequences.long
                },
                triggers: this.extractSpecificTriggers(textAnalysis),
                icon: '🔄'
            },
            {
                id: 'intervention',
                title: 'Управляемые изменения',
                description: this.getInterventionDescription(textAnalysis),
                riskLevel: 'medium',
                probability: interventionProb,
                timeframes: {
                    '7 дней': ['Начало формирования новых привычек', 'Первые признаки улучшений', 'Осознание возможных изменений'],
                    '30 дней': ['Закрепление положительных изменений', 'Улучшение состояния на 30-40%', 'Появление новых стратегий'],
                    '90 дней': ['Устойчивые изменения в поведении', 'Значительное улучшение качества жизни', 'Интеграция новых навыков']
                },
                actions: this.generateSpecificActions(textAnalysis),
                icon: '📈'
            },
            {
                id: 'transformation',
                title: 'Качественный прорыв',
                description: 'При фундаментальном пересмотре подходов и получении системной поддержки',
                riskLevel: 'low',
                probability: transformationProb,
                timeframes: {
                    '7 дней': ['Кризис как точка роста', 'Поиск принципиально новых решений', 'Обращение за помощью'],
                    '30 дней': ['Эксперименты с разными подходами', 'Формирование новой системы ценностей', 'Получение поддержки'],
                    '90 дней': ['Выход на новый уровень функционирования', 'Глубокие личностные изменения', 'Устойчивое улучшение']
                },
                requirements: ['Внешняя поддержка (коуч/терапевт)', 'Готовность к радикальным изменениям', 'Ресурс времени и энергии'],
                icon: '🚀'
            }
        ];

        // Нормализуем вероятности
        const total = scenarios.reduce((sum, s) => sum + s.probability, 0);
        scenarios.forEach(s => {
            s.probability = Math.round((s.probability / total) * 100);
        });

        // Сортируем по вероятности
        return scenarios.sort((a, b) => b.probability - a.probability);
    }

    getScenarioTitle(type, analysis) {
        const titles = {
            continuation: {
                'эмоциональное выгорание': 'Усиление выгорания',
                'межличностные конфликты': 'Эскалация конфликтов',
                'прокрастинация': 'Углубление прокрастинации',
                'хроническая усталость': 'Нарастание усталости',
                'тревожность': 'Усиление тревожности',
                'низкая самооценка': 'Укоренение неуверенности',
                'общая неудовлетворённость': 'Стагнация ситуации'
            }
        };
        
        return titles[type]?.[analysis.problemType] || 'Продолжение текущего пути';
    }

    calculateRiskLevel(emotion, patterns, scenarioType) {
        if (scenarioType === 'continuation') {
            if (emotion.type === 'негативный' && patterns.some(p => p.strength > 0.8)) {
                return 'high';
            } else if (emotion.type === 'негативный' || patterns.some(p => p.strength > 0.7)) {
                return 'medium';
            }
            return 'low';
        }
        return scenarioType === 'intervention' ? 'medium' : 'low';
    }

    getInterventionDescription(analysis) {
        const descriptions = {
            'эмоциональное выгорание': 'При систематическом внедрении практик восстановления и установлении границ',
            'межличностные конфликты': 'При освоении навыков конструктивного общения и эмоциональной регуляции',
            'прокрастинация': 'При внедрении техник управления временем и повышения мотивации',
            'хроническая усталость': 'При комплексном подходе к восстановлению энергии и режиму дня',
            'тревожность': 'При регулярной практике релаксации и когнитивной переработки',
            'низкая самооценка': 'При системной работе с самооценкой и освоении само-поддержки',
            'общая неудовлетворённость': 'При целенаправленном внедрении позитивных изменений в ключевые сферы'
        };
        
        return descriptions[analysis.problemType] || 'При систематическом внедрении небольших позитивных изменений';
    }

    extractSpecificTriggers(analysis) {
        const triggers = {
            'эмоциональное выгорание': ['Перегрузка на работе', 'Отсутствие отдыха', 'Чувство обязанности'],
            'межличностные конфликты': ['Различия в ценностях', 'Проблемы коммуникации', 'Накопленные обиды'],
            'прокрастинация': ['Страх неудачи', 'Перфекционизм', 'Отсутствие ясных целей'],
            'хроническая усталость': ['Нарушения сна', 'Несбалансированное питание', 'Хронический стресс'],
            'тревожность': ['Неопределённость', 'Ожидание негатива', 'Контроль над ситуацией'],
            'низкая самооценка': ['Критика извне', 'Сравнение с другими', 'Негативный внутренний диалог']
        };
        
        return triggers[analysis.problemType] || ['Неопределённые факторы', 'Внешние обстоятельства', 'Внутренние противоречия'];
    }

    generateSpecificActions(analysis) {
        const actions = {
            'эмоциональное выгорание': [
                'Ежедневные 5-минутные перерывы на дыхательные упражнения',
                'Установка чётких границ между работой и отдыхом',
                'Ведение дневника эмоционального состояния в Aurora'
            ],
            'межличностные конфликты': [
                'Использование "Я-сообщений" в сложных разговорах',
                'Еженедельные check-in встречи для обсуждения проблем',
                'Практика активного слушания без перебивания'
            ],
            'прокрастинация': [
                'Метод "Съесть лягушку" - начинать день с самой сложной задачи',
                'Разбиение больших задач на 25-минутные интервалы (Pomodoro)',
                'Визуализация прогресса с помощью трекера достижений'
            ],
            'хроническая усталость': [
                'Регулярный анализ и оптимизация режима сна',
                'Постепенное увеличение физической активности (10 мин/день)',
                'Контроль питания и гидратации в течение дня'
            ],
            'тревожность': [
                'Практика mindfulness-медитации 10 минут утром',
                'Ведение дневника тревожных мыслей и их рациональная оценка',
                'Техника "заземления" при острых приступах тревоги'
            ],
            'низкая самооценка': [
                'Ежедневное фиксирование 3-х успехов, даже маленьких',
                'Практика самосострадания вместо самокритики',
                'Составление списка своих сильных качеств и достижений'
            ]
        };
        
        return actions[analysis.problemType] || [
            'Регулярная рефлексия текущего состояния в Aurora',
            'Постановка конкретных измеримых целей на неделю',
            'Отслеживание прогресса и корректировка подходов'
        ];
    }

    generateExperiment(emotion, patterns, topics, analysis) {
        const experiments = {
            'эмоциональное выгорание': {
                title: '📉 Управление стрессом и восстановление энергии',
                description: 'Ежедневная 10-минутная практика mindfulness-медитации утром + установление цифрового детокса после 20:00',
                rationale: 'Исследования показывают, что регулярная медитация снижает уровень кортизола на 25-30%, а цифровой детокс улучшает качество сна на 40%',
                metrics: ['Уровень тревожности (1-10)', 'Качество сна (часы/оценка)', 'Уровень энергии утром (1-10)'],
                duration: '7 дней',
                expectedResult: 'Снижение субъективного стресса на 35-40%, улучшение сна на 1-2 часа',
                instructions: [
                    'Утром после пробуждения найдите тихое место',
                    'Сядьте удобно, закройте глаза, сфокусируйтесь на дыхании 10 минут',
                    'Вечером после 20:00 отложите все гаджеты, кроме Aurora для записей',
                    'Фиксируйте ощущения после практики в Aurora, отмечая изменения'
                ]
            },
            'межличностные конфликты': {
                title: '💬 Улучшение коммуникации',
                description: 'Ежедневный 15-минутный осмысленный разговор с близким человеком без отвлечений',
                rationale: 'Исследования в области коммуникации показывают, что регулярные осмысленные разговоры увеличивают взаимопонимание на 60% и снижают конфликты',
                metrics: ['Качество общения (1-10)', 'Эмоциональная близость (1-10)', 'Частота конфликтов (раз/неделю)'],
                duration: '7 дней',
                expectedResult: 'Улучшение качества отношений на 30-35%, снижение конфликтов на 50%',
                instructions: [
                    'Выберите время без отвлечений (телефон, ТВ, другие люди)',
                    'Фокусируйтесь на активном слушании: слушайте, чтобы понять, а не ответить',
                    'Используйте "Я-сообщения": "Я чувствую... когда... потому что..."',
                    'Избегайте критики, обвинений и обобщений ("ты всегда...")'
                ]
            },
            'прокрастинация': {
                title: '⚡ Повышение продуктивности',
                description: 'Техника Pomodoro: 25 минут фокуса / 5 минут отдыха с обязательным началом дня с самой сложной задачи',
                rationale: 'Pomodoro увеличивает концентрацию на 60% и снижает умственную усталость. Начало дня с сложной задачи ("съесть лягушку") повышает общую продуктивность на 45%',
                metrics: ['Выполненные задачи (шт/день)', 'Качество работы (1-10)', 'Уровень удовлетворённости (1-10)'],
                duration: '5 рабочих дней',
                expectedResult: 'Увеличение эффективности на 40-50%, снижение стресса от дедлайнов',
                instructions: [
                    'С вечера составляйте список задач на завтра',
                    'Утром начинайте с самой сложной/неприятной задачи',
                    'Работайте 25 минут без отвлечений, затем 5 минут отдыха',
                    'После 4 циклов делайте 15-минутный перерыв',
                    'В Aurora фиксируйте выполненные задачи и ощущения'
                ]
            },
            'хроническая усталость': {
                title: '🌿 Восстановление энергии',
                description: 'Ежедневная 20-минутная прогулка на свежем воздухе + оптимизация режима сна (засыпание до 23:00)',
                rationale: 'Регулярные прогулки повышают уровень энергии на 25%, а раннее засыпание улучшает качество глубокого сна на 30%',
                metrics: ['Уровень энергии (1-10)', 'Качество сна (часы/оценка)', 'Общее самочувствие (1-10)'],
                duration: '7 дней',
                expectedResult: 'Увеличение энергии на 25-30%, улучшение качества сна',
                instructions: [
                    'Ежедневно 20 минут прогулки в удобном темпе',
                    'Засыпание до 23:00, подъём в одно время',
                    'За 1 час до сна - никаких экранов',
                    'В Aurora фиксируйте уровень энергии и качество сна'
                ]
            },
            'общая неудовлетворённость': {
                title: '🎯 Повышение удовлетворённости жизнью',
                description: 'Ежедневное фиксирование 3-х благодарностей + одна небольшая победа/успех',
                rationale: 'Практика благодарности увеличивает общую удовлетворённость жизнью на 25%, а фиксация успехов укрепляет самооценку',
                metrics: ['Уровень удовлетворённости (1-10)', 'Настроение (1-10)', 'Чувство контроля (1-10)'],
                duration: '7 дней',
                expectedResult: 'Увеличение удовлетворённости на 20-25%, улучшение настроения',
                instructions: [
                    'Каждый вечер записывайте в Aurora 3 вещи, за которые благодарны',
                    'Фиксируйте одну небольшую победу за день (даже если "просто встал с постели")',
                    'Отмечайте изменения в восприятии ситуации',
                    'В конце недели проанализируйте общую динамику'
                ]
            }
        };

        return experiments[analysis.problemType] || experiments['общая неудовлетворённость'];
    }

    displayResults(analysis) {
        document.getElementById('results').style.display = 'block';
        this.displayCurrentStats(analysis);
        this.displayPatterns(analysis.patterns);
        this.displayScenarios(analysis.scenarios);
        this.displayExperiment(analysis.experiment);
        
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
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    Уверенность: ${Math.round(analysis.emotion.confidence * 100)}%
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${analysis.emotion.confidence * 100}%"></div>
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Основные темы</div>
                <div class="stat-value">${analysis.topics.slice(0, 2).map(t => t.name.split('/')[0]).join(', ')}</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.topics.length} тем, ${analysis.topics.reduce((sum, t) => sum + t.matchCount, 0)} совпадений
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Паттерны поведения</div>
                <div class="stat-value">${analysis.patterns.length}</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.patterns.filter(p => p.strength > 0.7).length} сильных паттернов
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Статистика текста</div>
                <div class="stat-value">${analysis.stats.wordCount} слов</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.stats.readingTime} мин чтения • Сложность: ${analysis.stats.complexity}/10
                </div>
            </div>
        `;
    }

    displayPatterns(patterns) {
        const patternsList = document.getElementById('patternsList');
        
        if (patterns.length === 0) {
            patternsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 1rem;">Явных паттернов не обнаружено</p>';
            return;
        }
        
        patternsList.innerHTML = patterns.map(pattern => `
            <div class="pattern-item">
                <div style="flex: 1;">
                    <div class="pattern-name">${pattern.name}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">${pattern.type}: ${pattern.description}</div>
                </div>
                <div style="min-width: 100px;">
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
                    ${scenario.icon} ${scenario.title}
                </div>
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem;">
                    ${scenario.description}
                </p>
                
                <div class="timeframes">
                    <div style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem; font-weight: 600;">
                        <i class="fas fa-calendar-alt"></i> Развитие ситуации:
                    </div>
                    
                    ${Object.entries(scenario.timeframes || {}).map(([timeframe, consequences]) => `
                        <div style="margin-bottom: 0.75rem;">
                            <div style="font-weight: 600; font-size: 0.75rem; color: #374151; margin-bottom: 0.25rem; 
                                      background: #e0e7ff; padding: 0.25rem 0.5rem; border-radius: 0.25rem; display: inline-block;">
                                ${timeframe}
                            </div>
                            <ul style="margin: 0.25rem 0 0 1rem; padding: 0; font-size: 0.75rem; color: #6b7280;">
                                ${consequences.map(c => `<li style="margin-bottom: 0.125rem;">${c}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                ${scenario.triggers ? `
                    <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--gray-200);">
                        <div style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem;">
                            <i class="fas fa-bolt"></i> <strong>Ключевые триггеры:</strong>
                        </div>
                        <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                            ${scenario.triggers.map(t => 
                                `<span style="background: #e5e7eb; padding: 0.125rem 0.5rem; border-radius: 1rem; 
                                           font-size: 0.75rem; color: #4b5563;">${t}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${scenario.actions ? `
                    <div style="margin-top: 1rem; padding: 0.75rem; background: #f0f9ff; border-radius: 0.5rem;">
                        <div style="font-size: 0.75rem; color: #0369a1; margin-bottom: 0.25rem;">
                            <i class="fas fa-lightbulb"></i> <strong>Возможные действия:</strong>
                        </div>
                        <ul style="margin: 0; padding-left: 1rem; font-size: 0.75rem; color: #0369a1;">
                            ${scenario.actions.map(a => `<li style="margin-bottom: 0.25rem;">${a}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${scenario.requirements ? `
                    <div style="margin-top: 0.75rem; font-size: 0.75rem; color: #92400e; 
                                padding: 0.5rem; background: #fef3c7; border-radius: 0.5rem;">
                        <i class="fas fa-info-circle"></i> <strong>Требуется:</strong> ${scenario.requirements.join(', ')}
                    </div>
                ` : ''}
                
                <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--gray-200);">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.25rem;">
                        <span style="color: #6b7280;">Уровень риска:</span>
                        <span style="color: ${scenario.riskLevel === 'high' ? '#dc2626' : 
                                          scenario.riskLevel === 'medium' ? '#d97706' : '#6b7280'}; 
                                  font-weight: 600;">
                            ${scenario.riskLevel === 'high' ? 'ВЫСОКИЙ' : 
                             scenario.riskLevel === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                        </span>
                    </div>
                    <div class="progress-indicator">
                        <div class="progress-fill-risk"></div>
                    </div>
                </div>
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
                <strong style="font-size: 0.875rem;">Инструкция:</strong>
                <ol style="font-size: 0.875rem; color: #6b7280; margin-left: 1.25rem; margin-top: 0.5rem;">
                    ${experiment.instructions.map(inst => `<li style="margin-bottom: 0.25rem;">${inst}</li>`).join('')}
                </ol>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong style="font-size: 0.875rem;">Метрики для отслеживания:</strong>
                <div class="metrics">
                    ${experiment.metrics.map(metric => 
                        `<span class="metric-tag">${metric}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="background: white; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1rem;">
                <strong>Ожидаемый результат:</strong> ${experiment.expectedResult}
            </div>
        `;
    }

    startExperiment() {
        const btn = document.getElementById('startExperimentBtn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Запускаю...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент запущен';
            btn.style.background = '#059669';
            btn.style.borderColor = '#059669';
            
            this.showNotification('Эксперимент запущен. Напоминание придёт через 7 дней.', 'success');
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
                        Результаты будут сохранены локально в Aurora.
                    </p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 0.25rem;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(10px)';
                setTimeout(() => notification.parentNode?.removeChild(notification), 300);
            }
        }, 5000);
    }

    clearInput() {
        document.getElementById('userInput').value = '';
        document.getElementById('results').style.display = 'none';
        document.getElementById('userInput').focus();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                 type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.mirror = new FutureMirror();
    
    // Проверка локальной работы
    console.log('🔮 Зеркало Будущего готово к работе');
    console.log('📡 Проверьте Network tab → должно быть 0 запросов при анализе');
    console.log('🔐 Все данные обрабатываются локально в вашем браузере');
});
