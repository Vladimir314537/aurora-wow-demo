// ===== ГЛОБАЛЬНЫЕ ДАННЫЕ =====
const NOTES_DATABASE = {
    work: `Чувствую постоянный стресс на работе. Начальник требует выполнять всё больше задач в сжатые сроки, но не даёт достаточно ресурсов. Коллеги постоянно спорят из-за распределения обязанностей. 

За последний месяц я работал сверхурочно почти каждый день, но чувствую, что мои усилия не ценятся. Начались проблемы со сном, просыпаюсь по ночам с мыслями о незавершённых задачах. 

Энергии на хобби и семью почти не осталось. Утром тяжело вставать, весь день чувствую усталость и раздражительность. Кажется, что застрял на одном месте без перспектив роста.`,

    relationships: `Постоянные конфликты с партнёром из-за мелочей. Кажется, мы перестали понимать друг друга. Вчера опять поссорились из-за невымытой посуды, хотя проблема явно глубже. 

Чувствую эмоциональное отдаление, стало тяжело делиться своими переживаниями. Раньше мы могли говорить часами, а сейчас вечера проходят в молчании перед телевизором. 

Иногда ловлю себя на мысли, что не знаю, о чём с ним/с ней поговорить. Физическая близость стала редкой и формальной. Чувствую одиночество, даже когда мы вместе.`,

    anxiety: `Постоянное чувство тревоги без видимой причины. Просыпаюсь утром с тяжёлым предчувствием, как будто что-то должно пойти не так. Мысли скачут от одной проблемы к другой: финансы, здоровье родителей, карьера. 

Вечером не могу уснуть, прокручиваю в голове все возможные негативные сценарии. Физически ощущаю напряжение в груди и плечах. Пытался медитировать, но не помогает - мысли всё равно возвращаются. 

Стал избегать социальных ситуаций, потому что тревожно общаться с людьми. Даже простые бытовые дела кажутся сложными и overwhelming.`,

    motivation: `Потерял интерес ко всему, что раньше приносило радость. Хобби, спорт, встречи с друзьями - всё кажется бессмысленным. На работе выполняю задачи механически, без энтузиазма. 

Цели, которые ставил в начале года, теперь кажутся недостижимыми и неважными. Дни проходят одинаково серо. Пытаюсь себя мотивировать, читаю книги по саморазвитию, но эффекта хватает максимум на день. 

Чувствую, что застрял в рутине. Нет энергии пробовать что-то новое. Даже простые решения даются с трудом. Кажется, что жизнь проходит мимо.`
};

const RECOMMENDATIONS = {
    work: [
        'Установите чёткие границы рабочего времени. После 18:00 отключайте рабочие уведомления',
        'Обсудите с руководителем реалистичные сроки выполнения задач',
        'Практикуйте технику Pomodoro: 25 минут работы, 5 минут отдыха',
        'Раз в неделю проводите анализ достижений, а не только проблем',
        'Делегируйте задачи, которые могут выполнить другие'
    ],
    
    relationships: [
        'Выделите 30 минут в день для разговора без телефонов и отвлечений',
        'Практикуйте активное слушание: повторяйте слова партнёра своими словами',
        'Раз в неделю планируйте совместное занятие, которое нравится обоим',
        'Выражайте благодарность за маленькие вещи каждый день',
        'Обратитесь к семейному психологу для нескольких сессий'
    ],
    
    anxiety: [
        'Ведите дневник тревог: записывайте что, когда и насколько сильно тревожит',
        'Практикуйте дыхание 4-7-8: вдох на 4, задержка на 7, выдох на 8',
        'Ограничьте потребление новостей 20 минутами в день',
        'Создайте "ритуал беспокойства" - выделите 15 минут вечером специально для тревожных мыслей',
        'Регулярная физическая активность (минимум 30 минут ходьбы в день)'
    ],
    
    motivation: [
        'Разбейте большие цели на микро-шаги по 5-10 минут',
        'Ведите дневник успехов, записывая даже маленькие достижения',
        'Экспериментируйте с новыми видами деятельности раз в две недели',
        'Найдите напарника для взаимной поддержки в достижении целей',
        'Обратитесь к психологу для исключения депрессии'
    ]
};

