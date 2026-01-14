// ============================================
// Aurora 4.0 - Локальный AI Анализатор
// Работает полностью в браузере, без сети
// ============================================

class LocalAIAnalyzer {
    constructor() {
        this.modelLoaded = false;
        this.init();
    }

    async init() {
        // Здесь можно позже загрузить tiny ML-модель (например, для эмоций)
        console.log("Локальный анализатор инициализирован");
        this.modelLoaded = true;
    }

    // Основной метод анализа
    analyze(text) {
        if (!text || text.trim().length < 3) {
            return this.getEmptyResult();
        }

        console.log("🔍 Локальный анализ запущен для текста:", text.substring(0, 50) + "...");

        // ИМИТАЦИЯ РАБОТЫ ML-МОДЕЛИ (позже заменим на настоящую)
        // 1. Анализ эмоций
        const emotion = this.analyzeEmotion(text);
        
        // 2. Определение тем
        const topics = this.extractTopics(text);
        
        // 3. Ключевые слова
        const keywords = this.extractKeywords(text);
        
        // 4. Статистика
        const stats = this.calculateStats(text);

        return {
            success: true,
            emotion: emotion,
            topics: topics,
            keywords: keywords,
            stats: stats,
            note: "✅ Анализ выполнен локально. Проверьте Network tab — 0 запросов.",
            timestamp: new Date().toLocaleTimeString()
        };
    }

    // Метод анализа эмоций (упрощенный)
    analyzeEmotion(text) {
        const positiveWords = ['рад', 'горжусь', 'уверен', 'хорошо', 'отлично', 'люблю', 'счастлив', 'восторг'];
        const negativeWords = ['стресс', 'устал', 'проблема', 'сложно', 'тревога', 'боюсь', 'плохо', 'разочарован'];
        
        let positiveScore = 0;
        let negativeScore = 0;
        
        const words = text.toLowerCase().split(/\s+/);
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveScore++;
            if (negativeWords.includes(word)) negativeScore++;
        });
        
        if (positiveScore > negativeScore) return { type: "позитивный", score: positiveScore };
        if (negativeScore > positiveScore) return { type: "негативный", score: negativeScore };
        return { type: "нейтральный", score: 0 };
    }

    // Извлечение тем (категорий)
    extractTopics(text) {
        const topicsMap = {
            'работа': ['работа', 'проект', 'начальник', 'коллеги', 'задача', 'дедлайн'],
            'здоровье': ['здоровье', 'устал', 'болит', 'врач', 'сон', 'отдых'],
            'отношения': ['друг', 'любовь', 'семья', 'общение', 'встреча'],
            'финансы': ['деньги', 'зарплата', 'покупка', 'бюджет', 'инвестиции'],
            'отдых': ['отпуск', 'море', 'отдых', 'хобби', 'кино', 'релакс']
        };
        
        const foundTopics = [];
        const textLower = text.toLowerCase();
        
        for (const [topic, keywords] of Object.entries(topicsMap)) {
            if (keywords.some(keyword => textLower.includes(keyword))) {
                foundTopics.push(topic);
            }
        }
        
        return foundTopics.length > 0 ? foundTopics : ['общее'];
    }

    // Извлечение ключевых слов
    extractKeywords(text) {
        // Убираем стоп-слова и выделяем значимые
        const stopWords = ['и', 'в', 'на', 'с', 'по', 'у', 'о', 'для', 'не', 'но', 'а', 'же'];
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3 && !stopWords.includes(word));
        
        // Подсчитываем частоту
        const freq = {};
        words.forEach(word => {
            freq[word] = (freq[word] || 0) + 1;
        });
        
        // Сортируем по частоте и берем топ-5
        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word, count]) => ({ word, importance: count }));
    }

    // Статистика текста
    calculateStats(text) {
        const words = text.trim().split(/\s+/).length;
        const sentences = text.split(/[.!?]+/).length - 1;
        const chars = text.length;
        
        return {
            words: words,
            sentences: sentences || 1,
            characters: chars,
            readability: words > 0 ? (words / sentences).toFixed(1) : 0
        };
    }

    getEmptyResult() {
        return {
            success: false,
            emotion: { type: "не определено", score: 0 },
            topics: [],
            keywords: [],
            stats: { words: 0, sentences: 0, characters: 0 },
            note: "Введите текст для анализа",
            timestamp: new Date().toLocaleTimeString()
        };
    }
}

