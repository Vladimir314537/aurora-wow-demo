 // ===== AURORA MIRROR.JS v2024-01-20-v5 =====
// Основной JavaScript файл для анализа

console.log('🧠 Aurora Mirror.js v2024-01-20-v5 loaded');

// Экспортируемые функции для анализа текста
const AuroraAnalyzer = {
    version: '2024-01-20-v5',
    
    // Анализ эмоционального тона
    analyzeEmotion: function(text) {
        console.log('Анализ эмоционального тона...');
        
        const negativeWords = [
            'стресс', 'усталость', 'тревог', 'беспокойств', 'выгорание', 'конфликт',
            'проблем', 'сложн', 'тяжел', 'плох', 'грустн', 'один', 'страх', 'боюсь',
            'нерв', 'раздражает', 'злость', 'гнев', 'обид', 'боль', 'ужас', 'депрессия'
        ];
        
        const positiveWords = [
            'радость', 'счастье', 'успех', 'легк', 'хорош', 'отличн', 'прекрасн',
            'доволен', 'интересн', 'мотивац', 'энерг', 'сил', 'надежд', 'мечт', 'любовь'
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
        
        const negativePercentage = Math.round((negativeCount / totalRelevant) * 100);
        return Math.min(95, Math.max(5, negativePercentage));
    },
    
    // Определение когнитивных искажений
    detectCognitivePatterns: function(text) {
        console.log('Определение когнитивных искажений...');
        
        const patterns = [
            { name: 'Абсолютизация', keywords: ['всегда', 'никогда', 'все', 'никто', 'всё'], intensity: 'high' },
            { name: 'Катастрофизация', keywords: ['ужас', 'катастрофа', 'кошмар', 'конец', 'смерть'], intensity: 'high' },
            { name: 'Чёрно-белое мышление', keywords: ['или', 'либо', 'только так', 'всё плохо'], intensity: 'medium' },
            { name: 'Чтение мыслей', keywords: ['знаю что', 'думает что', 'считает что'], intensity: 'medium' },
            { name: 'Предсказание будущего', keywords: ['будет', 'обязательно', 'неизбежно'], intensity: 'medium' },
            { name: 'Долженствование', keywords: ['должен', 'обязан', 'надо', 'нужно'], intensity: 'low' },
            { name: 'Негативный фокус', keywords: ['только плохое', 'не замечаю хорошего'], intensity: 'medium' },
            { name: 'Эмоциональное обоснование', keywords: ['чувствую значит', 'ощущаю поэтому'], intensity: 'low' }
        ];
        
        const textLower = text.toLowerCase();
        const detectedPatterns = [];
        
        patterns.forEach(pattern => {
            if (pattern.keywords.some(keyword => textLower.includes(keyword))) {
                detectedPatterns.push({
                    name: pattern.name,
                    intensity: pattern.intensity
                });
            }
        });
        
        return detectedPatterns.slice(0, 3); // Возвращаем максимум 3 паттерна
    },
    
    // Определение тем
    detectTopics: function(text) {
        console.log('Определение тем...');
        
        const topics = [
            { name: 'Работа / Карьера', keywords: ['работа', 'начальник', 'коллега', 'карьера', 'проект', 'задача'] },
            { name: 'Отношения', keywords: ['отношения', 'партнёр', 'муж', 'жена', 'любовь', 'семья'] },
            { name: 'Здоровье', keywords: ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'силы'] },
            { name: 'Финансы', keywords: ['деньги', 'финансы', 'зарплата', 'доход', 'расход', 'бюджет'] },
            { name: 'Саморазвитие', keywords: ['развитие', 'рост', 'обучение', 'навыки', 'цели', 'мечты'] },
            { name: 'Социальное', keywords: ['друзья', 'общение', 'общество', 'люди', 'компания', 'вечеринка'] },
            { name: 'Хобби', keywords: ['хобби', 'увлечение', 'отдых', 'спорт', 'творчество', 'искусство'] },
            { name: 'Психология', keywords: ['чувства', 'эмоции', 'мысли', 'страхи', 'тревоги', 'переживания'] }
        ];
        
        const textLower = text.toLowerCase();
        const detectedTopics = [];
        
        topics.forEach(topic => {
            if (topic.keywords.some(keyword => textLower.includes(keyword))) {
                detectedTopics.push(topic.name);
            }
        });
        
        // Возвращаем максимум 3 темы
        return detectedTopics.slice(0, 3);
    },
    
    // Полный анализ текста
    analyzeText: function(text) {
        console.log('Полный анализ текста...');
        
        if (text.length < 30) {
            return {
                error: 'Текст слишком короткий (минимум 30 символов)',
                sentiment: 50,
                patterns: [],
                topics: []
            };
        }
        
        return {
            sentiment: this.analyzeEmotion(text),
            patterns: this.detectCognitivePatterns(text),
            topics: this.detectTopics(text),
            wordCount: text.split(/\s+/).length,
            charCount: text.length
        };
    },
    
    // Генерация рекомендаций
    generateRecommendations: function(analysis) {
        console.log('Генерация рекомендаций...');
        
        const recommendations = [];
        
        if (analysis.sentiment > 70) {
            recommendations.push({
                title: 'Высокий уровень негативных эмоций',
                description: 'Рекомендуем практики эмоциональной саморегуляции',
                type: 'warning'
            });
        }
        
        if (analysis.patterns.some(p => p.intensity === 'high')) {
            recommendations.push({
                title: 'Обнаружены сильные когнитивные искажения',
                description: 'Рассмотрите возможность работы с психологом',
                type: 'important'
            });
        }
        
        if (analysis.topics.includes('Работа / Карьера')) {
            recommendations.push({
                title: 'Рабочая тематика',
                description: 'Возможно, стоит пересмотреть баланс работы и отдыха',
                type: 'info'
            });
        }
        
        if (analysis.topics.includes('Отношения')) {
            recommendations.push({
                title: 'Тема отношений',
                description: 'Коммуникация и понимание потребностей партнёра важны',
                type: 'info'
            });
        }
        
        return recommendations;
    }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuroraAnalyzer;
} else {
    // Для использования в браузере
    window.AuroraAnalyzer = AuroraAnalyzer;
}