const SCENARIOS = {
    work: {
        red: 'При сохранении текущих паттернов: усиление выгорания на 60%, снижение продуктивности на 40%, риск профессионального истощения и конфликтов с коллегами.',
        orange: 'При внедрении практик саморегуляции: улучшение состояния на 50%, восстановление энергии, развитие стрессоустойчивости, повышение продуктивности на 20%.',
        blue: 'При трансформации подхода: переосмысление карьерного пути, поиск новых возможностей, качественный скачок в развитии, возможен переход на удалённую работу.'
    },
    
    relationships: {
        red: 'Эскалация конфликтов, накопление обид, эмоциональное отдаление, риск разрыва отношений до 70%. Возможны длительные периоды молчания и холодной войны.',
        orange: 'Улучшение коммуникации на 60%, понимание потребностей друг друга, укрепление эмоциональной связи, снижение конфликтов на 50%, восстановление близости.',
        blue: 'Глубокое переосмысление отношений, переход на новый уровень близости, совместный рост, создание новых общих целей и мечтаний, отношения мечты.'
    },
    
    anxiety: {
        red: 'Усиление негативных симптомов, возможное развитие панических атак, снижение качества жизни, социальная изоляция, риск депрессии и агорафобии.',
        orange: 'Стабилизация состояния, развитие навыков саморегуляции, снижение тревоги на 50%, улучшение сна на 40%, восстановление социальной активности.',
        blue: 'Глубинная трансформация, преодоление ограничивающих убеждений, развитие эмоциональной устойчивости, полная свобода от тревоги, качественное изменение жизни.'
    },
    
    motivation: {
        red: 'Усиление апатии, полная потеря интереса к деятельности, риск развития депрессии, профессиональная стагнация, социальное отдаление, потеря смысла.',
        orange: 'Постепенное возвращение интереса к жизни, формирование новых привычек, постановка реалистичных целей, улучшение самочувствия на 40%, достижение целей.',
        blue: 'Нахождение новых смыслов и целей, радикальное изменение подхода к жизни, реализация отложенных мечтаний, качественный прорыв во всех сферах, помощь другим.'
    }
};

const TIMELINE_DATA = {
    work: {
        7: {
            red: ['День 2-3: Пик стресса и перегрузки', 'День 4-5: Конфликты с коллегами', 'День 6-7: Эмоциональное истощение'],
            orange: ['День 2-3: Первое облегчение', 'День 4-5: Улучшение концентрации', 'День 6-7: Стабилизация состояния'],
            blue: ['День 2-3: Осознание необходимости перемен', 'День 4-5: Исследование вариантов', 'День 6-7: Планирование действий']
        },
        30: {
            red: ['Неделя 1: Усиление выгорания', 'Неделя 2-3: Снижение продуктивности на 40%', 'Неделя 4: Риск увольнения'],
            orange: ['Неделя 1: Формирование новых привычек', 'Неделя 2-3: Улучшение работы на 30%', 'Неделя 4: Стабильный прогресс'],
            blue: ['Неделя 1: Переосмысление карьеры', 'Неделя 2-3: Активный поиск возможностей', 'Неделя 4: Конкретные предложения']
        },
        90: {
            red: ['Месяц 1: Хроническая усталость', 'Месяц 2: Проблемы со здоровьем', 'Месяц 3: Профессиональный кризис'],
            orange: ['Месяц 1: Устойчивые изменения', 'Месяц 2: Карьерный рост', 'Месяц 3: Новая должность'],
            blue: ['Месяц 1: Смена работы', 'Месяц 2: Адаптация на новом месте', 'Месяц 3: Реализация потенциала']
        }
    },
    
    relationships: {
        7: {
            red: ['День 2-3: Эскалация конфликтов', 'День 4-5: Эмоциональное отдаление', 'День 6-7: Риск разрыва'],
            orange: ['День 2-3: Первые честные разговоры', 'День 4-5: Улучшение понимания', 'День 6-7: Восстановление близости'],
            blue: ['День 2-3: Глубокое осмысление', 'День 4-5: Пересмотр ценностей', 'День 6-7: Новый уровень отношений']
        },
        30: {
            red: ['Неделя 1: Накопление обид', 'Неделя 2-3: Холодная война', 'Неделя 4: Принятие решения о расставании'],
            orange: ['Неделя 1: Регулярное качественное общение', 'Неделя 2-3: Укрепление доверия', 'Неделя 4: Гармоничные отношения'],
            blue: ['Неделя 1: Парная терапия', 'Неделя 2-3: Глубокие трансформации', 'Неделя 4: Отношения мечты']
        },
        90: {
            red: ['Месяц 1: Эмоциональный разрыв', 'Месяц 2: Одиночество', 'Месяц 3: Депрессия'],
            orange: ['Месяц 1: Стабильные отношения', 'Месяц 2: Совместный рост', 'Месяц 3: Глубокая связь'],
            blue: ['Месяц 1: Создание семьи', 'Месяц 2: Общие проекты', 'Месяц 3: Полная гармония']
        }
    },
    
    anxiety: {
        7: {
            red: ['День 2-3: Панические атаки', 'День 4-5: Бессонница', 'День 6-7: Социальная изоляция'],
            orange: ['День 2-3: Первые техники релаксации', 'День 4-5: Улучшение сна', 'День 6-7: Снижение тревоги на 30%'],
            blue: ['День 2-3: Осознание паттернов', 'День 4-5: Работа с психологом', 'День 6-7: Новое мышление']
        },
        30: {
            red: ['Неделя 1: Усиление симптомов', 'Неделя 2-3: Агорафобия', 'Неделя 4: Клиническая депрессия'],
            orange: ['Неделя 1: Стабильная практика', 'Неделя 2-3: Возвращение к социальной жизни', 'Неделя 4: Контроль над тревогой'],
            blue: ['Неделя 1: Глубокая терапия', 'Неделя 2-3: Трансформация мышления', 'Неделя 4: Свобода от тревоги']
        },
        90: {
            red: ['Месяц 1: Хроническое расстройство', 'Месяц 2: Потеря работы', 'Месяц 3: Госпитализация'],
            orange: ['Месяц 1: Устойчивое улучшение', 'Месяц 2: Новая работа', 'Месяц 3: Качественная жизнь'],
            blue: ['Месяц 1: Помощь другим', 'Месяц 2: Тренерская деятельность', 'Месяц 3: Эксперт по тревоге']
        }
    },
    
    motivation: {
        7: {
            red: ['День 2-3: Полная апатия', 'День 4-5: Отказ от целей', 'День 6-7: Депрессивное состояние'],
            orange: ['День 2-3: Первые микро-шаги', 'День 4-5: Маленькие победы', 'День 6-7: Возвращение интереса'],
            blue: ['День 2-3: Перезагрузка мышления', 'День 4-5: Новое видение', 'День 6-7: План трансформации']
        },
        30: {
            red: ['Неделя 1: Профессиональная стагнация', 'Неделя 2-3: Социальная изоляция', 'Неделя 4: Потеря смысла'],
            orange: ['Неделя 1: Регулярные действия', 'Неделя 2-3: Видимый прогресс', 'Неделя 4: Устойчивая мотивация'],
            blue: ['Неделя 1: Обретение смысла', 'Неделя 2-3: Радикальные изменения', 'Неделя 4: Новая жизнь']
        },
        90: {
            red: ['Месяц 1: Потеря всего', 'Месяц 2: Зависимости', 'Месяц 3: Суицидальные мысли'],
            orange: ['Месяц 1: Стабильный рост', 'Месяц 2: Достижение целей', 'Месяц 3: Успешная жизнь'],
            blue: ['Месяц 1: Помощь другим', 'Месяц 2: Создание бизнеса', 'Месяц 3: Изменение мира']
        }
    }
};

