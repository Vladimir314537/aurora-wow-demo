// mirror.js - основной файл логики

// Константы и данные
const THINKING_PROFILES = {
    analyst: {
        name: "📊 Аналитик",
        description: "Вы тщательно анализируете информацию перед принятием решений. Предпочитаете данные интуиции."
    },
    intuitive: {
        name: "🔮 Интуит", 
        description: "Вы доверяете внутреннему чутью и быстро принимаете решения на основе опыта."
    },
    practical: {
        name: "⚙️ Практик",
        description: "Вы фокусируетесь на действиях и результатах. Предпочитаете конкретные шаги теориям."
    },
    creative: {
        name: "🎨 Креативщик",
        description: "Вы генерируете новые идеи и находите нестандартные решения проблем."
    }
};

const INSIGHTS = {
    strengths: [
        "Отлично структурируете сложные задачи",
        "Быстро находите решения в нестандартных ситуациях",
        "Умеете разбивать большие цели на конкретные шаги",
        "Сохраняете фокус на важных задачах",
        "Эффективно планируете время и ресурсы"
    ],
    improvements: [
        "Можно чаще доверять интуиции в быстрых решениях",
        "Попробуйте больше экспериментировать с новыми подходами",
        "Уделяйте больше времени рефлексии принятых решений",
        "Расширяйте кругозор для генерации новых идей",
        "Развивайте навыки делегирования задач"
    ],
    recommendations: [
        "Выделите 30 минут утром на планирование дня",
        "Ведите дневник принятых решений и их результатов",
        "Проводите еженедельный обзор достижений и уроков",
        "Экспериментируйте с новыми методами организации",
        "Находите время для 'мысленного отдыха' без гаджетов"
    ]
};

// Основной класс Digital Twin
class DigitalTwin {
    constructor() {
        this.currentStep = 1;
        this.userNotes = [];
        this.analysisResult = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showStep(1);
    }
    
