// mirror.js - УПРОЩЕННАЯ РАБОЧАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Digital Twin запущен');
    
    let currentStep = 1;
    
    // Показать шаг
    function showStep(step) {
        // Скрыть все шаги
        document.querySelectorAll('.step').forEach(s => {
            s.style.display = 'none';
        });
        // Показать нужный шаг
        const stepEl = document.getElementById('step' + step);
        if (stepEl) {
            stepEl.style.display = 'block';
        }
        currentStep = step;
    }
    
    // Запуск анализа
    function startAnalysis() {
        // Собираем заметки
        const notes = [];
        for (let i = 1; i <= 3; i++) {
            const note = document.getElementById('note' + i)?.value || '';
            if (note) notes.push(note);
        }
        
        console.log('📝 Заметки:', notes);
        showStep(2);
        
        // Анимация прогресса
        const bars = document.querySelectorAll('.progress-fill');
        setTimeout(() => bars[0].style.width = '100%', 500);
        setTimeout(() => bars[1].style.width = '100%', 1500);
        setTimeout(() => bars[2].style.width = '100%', 2500);
        
        // Показать кнопку через 4 секунды
        setTimeout(() => {
            const nextBtn = document.getElementById('nextStep2');
            if (nextBtn) nextBtn.style.display = 'block';
        }, 4000);
    }
    
    // Показать результаты
    function showResults() {
        showStep(3);
        
        // Определяем профиль
        const notes = [];
        for (let i = 1; i <= 3; i++) {
            const note = document.getElementById('note' + i)?.value || '';
            notes.push(note.toLowerCase());
        }
        
        // Простой анализ
        let profile = '⚙️ Практик';
        let desc = 'Вы фокусируетесь на действиях и результатах';
        
        if (notes.some(n => n.includes('анализ') || n.includes('решение'))) {
            profile = '📊 Аналитик';
            desc = 'Вы тщательно анализируете информацию перед действиями';
        }
        
        if (notes.some(n => n.includes('идея') || n.includes('новый'))) {
            profile = '🎨 Креативщик';
            desc = 'Вы генерируете новые идеи и подходы';
        }
        
        // Обновляем интерфейс
        const profileEl = document.getElementById('thinkingProfile');
        const descEl = document.getElementById('profileDesc');
        const strengthEl = document.getElementById('strengthText');
        const improveEl = document.getElementById('improvementText');
        const recommendEl = document.getElementById('recommendationText');
        
        if (profileEl) profileEl.textContent = profile;
        if (descEl) descEl.textContent = desc;
        if (strengthEl) strengthEl.textContent = 'Вы хорошо ставите конкретные цели';
        if (improveEl) improveEl.textContent = 'Можно больше экспериментировать с новыми подходами';
        if (recommendEl) recommendEl.textContent = 'Запланируйте 3 конкретных действия на неделю';
        
        // План действий
        const planItems = [
            'Запишите 3 главные цели на неделю',
            'Ежедневно отмечайте выполненные задачи',
            'Проведите анализ результатов в воскресенье'
        ];
        
        const planList = document.getElementById('actionPlan');
        if (planList) {
            planList.innerHTML = '';
            planItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                planList.appendChild(li);
            });
        }
    }
    
    // Назначение обработчиков
    const nextStep1Btn = document.getElementById('nextStep1');
    if (nextStep1Btn) {
        nextStep1Btn.addEventListener('click', startAnalysis);
    }
    
    const nextStep2Btn = document.getElementById('nextStep2');
    if (nextStep2Btn) {
        nextStep2Btn.addEventListener('click', showResults);
    }
    
    // Кнопка "Начать заново"
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            // Сбрасываем поля
            for (let i = 1; i <= 3; i++) {
                const input = document.getElementById('note' + i);
                if (input) input.value = '';
            }
            // Сбрасываем прогресс
            document.querySelectorAll('.progress-fill').forEach(b => {
                b.style.width = '0%';
            });
            // Скрываем кнопку
            const nextBtn2 = document.getElementById('nextStep2');
            if (nextBtn2) nextBtn2.style.display = 'none';
            // Возвращаемся к шагу 1
            showStep(1);
        });
    }
    
    // Кнопка "Скачать отчет"
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('✅ Отчет скачан! (демо-функция)');
        });
    }
    
    // Кнопка "Вернуться в Aurora"
    const backBtn = document.getElementById('backToAurora');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Быстрые заметки
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const note = this.getAttribute('data-note');
            // Находим первое пустое поле
            for (let i = 1; i <= 3; i++) {
                const input = document.getElementById('note' + i);
                if (input && !input.value.trim()) {
                    input.value = note;
                    break;
                }
            }
        });
    });
    
    // Показываем первый шаг
    showStep(1);
    
    console.log('✅ Digital Twin готов к работе!');
});