const EXPERIMENTS = {
    work: {
        title: 'Ежедневный ритуал завершения рабочего дня + цифровой детокс',
        description: 'Этот эксперимент поможет установить чёткие границы между работой и личной жизнью, снизит уровень стресса на 45% и повысит утреннюю продуктивность на 30%.',
        steps: [
            '17:45 - Поставьте таймер на 15 минут для завершения задач',
            '18:00 - Составьте список из 3 главных задач на завтра',
            '18:15 - Отправьте итоговое письмо руководителю (если нужно)',
            '18:30 - Полностью отключите рабочие уведомления',
            '19:00-21:00 - Цифровой детокс: никаких экранов'
        ],
        metrics: [
            { value: '-45%', label: 'Рабочего стресса' },
            { value: '+3ч', label: 'Качественного отдыха' },
            { value: '+30%', label: 'Утренней продуктивности' }
        ]
    },
    
    relationships: {
        title: 'Ежевечерний 30-минутный разговор без отвлечений',
        description: 'Регулярное качественное общение укрепит эмоциональную связь на 50%, улучшит взаимопонимание и снизит количество конфликтов на 60%.',
        steps: [
            'Выберите время с 20:00 до 21:00 каждый день',
            'Отложите телефоны в другую комнату',
            'Сядьте друг напротив друга, установите таймер',
            'Говорите по очереди: 5 минут один, 5 минут другой',
            'Используйте "Я-сообщения": "Я чувствую...", "Мне важно..."'
        ],
        metrics: [
            { value: '-60%', label: 'Конфликтов' },
            { value: '+50%', label: 'Эмоциональной близости' },
            { value: '+40%', label: 'Взаимопонимания' }
        ]
    },
    
    anxiety: {
        title: 'Утренняя медитация + вечерний дневник тревог',
        description: 'Систематическая работа с тревожными мыслями поможет снизить общий уровень тревоги на 55% и улучшить качество сна на 40%.',
        steps: [
            'Утро (после пробуждения): 10 минут медитации на дыхание',
            'День: 3 паузы по 1 минуте для проверки состояния',
            '18:00: 15 минут на запись всех тревог в специальный дневник',
            '21:00: техника дыхания 4-7-8 (4 цикла)',
            'Перед сном: прогрессивная мышечная релаксация'
        ],
        metrics: [
            { value: '-55%', label: 'Уровня тревоги' },
            { value: '+2ч', label: 'Качественного сна' },
            { value: '+35%', label: 'Эмоционального контроля' }
        ]
    },
    
    motivation: {
        title: 'Микро-цели + дневник успехов',
        description: 'Постепенное возвращение мотивации через маленькие достижения повысит уровень энергии на 40% и восстановит интерес к деятельности.',
        steps: [
            'Каждое утро ставьте 3 микро-цели на день (по 5-10 минут каждая)',
            'Вечером записывайте в дневник все выполненные задачи',
            'Раз в неделю анализируйте прогресс и хвалите себя',
            'Награждайте себя за выполнение недельного плана',
            'Найдите "партнёра по подотчётности" для взаимной поддержки'
        ],
        metrics: [
            { value: '+40%', label: 'Уровня энергии' },
            { value: '+50%', label: 'Выполненных задач' },
            { value: '+35%', label: 'Удовлетворения' }
        ]
    }
};

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aurora Mirror 4.0 загружена!');
    initializeApp();
});

