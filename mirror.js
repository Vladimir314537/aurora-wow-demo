    <script>
    // ===== AURORA MIRROR v2024 - УЛУЧШЕННАЯ ВЕРСИЯ =====
    console.log('🚀 Aurora Mirror загружен - стабильная версия');
    
    // ===== КОНФИГУРАЦИЯ =====
    const CONFIG = {
        minTextLength: 30,
        defaultTopic: 'work',
        version: '2024.01.20-stable'
    };

    // ===== ДАННЫЕ =====
    const DATA = {
        notes: {
            work: `Чувствую постоянный стресс на работе. Начальник требует выполнять всё больше задач в сжатые сроки...`,
            relationships: `Постоянные конфликты с партнёром из-за мелочей. Кажется, мы перестали понимать друг друга...`,
            anxiety: `Постоянное чувство тревоги без видимой причины. Просыпаюсь утром с тяжёлым предчувствием...`,
            motivation: `Потерял интерес ко всему, что раньше приносило радость. Хобби, спорт, встречи с друзьями...`
        },
        
        scenarios: {
            work: {
                red: 'РАБОТА (красный): При сохранении текущих паттернов: усиление выгорания, снижение продуктивности, риск конфликтов.',
                orange: 'РАБОТА (оранжевый): При внедрении практик саморегуляции: улучшение состояния, восстановление энергии.',
                blue: 'РАБОТА (синий): При трансформации подхода: переосмысление карьерного пути, поиск новых возможностей.'
            },
            relationships: {
                red: 'ОТНОШЕНИЯ (красный): Эскалация конфликтов, эмоциональное отдаление, риск разрыва отношений.',
                orange: 'ОТНОШЕНИЯ (оранжевый): Улучшение коммуникации, укрепление эмоциональной связи, восстановление близости.',
                blue: 'ОТНОШЕНИЯ (синий): Глубокое переосмысление отношений, переход на новый уровень близости.'
            },
            anxiety: {
                red: 'ТРЕВОГА (красный): Усиление симптомов, социальная изоляция, риск развития панических атак.',
                orange: 'ТРЕВОГА (оранжевый): Стабилизация состояния, развитие навыков саморегуляции, снижение тревоги.',
                blue: 'ТРЕВОГА (синий): Глубинная трансформация, преодоление ограничивающих убеждений.'
            },
            motivation: {
                red: 'МОТИВАЦИЯ (красный): Усиление апатии, потеря интереса, профессиональная стагнация.',
                orange: 'МОТИВАЦИЯ (оранжевый): Возвращение интереса к жизни, формирование новых привычек.',
                blue: 'МОТИВАЦИЯ (синий): Нахождение новых смыслов и целей, качественный прорыв.'
            }
        },
        
        timelines: {
            work: {
                7: {
                    red: ['День 2-3: Пик стресса', 'День 4-5: Конфликты', 'День 6-7: Истощение'],
                    orange: ['День 2-3: Облегчение', 'День 4-5: Концентрация', 'День 6-7: Стабилизация'],
                    blue: ['День 2-3: Осознание', 'День 4-5: Исследование', 'День 6-7: Планирование']
                },
                30: {
                    red: ['Неделя 1: Выгорание', 'Неделя 2-3: Продуктивность ↓', 'Неделя 4: Риск увольнения'],
                    orange: ['Неделя 1: Новые привычки', 'Неделя 2-3: Улучшение работы', 'Неделя 4: Стабильный прогресс'],
                    blue: ['Неделя 1: Переосмысление', 'Неделя 2-3: Поиск возможностей', 'Неделя 4: Конкретные шаги']
                },
                90: {
                    red: ['Месяц 1: Полное выгорание', 'Месяц 2: Кризис', 'Месяц 3: Смена работы'],
                    orange: ['Месяц 1: Стабилизация', 'Месяц 2: Развитие', 'Месяц 3: Карьерный рост'],
                    blue: ['Месяц 1: Обучение', 'Месяц 2: Поиск', 'Месяц 3: Работа мечты']
                }
            },
            relationships: {
                7: {
                    red: ['День 2-3: Конфликты', 'День 4-5: Отдаление', 'День 6-7: Риск разрыва'],
                    orange: ['День 2-3: Разговоры', 'День 4-5: Понимание', 'День 6-7: Близость'],
                    blue: ['День 2-3: Осмысление', 'День 4-5: Ценности', 'День 6-7: Новый уровень']
                },
                30: {
                    red: ['Неделя 1: Обиды', 'Неделя 2-3: Холодная война', 'Неделя 4: Расставание'],
                    orange: ['Неделя 1: Общение', 'Неделя 2-3: Доверие', 'Неделя 4: Гармония'],
                    blue: ['Неделя 1: Терапия', 'Неделя 2-3: Трансформация', 'Неделя 4: Отношения мечты']
                },
                90: {
                    red: ['Месяц 1: Разрыв', 'Месяц 2: Одиночество', 'Месяц 3: Новые поиски'],
                    orange: ['Месяц 1: Связь', 'Месяц 2: Развитие', 'Месяц 3: Счастье'],
                    blue: ['Месяц 1: Трансформация', 'Месяц 2: Проекты', 'Месяц 3: Идеальный союз']
                }
            }
        },
        
        probabilities: {
            work: { red: 75, orange: 20, blue: 5 },
            relationships: { red: 65, orange: 25, blue: 10 },
            anxiety: { red: 70, orange: 20, blue: 10 },
            motivation: { red: 60, orange: 30, blue: 10 }
        }
    };

    // ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
    const AppState = {
        currentTopic: CONFIG.defaultTopic,
        isAnalyzing: false,
        
        updateTopic: function(topic) {
            this.currentTopic = topic || CONFIG.defaultTopic;
            console.log('Тема изменена:', this.currentTopic);
        },
        
        getCurrentTopic: function() {
            return this.currentTopic;
        }
    };

    // ===== УТИЛИТЫ =====
    const Utils = {
        // Безопасное получение элемента
        getElement: function(id) {
            const element = document.getElementById(id);
            if (!element) {
                console.warn('Элемент не найден:', id);
            }
            return element;
        },
        
        // Показать уведомление
        showMessage: function(message, type = 'info') {
            const types = {
                info: { icon: 'ℹ️', color: '#6366f1' },
                success: { icon: '✅', color: '#10b981' },
                warning: { icon: '⚠️', color: '#f59e0b' },
                error: { icon: '❌', color: '#ef4444' }
            };
            
            const config = types[type] || types.info;
            alert(`${config.icon} ${message}`);
        },
        
        // Обновить текст элемента
        updateText: function(elementId, text) {
            const element = this.getElement(elementId);
            if (element) {
                element.textContent = text;
            }
        },
        
        // Определить тему по тексту
        detectTopic: function(text) {
            const textLower = text.toLowerCase();
            
            if (textLower.includes('работ') || textLower.includes('начальник') || textLower.includes('коллег')) {
                return 'work';
            }
            if (textLower.includes('отнош') || textLower.includes('партнёр') || textLower.includes('семь')) {
                return 'relationships';
            }
            if (textLower.includes('тревог') || textLower.includes('страх') || textLower.includes('беспокойств')) {
                return 'anxiety';
            }
            if (textLower.includes('мотивац') || textLower.includes('цел') || textLower.includes('мечт')) {
                return 'motivation';
            }
            
            return AppState.getCurrentTopic();
        }
    };

    // ===== ОСНОВНЫЕ ФУНКЦИИ =====
    const AppFunctions = {
        // Загрузить заметку
        loadNote: function(noteType) {
            const textarea = Utils.getElement('thought-input');
            const noteText = DATA.notes[noteType];
            
            if (textarea && noteText) {
                textarea.value = noteText;
                AppState.updateTopic(noteType);
                Utils.showMessage(`Загружена заметка. Нажмите "Анализировать локально"`, 'info');
            }
        },
        
        // Выполнить анализ
        performAnalysis: function() {
            if (AppState.isAnalyzing) return;
            
            const textarea = Utils.getElement('thought-input');
            const text = textarea ? textarea.value.trim() : '';
            
            // Проверка длины текста
            if (text.length < CONFIG.minTextLength) {
                Utils.showMessage(`Введите не менее ${CONFIG.minTextLength} символов`, 'warning');
                return;
            }
            
            // Определяем тему
            const detectedTopic = Utils.detectTopic(text);
            AppState.updateTopic(detectedTopic);
            
            // Показываем состояние анализа
            AppState.isAnalyzing = true;
            const analyzeBtn = Utils.getElement('analyze-btn');
            if (analyzeBtn) {
                analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
                analyzeBtn.disabled = true;
            }
            
            // Имитация анализа
            setTimeout(() => {
                try {
                    this.updateScenarios(detectedTopic);
                    this.updateTimeline();
                    this.showResults();
                    
                    Utils.showMessage(`Анализ завершён! Тема: ${detectedTopic}`, 'success');
                } catch (error) {
                    console.error('Ошибка анализа:', error);
                    Utils.showMessage('Ошибка при анализе', 'error');
                } finally {
                    AppState.isAnalyzing = false;
                    if (analyzeBtn) {
                        analyzeBtn.innerHTML = '<i class="fas fa-search"></i><span>Анализировать локально</span>';
                        analyzeBtn.disabled = false;
                    }
                }
            }, 1000);
        },
        
        // Обновить сценарии
        updateScenarios: function(topic) {
            const scenarios = DATA.scenarios[topic] || DATA.scenarios[CONFIG.defaultTopic];
            const probabilities = DATA.probabilities[topic] || DATA.probabilities[CONFIG.defaultTopic];
            
            // Обновляем тексты сценариев
            Utils.updateText('scenario-red', scenarios.red);
            Utils.updateText('scenario-orange', scenarios.orange);
            Utils.updateText('scenario-blue', scenarios.blue);
            
            // Обновляем вероятности
            Utils.updateText('prob-red', probabilities.red + '%');
            Utils.updateText('prob-orange', probabilities.orange + '%');
            Utils.updateText('prob-blue', probabilities.blue + '%');
            
            console.log('Сценарии обновлены для темы:', topic);
        },
        
        // Обновить таймлайн
        updateTimeline: function() {
            const timeframeSelect = Utils.getElement('timeframe-select');
            const days = timeframeSelect ? parseInt(timeframeSelect.value) : 30;
            const topic = AppState.getCurrentTopic();
            
            console.log('Обновление таймлайна:', { topic, days });
            
            // Получаем данные таймлайна
            const timeline = DATA.timelines[topic] || DATA.timelines[CONFIG.defaultTopic];
            const data = timeline ? timeline[days] || timeline[30] : null;
            
            if (!data) {
                console.warn('Нет данных для таймлайна:', { topic, days });
                return;
            }
            
            // Обновляем красный сценарий
            if (data.red && data.red.length >= 3) {
                Utils.updateText('timeline-red-1', data.red[0]);
                Utils.updateText('timeline-red-2', data.red[1]);
                Utils.updateText('timeline-red-3', data.red[2]);
            }
            
            // Обновляем оранжевый сценарий
            if (data.orange && data.orange.length >= 3) {
                Utils.updateText('timeline-orange-1', data.orange[0]);
                Utils.updateText('timeline-orange-2', data.orange[1]);
                Utils.updateText('timeline-orange-3', data.orange[2]);
            }
            
            // Обновляем синий сценарий
            if (data.blue && data.blue.length >= 3) {
                Utils.updateText('timeline-blue-1', data.blue[0]);
                Utils.updateText('timeline-blue-2', data.blue[1]);
                Utils.updateText('timeline-blue-3', data.blue[2]);
            }
            
            // Обновляем заголовки
            this.updateTimelineTitles(days);
            
            Utils.showMessage(`Проекция обновлена на ${days} дней`, 'info');
        },
        
        // Обновить заголовки таймлайна
        updateTimelineTitles: function(days) {
            const titles = {
                7: { red: 'Критические дни:', orange: 'Дни улучшения:', blue: 'Дни прорыва:' },
                30: { red: 'Критические точки:', orange: 'Точки улучшения:', blue: 'Моменты прорыва:' },
                90: { red: 'Критические этапы:', orange: 'Этапы улучшения:', blue: 'Этапы прорыва:' }
            };
            
            const titleSet = titles[days] || titles[30];
            
            Utils.updateText('timeline-title-red', titleSet.red);
            Utils.updateText('timeline-title-orange', titleSet.orange);
            Utils.updateText('timeline-title-blue', titleSet.blue);
        },
        
        // Показать результаты
        showResults: function() {
            const resultsSection = Utils.getElement('results-section');
            if (resultsSection) {
                resultsSection.style.display = 'block';
            }
        },
        
        // Начать эксперимент
        startExperiment: function() {
            const btn = Utils.getElement('start-experiment');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Эксперимент активен';
                btn.disabled = true;
                Utils.showMessage('Эксперимент запущен! Следуйте рекомендациям.', 'success');
            }
        }
    };

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function initializeApp() {
        console.log('Инициализация Aurora Mirror...');
        
        // 1. Кнопка анализа
        const analyzeBtn = Utils.getElement('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => AppFunctions.performAnalysis());
        }
        
        // 2. Быстрые заметки
        document.querySelectorAll('.quick-tag').forEach(button => {
            button.addEventListener('click', function() {
                const noteType = this.getAttribute('data-note');
                AppFunctions.loadNote(noteType);
            });
        });
        
        // 3. Смена периода таймлайна
        const timeframeSelect = Utils.getElement('timeframe-select');
        if (timeframeSelect) {
            timeframeSelect.addEventListener('change', () => AppFunctions.updateTimeline());
        }
        
        // 4. Запуск эксперимента
        const experimentBtn = Utils.getElement('start-experiment');
        if (experimentBtn) {
            experimentBtn.addEventListener('click', () => AppFunctions.startExperiment());
        }
        
        // 5. Счётчик символов
        const textarea = Utils.getElement('thought-input');
        if (textarea) {
            textarea.addEventListener('input', function() {
                const counter = Utils.getElement('char-count');
                if (counter) {
                    counter.textContent = this.value.length;
                }
            });
        }
        
        console.log('✅ Aurora Mirror инициализирован успешно');
    }

    // Запуск при загрузке страницы
    document.addEventListener('DOMContentLoaded', initializeApp);
    </script>
