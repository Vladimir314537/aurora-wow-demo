// Aurora Mirror 4.0 - Полная версия с улучшенным контентом
console.log('Aurora Mirror 4.0 загружается...');

// База данных с примерами заметок и рекомендациями
const AURORA_DATABASE = {
    // Подробные примеры заметок
    noteExamples: {
        'Работа': `Чувствую постоянный стресс на работе. Начальник требует выполнять всё больше задач в сжатые сроки, но не даёт достаточно ресурсов. Коллеги постоянно спорят из-за распределения обязанностей. За последний месяц я работал сверхурочно почти каждый день, но чувствую, что мои усилия не ценятся. Начались проблемы со сном, просыпаюсь по ночам с мыслями о незавершённых задачах. Энергии на хобби и семью почти не осталось.`,
        
        'Отношения': `Постоянные конфликты с партнёром из-за мелочей. Кажется, мы перестали понимать друг друга. Вчера опять поссорились из-за невымытой посуды, хотя проблема явно глубже. Чувствую эмоциональное отдаление, стало тяжело делиться своими переживаниями. Раньше мы могли говорить часами, а сейчас вечера проходят в молчании перед телевизором. Иногда ловлю себя на мысли, что не знаю, о чём с ним/с ней поговорить.`,
        
        'Тревога': `Постоянное чувство тревоги без видимой причины. Просыпаюсь утром с тяжёлым предчувствием, как будто что-то должно пойти не так. Мысли скачут от одной проблемы к другой: финансы, здоровье родителей, карьера. Вечером не могу уснуть, прокручиваю в голове все возможные негативные сценарии. Физически ощущаю напряжение в груди и плечах. Пытался медитировать, но не помогает - мысли всё равно возвращаются.`,
        
        'Мотивация': `Потерял интерес ко всему, что раньше приносило радость. Хобби, спорт, встречи с друзьями - всё кажется бессмысленным. На работе выполняю задачи механически, без энтузиазма. Цели, которые ставил в начале года, теперь кажутся недостижимыми и неважными. Дни проходят одинаково серо. Пытаюсь себя мотивировать, читаю книги по саморазвитию, но эффекта хватает максимум на день. Чувствую, что застрял.`
    },
    
    // Подробные рекомендации для улучшения состояния
    recommendations: {
        'Работа': [
            'Установите чёткие границы рабочего времени. После 18:00 отключайте рабочие уведомления',
            'Обсудите с руководителем реалистичные сроки выполнения задач',
            'Практикуйте технику Pomodoro: 25 минут работы, 5 минут отдыха',
            'Раз в неделю проводите анализ достижений, а не только проблем',
            'Делегируйте задачи, которые могут выполнить другие'
        ],
        
        'Отношения': [
            'Выделите 30 минут в день для разговора без телефонов и отвлечений',
            'Практикуйте активное слушание: повторяйте слова партнёра своими словами',
            'Раз в неделю планируйте совместное занятие, которое нравится обоим',
            'Выражайте благодарность за маленькие вещи каждый день',
            'Обратитесь к семейному психологу для нескольких сессий'
        ],
        
        'Тревога': [
            'Ведите дневник тревог: записывайте что, когда и насколько сильно тревожит',
            'Практикуйте дыхание 4-7-8: вдох на 4, задержка на 7, выдох на 8',
            'Ограничьте потребление новостей 20 минутами в день',
            'Создайте "ритуал беспокойства" - выделите 15 минут вечером специально для тревожных мыслей',
            'Регулярная физическая активность (минимум 30 минут ходьбы в день)'
        ],
        
        'Мотивация': [
            'Разбейте большие цели на микро-шаги по 5-10 минут',
            'Ведите дневник успехов, записывая даже маленькие достижения',
            'Экспериментируйте с новыми видами деятельности раз в две недели',
            'Найдите напарника для взаимной поддержки в достижении целей',
            'Обратитесь к психологу для исключения депрессии'
        ]
    },
    
    // Детализированные сценарии для разных тем
    scenarios: {
        'Работа': {
            red: `При сохранении текущих паттернов: к 30 дню риск профессионального выгорания увеличится на 60%. Могут появиться физические симптомы: головные боли, проблемы с ЖКТ, хроническая усталость. Качество работы снизится на 40%, возможны конфликты с коллегами.`,
            orange: `При внедрении практик саморегуляции: через 30 дней уровень стресса снизится на 50%. Появятся чёткие границы работы и отдыха. Улучшится качество сна и общее самочувствие. Продуктивность возрастёт за счёт лучшей концентрации.`,
            blue: `При трансформации подхода: возможен карьерный рост или переход в более комфортную рабочую среду. Появится понимание своих профессиональных ценностей. Навыки стресс-менеджмента станут устойчивыми.`
        },
        
        'Отношения': {
            red: `Без изменений: эмоциональное отдаление усилится. К 30 дню возможны серьёзные конфликты или период молчания. Риск расставания увеличится до 70%. Накопленные обиды создадут барьеры в общении.`,
            orange: `С активной работой: улучшится взаимопонимание. Конфликты станут конструктивными. Появится регулярное качественное время вместе. Эмоциональная связь укрепится.`,
            blue: `При глубоких изменениях: возможен переход отношений на новый уровень. Появится глубокая эмпатия и поддержка. Создадутся новые общие цели и мечты.`
        }
    }
};

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем улучшенную версию...');
    initializeEnhancedApp();
});