let currentTopic = 'work'; // Текущая выбранная тема

function initializeApp() {
    console.log('Инициализация приложения...');
    
    // 1. Счётчик символов
    const textInput = document.getElementById('thought-input');
    if (textInput) {
        updateCharCount();
        textInput.addEventListener('input', updateCharCount);
    }
    
    // 2. Кнопка анализа
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            console.log('Ручной запуск анализа');
            performAnalysis();
        });
    }
    
    // 3. Быстрые заметки - ТОЛЬКО загружают текст, НЕ запускают анализ
    document.querySelectorAll('.quick-tag').forEach(button => {
        button.addEventListener('click', function() {
            const noteType = this.getAttribute('data-note');
            const noteText = NOTES_DATABASE[noteType];
            
            if (noteText && textInput) {
                textInput.value = noteText;
                updateCharCount();
                textInput.focus();
                
                currentTopic = noteType; // Сохраняем выбранную тему
                
                showNotification(`Загружена заметка: "${this.textContent}"`, 'info');
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
            const experimentTitle = document.getElementById('experiment-title').textContent;
            this.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
            this.disabled = true;
            
            showNotification('🎯 Эксперимент запущен! Вы получите уведомления о прогрессе.', 'success');
        });
    }
    
    // 6. Проверить приватность
    const verifyBtn = document.getElementById('verify-privacy');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            showNotification('🔒 Проверка приватности: Откройте DevTools (F12) → вкладка Network → убедитесь в 0 запросов!', 'info');
        });
    }
    
    // 7. Селектор времени
    const timeframeSelect = document.getElementById('timeframe-select');
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', function() {
            const days = parseInt(this.value);
            updateTimelineForCurrentTopic(days);
            showNotification(`Проекция обновлена на ${days} дней`, 'info');
        });
    }
    
    // 8. Настройки
    document.getElementById('settings-btn')?.addEventListener('click', () => {
        showNotification('Настройки будут доступны в следующем обновлении', 'info');
    });
    
    // 9. Помощь
    document.getElementById('help-btn')?.addEventListener('click', () => {
        showNotification('Помощь: 1) Введите заметку 2) Нажмите "Анализировать" 3) Смотрите рекомендации', 'info');
    });
    
    // 10. Настроить эксперимент
    document.getElementById('customize-experiment')?.addEventListener('click', () => {
        showNotification('Настройка эксперимента: выберите удобное время и продолжительность', 'info');
    });
    
    // Проверка элементов при загрузке
    setTimeout(() => {
        console.log('=== ТЕСТ ОБНОВЛЕНИЯ ПРИ ЗАГРУЗКЕ ===');
        
        // ТЕСТ: Принудительно обновляем элементы ПРЯМО СЕЙЧАС
        const testScenario = SCENARIOS.relationships;
        
        // Пытаемся найти элементы разными способами
        let redEl = document.getElementById('scenario-red');
        let orangeEl = document.getElementById('scenario-orange');
        let blueEl = document.getElementById('scenario-blue');
        
        // СПОСОБ 1: Поиск по всему документу
        if (!redEl) {
            const allPElements = document.querySelectorAll('p');
            for (let p of allPElements) {
                if (p.textContent.includes('При сохранении текущих паттернов')) {
                    redEl = p;
                    console.log('✅ Найден red по тексту:', p.textContent.substring(0, 50));
                    break;
                }
            }
        }
        
        // ОБНОВЛЕНИЕ ТЕСТА
        if (redEl) {
            console.log('📝 Тестовое обновление красного сценария:');
            console.log('ДО:', redEl.textContent.substring(0, 50));
            redEl.textContent = 'ТЕСТ: ' + testScenario.red;
            console.log('ПОСЛЕ:', redEl.textContent.substring(0, 50));
            
            // Принудительное обновление DOM
            redEl.style.opacity = '0.9';
            setTimeout(() => redEl.style.opacity = '1', 100);
        } else {
            console.error('❌ Не могу найти красный сценарий!');
        }
        
        if (orangeEl) {
            orangeEl.textContent = 'ТЕСТ: ' + testScenario.orange;
            orangeEl.style.opacity = '0.9';
            setTimeout(() => orangeEl.style.opacity = '1', 100);
        }
        
        if (blueEl) {
            blueEl.textContent = 'ТЕСТ: ' + testScenario.blue;
            blueEl.style.opacity = '0.9';
            setTimeout(() => blueEl.style.opacity = '1', 100);
        }
        
        console.log('✅ Тест завершен');
    }, 1000);
    
    console.log('✅ Приложение инициализировано');
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====
function updateCharCount() {
    const textInput = document.getElementById('thought-input');
    const count = textInput ? textInput.value.length : 0;
    const counter = document.getElementById('char-count');
    
    if (counter) {
        counter.textContent = count;
        
        if (count < 100) {
            counter.style.color = '#ef4444';
        } else if (count < 300) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = '#10b981';
        }
    }
}

