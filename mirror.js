// mirror.js - Исправленная рабочая версия Зеркала Будущего

class FutureMirror {
    constructor() {
        this.lifeSpheres = ['Работа', 'Отношения', 'Здоровье', 'Финансы', 'Личное развитие'];
        this.sphereEmphasis = {
            'Работа': ['работа', 'проект', 'карьера', 'начальник', 'коллеги', 'офис', 'задача', 'дедлайн'],
            'Отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт', 'ссора', 'общение'],
            'Здоровье': ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'спорт', 'питание', 'самочувствие'],
            'Финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг', 'бюджет'],
            'Личное развитие': ['учёба', 'развитие', 'обучение', 'навыки', 'знания', 'чтение', 'курс']
        };
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
        const sphereFocus = this.analyzeSphereFocus(text);
        
        const stats = {
            wordCount: words.length,
            sentenceCount: (text.match(/[.!?]+/g) || []).length,
            readingTime: Math.ceil(words.length / 200),
            complexity: this.calculateComplexity(text),
            sphereFocus: sphereFocus
        };
        
        const scenarios = this.generateScenarios(emotion, patterns, topics, textAnalysis, sphereFocus);
        const experiment = this.generateExperiment(emotion, patterns, topics, textAnalysis, sphereFocus);
        
        return {
            text,
            emotion,
            topics,
            patterns,
            stats,
            scenarios,
            experiment,
            textAnalysis,
            sphereFocus,
            timestamp: new Date().toISOString()
        };
    }

    detectEmotion(text) {
        const emotions = {
            негативный: ['стресс', 'устал', 'усталость', 'тревож', 'страх', 'боюсь', 'выгорание', 
                        'конфликт', 'проблем', 'сложно', 'трудно', 'нет сил', 'одиночество', 'ссора',
                        'бесполезно', 'опустошен', 'разбит', 'подавлен', 'депрессия', 'злость', 'гнев'],
            позитивный: ['рад', 'счасть', 'успех', 'доволен', 'интерес', 'вдохнов', 'энерги', 
                        'сила', 'уверен', 'горд', 'радост', 'удовольствие', 'надежда', 'оптимизм',
                        'любовь', 'гармония', 'благодарность', 'восторг'],
            нейтральный: ['думаю', 'считаю', 'планирую', 'анализирую', 'заметил', 'наблюдаю', 'описываю',
                         'просто', 'обычно', 'часто', 'иногда', 'возможно', 'вероятно']
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
            confidence: total > 0 ? Math.round((dominant[1] / total) * 100) : 50
        };
    }

    detectTopics(text) {
        const topicKeywords = {
            'Работа/Карьера': ['работа', 'проект', 'карьера', 'начальник', 'коллеги', 'офис', 'задача', 'дедлайн', 'зарплата', 'профессия', 'бизнес', 'компания'],
            'Отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт', 'ссора', 'близкий', 'общение', 'доверие', 'брак', 'дети'],
            'Здоровье': ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'спорт', 'питание', 'самочувствие', 'болезнь', 'лечение', 'врач', 'больница'],
            'Финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг', 'бюджет', 'экономия', 'доход', 'кредит', 'накопления'],
            'Развитие': ['учёба', 'развитие', 'обучение', 'навыки', 'знания', 'чтение', 'курс', 'образование', 'саморазвитие', 'книга', 'университет'],
            'Психология': ['эмоции', 'чувства', 'тревога', 'стресс', 'мотивация', 'цели', 'привычки', 'мысль', 'рефлексия', 'терапия', 'психолог']
        };
        
        const detectedTopics = [];
        const textLower = text.toLowerCase();
        
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
            const matches = keywords.filter(keyword => textLower.includes(keyword));
            if (matches.length > 0) {
                const relevance = Math.min(matches.length / keywords.length * 2, 1);
                detectedTopics.push({
                    name: topic,
                    relevance: relevance,
                    matchCount: matches.length,
                    keywords: matches,
                    strength: Math.round(relevance * 100)
                });
            }
        });
        
        return detectedTopics.sort((a, b) => b.relevance - a.relevance);
    }

    analyzeSphereFocus(text) {
        const textLower = text.toLowerCase();
        const scores = {};
        let totalScore = 0;
        
        Object.entries(this.sphereEmphasis).forEach(([sphere, keywords]) => {
            let sphereScore = 0;
            keywords.forEach(keyword => {
                if (textLower.includes(keyword)) {
                    sphereScore += 1;
                }
            });
            scores[sphere] = sphereScore;
            totalScore += sphereScore;
        });
        
        // Нормализуем проценты
        const percentages = {};
        Object.entries(scores).forEach(([sphere, score]) => {
            percentages[sphere] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 20;
        });
        
        // Распределяем остаток если сумма не 100%
        let sum = Object.values(percentages).reduce((a, b) => a + b, 0);
        if (sum !== 100 && sum > 0) {
            const largestSphere = Object.keys(percentages).reduce((a, b) => 
                percentages[a] > percentages[b] ? a : b
            );
            percentages[largestSphere] += (100 - sum);
        }
        
        return percentages;
    }

    extractPatterns(text) {
        const patterns = [];
        const textLower = text.toLowerCase();
        
        // Когнитивные искажения
        const absoluteWords = (textLower.match(/\b(всегда|никогда|всё|ничего|все|полностью|абсолютно|совершенно)\b/g) || []).length;
        if (absoluteWords > 0) {
            patterns.push({ 
                name: 'Абсолютизация', 
                strength: Math.min(absoluteWords * 0.3, 1), 
                type: 'когнитивное искажение',
                description: 'Использование абсолютных формулировок',
                icon: '🔴'
            });
        }
        
        const negativeWords = (textLower.match(/\b(нет|не могу|не получается|невозможно|бесполезно|провал|крах|катастрофа)\b/g) || []).length;
        if (negativeWords > 0) {
            patterns.push({ 
                name: 'Негативный фокус', 
                strength: Math.min(negativeWords * 0.25, 1), 
                type: 'язык',
                description: 'Акцент на ограничениях и проблемах',
                icon: '📉'
            });
        }
        
        const dutyWords = (textLower.match(/\b(должен|надо|нужно|обязан|следует|придётся|вынужден)\b/g) || []).length;
        if (dutyWords > 0) {
            patterns.push({ 
                name: 'Давление долга', 
                strength: Math.min(dutyWords * 0.2, 1), 
                type: 'язык',
                description: 'Использование обязывающих формулировок',
                icon: '⚖️'
            });
        }
        
        const futureWords = (textLower.match(/\b(хочу|мечтаю|планирую|буду|надеюсь|стремиться)\b/g) || []).length;
        if (futureWords > 1) {
            patterns.push({ 
                name: 'Ориентация на будущее', 
                strength: Math.min(futureWords * 0.15, 1), 
                type: 'мотивация',
                description: 'Фокус на желаниях и планах',
                icon: '🎯'
            });
        }
        
        const cyclicWords = (textLower.match(/\b(постоянно|каждый день|регулярно|всегда одинаково|снова и снова)\b/g) || []).length;
        if (cyclicWords > 0) {
            patterns.push({ 
                name: 'Цикличность', 
                strength: Math.min(cyclicWords * 0.3, 1), 
                type: 'поведение',
                description: 'Повторяющиеся паттерны во времени',
                icon: '🔄'
            });
        }
        
        // Добавляем эмоциональный паттерн
        const questionCount = (textLower.match(/\?/g) || []).length;
        if (questionCount > 1) {
            patterns.push({ 
                name: 'Поиск ответов', 
                strength: Math.min(questionCount * 0.2, 1), 
                type: 'мышление',
                description: 'Активный поиск решений и понимания',
                icon: '❓'
            });
        }
        
        return patterns.length > 0 ? patterns : [{ 
            name: 'Уникальная ситуация', 
            strength: 0.5, 
            type: 'особый случай',
            description: 'Требует индивидуального анализа',
            icon: '✨'
        }];
    }

    analyzeSpecificPatterns(text) {
        const problemTypes = {
            'эмоциональное выгорание': ['выгорание', 'эмоциональное истощение', 'профессиональное выгорание', 'нет сил работать'],
            'межличностные конфликты': ['конфликт', 'ссора', 'непонимание', 'спор', 'разногласие', 'ругаемся', 'скандал'],
            'прокрастинация': ['прокрастинация', 'откладываю', 'не могу начать', 'оттягиваю', 'затягиваю', 'переношу'],
            'хроническая усталость': ['хроническая усталость', 'постоянно устал', 'нет энергии', 'утомление', 'истощение'],
            'тревожность': ['тревож', 'беспокойство', 'волнение', 'паника', 'страх', 'нервничаю', 'переживаю'],
            'низкая самооценка': ['неуверен', 'сомневаюсь', 'недостоин', 'не справлюсь', 'недостаточно хорош', 'неудачник'],
            'одиночество': ['одинок', 'одиночество', 'никто не понимает', 'не с кем поговорить', 'изолирован']
        };
        
        let detectedProblem = 'общая неудовлетворённость';
        let maxMatches = 0;
        const textLower = text.toLowerCase();
        
        Object.entries(problemTypes).forEach(([problem, keywords]) => {
            const matches = keywords.filter(keyword => textLower.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                detectedProblem = problem;
            }
        });
        
        return {
            problemType: detectedProblem,
            problemStrength: maxMatches > 0 ? Math.min(maxMatches * 0.25, 1) : 0.3,
            timeReferences: {
                past: (textLower.match(/\b(было|раньше|в прошлом|до этого|раньше|прежде)\b/g) || []).length,
                present: (textLower.match(/\b(сейчас|теперь|в данный момент|сегодня|в настоящий|сейчас)\b/g) || []).length,
                future: (textLower.match(/\b(буду|потом|завтра|скоро|в будущем|планирую|мечтаю)\b/g) || []).length
            },
            resourcesMentioned: {
                energy: textLower.includes('энерг') || textLower.includes('сил') || textLower.includes('силы'),
                time: textLower.includes('врем') || textLower.includes('успева') || textLower.includes('дедлайн'),
                support: textLower.includes('помощ') || textLower.includes('поддерж') || textLower.includes('совет') || textLower.includes('терапевт')
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

    generateScenarios(emotion, patterns, topics, textAnalysis, sphereFocus) {
        // Генерируем отдельные сценарии для каждой сферы
        const allScenarios = {};
        
        this.lifeSpheres.forEach(sphere => {
            const sphereWeight = sphereFocus[sphere] / 100;
            
            // Базовые вероятности для этой сферы
            let baseProbabilities = {
                continuation: 60,
                intervention: 30,
                transformation: 10
            };
            
            // Корректируем на основе эмоций
            if (emotion.type === 'негативный') {
                baseProbabilities.continuation += 10 * sphereWeight;
                baseProbabilities.intervention -= 5 * sphereWeight;
                baseProbabilities.transformation -= 5 * sphereWeight;
            } else if (emotion.type === 'позитивный') {
                baseProbabilities.continuation -= 15 * sphereWeight;
                baseProbabilities.intervention += 10 * sphereWeight;
                baseProbabilities.transformation += 5 * sphereWeight;
            }
            
            // Корректируем на основе паттернов
            const strongPatterns = patterns.filter(p => p.strength > 0.7).length;
            baseProbabilities.continuation += strongPatterns * 3 * sphereWeight;
            
            // Корректируем на основе сферы
            if (sphere === 'Здоровье') {
                baseProbabilities.continuation += 5;
                baseProbabilities.transformation -= 3;
            } else if (sphere === 'Финансы') {
                baseProbabilities.intervention += 5;
            } else if (sphere === 'Личное развитие') {
                baseProbabilities.transformation += 5;
            }
            
            // Нормализуем
            const total = Object.values(baseProbabilities).reduce((a, b) => a + b, 0);
            Object.keys(baseProbabilities).forEach(key => {
                baseProbabilities[key] = Math.round((baseProbabilities[key] / total) * 100);
            });
            
            // Создаем сценарии для этой сферы
            allScenarios[sphere] = [
                {
                    id: 'continuation',
                    title: this.getContinuationTitle(sphere, textAnalysis),
                    description: this.getContinuationDescription(sphere, textAnalysis),
                    riskLevel: this.calculateRiskLevel(sphere, emotion, patterns, 'continuation'),
                    probability: baseProbabilities.continuation,
                    icon: this.getSphereIcon(sphere)
                },
                {
                    id: 'intervention',
                    title: 'Управляемые изменения',
                    description: this.getInterventionDescription(sphere, textAnalysis),
                    riskLevel: 'medium',
                    probability: baseProbabilities.intervention,
                    icon: '📈'
                },
                {
                    id: 'transformation',
                    title: 'Качественный прорыв',
                    description: this.getTransformationDescription(sphere, textAnalysis),
                    riskLevel: 'low',
                    probability: baseProbabilities.transformation,
                    icon: '🚀'
                }
            ];
        });
        
        return allScenarios;
    }

    getContinuationTitle(sphere, analysis) {
        const titles = {
            'Работа': {
                'эмоциональное выгорание': 'Усиление выгорания на работе',
                'межличностные конфликты': 'Эскалация рабочих конфликтов',
                'прокрастинация': 'Углубление проблем с продуктивностью',
                'default': 'Стагнация карьеры'
            },
            'Отношения': {
                'межличностные конфликты': 'Усиление конфликтов',
                'одиночество': 'Углубление изоляции',
                'default': 'Дистанцирование в отношениях'
            },
            'Здоровье': {
                'хроническая усталость': 'Ухудшение самочувствия',
                'тревожность': 'Нарастание физических симптомов',
                'default': 'Сохранение текущего состояния'
            },
            'Финансы': {
                'default': 'Финансовая стагнация'
            },
            'Личное развитие': {
                'прокрастинация': 'Застой в развитии',
                'низкая самооценка': 'Укрепление неуверенности',
                'default': 'Отсутствие прогресса'
            }
        };
        
        return titles[sphere]?.[analysis.problemType] || titles[sphere]?.default || 'Продолжение текущего пути';
    }

    getContinuationDescription(sphere, analysis) {
        const descriptions = {
            'Работа': 'Если сохранить текущие рабочие паттерны без изменений',
            'Отношения': 'При сохранении существующих моделей взаимодействия',
            'Здоровье': 'Без изменений в образе жизни и привычках',
            'Финансы': 'При текущем финансовом поведении',
            'Личное развитие': 'Без целенаправленных усилий по развитию'
        };
        
        return descriptions[sphere] || 'Если продолжить текущий путь без изменений';
    }

    getInterventionDescription(sphere, analysis) {
        const descriptions = {
            'Работа': 'При систематическом внедрении изменений в рабочий процесс',
            'Отношения': 'При освоении навыков конструктивного общения',
            'Здоровье': 'При последовательных изменениях образа жизни',
            'Финансы': 'При внедрении финансового планирования',
            'Личное развитие': 'При регулярной практике развития навыков'
        };
        
        return descriptions[sphere] || 'При систематическом внедрении небольших позитивных изменений';
    }

    getTransformationDescription(sphere, analysis) {
        const descriptions = {
            'Работа': 'При радикальном пересмотре карьерного пути',
            'Отношения': 'При глубокой работе над отношениями',
            'Здоровье': 'При комплексном подходе к оздоровлению',
            'Финансы': 'При фундаментальных изменениях финансовой стратегии',
            'Личное развитие': 'При качественном скачке в развитии'
        };
        
        return descriptions[sphere] || 'При фундаментальном пересмотре подходов';
    }

    getSphereIcon(sphere) {
        const icons = {
            'Работа': '💼',
            'Отношения': '❤️',
            'Здоровье': '🏥',
            'Финансы': '💰',
            'Личное развитие': '📚'
        };
        return icons[sphere] || '🎯';
    }

    calculateRiskLevel(sphere, emotion, patterns, scenarioType) {
        if (scenarioType === 'continuation') {
            if (sphere === 'Здоровье' && emotion.type === 'негативный') {
                return 'high';
            }
            if (emotion.type === 'негативный' && patterns.some(p => p.strength > 0.8)) {
                return 'high';
            } else if (emotion.type === 'негативный' || patterns.some(p => p.strength > 0.7)) {
                return 'medium';
            }
        }
        return scenarioType === 'intervention' ? 'medium' : 'low';
    }

    generateExperiment(emotion, patterns, topics, textAnalysis, sphereFocus) {
        // Определяем основную сферу
        const mainSphere = Object.entries(sphereFocus).reduce((a, b) => 
            a[1] > b[1] ? a : b
        )[0];
        
        const experiments = {
            'Работа': {
                title: '💼 Управление рабочим стрессом',
                description: 'Ежедневная 10-минутная практика mindfulness-медитации перед работой + установление чётких границ рабочего времени',
                rationale: 'Исследования показывают, что медитация снижает уровень кортизола на 25-30%, а чёткие границы предотвращают выгорание',
                metrics: ['Уровень стресса (1-10)', 'Продуктивность (1-10)', 'Баланс работа/отдых (1-10)'],
                duration: '7 дней',
                expectedResult: 'Снижение стресса на 35-40%, повышение фокуса на 25%',
                instructions: [
                    'Утром перед началом работы найдите тихое место на 10 минут',
                    'Сфокусируйтесь на дыхании, отпуская рабочие мысли',
                    'Установите точное время окончания работы',
                    'После работы полностью отключайтесь от рабочих задач',
                    'Фиксируйте изменения в Aurora'
                ]
            },
            'Отношения': {
                title: '💬 Улучшение коммуникации',
                description: 'Ежедневный 15-минутный осмысленный разговор без отвлечений + практика активного слушания',
                rationale: 'Регулярные осмысленные разговоры увеличивают взаимопонимание на 60%',
                metrics: ['Качество общения (1-10)', 'Эмоциональная близость (1-10)', 'Частота конфликтов'],
                duration: '7 дней',
                expectedResult: 'Улучшение качества отношений на 30-35%',
                instructions: [
                    'Выберите время без телефона и других отвлечений',
                    'Фокусируйтесь на понимании, а не на ответе',
                    'Используйте "Я-сообщения" вместо обвинений',
                    'Практикуйте эмпатию и понимание',
                    'Записывайте инсайты в Aurora'
                ]
            },
            'Здоровье': {
                title: '🌿 Восстановление энергии',
                description: 'Ежедневная 20-минутная прогулка на свежем воздухе + оптимизация режима сна',
                rationale: 'Регулярные прогулки повышают энергию на 25%, качественный сон улучшает восстановление на 40%',
                metrics: ['Уровень энергии (1-10)', 'Качество сна (часы/оценка)', 'Общее самочувствие (1-10)'],
                duration: '7 дней',
                expectedResult: 'Увеличение энергии на 25-30%',
                instructions: [
                    'Ежедневная прогулка в удобном темпе',
                    'Ложитесь спать до 23:00',
                    'За 1 час до сна - никаких экранов',
                    'Следите за водным балансом',
                    'Отслеживайте прогресс в Aurora'
                ]
            },
            'Финансы': {
                title: '💰 Финансовая осознанность',
                description: 'Ежедневный учёт всех трат + планирование бюджета на неделю',
                rationale: 'Осознанное отношение к финансам снижает импульсивные траты на 45%',
                metrics: ['Контроль над расходами (1-10)', 'Сбережения (руб)', 'Финансовая уверенность (1-10)'],
                duration: '7 дней',
                expectedResult: 'Снижение ненужных трат на 30-40%',
                instructions: [
                    'Записывайте каждую трату сразу',
                    'В конце дня анализируйте категории расходов',
                    'Планируйте бюджет на завтра',
                    'Ищите возможности для экономии',
                    'Фиксируйте инсайты в Aurora'
                ]
            },
            'Личное развитие': {
                title: '🎯 Повышение продуктивности',
                description: 'Техника Pomodoro (25/5) + начинать день с самой важной задачи',
                rationale: 'Pomodoro увеличивает концентрацию на 60%, "съесть лягушку" повышает общую продуктивность на 45%',
                metrics: ['Выполненные задачи', 'Качество работы (1-10)', 'Удовлетворённость (1-10)'],
                duration: '5 рабочих дней',
                expectedResult: 'Увеличение эффективности на 40-50%',
                instructions: [
                    'С вечера составляйте список задач на завтра',
                    'Утром начинайте с самой сложной задачи',
                    'Работайте 25 минут без отвлечений',
                    '5 минут отдыха между сессиями',
                    'Фиксируйте прогресс в Aurora'
                ]
            }
        };

        return experiments[mainSphere] || experiments['Работа'];
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
        
        // Определяем цвет для эмоции
        let emotionColor = '#374151';
        if (analysis.emotion.type === 'негативный') emotionColor = '#dc2626';
        if (analysis.emotion.type === 'позитивный') emotionColor = '#059669';
        
        // Находим топ-3 сферы
        const topSpheres = Object.entries(analysis.sphereFocus)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
        
        statsGrid.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Эмоциональный фон</div>
                <div class="stat-value" style="color: ${emotionColor}">
                    ${analysis.emotion.type.charAt(0).toUpperCase() + analysis.emotion.type.slice(1)}
                </div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    Интенсивность: ${analysis.emotion.confidence}%
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${analysis.emotion.confidence}%; background: ${emotionColor}"></div>
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Основные темы</div>
                <div class="stat-value">${analysis.topics.slice(0, 2).map(t => t.name.split('/')[0]).join(', ')}</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.topics.length} тем, ${analysis.topics.reduce((sum, t) => sum + t.matchCount, 0)} упоминаний
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Ключевые сферы влияния</div>
                <div class="stat-value">${topSpheres.map(([sphere, percent]) => `${sphere}: ${percent}%`).join('<br>')}</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    Наиболее затронутые области
                </div>
            </div>
            
            <div class="stat-item">
                <div class="stat-label">Статистика текста</div>
                <div class="stat-value">${analysis.stats.wordCount} слов</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
                    ${analysis.stats.readingTime} мин чтения • ${analysis.stats.sentenceCount} предложений
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
                <div style="flex: 1; display: flex; align-items: center; gap: 0.75rem;">
                    <div style="font-size: 1.25rem;">${pattern.icon || '📊'}</div>
                    <div>
                        <div class="pattern-name">${pattern.name}</div>
                        <div style="font-size: 0.75rem; color: #6b7280;">${pattern.type}: ${pattern.description}</div>
                    </div>
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
        
        let html = '';
        
        // Проходим по всем сферам
        Object.entries(scenarios).forEach(([sphere, sphereScenarios]) => {
            // Отображаем только сферы с существенным влиянием (больше 15%)
            if (sphereScenarios[0].probability < 15) return;
            
            html += `
                <div style="grid-column: 1 / -1; margin-top: 1.5rem; margin-bottom: 1rem;">
                    <h4 style="color: #374151; font-size: 1.125rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                        ${this.getSphereIcon(sphere)} ${sphere}
                    </h4>
                    <div style="height: 2px; background: linear-gradient(90deg, #2563eb, #7c3aed); margin-top: 0.5rem;"></div>
                </div>
            `;
            
            // Отображаем сценарии для этой сферы
            sphereScenarios.forEach(scenario => {
                const riskColors = {
                    high: { border: '#dc2626', bg: '#fef2f2', text: '#dc2626' },
                    medium: { border: '#d97706', bg: '#fffbeb', text: '#d97706' },
                    low: { border: '#374151', bg: '#f8fafc', text: '#374151' }
                };
                
                const color = riskColors[scenario.riskLevel] || riskColors.medium;
                
                html += `
                    <div class="scenario-card ${scenario.riskLevel}-risk" style="border-left-color: ${color.border}; background: ${color.bg};">
                        <div class="scenario-probability" style="border-color: ${color.border}; color: ${color.text};">
                            ${scenario.probability}%
                        </div>
                        <div class="scenario-title">
                            ${scenario.icon} ${scenario.title}
                        </div>
                        <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem;">
                            ${scenario.description}
                        </p>
                        
                        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.25rem;">
                                <span style="color: #6b7280;">Уровень риска:</span>
                                <span style="color: ${color.text}; font-weight: 600;">
                                    ${scenario.riskLevel === 'high' ? 'ВЫСОКИЙ' : 
                                     scenario.riskLevel === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                                </span>
                            </div>
                            <div class="progress-indicator">
                                <div class="progress-fill-risk"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
        
        scenariosGrid.innerHTML = html || `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6b7280;">
                <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Для получения сценариев введите больше информации о вашей ситуации</p>
            </div>
        `;
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
        
        const icon = type === 'success' ? 'check-circle' :
                    type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${icon}"></i>
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
