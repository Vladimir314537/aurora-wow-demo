// ===== ГЛОБАЛЬНЫЕ ДАННЫЕ =====
const SCENARIOS = {
    work: {
        red: 'РАБОТА: При сохранении текущих паттернов: усиление выгорания на 60%, снижение продуктивности на 40%, риск профессионального истощения.',
        orange: 'РАБОТА: При внедрении практик саморегуляции: улучшение состояния на 50%, восстановление энергии, развитие стрессоустойчивости.',
        blue: 'РАБОТА: При трансформации подхода: переосмысление карьерного пути, поиск новых возможностей, качественный скачок.'
    },
    
    relationships: {
        red: 'ОТНОШЕНИЯ: Эскалация конфликтов, накопление обид, эмоциональное отдаление, риск разрыва отношений до 70%.',
        orange: 'ОТНОШЕНИЯ: Улучшение коммуникации на 60%, понимание потребностей друг друга, укрепление эмоциональной связи.',
        blue: 'ОТНОШЕНИЯ: Глубокое переосмысление отношений, переход на новый уровень близости, совместный рост.'
    },
    
    anxiety: {
        red: 'ТРЕВОГА: Усиление негативных симптомов, возможное развитие панических атак, снижение качества жизни, социальная изоляция.',
        orange: 'ТРЕВОГА: Стабилизация состояния, развитие навыков саморегуляции, снижение тревоги на 50%, улучшение сна.',
        blue: 'ТРЕВОГА: Глубинная трансформация, преодоление ограничивающих убеждений, развитие эмоциональной устойчивости.'
    },
    
    motivation: {
        red: 'МОТИВАЦИЯ: Усиление апатии, полная потеря интереса к деятельности, риск развития депрессии, профессиональная стагнация.',
        orange: 'МОТИВАЦИЯ: Постепенное возвращение интереса к жизни, формирование новых привычек, постановка реалистичных целей.',
        blue: 'МОТИВАЦИЯ: Нахождение новых смыслов и целей, радикальное изменение подхода к жизни, реализация отложенных мечтаний.'
    }
};

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aurora Mirror 4.0 загружена!');
    
    // 1. ПРЯМО СЕЙЧАС проверим все элементы
    console.log('=== ПРОВЕРКА ВСЕХ ЭЛЕМЕНТОВ ДОМ ===');
    
    // Найдем ВСЕ элементы с текстом
    const allPElements = document.querySelectorAll('p');
    console.log('Всего <p> элементов:', allPElements.length);
    
    // Выведем ВСЕ элементы сценариев
    allPElements.forEach((p, index) => {
        const text = p.textContent.substring(0, 80);
        console.log(`Элемент ${index}: "${text}..."`);
    });
    
    // Найдем конкретно элементы сценариев
    const scenarioDivs = document.querySelectorAll('.scenario-description');
    console.log('Элементы .scenario-description:', scenarioDivs.length);
    
    scenarioDivs.forEach((div, index) => {
        console.log(`Сценарий ${index}:`, div.innerHTML);
    });
    
    // 2. Кнопка анализа
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            console.log('\n=== НАЖАТА КНОПКА АНАЛИЗА ===');
            
            // Выбираем случайную тему для теста
            const topics = ['work', 'relationships', 'anxiety', 'motivation'];
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            
            console.log('Выбрана тема:', randomTopic);
            
            // 1. Обновляем результаты сценариев ПРЯМЫМ ОБРАЗОМ
            updateScenariosDirectly(randomTopic);
            
            // 2. Показываем уведомление
            showNotification(`Тема изменена на: ${randomTopic}`, 'success');
        });
    }
    
    // 3. Быстрые заметки
    document.querySelectorAll('.quick-tag').forEach(button => {
        button.addEventListener('click', function() {
            const noteType = this.getAttribute('data-note');
            console.log('Выбрана заметка:', noteType);
            
            // Обновляем сценарии сразу
            updateScenariosDirectly(noteType);
            
            showNotification(`Загружена заметка: "${this.textContent}"`, 'info');
        });
    });
});