function performAnalysis() {
    console.log('Запуск анализа...');
    const textInput = document.getElementById('thought-input');
    const text = textInput ? textInput.value.trim() : '';
    
    if (text.length < 30) {
        showNotification('Введите не менее 30 символов для анализа', 'warning');
        return;
    }
    
    // Показываем загрузку
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
        analyzeBtn.disabled = true;
        
        // Определяем тему заметки
        const topic = detectTopic(text);
        console.log('Определена тема:', topic);
        currentTopic = topic; // Сохраняем тему
        
        // Имитация анализа
        setTimeout(() => {
            try {
                // 1. Обновляем результаты анализа
                updateAnalysisResults(topic, text);
                
                // 2. СИЛОВОЕ ОБНОВЛЕНИЕ СЦЕНАРИЕВ
                forceUpdateScenarios(topic);
                
                // 3. Обновляем таймлайн
                updateTimelineForTopic(topic);
                
                // 4. Обновляем эксперимент
                updateExperiment(topic);
                
                // 5. Показываем рекомендации
                showRecommendations(topic);
                
                // 6. Показываем результаты
                const resultsSection = document.getElementById('results-section');
                if (resultsSection) {
                    resultsSection.style.display = 'block';
                    const toggleBtn = document.getElementById('toggle-results');
                    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                }
                
                showNotification(`✅ Анализ завершён! Тема: ${getTopicName(topic)}. См. рекомендации ниже.`, 'success');
                
            } catch (error) {
                console.error('Ошибка анализа:', error);
                showNotification('Ошибка при анализе', 'error');
            } finally {
                // Восстанавливаем кнопку
                analyzeBtn.innerHTML = originalHTML;
                analyzeBtn.disabled = false;
            }
        }, 1500);
    }
}

function detectTopic(text) {
    const textLower = text.toLowerCase();
    
    if (textLower.includes('работ') || textLower.includes('начальник') || 
        textLower.includes('коллег') || textLower.includes('карьер') || 
        textLower.includes('офис') || textLower.includes('зарплат')) {
        return 'work';
    }
    
    if (textLower.includes('отношен') || textLower.includes('партнёр') || 
        textLower.includes('муж') || textLower.includes('жена') || 
        textLower.includes('семь') || textLower.includes('любов') || 
        textLower.includes('конфликт') || textLower.includes('ссор')) {
        return 'relationships';
    }
    
    if (textLower.includes('тревог') || textLower.includes('страх') || 
        textLower.includes('беспокойств') || textLower.includes('паник') || 
        textLower.includes('нерв') || textLower.includes('опасен')) {
        return 'anxiety';
    }
    
    if (textLower.includes('мотивац') || textLower.includes('цел') || 
        textLower.includes('мечт') || textLower.includes('интерес') || 
        textLower.includes('апати') || textLower.includes('лень') || 
        textLower.includes('устал') || textLower.includes('выгоран')) {
        return 'motivation';
    }
    
    return currentTopic || 'work';
}