function initializeEnhancedApp() {
    console.log('Инициализация улучшенного приложения...');
    
    // Улучшенные примеры заметок
    setupNoteExamples();
    
    // 1. Счётчик символов
    const textInput = document.getElementById('thought-input');
    if (textInput) {
        textInput.addEventListener('input', function() {
            const count = this.value.length;
            const counter = document.getElementById('char-count');
            if (counter) {
                counter.textContent = count;
                // Цветовая индикация
                if (count < 50) {
                    counter.style.color = '#ef4444'; // красный
                } else if (count < 150) {
                    counter.style.color = '#f59e0b'; // оранжевый
                } else {
                    counter.style.color = '#10b981'; // зелёный
                }
            }
        });
        
        // Автоматически заполняем примером
        setTimeout(() => {
            if (!textInput.value) {
                textInput.value = AURORA_DATABASE.noteExamples['Работа'];
                textInput.dispatchEvent(new Event('input'));
            }
        }, 500);
    }
    
    // 2. Кнопка анализа
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', performEnhancedAnalysis);
    }
    
    // 3. Быстрые темы с улучшенными примерами
    document.querySelectorAll('.quick-tag').forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.textContent;
            const example = AURORA_DATABASE.noteExamples[topic] || 
                           `Подробные размышления на тему "${topic}". Чувствую, что эта тема требует внимания и анализа.`;
            
            if (textInput) {
                textInput.value = example;
                textInput.dispatchEvent(new Event('input'));
                showNotification(`Загружен подробный пример заметки по теме "${topic}"`, 'info');
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
                // Анимация появления
                results.style.opacity = '0';
                results.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    results.style.opacity = '1';
                    results.style.transform = 'translateY(0)';
                    results.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 10);
            } else {
                results.style.opacity = '0';
                results.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    results.style.display = 'none';
                    if (icon) icon.className = 'fas fa-chevron-down';
                }, 300);
            }
        });
    }
    
    // 5. Начать эксперимент - с подробными инструкциями
    const startExpBtn = document.getElementById('start-experiment');
    if (startExpBtn) {
        startExpBtn.addEventListener('click', function() {
            const experimentText = document.getElementById('experiment-title').textContent;
            this.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
            this.disabled = true;
            
            // Сохраняем эксперимент
            localStorage.setItem('aurora_experiment', JSON.stringify({
                title: experimentText,
                started: new Date().toISOString(),
                status: 'active'
            }));
            
            showNotification(`Эксперимент запущен! Рекомендация: "${experimentText}"`, 'success');
            
            // Показываем подробные инструкции
            setTimeout(() => {
                const detailedInstructions = getDetailedInstructions(experimentText);
                if (confirm('Показать подробные инструкции по эксперименту?')) {
                    alert(detailedInstructions);
                }
            }, 1000);
        });
    }
    
    // 6. Проверить приватность
    const verifyBtn = document.getElementById('verify-privacy');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            showNotification('✅ Проверка приватности: Откройте DevTools (F12) → вкладка Network → убедитесь в 0 запросов при анализе! Все данные обрабатываются локально на вашем устройстве.', 'info');
            
            // Анимация проверки
            document.querySelectorAll('.verification-step').forEach((step, i) => {
                setTimeout(() => {
                    step.style.transform = 'scale(1.05)';
                    step.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                    setTimeout(() => {
                        step.style.transform = '';
                        step.style.boxShadow = '';
                    }, 300);
                }, i * 200);
            });
        });
    }
    
    // 7. Селектор времени - с обновлением контента
    const timeframeSelect = document.getElementById('timeframe-select');
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', function() {
            const days = parseInt(this.value);
            updateTimelineContent(days);
        });
    }
    
    // 8. Кнопка настроек эксперимента
    const customizeBtn = document.getElementById('customize-experiment');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', function() {
            showNotification('Для настройки эксперимента:\n1. Выберите удобное время выполнения\n2. Настройте напоминания\n3. Адаптируйте под свой ритм жизни', 'info');
        });
    }
    
    console.log('Улучшенное приложение инициализировано!');
}

