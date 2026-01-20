// ===== ДИАГНОСТИЧЕСКИЙ СКРИПТ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 ДИАГНОСТИКА AURORA MIRROR');
    
    // 1. Создаем диагностическую панель
    createDiagnosticPanel();
    
    // 2. Тестируем элементы
    testElements();
    
    // 3. Добавляем тестовые кнопки
    addTestButtons();
});

function createDiagnosticPanel() {
    const panel = document.createElement('div');
    panel.id = 'diagnostic-panel';
    panel.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 10000;
        font-family: monospace;
        font-size: 12px;
        max-width: 400px;
        border: 2px solid #ff0000;
    `;
    
    panel.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #ff4444;">🔍 ДИАГНОСТИКА</h3>
        <div id="diag-status">Загружаюсь...</div>
        <div style="margin-top: 10px;">
            <button onclick="runTest('work')" style="background: #ef4444; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Тест: Работа</button>
            <button onclick="runTest('relationships')" style="background: #f59e0b; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Тест: Отношения</button>
            <button onclick="runTest('anxiety')" style="background: #10b981; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Тест: Тревога</button>
            <button onclick="runTest('motivation')" style="background: #6366f1; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Тест: Мотивация</button>
        </div>
        <div style="margin-top: 10px;">
            <button onclick="forceRedraw()" style="background: #8b5cf6; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Принудительный ререндер</button>
            <button onclick="showAllElements()" style="background: #ec4899; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 4px;">Показать все элементы</button>
        </div>
        <div id="diag-output" style="margin-top: 10px; max-height: 200px; overflow-y: auto; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 4px;"></div>
    `;
    
    document.body.appendChild(panel);
}

function logToPanel(message) {
    const output = document.getElementById('diag-output');
    if (output) {
        const div = document.createElement('div');
        div.textContent = '> ' + message;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }
    console.log(message);
}

function testElements() {
    logToPanel('=== ТЕСТ ЭЛЕМЕНТОВ ===');
    
    // Ищем ВСЕ элементы со сценариями
    const scenarioElements = [];
    
    // Способ 1: По ID
    const ids = ['scenario-red', 'scenario-orange', 'scenario-blue'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            scenarioElements.push({type: 'id', id, element: el});
            logToPanel(`✅ Найден по ID "${id}": "${el.textContent.substring(0, 50)}..."`);
        } else {
            logToPanel(`❌ Не найден по ID "${id}"`);
        }
    });
    
    // Способ 2: По классу
    const byClass = document.querySelectorAll('.scenario-description p');
    byClass.forEach((el, i) => {
        scenarioElements.push({type: 'class', index: i, element: el});
        logToPanel(`✅ Найден по классу [${i}]: "${el.textContent.substring(0, 50)}..."`);
    });
    
    // Способ 3: По тексту
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        if (el.textContent && el.textContent.includes('При сохранении текущих паттернов')) {
            scenarioElements.push({type: 'text', element: el});
            logToPanel(`✅ Найден по тексту: "${el.textContent.substring(0, 50)}..."`);
        }
    });
    
    logToPanel(`Всего найдено элементов: ${scenarioElements.length}`);
    
    // Сохраняем для использования
    window.scenarioElements = scenarioElements;
}

function addTestButtons() {
    // Добавляем кнопки к существующим quick-tag
    document.querySelectorAll('.quick-tag').forEach(button => {
        const noteType = button.getAttribute('data-note');
        
        const testBtn = document.createElement('button');
        testBtn.textContent = 'ТЕСТ';
        testBtn.style.cssText = `
            margin-left: 5px;
            background: #000;
            color: #fff;
            border: none;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 10px;
            cursor: pointer;
        `;
        testBtn.onclick = (e) => {
            e.stopPropagation();
            runTest(noteType);
        };
        
        button.parentNode.insertBefore(testBtn, button.nextSibling);
    });
}

