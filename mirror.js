 // ===== AURORA MIRROR.JS v2024-01-20-v3 =====
// Основной JavaScript файл для анализа

console.log('🧠 Aurora Mirror.js v2024-01-20-v3 loaded');

// Экспортируемые функции для анализа текста
const AuroraAnalyzer = {
    version: '2024-01-20-v3',
    
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
        
        const negative