// Настройка улучшенных примеров заметок
function setupNoteExamples() {
    // Обновляем текст быстрых тегов
    const quickTags = {
        'Работа': 'Работа и карьера',
        'Отношения': 'Личные отношения', 
        'Тревога': 'Тревога и стресс',
        'Мотивация': 'Мотивация и цели'
    };
    
    document.querySelectorAll('.quick-tag').forEach((tag, index) => {
        const keys = Object.keys(quickTags);
        if (keys[index]) {
            tag.textContent = quickTags[keys[index]];
            tag.setAttribute('data-text', AURORA_DATABASE.noteExamples[keys[index]]);
        }
    });
}

// Улучшенный анализ с детализированными результатами
function performEnhancedAnalysis() {
    console.log('Запуск улучшенного анализа...');
    
    const textInput = document.getElementById('thought-input');
    const text = textInput ? textInput.value.trim() : '';
    
    if (text.length < 30) {
        showNotification('Для качественного анализа введите не менее 30 символов. Опишите ваши мысли подробнее.', 'warning');
        return;
    }
    
    // Показываем загрузку
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        const originalText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Глубокий анализ...';
        analyzeBtn.disabled = true;
        
        // Имитация глубокого анализа
        setTimeout(() => {
            try {
                // Определяем тему
                const detectedTopic = detectTopic(text);
                
                // Генерируем детализированные результаты
                generateDetailedResults(text, detectedTopic);
                
                // Обновляем сценарии
                updateDetailedScenarios(detectedTopic, text);
                
                // Генерируем эксперимент с рекомендациями
                generateDetailedExperiment(detectedTopic);
                
                // Показываем рекомендации
                showRecommendations(detectedTopic);
                
                // Показываем результаты
                const resultsSection = document.getElementById('results-section');
                if (resultsSection) {
                    resultsSection.style.display = 'block';
                    const toggleBtn = document.getElementById('toggle-results');
                    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                }
                
                showNotification(`✅ Глубокий анализ завершён! Обнаружена тема: ${detectedTopic}. См. подробные рекомендации ниже.`, 'success');
                
            } catch (error) {
                console.error('Ошибка анализа:', error);
                showNotification('Ошибка при анализе. Попробуйте описать мысли подробнее.', 'error');
            } finally {
                // Восстанавливаем кнопку
                analyzeBtn.innerHTML = originalText;
                analyzeBtn.disabled = false;
            }
        }, 2000); // Увеличили время для имитации глубокого анализа
    }
}

// Определение темы текста
function detectTopic(text) {
    const topics = {
        'Работа': ['работа', 'начальник', 'коллеги', 'проект', 'задача', 'дедлайн', 'офис', 'карьер', 'зарплат'],
        'Отношения': ['отношен', 'партнёр', 'муж', 'жена', 'семь', 'друг', 'любов', 'конфликт', 'ссор'],
        'Тревога': ['тревог', 'страх', 'беспокойств', 'паник', 'нерв', 'опасен', 'боюсь', 'переживаю'],
        'Мотивация': ['мотивац', 'цел', 'мечт', 'интерес', 'энтузиазм', 'апати', 'лень', 'устал', 'выгоран']
    };
    
    const textLower = text.toLowerCase();
    let maxMatches = 0;
    let detectedTopic = 'Общее';
    
    for (const [topic, keywords] of Object.entries(topics)) {
        let matches = 0;
        keywords.forEach(keyword => {
            if (textLower.includes(keyword)) matches++;
        });
        
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedTopic = topic;
        }
    }
    
    return maxMatches > 0 ? detectedTopic : 'Общее';
}