function getTopicName(topic) {
    const names = {
        'work': 'Работа и карьера',
        'relationships': 'Отношения',
        'anxiety': 'Тревога и стресс',
        'motivation': 'Мотивация и цели'
    };
    return names[topic] || 'Общая тема';
}

function updateAnalysisResults(topic, text) {
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
            emotionTags.innerHTML += '<span class="emotion-tag negative">Тревога</span>';
            emotionTags.innerHTML += '<span class="emotion-tag negative">Усталость</span>';
            emotionTags.innerHTML += '<span class="emotion-tag negative">Напряжение</span>';
        } else if (emotionValue > 40) {
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Неопределённость</span>';
            emotionTags.innerHTML += '<span class="emotion-tag neutral">Смешанные чувства</span>';
        } else {
            emotionTags.innerHTML += '<span class="emotion-tag positive">Баланс</span>';
            emotionTags.innerHTML += '<span class="emotion-tag positive">Спокойствие</span>';
        }
    }
    
    // Обновляем когнитивные искажения
    const patterns = detectPatterns(text);
    const patternsList = document.getElementById('patterns-list');
    if (patternsList) {
        patternsList.innerHTML = '';
        
        patterns.forEach(pattern => {
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
        
        const themes = getThemes(topic);
        themes.forEach((theme, index) => {
            const type = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
            topicsContainer.innerHTML += `<span class="topic-tag ${type}">${theme}</span>`;
        });
    }
}

function analyzeEmotion(text) {
    const negativeWords = [
        'стресс', 'усталость', 'тревог', 'беспокойств', 'выгорание', 'конфликт',
        'проблем', 'сложн', 'тяжел', 'плох', 'грустн', 'один', 'страх', 'боюсь',
        'нерв', 'раздражает', 'злость', 'гнев', 'обид', 'боль', 'ужас'
    ];
    
    const positiveWords = [
        'радость', 'счастье', 'успех', 'легк', 'хорош', 'отличн', 'прекрасн',
        'доволен', 'интересн', 'мотивац', 'энерг', 'сил', 'надежд', 'мечт'
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
    
    const negativePercent = Math.round((negativeCount / totalRelevant) * 100);
    
    let result = negativePercent;
    if (words.length > 200) result = Math.min(95, result + 10);
    
    return Math.min(95, Math.max(5, result));
}

function detectPatterns(text) {
    const patterns = [];
    const textLower = text.toLowerCase();
    
    if (textLower.match(/всегд|никогда|все|ничего|полностью|абсолютно|каждый раз/)) {
        patterns.push({name: 'Абсолютизация', intensity: 'high'});
    }
    
    if (textLower.match(/катастроф|ужасн|кошмарн|конец|погиб|смерт/)) {
        patterns.push({name: 'Катастрофизация', intensity: 'high'});
    }
    
    const shouldWords = ['должен', 'обязан', 'надо', 'нужно', 'необходимо', 'следует'];
    const shouldCount = shouldWords.filter(w => textLower.includes(w)).length;
    if (shouldCount > 1) {
        patterns.push({name: 'Долженствование', intensity: 'medium'});
    }
    
    if (textLower.match(/проблем|сложн|трудн|невозможн|никуда|тупик/)) {
        patterns.push({name: 'Негативный фокус', intensity: 'medium'});
    }
    
    if (patterns.length < 2) {
        patterns.push({name: 'Эмоциональное мышление', intensity: 'low'});
        patterns.push({name: 'Чтение мыслей', intensity: 'low'});
    }
    
    return patterns.slice(0, 3);
}

function getThemes(topic) {
    const themes = {
        'work': ['Работа / Карьера', 'Профессиональный стресс', 'Баланс работы и жизни', 'Карьерный рост'],
        'relationships': ['Личные отношения', 'Коммуникация', 'Эмоциональная связь', 'Конфликты'],
        'anxiety': ['Тревожность', 'Эмоциональная регуляция', 'Стресс-менеджмент', 'Психогигиена'],
        'motivation': ['Мотивация', 'Целеполагание', 'Личностный рост', 'Самодисциплина']
    };
    return themes[topic] || ['Общая рефлексия', 'Эмоциональное состояние'];
}

// ===== СИЛОВОЕ ОБНОВЛЕНИЕ СЦЕНАРИЕВ =====
function forceUpdateScenarios(topic) {
    console.log('=== СИЛОВОЕ ОБНОВЛЕНИЕ СЦЕНАРИЕВ ===');
    console.log('Тема:', topic);
    
    const scenarios = SCENARIOS[topic] || SCENARIOS.work;
    
    // СПОСОБ 1: Поиск по ID
    let redEl = document.getElementById('scenario-red');
    let orangeEl = document.getElementById('scenario-orange');
    let blueEl = document.getElementById('scenario-blue');
    
    console.log('Найдено по ID:', {
        red: !!redEl,
        orange: !!orangeEl,
        blue: !!blueEl
    });
    
    // СПОСОБ 2: Если не нашли по ID, ищем по структуре DOM
    if (!redEl || !orangeEl || !blueEl) {
        console.log('Поиск по структуре DOM...');
        
        const scenarioCards = document.querySelectorAll('.scenario-card');
        console.log('Найдено карточек сценариев:', scenarioCards.length);
        
        scenarioCards.forEach((card, index) => {
            const desc = card.querySelector('.scenario-description p');
            if (desc) {
                console.log(`Карточка ${index}:`, desc.textContent.substring(0, 50));
                
                // Определяем по текущему тексту
                const currentText = desc.textContent;
                if (currentText.includes('выгорания') || currentText.includes('продуктивности')) {
                    redEl = desc;
                    console.log('✅ Назначен как RED');
                } else if (currentText.includes('улучшение состояния') || currentText.includes('саморегуляции')) {
                    orangeEl = desc;
                    console.log('✅ Назначен как ORANGE');
                } else if (currentText.includes('переосмысление') || currentText.includes('новых возможностей')) {
                    blueEl = desc;
                    console.log('✅ Назначен как BLUE');
                }
            }
        });
    }
    
    // ОБНОВЛЕНИЕ С ПОДТВЕРЖДЕНИЕМ
    if (redEl) {
        console.log('🔄 Обновляю RED:', scenarios.red.substring(0, 60));
        redEl.textContent = scenarios.red;
        
        // Принудительное обновление DOM
        redEl.style.color = '#fecaca';
        setTimeout(() => redEl.style.color = '', 500);
        
        // Еще один способ - временно скрыть/показать
        redEl.style.opacity = '0.8';
        setTimeout(() => redEl.style.opacity = '1', 50);
    } else {
        console.error('❌ Не найден элемент RED!');
    }
    
    if (orangeEl) {
        console.log('🔄 Обновляю ORANGE:', scenarios.orange.substring(0, 60));
        orangeEl.textContent = scenarios.orange;
        orangeEl.style.color = '#fed7aa';
        setTimeout(() => orangeEl.style.color = '', 500);
        orangeEl.style.opacity = '0.8';
        setTimeout(() => orangeEl.style.opacity = '1', 50);
    } else {
        console.error('❌ Не найден элемент ORANGE!');
    }
    
    if (blueEl) {
        console.log('🔄 Обновляю BLUE:', scenarios.blue.substring(0, 60));
        blueEl.textContent = scenarios.blue;
        blueEl.style.color = '#bfdbfe';
        setTimeout(() => blueEl.style.color = '', 500);
        blueEl.style.opacity = '0.8';
        setTimeout(() => blueEl.style.opacity = '1', 50);
    } else {
        console.error('❌ Не найден элемент BLUE!');
    }
    
    // Обновляем вероятности
    updateScenarioProbabilities(topic);
    
    // Обновляем заголовки таймлайнов
    updateTimelineTitles(topic);
    
    console.log('✅ Сценарии обновлены (силовое обновление)');
}

function updateScenarioProbabilities(topic) {
    let redProb, orangeProb, blueProb;
    
    switch(topic) {
        case 'work':
            redProb = 75;
            orangeProb = 20;
            blueProb = 5;
            break;
        case 'relationships':
            redProb = 65;
            orangeProb = 25;
            blueProb = 10;
            break;
        case 'anxiety':
            redProb = 70;
            orangeProb = 20;
            blueProb = 10;
            break;
        case 'motivation':
            redProb = 60;
            orangeProb = 30;
            blueProb = 10;
            break;
        default:
            redProb = 70;
            orangeProb = 20;
            blueProb = 10;
    }
    
    console.log('Обновление вероятностей:', {redProb, orangeProb, blueProb});
    
    // Обновляем вероятности
    const probabilityElements = document.querySelectorAll('.probability-value');
    if (probabilityElements.length >= 3) {
        probabilityElements[0].textContent = redProb + '%';
        probabilityElements[1].textContent = orangeProb + '%';
        probabilityElements[2].textContent = blueProb + '%';
        
        // Анимация
        probabilityElements.forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => el.style.transform = 'scale(1)', 300);
        });
    }
}