    setupEventListeners() {
        // Кнопка "Далее" на шаге 1
        document.getElementById('nextStep1').addEventListener('click', () => {
            this.collectNotes();
            this.startAnalysis();
        });
        
        // Кнопка "Далее" на шаге 2
        document.getElementById('nextStep2').addEventListener('click', () => {
            this.showResults();
        });
        
        // Кнопка "Начать заново"
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.resetDemo();
        });
        
        // Кнопка "Скачать отчет"
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportReport();
        });
        
        // Кнопка "Вернуться в Aurora"
        document.getElementById('backToAurora').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Быстрые заметки
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const note = e.target.closest('.quick-btn').dataset.note;
                this.fillNextEmptyNote(note);
            });
        });
    }
    
    collectNotes() {
        this.userNotes = [];
        
        for (let i = 1; i <= 3; i++) {
            const note = document.getElementById(`note${i}`).value.trim();
            if (note) {
                this.userNotes.push(note);
            }
        }
        
        // Если нет заметок, используем демо-данные
        if (this.userNotes.length === 0) {
            this.userNotes = [
                "Нужно принять решение по новому проекту",
                "Планирую задачи на следующую неделю",
                "Идея для улучшения рабочего процесса"
            ];
            
            // Заполняем поля демо-данными
            this.userNotes.forEach((note, index) => {
                document.getElementById(`note${index + 1}`).value = note;
            });
        }
    }
    
    fillNextEmptyNote(text) {
        for (let i = 1; i <= 3; i++) {
            const input = document.getElementById(`note${i}`);
            if (!input.value.trim()) {
                input.value = text;
                break;
            }
        }
    }
    
    startAnalysis() {
        this.showStep(2);
        
        // Запускаем анимацию прогресса
        this.animateProgress();
        
        // Анализируем заметки
        setTimeout(() => {
            this.analyzeNotes();
            document.getElementById('nextStep2').style.display = 'block';
        }, 4000);
    }
    
    animateProgress() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        // Анимация первой полосы
        setTimeout(() => {
            progressBars[0].style.width = '100%';
        }, 500);
        
        // Анимация второй полосы
        setTimeout(() => {
            progressBars[1].style.width = '100%';
        }, 1500);
        
        // Анимация третьей полосы
        setTimeout(() => {
            progressBars[2].style.width = '100%';
        }, 2500);
    }
    
    analyzeNotes() {
        // Простой анализ на основе ключевых слов
        let score = {
            analytical: 0,
            intuitive: 0,
            practical: 0,
            creative: 0
        };
        
        const keywords = {
            analytical: ['анализ', 'решение', 'отчет', 'данные', 'исследование'],
            intuitive: ['чувствую', 'кажется', 'интуиция', 'предчувствие', 'ощущение'],
            practical: ['задача', 'план', 'делать', 'реализовать', 'воплотить'],
            creative: ['идея', 'новый', 'креативный', 'придумать', 'создать']
        };
        
        // Анализируем каждую заметку
        this.userNotes.forEach(note => {
            const noteLower = note.toLowerCase();
            
            for (const [type, words] of Object.entries(keywords)) {
                words.forEach(word => {
                    if (noteLower.includes(word)) {
                        score[type]++;
                    }
                });
            }
        });
        
        // Определяем доминирующий профиль
        let maxScore = 0;
        let profile = 'analyst';
        
        for (const [type, points] of Object.entries(score)) {
            if (points > maxScore) {
                maxScore = points;
                profile = type;
            }
        }
        
        // Если нет явного лидера, используем смешанный профиль
        if (maxScore === 0) {
            const profiles = Object.keys(THINKING_PROFILES);
            profile = profiles[Math.floor(Math.random() * profiles.length)];
        }
        
        // Генерируем инсайты
        this.analysisResult = {
            profile: THINKING_PROFILES[profile],
            strength: this.getRandomItem(INSIGHTS.strengths),
            improvement: this.getRandomItem(INSIGHTS.improvements),
            recommendation: this.getRandomItem(INSIGHTS.recommendations),
            actionPlan: this.generateActionPlan(profile)
        };
    }
    
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    generateActionPlan(profile) {
        const plans = {
            analyst: [
                "Ведите журнал принятых решений и их результатов",
                "Проводите 15-минутный анализ дня каждый вечер",
                "Экспериментируйте с быстрыми решениями без полного анализа"
            ],
            intuitive: [
                "Записывайте интуитивные догадки и проверяйте их позже",
                "Развивайте системный подход к сложным задачам",
                "Найдите баланс между интуицией и анализом"
            ],
            practical: [
                "Выделяйте время для стратегического планирования",
                "Экспериментируйте с новыми подходами к решению задач",
                "Рефлексируйте над процессами, а не только результатами"
            ],
            creative: [
                "Структурируйте поток идей с помощью ментальных карт",
                "Разработайте систему реализации лучших идей",
                "Находите время для систематизации творческих наработок"
            ]
        };
        
        return plans[profile] || [
            "Ведите дневник мыслей и идей",
            "Проводите еженедельный обзор достижений",
            "Экспериментируйте с новыми подходами к задачам"
        ];
    }
    
    showResults() {
        this.showStep(3);
        
        // Обновляем UI с результатами
        if (this.analysisResult) {
            document.getElementById('thinkingProfile').textContent = this.analysisResult.profile.name;
            document.getElementById('profileDesc').textContent = this.analysisResult.profile.description;
            document.getElementById('strengthText').textContent = this.analysisResult.strength;
            document.getElementById('improvementText').textContent = this.analysisResult.improvement;
            document.getElementById('recommendationText').textContent = this.analysisResult.recommendation;
            
            // Обновляем план действий
            const planList = document.getElementById('actionPlan');
            planList.innerHTML = '';
            this.analysisResult.actionPlan.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                planList.appendChild(li);
            });
        }
    }
    
    showStep(stepNumber) {
        // Скрываем все шаги
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Показываем нужный шаг
        document.getElementById(`step${stepNumber}`).classList.add('active');
        this.currentStep = stepNumber;
    }
    
    resetDemo() {
        // Очищаем поля ввода
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`note${i}`).value = '';
        }
        
        // Сбрасываем прогресс
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = '0%';
        });
        
        // Скрываем кнопку на шаге 2
        document.getElementById('nextStep2').style.display = 'none';
        
        // Возвращаемся к первому шагу
        this.showStep(1);
    }
    
    exportReport() {
        const report = `
            ОТЧЕТ: ЗЕРКАЛО МЫШЛЕНИЯ AURORA
            ===============================
            
            Ваш профиль мышления: ${this.analysisResult?.profile?.name || 'Не определен'}
            
            Описание профиля:
            ${this.analysisResult?.profile?.description || ''}
            
            Сильная сторона:
            ${this.analysisResult?.strength || ''}
            
            Область для развития:
            ${this.analysisResult?.improvement || ''}
            
            Рекомендация:
            ${this.analysisResult?.recommendation || ''}
            
            План действий на неделю:
            ${this.analysisResult?.actionPlan?.map(item => `• ${item}`).join('\n') || ''}
            
            -------------------------------
            Сгенерировано Aurora Digital Twin
            ${new Date().toLocaleDateString('ru-RU')}
        `;
        
        // Создаем и скачиваем файл
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurora-mirror-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Отчет успешно скачан!');
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.digitalTwin = new DigitalTwin();
    console.log('🚀 Aurora Digital Twin запущен!');
});