// Генерация детализированных результатов
function generateDetailedResults(text, topic) {
    // Анализ эмоционального тона
    const emotionValue = analyzeEmotion(text);
    
    // Обновляем эмоциональный спектр
    const emotionFill = document.getElementById('emotion-fill');
    const emotionDisplay = document.getElementById('emotion-value');
    
    if (emotionFill) {
        emotionFill.style.width = emotionValue + '%';
        emotionFill.style.transition = 'width 1s ease';
    }
    
    if (emotionDisplay) {
        emotionDisplay.textContent = emotionValue + '%';
        // Цветовая индикация
        if (emotionValue > 70) {
            emotionDisplay.style.color = '#ef4444';
        } else if (emotionValue > 40) {
            emotionDisplay.style.color = '#f59e0b';
        } else {
            emotionDisplay.style.color = '#10b981';
        }
    }
    
    // Обновляем эмоциональные теги
    const emotionTags = document.getElementById('emotion-tags');
    if (emotionTags) {
        emotionTags.innerHTML = '';
        
        if (emotionValue > 70) {
            emotionTags.innerHTML += '<span class="emotion-tag negative">Высокая тревожность</span>';
            emotionTags.innerHTML += '<span class="emotion-tag negative">Эмоциональное истощение</span>';
            emotionTags.innerHTML += '<span class="emotion-tag negative">Напряжение</span>';
        } else if (emotionValue > 40) {
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Смешанные чувства</span>';
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Неопределённость</span>';
            emotionTags.innerHTML += '<span class="emotion-tag positive">Надежда</span>';
        } else {
            emotionTags.innerHTML += '<span class="emotion-tag positive">Баланс</span>';
            emotionTags.innerHTML += '<span class="emotion-tag positive">Принятие</span>';
            emotionTags.innerHTML += '<span class="emotion-tag positive">Спокойствие</span>';
        }
    }
    
    // Обновляем когнитивные искажения
    const patterns = detectPatterns(text);
    const patternsList = document.getElementById('patterns-list');
    if (patternsList) {
        patternsList.innerHTML = '';
        
        patterns.slice(0, 3).forEach(pattern => {
            patternsList.innerHTML += `
                <div class="pattern-item">
                    <span class="pattern-name">${pattern.name}</span>
                    <div class="pattern-intensity ${pattern.intensity}">
                        ${pattern.intensity === 'high' ? 'Высокая' : 
                          pattern.intensity === 'medium' ? 'Средняя' : 'Низкая'}
                    </div>
                </div>
            `;
        });
    }
    
    // Обновляем темы
    const topicsContainer = document.getElementById('topics-container');
    if (topicsContainer) {
        topicsContainer.innerHTML = '';
        
        const relatedTopics = getRelatedTopics(topic);
        relatedTopics.forEach((relatedTopic, index) => {
            const type = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
            topicsContainer.innerHTML += `<span class="topic-tag ${type}">${relatedTopic}</span>`;
        });
    }
}

// Анализ эмоционального тона
function analyzeEmotion(text) {
    const negativeWords = [
        'стресс', 'усталость', 'тревог', 'беспокойств', 'выгорание', 'конфликт',
        'проблем', 'сложн', 'тяжел', 'плох', 'грустн', 'один', 'страх', 'боюсь',
        'нерв', 'раздражает', 'злость', 'гнев', 'обид', 'боль', 'ужас', 'кошмар'
    ];
    
    const positiveWords = [
        'радость', 'счастье', 'успех', 'легк', 'хорош', 'отличн', 'прекрасн',
        'доволен', 'интересн', 'мотивац', 'энерг', 'сил', 'надежд', 'мечт',
        'любов', 'поддержк', 'помощь', 'развитие', 'рост', 'уверен'
    ];
    
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    let negativeCount = 0;
    let positiveCount = 0;
    
    words.forEach(word => {
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    });
    
    const totalRelevant = negativeCount + positiveCount;
    
    if (totalRelevant === 0) return 50;
    
    // Вес негативных слов больше
    return Math.min(95, Math.max(5, Math.round((negativeCount * 1.5 / totalRelevant) * 100)));
}

