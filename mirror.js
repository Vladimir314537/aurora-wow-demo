// mirror.js - ГАРАНТИРОВАННО РАБОЧИЙ КОД
console.log('🔧 Digital Twin начинает загрузку...');

// Функция для переключения шагов
function showStep(stepNumber) {
    console.log('Переключаем на шаг', stepNumber);
    
    // Скрываем все шаги
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.style.display = 'none';
    });
    
    // Показываем нужный шаг
    const targetStep = document.getElementById('step' + stepNumber);
    if (targetStep) {
        targetStep.style.display = 'block';
        console.log('✅ Шаг', stepNumber, 'показан');
    } else {
        console.error('❌ Шаг', stepNumber, 'не найден');
    }
}

// Функция для быстрого заполнения заметок
function fillQuickNote(noteText) {
    const inputs = [
        document.getElementById('note1'),
        document.getElementById('note2'), 
        document.getElementById('note3')
    ];
    
    for (let input of inputs) {
        if (input && !input.value.trim()) {
            input.value = noteText;
            console.log('📝 Заполнено поле:', noteText);
            break;
        }
    }
}

// Главная функция инициализации
function initDigitalTwin() {
    console.log('🚀 Инициализация Digital Twin...');
    
    // 1. Показываем первый шаг
    showStep(1);
    
    // 2. Обработчик для кнопки "Далее: Анализ"
    const nextStep1Btn = document.getElementById('nextStep1');
    if (nextStep1Btn) {
        console.log('✅ Найдена кнопка nextStep1');
        nextStep1Btn.onclick = function() {
            console.log('🎯 Нажата кнопка "Далее: Анализ"');
            
            // Переключаем на шаг 2
            showStep(2);
            
            // Запускаем анимацию прогресса
            const progressBars = document.querySelectorAll('.progress-fill');
            if (progressBars.length >= 3) {
                console.log('🎬 Запускаем анимацию прогресса...');
                
                // Первая полоса
                setTimeout(() => {
                    progressBars[0].style.width = '100%';
                    console.log('📊 Прогресс 1: 100%');
                }, 500);
                
                // Вторая полоса
                setTimeout(() => {
                    progressBars[1].style.width = '100%';
                    console.log('📊 Прогресс 2: 100%');
                }, 1500);
                
                // Третья полоса
                setTimeout(() => {
                    progressBars[2].style.width = '100%';
                    console.log('📊 Прогресс 3: 100%');
                }, 2500);
                
                // Показываем кнопку через 4 секунды
                setTimeout(() => {
                    const nextStep2Btn = document.getElementById('nextStep2');
                    if (nextStep2Btn) {
                        nextStep2Btn.style.display = 'block';
                        console.log('✅ Кнопка "Показать результаты" показана');
                    }
                }, 4000);
            }
        };
    } else {
        console.error('❌ Кнопка nextStep1 не найдена!');
    }
    
    // 3. Обработчик для кнопки "Показать результаты"
    const nextStep2Btn = document.getElementById('nextStep2');
    if (nextStep2Btn) {
        console.log('✅ Найдена кнопка nextStep2');
        nextStep2Btn.onclick = function() {
            console.log('🎯 Нажата кнопка "Показать результаты"');
            showStep(3);
            updateResults();
        };
    }
    
    // 4. Заполняем результаты
    function updateResults() {
        console.log('📊 Обновляем результаты...');
        
        // Простой анализ заметок
        const note1 = document.getElementById('note1')?.value || '';
        const note2 = document.getElementById('note2')?.value || '';
        const note3 = document.getElementById('note3')?.value || '';
        
        // Определяем профиль
        let profile = '⚙️ Практик';
        let description = 'Вы фокусируетесь на действиях и результатах';
        
        const allNotes = (note1 + note2 + note3).toLowerCase();
        
        if (allNotes.includes('анализ') || allNotes.includes('решение')) {
            profile = '📊 Аналитик';
            description = 'Вы тщательно анализируете информацию перед действиями';
        }
        
        if (allNotes.includes('идея') || allNotes.includes('новый')) {
            profile = '🎨 Креативщик';
            description = 'Вы генерируете новые идеи и подходы';
        }
        
        // Обновляем интерфейс
        const profileEl = document.getElementById('thinkingProfile');
        const descEl = document.getElementById('profileDesc');
        const strengthEl = document.getElementById('strengthText');
        const improveEl = document.getElementById('improvementText');
        const recommendEl = document.getElementById('recommendationText');
        const planEl = document.getElementById('actionPlan');
        
        if (profileEl) profileEl.textContent = profile;
        if (descEl) descEl.textContent = description;
        if (strengthEl) strengthEl.textContent = 'Вы хорошо ставите конкретные цели';
        if (improveEl) improveEl.textContent = 'Можно больше экспериментировать с новыми подходами';
        if (recommendEl) recommendEl.textContent = 'Запланируйте 3 конкретных действия на неделю';
        
        // План действий
        if (planEl) {
            planEl.innerHTML = '';
            const planItems = [
                'Запишите 3 главные цели на неделю',
                'Ежедневно отмечайте выполненные задачи',
                'Проведите анализ результатов в воскресенье'
            ];
            
            planItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                planEl.appendChild(li);
            });
        }
        
        console.log('✅ Результаты обновлены');
    }
    
    // 5. Обработчик "Начать заново"
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.onclick = function() {
            console.log('🔄 Начинаем заново');
            
            // Очищаем поля ввода
            ['note1', 'note2', 'note3'].forEach(id => {
                const input = document.getElementById(id);
                if (input) input.value = '';
            });
            
            // Сбрасываем прогресс
            document.querySelectorAll('.progress-fill').forEach(bar => {
                bar.style.width = '0%';
            });
            
            // Скрываем кнопку шага 2
            if (nextStep2Btn) nextStep2Btn.style.display = 'none';
            
            // Возвращаемся к шагу 1
            showStep(1);
        };
    }
    
    // 6. Обработчик "Скачать отчет"
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.onclick = function() {
            alert('📄 Отчет скачан! (демо-функция)');
            console.log('📥 Пользователь скачал отчет');
        };
    }
    
    // 7. Обработчик "Вернуться в Aurora"
    const backBtn = document.getElementById('backToAurora');
    if (backBtn) {
        backBtn.onclick = function() {
            console.log('🏠 Возвращаемся в Aurora');
            window.location.href = 'index.html';
        };
    }
    
    // 8. Быстрые заметки
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.onclick = function() {
            const note = this.getAttribute('data-note');
            console.log('⚡ Быстрая заметка:', note);
            fillQuickNote(note);
        };
    });
    
    console.log('✅ Digital Twin полностью инициализирован!');
    console.log('👉 Введите заметки и нажмите "Далее: Анализ"');
}

// Запускаем когда страница загрузится
window.addEventListener('DOMContentLoaded', initDigitalTwin);

// Альтернативный запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDigitalTwin);
} else {
    initDigitalTwin();
}
