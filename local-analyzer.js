// local-analyzer.js - Реальный локальный AI анализатор
class LocalAnalyzer {
    constructor() {
        console.log('🔧 Инициализация LocalAnalyzer...');
        this.emotions = ['Позитивная', 'Негативная', 'Нейтральная', 'Смешанная'];
        this.topics = ['Работа', 'Здоровье', 'Отношения', 'Финансы', 'Отдых', 'Обучение', 'Семья'];
        this.keywordPatterns = {
            'работа': ['работа', 'начальник', 'коллеги', 'проект', 'задача', 'дедлайн', 'офис', 'карьера'],
            'стресс': ['стресс', 'усталость', 'выгорание', 'давление', 'напряжение', 'тревога'],
            'здоровье': ['здоровье', 'болезнь', 'врач', 'больница', 'симптомы', 'лечение', 'диагноз'],
            'отношения': ['отношения', 'любовь', 'семья', 'друзья', 'конфликт', 'общение', 'доверие'],
            'финансы': ['деньги', 'финансы', 'бюджет', 'инвестиции', 'доход', 'расход', 'экономия'],
            'отдых': ['отдых', 'отпуск', 'путешествие', 'хобби', 'развлечения', 'релаксация'],
            'успех': ['успех', 'достижение', 'победа', 'результат', 'прогресс', 'развитие']
        };
    }

    analyze(text) {
        console.log('🔍 Анализирую текст:', text.substring(0, 50) + '...');
        
        // 1. Анализ эмоций
        const emotion = this.analyzeEmotion(text);
        
        // 2. Определение тем
        const topics = this.extractTopics(text);
        
        // 3. Извлечение ключевых слов
        const keywords = this.extractKeywords(text);
        
        // 4. Поиск паттернов
        const patterns = this.findPatterns(text);
        
        // 5. Статистика
        const stats = this.calculateStats(text);
        
        return {
            emotion,
            topics,
            keywords,
            patterns,
            stats,
            timestamp: new Date().toISOString(),
            local: true
        };
    }

    analyzeEmotion(text) {
        const lowerText = text.toLowerCase();
        
        // Положительные индикаторы
        const positiveWords = ['хорошо', 'отлично', 'прекрасно', 'рад', 'доволен', 'успех', 'счастье', 
                              'любовь', 'горжусь', 'удовольствие', 'интересно', 'вдохновение'];
        
        // Отрицательные индикаторы
        const negativeWords = ['плохо', 'ужасно', 'грустно', 'злой', 'раздражен', 'стресс', 'проблема',
                              'трудность', 'боль', 'страх', 'тревога', 'разочарование', 'конфликт'];
        
        let positiveScore = 0;
        let negativeScore = 0;
        
        positiveWords.forEach(word => {
            if (lowerText.includes(word)) positiveScore++;
        });
        
        negativeWords.forEach(word => {
            if (lowerText.includes(word)) negativeScore++;
        });
        
        // Определяем доминирующую эмоцию
        if (positiveScore > negativeScore * 2) return 'Позитивная 🟢';
        if (negativeScore > positiveScore * 2) return 'Негативная 🔴';
        if (positiveScore > 0 && negativeScore > 0) return 'Смешанная 🟡';
        return 'Нейтральная ⚪';
    }

    extractTopics(text) {
        const lowerText = text.toLowerCase();
        const foundTopics = [];
        
        // Проверяем каждую тему
        Object.entries(this.keywordPatterns).forEach(([topic, keywords]) => {
            const matches = keywords.filter(keyword => 
                lowerText.includes(keyword.toLowerCase())
            );
            
            if (matches.length > 0) {
                foundTopics.push({
                    name: this.capitalize(topic),
                    confidence: Math.min(90, matches.length * 30),
                    keywords: matches
                });
            }
        });
        
        // Сортируем по уверенности
        foundTopics.sort((a, b) => b.confidence - a.confidence);
        
        // Возвращаем топ-3 темы
        return foundTopics.slice(0, 3).map(t => `${t.name} (${t.confidence}%)`);
    }

    extractKeywords(text) {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3);
        
        // Частота слов
        const wordFreq = {};
        words.forEach(word => {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        });
        
        // Фильтруем стоп-слова
        const stopWords = ['это', 'что', 'очень', 'мне', 'меня', 'был', 'было', 'если', 'чтобы', 'как'];
        const filteredWords = Object.entries(wordFreq)
            .filter(([word]) => !stopWords.includes(word))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        return filteredWords.map(([word, count], index) => ({
            word: this.capitalize(word),
            score: Math.min(0.99, 0.7 + (index * 0.05)),
            frequency: count
        }));
    }

    findPatterns(text) {
        const patterns = [];
        const lowerText = text.toLowerCase();
        
        // Паттерн: Проблема → Решение
        if ((lowerText.includes('проблем') || lowerText.includes('трудност')) && 
            (lowerText.includes('решен') || lowerText.includes('найт'))) {
            patterns.push('Проблема → Поиск решения');
        }
        
        // Паттерн: Достижение → Эмоция
        if (lowerText.includes('сдел') || lowerText.includes('законч') || lowerText.includes('достиг')) {
            patterns.push('Достижение → Эмоциональный отклик');
        }
        
        // Паттерн: Стресс → Последствия
        if (lowerText.includes('стресс') && 
            (lowerText.includes('уста') || lowerText.includes('выгор'))) {
            patterns.push('Стресс → Истощение');
        }
        
        // Паттерн: Планы → Ожидания
        if ((lowerText.includes('планир') || lowerText.includes('хочу')) && 
            lowerText.includes('буду')) {
            patterns.push('Планирование → Будущие действия');
        }
        
        // Если паттернов нет, добавляем общий
        if (patterns.length === 0) {
            patterns.push('Личная рефлексия');
        }
        
        return patterns;
    }

    calculateStats(text) {
        const words = text.trim().split(/\s+/);
        const chars = text.length;
        const sentences = text.split(/[.!?]+/).length - 1;
        
        // Сложность текста (очень простой алгоритм)
        const longWords = words.filter(word => word.length > 6).length;
        const complexity = Math.min(100, (longWords / words.length) * 300);
        
        return {
            wordCount: words.length,
            charCount: chars,
            sentenceCount: sentences,
            avgWordLength: chars / words.length,
            complexity: Math.round(complexity)
        };
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Дополнительные методы для демонстрации
    analyzeSentiment(text) {
        const emotion = this.analyzeEmotion(text);
        const score = emotion.includes('Позитивная') ? 0.8 : 
                     emotion.includes('Негативная') ? 0.2 : 0.5;
        return {
            label: emotion,
            score: score,
            comparative: score - 0.5
        };
    }

    getSummary(text, maxSentences = 2) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        return sentences.slice(0, maxSentences).map(s => s.trim() + '.').join(' ');
    }
}

// Экспорт для использования в HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalAnalyzer;
}