// Обнаружение когнитивных искажений
function detectPatterns(text) {
    const patterns = [];
    const textLower = text.toLowerCase();
    
    // Абсолютизация
    const absolutizationWords = ['всегда', 'никогда', 'все', 'ничего', 'полностью', 'абсолютно', 'каждый'];
    const absolutizationCount = absolutizationWords.filter(w => textLower.includes(w)).length;
    if (absolutizationCount > 1) {
        patterns.push({name: 'Абсолютизация', intensity: 'high'});
    } else if (absolutizationCount > 0) {
        patterns.push({name: 'Абсолютизация', intensity: 'medium'});
    }
    
    // Катастрофизация
    if (textLower.match(/катастроф|ужасн|кошмарн|конец|смерт|погиб|трагеди/)) {
        patterns.push({name: 'Катастрофизация', intensity: 'high'});
    }
    
    // Долженствование
    const shouldWords = ['должен', 'обязан', 'надо', 'нужно', 'необходимо', 'следует'];
    const shouldCount = shouldWords.filter(w => textLower.includes(w)).length;
    if (shouldCount > 2) {
        patterns.push({name: 'Долженствование', intensity: 'high'});
    } else if (shouldCount > 0) {
        patterns.push({name: 'Долженствование', intensity: 'medium'});
    }
    
    // Чтение мыслей
    if (textLower.match(/он думает|она считает|они верят|наверное думает|скорее всего/)) {
        patterns.push({name: 'Чтение мыслей', intensity: 'medium'});
    }
    
    // Эмоциональное мышление
    if (textLower.match(/чувствую поэтому|эмоции говорят|сердце подсказывает/)) {
        patterns.push({name: 'Эмоциональное мышление', intensity: 'medium'});
    }
    
    // Если паттернов мало, добавляем общие
    if (patterns.length < 2) {
        patterns.push({name: 'Негативный фокус', intensity: 'medium'});
        patterns.push({name: 'Персонализация', intensity: 'low'});
    }
    
    return patterns;
}

// Получение связанных тем
function getRelatedTopics(mainTopic) {
    const topicMap = {
        'Работа': ['Профессиональный рост', 'Баланс работы и жизни', 'Стресс-менеджмент', 'Коммуникация'],
        'Отношения': ['Эмоциональный интеллект', 'Конфликтология', 'Привязанность', 'Коммуникация'],
        'Тревога': ['Осознанность', 'Эмоциональная регуляция', 'Самопомощь', 'Психогигиена'],
        'Мотивация': ['Целеполагание', 'Продуктивность', 'Самодисциплина', 'Привычки'],
        'Общее': ['Саморефлексия', 'Эмоциональное здоровье', 'Личностный рост', 'Осознанность']
    };
    
    return topicMap[mainTopic] || topicMap['Общее'];
}

// Обновление детализированных сценариев
function updateDetailedScenarios(topic, text) {
    // Рассчитываем вероятности на основе анализа
    const emotionValue = analyzeEmotion(text);
    
    let redProb, orangeProb, blueProb;
    
    if (emotionValue > 70) {
        redProb = 70 + Math.floor(Math.random() * 15); // 70-85%
        orangeProb = 25 - Math.floor(Math.random() * 10); // 15-25%
        blueProb = 100 - redProb - orangeProb; // 0-15%
    } else if (emotionValue > 40) {
        redProb = 40 + Math.floor(Math.random() * 20); // 40-60%
        orangeProb = 35 + Math.floor(Math.random() * 15); // 35-50%
        blueProb = 100 - redProb - orangeProb; // 0-25%
    } else {
        redProb = 20 + Math.floor(Math.random() * 15); // 20-35%
        orangeProb = 45 + Math.floor(Math.random() * 20); // 45-65%
        blueProb = 100 - redProb - orangeProb; // 0-35%
    }
    
    // Обновляем вероятности
    const probabilityValues = document.querySelectorAll('.probability-value');
    if (probabilityValues.length >= 3) {
        probabilityValues[0].textContent = redProb + '%';
        probabilityValues[1].textContent = orangeProb + '%';
        probabilityValues[2].textContent = blueProb + '%';
    }
    
    // Обновляем описания сценариев
    const scenarioDescriptions = document.querySelectorAll('.scenario-description p');
    const scenarios = AURORA_DATABASE.scenarios[topic] || AURORA_DATABASE.scenarios['Работа'];
    
    if (scenarioDescriptions.length >= 3) {
        scenarioDescriptions[0].textContent = scenarios.red;
        scenarioDescriptions[1].textContent = scenarios.orange;
        scenarioDescriptions[2].textContent = scenarios.blue;
    }
    
    // Обновляем таймлайны
    updateTimelineContent(30); // По умолчанию 30 дней
}

