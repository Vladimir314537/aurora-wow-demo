    <!-- ВСТРОЕННЫЙ JavaScript С ИСПРАВЛЕНИЯМИ -->
    <script>
    // ===== ВЕРСИЯ И АНТИКЭШ СИСТЕМА =====
    console.log('🚀 AURORA MIRROR v2024-01-20-v4');
    console.log('Загружено: ' + new Date().toISOString());
    console.log('URL: ' + window.location.href);
    
    // Принудительное обновление кэша
    if (performance && performance.navigation && performance.navigation.type === 1) {
        console.log('Страница загружена после принудительного обновления');
    }
    
    // ===== ГЛОБАЛЬНЫЕ ДАННЫЕ С ФИКСАМИ =====
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

    const SCENARIOS = {
        work: {
            red: 'РАБОТА (красный): При сохранении текущих паттернов: усиление выгорания на 60%, снижение продуктивности на 40%, риск профессионального истощения и конфликтов с коллегами.',
            orange: 'РАБОТА (оранжевый): При внедрении практик саморегуляции: улучшение состояния на 50%, восстановление энергии, развитие стрессоустойчивости, повышение продуктивности на 20%.',
            blue: 'РАБОТА (синий): При трансформации подхода: переосмысление карьерного пути, поиск новых возможностей, качественный скачок в развитии, возможен переход на удалённую работу.'
        },
        
        relationships: {
            red: 'ОТНОШЕНИЯ (красный): Эскалация конфликтов, накопление обид, эмоциональное отдаление, риск разрыва отношений до 70%. Возможны длительные периоды молчания и холодной войны.',
            orange: 'ОТНОШЕНИЯ (оранжевый): Улучшение коммуникации на 60%, понимание потребностей друг друга, укрепление эмоциональной связи, снижение конфликтов на 50%, восстановление близости.',
            blue: 'ОТНОШЕНИЯ (синий): Глубокое переосмысление отношений, переход на новый уровень близости, совместный рост, создание новых общих целей и мечтаний, отношения мечты.'
        },
        
        anxiety: {
            red: 'ТРЕВОГА (красный): Усиление негативных симптомов, возможное развитие панических атак, снижение качества жизни, социальная изоляция, риск депрессии и агорафобии.',
            orange: 'ТРЕВОГА (оранжевый): Стабилизация состояния, развитие навыков саморегуляции, снижение тревоги на 50%, улучшение сна на 40%, восстановление социальной активности.',
            blue: 'ТРЕВОГА (синий): Глубинная трансформация, преодоление ограничивающих убеждений, развитие эмоциональной устойчивости, полная свобода от тревоги, качественное изменение жизни.'
        },
        
        motivation: {
            red: 'МОТИВАЦИЯ (красный): Усиление апатии, полная потеря интереса к деятельности, риск развития депрессии, профессиональная стагнация, социальное отдаление, потеря смысла.',
            orange: 'МОТИВАЦИЯ (оранжевый): Постепенное возвращение интереса к жизни, формирование новых привычек, постановка реалистичных целей, улучшение самочувствия на 40%, достижение целей.',
            blue: 'МОТИВАЦИЯ (синий): Нахождение новых смыслов и целей, радикальное изменение подхода к жизни, реализация отложенных мечтаний, качественный прорыв во всех сферах, помощь другим.'
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
                red: ['Месяц 1: Полное выгорание', 'Месяц 2: Профессиональный кризис', 'Месяц 3: Вынужденная смена работы'],
                orange: ['Месяц 1: Стабилизация состояния', 'Месяц 2: Развитие навыков', 'Месяц 3: Карьерный рост'],
                blue: ['Месяц 1: Обучение новым навыкам', 'Месяц 2: Поиск новой работы', 'Месяц 3: Работа мечты']
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
                red: ['Месяц 1: Окончательный разрыв', 'Месяц 2: Период одиночества', 'Месяц 3: Начало новых поисков'],
                orange: ['Месяц 1: Укрепление связи', 'Месяц 2: Совместное развитие', 'Месяц 3: Глубокое счастье'],
                blue: ['Месяц 1: Трансформация отношений', 'Месяц 2: Совместные проекты', 'Месяц 3: Идеальный союз']
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
                red: ['Месяц 1: Хроническое состояние', 'Месяц 2: Потеря работы', 'Месяц 3: Госпитализация'],
                orange: ['Месяц 1: Устойчивое улучшение', 'Месяц 2: Возвращение к нормальной жизни', 'Месяц 3: Полное выздоровление'],
                blue: ['Месяц 1: Глубокая трансформация', 'Месяц 2: Помощь другим', 'Месяц 3: Психологическое благополучие']
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
                red: ['Месяц 1: Глубокая депрессия', 'Месяц 2: Потеря социальных связей', 'Месяц 3: Полная изоляция'],
                orange: ['Месяц 1: Построение привычек', 'Месяц 2: Достижение целей', 'Месяц 3: Устойчивый успех'],
                blue: ['Месяц 1: Нахождение призвания', 'Месяц 2: Реализация мечты', 'Месяц 3: Изменение жизни']
            }
        }
    };

    const EXPERIMENTS = {
        work: {
            title: 'РАБОТА: Ежедневный ритуал завершения рабочего дня',
            description: 'Этот эксперимент поможет установить чёткие границы между работой и личной жизнью, снизит уровень стресса на 45%.',
            steps: [
                '17:45 - 15 минут для завершения задач',
                '18:00 - Список из 3 главных задач на завтра',
                '18:30 - Отключите рабочие уведомления',
                '19:00-21:00 - Цифровой детокс'
            ],
            metrics: [
                { value: '-45%', label: 'Стресса' },
                { value: '+3ч', label: 'Отдыха' },
                { value: '+30%', label: 'Продуктивности' }
            ]
        },
        
        relationships: {
            title: 'ОТНОШЕНИЯ: Ежевечерний разговор без отвлечений',
            description: 'Регулярное качественное общение укрепит эмоциональную связь на 50%, улучшит взаимопонимание.',
            steps: [
                '20:00-20:30 каждый день',
                'Телефоны в другой комнате',
                'Говорите по очереди',
                'Используйте "Я-сообщения"'
            ],
            metrics: [
                { value: '-60%', label: 'Конфликтов' },
                { value: '+50%', label: 'Близости' },
                { value: '+40%', label: 'Понимания' }
            ]
        },
        
        anxiety: {
            title: 'ТРЕВОГА: Утренняя медитация + дневник тревог',
            description: 'Систематическая работа с тревожными мыслями поможет снизить уровень тревоги на 55%.',
            steps: [
                'Утро: 10 минут медитации',
                'День: 3 паузы для проверки состояния',
                '18:00: Дневник тревог',
                '21:00: Техника дыхания 4-7-8'
            ],
            metrics: [
                { value: '-55%', label: 'Тревоги' },
                { value: '+2ч', label: 'Сна' },
                { value: '+35%', label: 'Контроля' }
            ]
        },
        
        motivation: {
            title: 'МОТИВАЦИЯ: Микро-цели + дневник успехов',
            description: 'Постепенное возвращение мотивации через маленькие достижения повысит уровень энергии на 40%.',
            steps: [
                '3 микро-цели на день (5-10 минут)',
                'Вечером записывайте выполненные задачи',
                'Раз в неделю анализируйте прогресс',
                'Найдите "партнёра по подотчётности"'
            ],
            metrics: [
                { value: '+40%', label: 'Энергии' },
                { value: '+50%', label: 'Задач' },
                { value: '+35%', label: 'Удовлетворения' }
            ]
        }
    };

    // ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Aurora Mirror v2024-01-20-v4 инициализируется');
        initializeApp();
    });

    let currentTopic = 'work';

    function initializeApp() {
        console.log('Инициализация приложения...');
        
        // 1. Сброс кэша
        document.getElementById('clear-cache-btn')?.addEventListener('click', function() {
            console.log('Пользователь запросил сброс кэша');
            localStorage.clear();
            sessionStorage.clear();
            showNotification('Кэш очищен. Страница будет перезагружена.', 'info');
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        });
        
        // 2. Счётчик символов
        const textInput = document.getElementById('thought-input');
        if (textInput) {
            updateCharCount();
            textInput.addEventListener('input', updateCharCount);
        }
        
        // 3. Кнопка анализа
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', function() {
                console.log('Анализ запущен по кнопке');
                performAnalysis();
            });
        }
        
        // 4. Быстрые заметки - ТОЛЬКО загружаем текст, НЕ анализируем
        document.querySelectorAll('.quick-tag').forEach(button => {
            button.addEventListener('click', function() {
                const noteType = this.getAttribute('data-note');
                const noteText = NOTES_DATABASE[noteType];
                
                if (noteText && textInput) {
                    textInput.value = noteText;
                    updateCharCount();
                    textInput.focus();
                    
                    // Сохраняем тему, но НЕ запускаем анализ
                    currentTopic = noteType;
                    
                    showNotification(`Загружена заметка: "${this.textContent}"`, 'info');
                    
                    // Предложение проанализировать
                    setTimeout(() => {
                        showNotification('Текст загружен! Теперь нажмите "Анализировать локально"', 'info');
                    }, 500);
                }
            });
        });
        
        // 5. Остальные кнопки
        document.getElementById('toggle-results')?.addEventListener('click', toggleResults);
        document.getElementById('start-experiment')?.addEventListener('click', startExperiment);
        document.getElementById('verify-privacy')?.addEventListener('click', verifyPrivacy);
        document.getElementById('timeframe-select')?.addEventListener('change', updateTimeline);
        
        // 6. Проверка данных
        console.log('TIMELINE_DATA проверка:', {
            work: Object.keys(TIMELINE_DATA.work),
            relationships: Object.keys(TIMELINE_DATA.relationships),
            anxiety: Object.keys(TIMELINE_DATA.anxiety),
            motivation: Object.keys(TIMELINE_DATA.motivation)
        });
        
        console.log('✅ Приложение инициализировано');
        
        // УБРАН автотест - теперь анализ только по кнопке
    }

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
        
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            const originalHTML = analyzeBtn.innerHTML;
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
            analyzeBtn.disabled = true;
            
            // Определяем тему
            const topic = detectTopic(text);
            console.log('Определена тема:', topic);
            currentTopic = topic;
            
            setTimeout(() => {
                try {
                    // 1. Обновляем ВСЁ только после нажатия кнопки
                    updateAllScenarios(topic);
                    
                    // 2. Обновляем таймлайн (использует текущий выбор периода)
                    updateTimelineForTopic(topic);
                    
                    // 3. Обновляем эксперимент
                    updateExperiment(topic);
                    
                    // 4. Показываем результаты
                    const resultsSection = document.getElementById('results-section');
                    if (resultsSection) {
                        resultsSection.style.display = 'block';
                    }
                    
                    showNotification(`✅ Анализ завершён! Тема: ${topic}`, 'success');
                    
                } catch (error) {
                    console.error('Ошибка:', error);
                    showNotification('Ошибка при анализе', 'error');
                } finally {
                    analyzeBtn.innerHTML = originalHTML;
                    analyzeBtn.disabled = false;
                }
            }, 1500);
        }
    }

    // ===== ГЛАВНАЯ ФУНКЦИЯ: ОБНОВЛЕНИЕ ВСЕХ СЦЕНАРИЕВ =====
    function updateAllScenarios(topic) {
        console.log(`🔄 ОБНОВЛЕНИЕ ВСЕХ СЦЕНАРИЕВ ДЛЯ ТЕМЫ: ${topic}`);
        
        const scenarios = SCENARIOS[topic] || SCENARIOS.work;
        
        // 1. Обновляем тексты сценариев
        const redEl = document.getElementById('scenario-red');
        const orangeEl = document.getElementById('scenario-orange');
        const blueEl = document.getElementById('scenario-blue');
        
        if (redEl) {
            console.log('Обновляю красный сценарий:', scenarios.red.substring(0, 50));
            redEl.textContent = scenarios.red;
            redEl.classList.add('update-highlight');
            setTimeout(() => redEl.classList.remove('update-highlight'), 1000);
        }
        
        if (orangeEl) {
            console.log('Обновляю оранжевый сценарий:', scenarios.orange.substring(0, 50));
            orangeEl.textContent = scenarios.orange;
            orangeEl.classList.add('update-highlight');
            setTimeout(() => orangeEl.classList.remove('update-highlight'), 1000);
        }
        
        if (blueEl) {
            console.log('Обновляю синий сценарий:', scenarios.blue.substring(0, 50));
            blueEl.textContent = scenarios.blue;
            blueEl.classList.add('update-highlight');
            setTimeout(() => blueEl.classList.remove('update-highlight'), 1000);
        }
        
        // 2. Обновляем вероятности
        updateProbabilities(topic);
        
        // 3. Обновляем заголовки таймлайнов
        updateTimelineTitles(topic);
        
        console.log('✅ Все сценарии обновлены');
    }

    function updateProbabilities(topic) {
        let redProb, orangeProb, blueProb;
        
        switch(topic) {
            case 'work':
                redProb = 75; orangeProb = 20; blueProb = 5;
                break;
            case 'relationships':
                redProb = 65; orangeProb = 25; blueProb = 10;
                break;
            case 'anxiety':
                redProb = 70; orangeProb = 20; blueProb = 10;
                break;
            case 'motivation':
                redProb = 60; orangeProb = 30; blueProb = 10;
                break;
            default:
                redProb = 70; orangeProb = 20; blueProb = 10;
        }
        
        document.getElementById('prob-red').textContent = redProb + '%';
        document.getElementById('prob-orange').textContent = orangeProb + '%';
        document.getElementById('prob-blue').textContent = blueProb + '%';
    }

    function updateTimelineTitles(topic) {
        const titles = {
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
        
        const data = titles[topic] || titles.work;
        document.getElementById('timeline-title-red').textContent = data.red;
        document.getElementById('timeline-title-orange').textContent = data.orange;
        document.getElementById('timeline-title-blue').textContent = data.blue;
    }

    function updateTimelineForTopic(topic) {
        const timeframeSelect = document.getElementById('timeframe-select');
        const days = timeframeSelect ? parseInt(timeframeSelect.value) : 30;
        
        console.log(`Обновление таймлайна: тема=${topic}, дней=${days}`);
        
        const timeline = TIMELINE_DATA[topic] || TIMELINE_DATA.work;
        const data = timeline[days] || timeline[30];
        
        console.log('Найденные данные для таймлайна:', data);
        
        if (data) {
            if (data.red && data.red.length >= 3) {
                document.getElementById('timeline-red-1').textContent = data.red[0];
                document.getElementById('timeline-red-2').textContent = data.red[1];
                document.getElementById('timeline-red-3').textContent = data.red[2];
                console.log('Обновлён красный таймлайн:', data.red);
            }
            if (data.orange && data.orange.length >= 3) {
                document.getElementById('timeline-orange-1').textContent = data.orange[0];
                document.getElementById('timeline-orange-2').textContent = data.orange[1];
                document.getElementById('timeline-orange-3').textContent = data.orange[2];
                console.log('Обновлён оранжевый таймлайн:', data.orange);
            }
            if (data.blue && data.blue.length >= 3) {
                document.getElementById('timeline-blue-1').textContent = data.blue[0];
                document.getElementById('timeline-blue-2').textContent = data.blue[1];
                document.getElementById('timeline-blue-3').textContent = data.blue[2];
                console.log('Обновлён синий таймлайн:', data.blue);
            }
        } else {
            console.error('Нет данных для таймлайна:', {topic, days});
        }
    }

    function updateTimeline() {
        const timeframeSelect = document.getElementById('timeframe-select');
        const days = parseInt(timeframeSelect.value);
        
        // Обновляем таймлайн для текущей темы
        updateTimelineForTopic(currentTopic);
        
        // Также обновляем заголовки таймлайна
        updateTimelineTitles(currentTopic);
        
        showNotification(`Проекция обновлена на ${days} дней`, 'info');
    }

    function updateExperiment(topic) {
        const experiment = EXPERIMENTS[topic] || EXPERIMENTS.work;
        
        document.getElementById('experiment-title').textContent = experiment.title;
        document.getElementById('experiment-description').textContent = experiment.description;
        
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

    function detectTopic(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('работ') || textLower.includes('начальник') || 
            textLower.includes('коллег') || textLower.includes('карьер')) {
            return 'work';
        }
        
        if (textLower.includes('отношен') || textLower.includes('партнёр') || 
            textLower.includes('муж') || textLower.includes('жена') || 
            textLower.includes('семь') || textLower.includes('любов')) {
            return 'relationships';
        }
        
        if (textLower.includes('тревог') || textLower.includes('страх') || 
            textLower.includes('беспокойств') || textLower.includes('паник')) {
            return 'anxiety';
        }
        
        if (textLower.includes('мотивац') || textLower.includes('цел') || 
            textLower.includes('мечт') || textLower.includes('интерес')) {
            return 'motivation';
        }
        
        return currentTopic || 'work';
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function toggleResults() {
        const results = document.getElementById('results-section');
        const icon = document.getElementById('toggle-results').querySelector('i');
        
        if (results.style.display === 'none') {
            results.style.display = 'block';
            icon.className = 'fas fa-chevron-up';
        } else {
            results.style.display = 'none';
            icon.className = 'fas fa-chevron-down';
        }
    }

    function startExperiment() {
        const btn = document.getElementById('start-experiment');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
        btn.disabled = true;
        showNotification('🎯 Эксперимент запущен!', 'success');
    }

    function verifyPrivacy() {
        showNotification('🔒 Проверка приватности: Откройте DevTools (F12) → Network → 0 запросов!', 'info');
    }

    function showNotification(message, type = 'info') {
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
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas ${icons[type] || 'fa-info-circle'}" 
                   style="font-size: 18px; color: ${colors[type] || '#6366f1'}"></i>
                <div style="flex: 1; font-size: 14px; line-height: 1.4;">${message}</div>
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
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Добавляем анимации если нет
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
    </script>