function updateTimelineTitles(topic) {
    const timelineTitles = {
        'work': {
            red: 'Критические точки:',
            orange: 'Точки улучшения:',
            blue: 'Моменты прорыва:'
        },
        'relationships': {
            red: 'Точки напряжения:',
            orange: 'Моменты сближения:',
            blue: 'Этапы роста:'
        },
        'anxiety': {
            red: 'Пиковые моменты:',
            orange: 'Периоды затишья:',
            blue: 'Моменты прорыва:'
        },
        'motivation': {
            red: 'Точки спада:',
            orange: 'Моменты подъёма:',
            blue: 'Этапы роста:'
        }
    };
    
    const titles = timelineTitles[topic] || timelineTitles.work;
    
    const redTitle = document.getElementById('timeline-title-red');
    const orangeTitle = document.getElementById('timeline-title-orange');
    const blueTitle = document.getElementById('timeline-title-blue');
    
    if (redTitle) redTitle.textContent = titles.red;
    if (orangeTitle) orangeTitle.textContent = titles.orange;
    if (blueTitle) blueTitle.textContent = titles.blue;
}

function updateTimelineForTopic(topic) {
    const timeframeSelect = document.getElementById('timeframe-select');
    const days = timeframeSelect ? parseInt(timeframeSelect.value) : 30;
    
    console.log('Обновление таймлайна для темы:', topic, 'дней:', days);
    
    const timeline = TIMELINE_DATA[topic] || TIMELINE_DATA.work;
    const data = timeline[days] || timeline[30];
    
    if (!data) {
        console.error('Нет данных для таймлайна:', topic, days);
        return;
    }
    
    // Обновляем красный сценарий
    if (data.red && data.red.length >= 3) {
        document.getElementById('timeline-red-1').textContent = data.red[0].split(': ')[1] || data.red[0];
        document.getElementById('timeline-red-2').textContent = data.red[1].split(': ')[1] || data.red[1];
        document.getElementById('timeline-red-3').textContent = data.red[2].split(': ')[1] || data.red[2];
    }
    
    // Обновляем оранжевый сценарий
    if (data.orange && data.orange.length >= 3) {
        document.getElementById('timeline-orange-1').textContent = data.orange[0].split(': ')[1] || data.orange[0];
        document.getElementById('timeline-orange-2').textContent = data.orange[1].split(': ')[1] || data.orange[1];
        document.getElementById('timeline-orange-3').textContent = data.orange[2].split(': ')[1] || data.orange[2];
    }
    
    // Обновляем синий сценарий
    if (data.blue && data.blue.length >= 3) {
        document.getElementById('timeline-blue-1').textContent = data.blue[0].split(': ')[1] || data.blue[0];
        document.getElementById('timeline-blue-2').textContent = data.blue[1].split(': ')[1] || data.blue[1];
        document.getElementById('timeline-blue-3').textContent = data.blue[2].split(': ')[1] || data.blue[2];
    }
    
    console.log('✅ Таймлайн обновлён для темы:', topic);
}