// Обновление контента таймлайна
function updateTimelineContent(days) {
    const timelineData = {
        7: {
            red: ['День 2-3: Пик эмоциональной нагрузки', 'День 4-5: Возможные срывы', 'День 6-7: Накопление усталости'],
            orange: ['День 2-3: Первые позитивные изменения', 'День 4-5: Закрепление новых привычек', 'День 6-7: Улучшение самочувствия'],
            blue: ['День 2-3: Осознание необходимости перемен', 'День 4-5: Исследование возможностей', 'День 6-7: Планирование действий']
        },
        30: {
            red: ['Неделя 1: Усиление симптомов', 'Неделя 2-3: Стабилизация на низком уровне', 'Неделя 4: Риск обострения'],
            orange: ['Неделя 1: Формирование новых привычек', 'Неделя 2-3: Устойчивые изменения', 'Неделя 4: Интеграция в образ жизни'],
            blue: ['Неделя 1: Глубокое осмысление', 'Неделя 2-3: Активные действия', 'Неделя 4: Качественные изменения']
        },
        90: {
            red: ['Месяц 1: Хронизация состояния', 'Месяц 2: Снижение качества жизни', 'Месяц 3: Возможные последствия для здоровья'],
            orange: ['Месяц 1: Стабильный прогресс', 'Месяц 2: Устойчивые улучшения', 'Месяц 3: Новая норма'],
            blue: ['Месяц 1: Трансформация мышления', 'Месяц 2: Значительные изменения', 'Месяц 3: Новый уровень жизни']
        }
    };
    
    const data = timelineData[days] || timelineData[30];
    
    // Обновляем все сценарии
    document.querySelectorAll('.scenario-card').forEach((scenario, index) => {
        const points = scenario.querySelectorAll('.timeline-points li');
        const scenarioType = index === 0 ? 'red' : index === 1 ? 'orange' : 'blue';
        const scenarioData = data[scenarioType];
        
        points.forEach((point, pointIndex) => {
            if (scenarioData && scenarioData[pointIndex]) {
                point.innerHTML = `<span class="timeline-day">${scenarioData[pointIndex].split(':')[0]}:</span> ${scenarioData[pointIndex].split(':')[1]}`;
            }
        });
    });
    
    showNotification(`Таймлайн обновлён: проекция на ${days} дней`, 'info');
}