// ===== СИЛОВОЕ ОБНОВЛЕНИЕ =====
function updateScenariosDirectly(topic) {
    console.log(`\n=== ОБНОВЛЕНИЕ СЦЕНАРИЕВ ДЛЯ ТЕМЫ: ${topic} ===`);
    
    const scenarios = SCENARIOS[topic] || SCENARIOS.work;
    
    // СПОСОБ 1: Прямое обновление через innerHTML всего контейнера
    const scenarioContainer = document.querySelector('.scenarios-container');
    if (scenarioContainer) {
        console.log('Найден .scenarios-container');
        
        // СОЗДАЕМ НОВЫЙ HTML С НОВЫМИ СЦЕНАРИЯМИ
        const newHTML = `
            <div class="scenario-card red-scenario">
                <div class="scenario-header">
                    <div class="scenario-marker">
                        <div class="scenario-dot red-dot"></div>
                        <h3>Путь продолжения</h3>
                    </div>
                    <div class="scenario-probability">
                        <span class="probability-value">${topic === 'work' ? '75%' : '65%'}</span>
                        <span class="probability-label">Вероятность</span>
                    </div>
                </div>
                <div class="scenario-description">
                    <p><strong>[${topic.toUpperCase()}]</strong> ${scenarios.red}</p>
                </div>
            </div>
            
            <div class="scenario-card orange-scenario">
                <div class="scenario-header">
                    <div class="scenario-marker">
                        <div class="scenario-dot orange-dot"></div>
                        <h3>Управляемые изменения</h3>
                    </div>
                    <div class="scenario-probability">
                        <span class="probability-value">${topic === 'work' ? '20%' : '25%'}</span>
                        <span class="probability-label">Вероятность</span>
                    </div>
                </div>
                <div class="scenario-description">
                    <p><strong>[${topic.toUpperCase()}]</strong> ${scenarios.orange}</p>
                </div>
            </div>
            
            <div class="scenario-card blue-scenario">
                <div class="scenario-header">
                    <div class="scenario-marker">
                        <div class="scenario-dot blue-dot"></div>
                        <h3>Качественный прорыв</h3>
                    </div>
                    <div class="scenario-probability">
                        <span class="probability-value">${topic === 'work' ? '5%' : '10%'}</span>
                        <span class="probability-label">Вероятность</span>
                    </div>
                </div>
                <div class="scenario-description">
                    <p><strong>[${topic.toUpperCase()}]</strong> ${scenarios.blue}</p>
                </div>
            </div>
        `;
        
        // ЗАМЕНЯЕМ ВЕСЬ КОНТЕЙНЕР
        scenarioContainer.innerHTML = newHTML;
        console.log('✅ Весь контейнер сценариев заменен!');
        
        // Добавляем визуальный эффект
        scenarioContainer.style.border = '2px solid #00ff00';
        setTimeout(() => scenarioContainer.style.border = '', 1000);
        
    } else {
        console.error('❌ Не найден .scenarios-container!');
        
        // СПОСОБ 2: Ищем по всему документу
        console.log('Ищу элементы по тексту...');
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            if (el.textContent && el.textContent.includes('При сохранении текущих паттернов')) {
                console.log('Найден элемент с текстом сценария:', el);
                el.textContent = `[${topic}] ${scenarios.red}`;
                el.style.backgroundColor = '#ff000020';
            }
        });
    }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `aurora-notification`;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-info-circle" style="font-size: 18px; color: #6366f1"></i>
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
        border: 1px solid #6366f140;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
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

// ===== ТЕСТ ПРИ ЗАГРУЗКЕ =====
// Запускаем тест сразу после загрузки
setTimeout(() => {
    console.log('\n=== ТЕСТ ПРИ ЗАГРУЗКЕ: ОБНОВЛЯЕМ НА ОТНОШЕНИЯ ===');
    updateScenariosDirectly('relationships');
    
    // Проверяем через 2 секунды
    setTimeout(() => {
        console.log('\n=== ПРОВЕРКА ЧТО ИЗМЕНИЛОСЬ ===');
        const allText = document.querySelector('.scenarios-container')?.textContent || '';
        console.log('Текущий текст сценариев:', allText.substring(0, 200));
        
        if (allText.includes('ОТНОШЕНИЯ')) {
            console.log('✅ ТЕСТ ПРОЙДЕН: Текст изменился!');
        } else {
            console.error('❌ ТЕСТ НЕ ПРОЙДЕН: Текст не изменился!');
        }
    }, 2000);
}, 500);