// ============================================
// Визуализатор результатов
// ============================================

class ResultsVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Контейнер #${containerId} не найден`);
        }
    }

    display(results) {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="local-analysis-results">
                <h3><i class="fas fa-microchip"></i> Результаты локального анализа</h3>
                
                <div class="results-grid">
                    <div class="result-item">
                        <h4>Эмоция:</h4>
                        <div class="emotion-badge ${results.emotion.type}">
                            ${results.emotion.type.toUpperCase()} (${results.emotion.score})
                        </div>
                    </div>
                    
                    <div class="result-item">
                        <h4>Темы:</h4>
                        <div class="topics-list">
                            ${results.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="result-item">
                        <h4>Ключевые слова:</h4>
                        <div class="keywords-list">
                            ${results.keywords.map(kw => 
                                `<span class="keyword" style="--importance: ${kw.importance}">${kw.word}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="result-item">
                        <h4>Статистика:</h4>
                        <div class="stats">
                            <div>Слов: ${results.stats.words}</div>
                            <div>Предложений: ${results.stats.sentences}</div>
                            <div>Символов: ${results.stats.characters}</div>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-note">
                    <i class="fas fa-shield-alt"></i> ${results.note}
                    <div class="timestamp">Анализ выполнен: ${results.timestamp}</div>
                </div>
            </div>
        `;
    }

    displayError(message) {
        this.container.innerHTML = `
            <div class="local-analysis-error">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>
        `;
    }
}

// ============================================
// Стили для вставки в HTML
// ============================================

const LOCAL_ANALYZER_STYLES = `
<style>
.local-analysis-results {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.result-item {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.result-item h4 {
    margin-top: 0;
    color: #e2e8ff;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.emotion-badge {
    display: inline-block;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 14px;
}

.emotion-badge.позитивный { background: #10b981; }
.emotion-badge.негативный { background: #ef4444; }
.emotion-badge.нейтральный { background: #6b7280; }

.topics-list, .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.topic-tag {
    background: rgba(255,255,255,0.2);
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
}

.keyword {
    background: rgba(255,255,255,0.3);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
    opacity: calc(var(--importance, 1) * 0.8);
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.stats div {
    background: rgba(255,255,255,0.15);
    padding: 8px;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
}

.analysis-note {
    background: rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    font-size: 14px;
    border-left: 4px solid #10b981;
}

.timestamp {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 5px;
}

.local-analysis-error {
    background: #fee2e2;
    color: #dc2626;
    padding: 15px;
    border-radius: 10px;
    border-left: 4px solid #dc2626;
}
</style>
`;

// ============================================
// Инициализация для analyst.html
// ============================================

function initLocalAnalyzerForAnalyst() {
    // Добавляем стили в head
    document.head.insertAdjacentHTML('beforeend', LOCAL_ANALYZER_STYLES);
    
    // Создаем контейнер для результатов, если его нет
    let resultsContainer = document.getElementById('localResults');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'localResults';
        // Вставляем после основного контента или в нужное место
        document.querySelector('.container')?.appendChild(resultsContainer);
    }
    
    // Создаем анализатор и визуализатор
    const analyzer = new LocalAIAnalyzer();
    const visualizer = new ResultsVisualizer('localResults');
    
    // Находим кнопку аналитик-советник и добавляем альтернативу
    const existingButton = document.querySelector('.analyze-btn');
    if (existingButton) {
        const localButton = existingButton.cloneNode(true);
        localButton.textContent = '🔒 Проанализировать локально';
        localButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        localButton.style.marginTop = '10px';
        
        localButton.addEventListener('click', () => {
            const textArea = document.querySelector('textarea');
            const text = textArea ? textArea.value : '';
            const results = analyzer.analyze(text);
            visualizer.display(results);
            
            // Показываем уведомление о приватности
            alert('✅ Анализ выполнен локально! Проверьте вкладку Network — 0 запросов к серверу.');
        });
        
        existingButton.parentNode.insertBefore(localButton, existingButton.nextSibling);
    }
    
    console.log('Локальный анализатор для analyst.html инициализирован');
}

// Автоматическая инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocalAnalyzerForAnalyst);
} else {
    initLocalAnalyzerForAnalyst();
}