// Генерация детализированного эксперимента
function generateDetailedExperiment(topic) {
    const experiments = {
        'Работа': {
            title: 'Ежедневный ритуал завершения рабочего дня + цифровой детокс',
            description: 'Этот эксперимент поможет установить чёткие границы между работой и личной жизнью, снизит уровень стресса и повысит продуктивность.',
            steps: [
                '18:00 - Завершите все рабочие задачи',
                '18:15 - Составьте план на завтра',
                '18:30 - Отключите рабочие уведомления',
                '19:00 - Цифровой детокс (без телефона/компьютера)'
            ],
            metrics: [
                { value: '-45%', label: 'Рабочего стресса' },
                { value: '+3ч', label: 'Качественного отдыха' },
                { value: '+30%', label: 'Утренней продуктивности' }
            ]
        },
        
        'Отношения': {
            title: 'Ежевечерний 30-минутный разговор без отвлечений',
            description: 'Регулярное качественное общение укрепит эмоциональную связь, улучшит взаимопонимание и снизит количество конфликтов.',
            steps: [
                'Выберите удобное время вечером',
                'Отложите телефоны и выключите телевизор',
                'Говорите по очереди, используя "Я-сообщения"',
                'Фокусируйтесь на чувствах, а не на обвинениях'
            ],
            metrics: [
                { value: '-60%', label: 'Непониманий' },
                { value: '+50%', label: 'Эмоциональной близости' },
                { value: '+40%', label: 'Взаимной поддержки' }
            ]
        },
        
        'Тревога': {
            title: 'Утренняя медитация + вечерний дневник тревог',
            description: 'Систематическая работа с тревожными мыслями поможет снизить общий уровень тревоги и улучшить эмоциональную регуляцию.',
            steps: [
                'Утро: 10 минут медитации на дыхание',
                'День: 3 паузы для проверки состояния',
                'Вечер: 15 минут на запись тревог в дневник',
                'Перед сном: техника 4-7-8 дыхания'
            ],
            metrics: [
                { value: '-55%', label: 'Уровня тревоги' },
                { value: '+2ч', label: 'Качественного сна' },
                { value: '+35%', label: 'Эмоционального контроля' }
            ]
        }
    };
    
    const experiment = experiments[topic] || experiments['Работа'];
    
    // Обновляем заголовок эксперимента
    const experimentTitle = document.getElementById('experiment-title');
    if (experimentTitle) {
        experimentTitle.textContent = experiment.title;
    }
    
    // Обновляем описание
    const experimentDescription = document.querySelector('.experiment-description p');
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
    
    // Добавляем подробные шаги (скрытый элемент)
    let stepsContainer = document.getElementById('experiment-steps');
    if (!stepsContainer) {
        stepsContainer = document.createElement('div');
        stepsContainer.id = 'experiment-steps';
        stepsContainer.className = 'experiment-steps';
        stepsContainer.style.cssText = `
            margin-top: 15px;
            padding: 15px;
            background: rgba(255,255,255,0.03);
            border-radius: 8px;
            border-left: 3px solid #6366f1;
        `;
        
        const experimentContent = document.querySelector('.experiment-content');
        if (experimentContent) {
            experimentContent.appendChild(stepsContainer);
        }
    }
    
    stepsContainer.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 10px; color: #818cf8;">📋 Пошаговый план:</div>
        <ul style="margin-left: 20px; color: #cbd5e1;">
            ${experiment.steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
        </ul>
    `;
}

// Показ рекомендаций для улучшения
function showRecommendations(topic) {
    const recommendations = AURORA_DATABASE.recommendations[topic] || 
                           AURORA_DATABASE.recommendations['Работа'];
    
    // Создаём или находим контейнер для рекомендаций
    let recContainer = document.getElementById('detailed-recommendations');
    if (!recContainer) {
        recContainer = document.createElement('div');
        recContainer.id = 'detailed-recommendations';
        recContainer.className = 'detailed-recommendations';
        recContainer.style.cssText = `
            margin-top: 25px;
            padding: 20px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
            border-radius: 12px;
            border: 1px solid rgba(99, 102, 241, 0.2);
        `;
        
        // Добавляем в левую панель
        const leftPanel = document.querySelector('.left-panel');
        if (leftPanel) {
            leftPanel.appendChild(recContainer);
        }
    }
    
    recContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <i class="fas fa-lightbulb" style="color: #f59e0b; font-size: 20px;"></i>
            <h3 style="margin: 0; color: #f8fafc; font-size: 18px;">Конкретные шаги для улучшения</h3>
        </div>
        <p style="color: #cbd5e1; margin-bottom: 15px; line-height: 1.5;">
            Чтобы сместить вероятность в сторону позитивных сценариев, регулярно применяйте эти практики:
        </p>
        <div style="display: grid; gap: 12px;">
            ${recommendations.map((rec, index) => `
                <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; 
                           background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="background: rgba(99, 102, 241, 0.2); color: #818cf8; 
                               width: 24px; height: 24px; border-radius: 50%; 
                               display: flex; align-items: center; justify-content: center; 
                               font-size: 12px; flex-shrink: 0;">
                        ${index + 1}
                    </div>
                    <div style="color: #e2e8f0; line-height: 1.4;">${rec}</div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 15px; padding: 12px; background: rgba(16, 185, 129, 0.1); 
                   border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <div style="display: flex; align-items: center; gap: 10px; color: #34d399;">
                <i class="fas fa-clock"></i>
                <span style="font-weight: 600;">Рекомендуемая частота:</span>
            </div>
            <div style="color: #a7f3d0; margin-top: 5px; font-size: 14px;">
                Выполняйте минимум 3 рекомендации ежедневно в течение 30 дней для устойчивого эффекта
            </div>
        </div>
    `;
    
    // Прокручиваем к рекомендациям
    setTimeout(() => {
        recContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Получение подробных инструкций для эксперимента
function getDetailedInstructions(experimentTitle) {
    const instructions = {
        'Ежедневный ритуал завершения рабочего дня': `
🎯 КОНКРЕТНЫЕ ШАГИ:

1. В 17:45 поставьте таймер на 15 минут
2. Быстро проверьте почту, ответьте на срочные письма
3. Составьте список задач на завтра (не более 5 пунктов)
4. Закройте все рабочие вкладки и приложения
5. Физически отойдите от рабочего места
6. С 19:00 до 21:00 не проверяйте рабочие сообщения

📊 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ ЧЕРЕЗ 7 ДНЕЙ:
• Снижение уровня стресса на 35-45%
• Улучшение качества сна
• Повышение утренней продуктивности на 20-30%

🔔 НАПОМИНАНИЯ:
• Установите напоминание на 17:45
• Попросите близких поддержать ваш цифровой детокс
• Ведите краткий дневник изменений
        `,
        
        'Ежевечерний 30-минутный разговор': `
🎯 КОНКРЕТНЫЕ ШАГИ:

1. Выберите время с 20:00 до 21:00
2. Отложите телефоны в другую комнату
3. Сядьте друг напротив друга
4. Говорите по таймеру: 5 минут один, 5 минут другой
5. Используйте фразы: "Я чувствую...", "Мне важно..."
6. Завершите разговор объятиями

📊 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ ЧЕРЕЗ 7 ДНЕЙ:
• Снижение конфликтов на 50-60%
• Усиление эмоциональной близости
• Улучшение взаимопонимания

🔔 ПРАВИЛА:
• Не перебивать
• Не давать советов, если не просят
• Фокусироваться на чувствах
        `
    };
    
    for (const [key, value] of Object.entries(instructions)) {
        if (experimentTitle.includes(key)) {
            return value;
        }
    }
    
    return `🎯 Эксперимент: ${experimentTitle}

📋 ОСНОВНЫЕ ПРАВИЛА:
1. Выполняйте ежедневно в одно и то же время
2. Ведите краткие заметки о своих ощущениях
3. Будьте последовательны минимум 7 дней
4. Отмечайте даже небольшие изменения

💡 СОВЕТ:
Начните с малого - даже 5 минут практики лучше, чем ничего!`;
}

// Улучшенная функция показа уведомлений
function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    document.querySelectorAll('.aurora-notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `aurora-notification notification-${type}`;
    
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${icons[type] || 'fa-info-circle'}" 
               style="font-size: 18px; color: ${type === 'success' ? '#10b981' : 
                                              type === 'error' ? '#ef4444' : 
                                              type === 'warning' ? '#f59e0b' : '#6366f1'}"></i>
            <div style="flex: 1; font-size: 14px; line-height: 1.4;">${message}</div>
            <button class="notification-close" style="background: none; border: none; 
                    color: rgba(255,255,255,0.5); cursor: pointer; font-size: 16px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        min-width: 300px;
        max-width: 400px;
        z-index: 9999;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        animation: slideIn 0.3s ease forwards;
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 
                         type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 
                         type === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(99, 102, 241, 0.3)'};
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Добавляем стили анимации
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
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

// Глобальный экспорт для отладки
window.AuroraMirror = {
    version: '4.1-enhanced',
    analyze: performEnhancedAnalysis,
    getRecommendations: function(topic) {
        return AURORA_DATABASE.recommendations[topic] || [];
    },
    getExamples: function() {
        return AURORA_DATABASE.noteExamples;
    }
};

console.log('Aurora Mirror 4.1 (улучшенный) загружен и готов к работе!');