// Дополнительные утилиты
const AuroraUtils = {
    // Форматирование даты
    formatDate: function(date) {
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Генерация уникального ID
    generateId: function() {
        return 'aurora_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Проверка поддержки Web Crypto API
    checkCryptoSupport: function() {
        return typeof crypto !== 'undefined' && 
               typeof crypto.subtle !== 'undefined' &&
               typeof crypto.getRandomValues !== 'undefined';
    },
    
    // Логирование с меткой времени
    log: function(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = `[Aurora ${timestamp}]`;
        
        switch(type) {
            case 'error':
                console.error(`${prefix} ❌ ${message}`);
                break;
            case 'warning':
                console.warn(`${prefix} ⚠️ ${message}`);
                break;
            case 'success':
                console.log(`${prefix} ✅ ${message}`);
                break;
            default:
                console.log(`${prefix} ℹ️ ${message}`);
        }
    },
    
    // Безопасное сохранение в localStorage
    safeStorage: {
        set: function(key, value) {
            try {
                localStorage.setItem(`aurora_${key}`, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Ошибка сохранения в localStorage:', error);
                return false;
            }
        },
        
        get: function(key) {
            try {
                const item = localStorage.getItem(`aurora_${key}`);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Ошибка чтения из localStorage:', error);
                return null;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(`aurora_${key}`);
                return true;
            } catch (error) {
                console.error('Ошибка удаления из localStorage:', error);
                return false;
            }
        }
    }
};

// Экспорт утилит
if (typeof module !== 'undefined' && module.exports) {
    module.exports.AuroraUtils = AuroraUtils;
} else {
    window.AuroraUtils = AuroraUtils;
}

console.log('✅ Aurora Mirror.js успешно загружен и готов к работе!');