// === ТЕСТОВЫЕ ФУНКЦИИ ===
window.runTest = function(topic) {
    logToPanel(`\n=== ТЕСТ: ${topic} ===`);
    
    const scenarios = {
        work: {
            red: '🔥 РАБОТА-КРАСНЫЙ: Усиление выгорания, конфликты с коллегами',
            orange: '🟠 РАБОТА-ОРАНЖЕВЫЙ: Улучшение состояния, восстановление энергии',
            blue: '🔵 РАБОТА-СИНИЙ: Переосмысление карьеры, новые возможности'
        },
        relationships: {
            red: '❤️ ОТНОШЕНИЯ-КРАСНЫЙ: Эскалация конфликтов, риск разрыва',
            orange: '🧡 ОТНОШЕНИЯ-ОРАНЖЕВЫЙ: Улучшение коммуникации, близость',
            blue: '💙 ОТНОШЕНИЯ-СИНИЙ: Новый уровень отношений, совместный рост'
        },
        anxiety: {
            red: '😰 ТРЕВОГА-КРАСНЫЙ: Панические атаки, социальная изоляция',
            orange: '😌 ТРЕВОГА-ОРАНЖЕВЫЙ: Снижение тревоги, улучшение сна',
            blue: '😊 ТРЕВОГА-СИНИЙ: Свобода от тревоги, трансформация'
        },
        motivation: {
            red: '😞 МОТИВАЦИЯ-КРАСНЫЙ: Апатия, потеря интереса',
            orange: '😃 МОТИВАЦИЯ-ОРАНЖЕВЫЙ: Возвращение интереса, новые цели',
            blue: '🚀 МОТИВАЦИЯ-СИНИЙ: Радикальные изменения, реализация мечтаний'
        }
    };
    
    const data = scenarios[topic] || scenarios.work;
    
    // Способ 1: Прямое обновление найденных элементов
    if (window.scenarioElements && window.scenarioElements.length >= 3) {
        logToPanel('Обновляю через найденные элементы...');
        
        window.scenarioElements[0].element.textContent = data.red;
        window.scenarioElements[1].element.textContent = data.orange;
        window.scenarioElements[2].element.textContent = data.blue;
        
        // Визуальный эффект
        window.scenarioElements.forEach(item => {
            item.element.style.backgroundColor = 'rgba(255,255,0,0.3)';
            setTimeout(() => item.element.style.backgroundColor = '', 1000);
        });
    }
    
    // Способ 2: Создаем новые элементы ВМЕСТО старых
    const container = document.querySelector('.scenarios-container');
    if (container) {
        logToPanel('Создаю новые элементы...');
        
        // Находим старые элементы
        const oldCards = container.querySelectorAll('.scenario-card');
        
        oldCards.forEach((card, index) => {
            const newCard = card.cloneNode(true);
            const textEl = newCard.querySelector('.scenario-description p');
            
            if (textEl) {
                if (index === 0) textEl.textContent = data.red;
                if (index === 1) textEl.textContent = data.orange;
                if (index === 2) textEl.textContent = data.blue;
                
                textEl.style.color = '#ff0';
                textEl.style.fontWeight = 'bold';
            }
            
            // Заменяем старый элемент новым
            container.replaceChild(newCard, card);
        });
    }
    
    // Способ 3: Изменяем весь HTML
    setTimeout(() => {
        if (container) {
            logToPanel('Принудительно изменяю HTML...');
            
            // Сохраняем старый HTML
            const oldHTML = container.innerHTML;
            
            // Изменяем напрямую
            container.innerHTML = container.innerHTML
                .replace(/При сохранении текущих паттернов/g, data.red)
                .replace(/При внедрении практик саморегуляции/g, data.orange)
                .replace(/При трансформации подхода/g, data.blue);
            
            // Если не изменилось - показываем предупреждение
            if (container.innerHTML === oldHTML) {
                logToPanel('⚠️ HTML НЕ ИЗМЕНИЛСЯ! Текст не найден для замены');
            }
        }
    }, 100);
    
    // Обновляем статус
    document.getElementById('diag-status').textContent = `Тема: ${topic} | ${new Date().toLocaleTimeString()}`;
};

window.forceRedraw = function() {
    logToPanel('Принудительный ререндер...');
    
    // Заставляем браузер перерисовать элементы
    const elements = document.querySelectorAll('.scenario-card');
    elements.forEach(el => {
        el.style.display = 'none';
        void el.offsetHeight; // Принудительная перерисовка
        el.style.display = '';
    });
    
    // Другой способ
    document.body.style.zoom = '1.001';
    setTimeout(() => document.body.style.zoom = '1', 50);
};

window.showAllElements = function() {
    logToPanel('=== ВСЕ ЭЛЕМЕНТЫ НА СТРАНИЦЕ ===');
    
    // Находим контейнер сценариев
    const container = document.querySelector('.scenarios-container');
    if (container) {
        logToPanel('HTML контейнера:');
        logToPanel(container.innerHTML.substring(0, 500) + '...');
        
        // Показываем все дочерние элементы
        const allChildren = container.querySelectorAll('*');
        logToPanel(`Всего дочерних элементов: ${allChildren.length}`);
        
        allChildren.forEach((el, i) => {
            if (el.tagName === 'P' || el.classList.contains('scenario-description')) {
                logToPanel(`${i}. ${el.tagName} ${el.className}: "${el.textContent.substring(0, 100)}"`);
            }
        });
    }
};

// Автотест через 2 секунды
setTimeout(() => {
    logToPanel('=== АВТОТЕСТ ЧЕРЕЗ 2 СЕКУНДЫ ===');
    runTest('relationships');
}, 2000);