function updateTimelineForCurrentTopic(days) {
    updateTimelineForTopic(currentTopic);
}

function updateExperiment(topic) {
    const experiment = EXPERIMENTS[topic] || EXPERIMENTS.work;
    
    // Обновляем заголовок и описание
    document.getElementById('experiment-title').textContent = experiment.title;
    document.getElementById('experiment-description').textContent = experiment.description;
    
    // Обновляем метрики
    const metricsContainer = document.getElementById('experiment-metrics');
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
    
    // Добавляем шаги
    const stepsContainer = document.getElementById('experiment-steps-container');
    if (stepsContainer) {
        stepsContainer.innerHTML = `
            <div class="experiment-steps">
                <div style="font-weight: 600; margin-bottom: 10px; color: #818cf8;">📋 Пошаговый план:</div>
                <ul style="margin-left: 20px; color: #cbd5e1;">
                    ${experiment.steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function showRecommendations(topic) {
    const recommendations = RECOMMENDATIONS[topic] || RECOMMENDATIONS.work;
    
    // Создаём контейнер для рекомендаций
    let recContainer = document.getElementById('recommendations-container');
    if (!recContainer) {
        recContainer = document.createElement('div');
        recContainer.id = 'recommendations-container';
        recContainer.className = 'detailed-recommendations';
        
        // Добавляем в левую панель
        const leftPanel = document.querySelector('.left-panel');
        if (leftPanel) {
            leftPanel.insertBefore(recContainer, leftPanel.querySelector('.results-section'));
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
    
    // Показываем рекомендации
    recContainer.style.display = 'block';
}

function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    document.querySelectorAll('.aurora-notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `aurora-notification`;
    
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#6366f1'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${icons[type] || 'fa-info-circle'}" 
               style="font-size: 18px; color: ${colors[type] || '#6366f1'}"></i>
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
        border: 1px solid ${colors[type] || '#6366f1'}40;
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
