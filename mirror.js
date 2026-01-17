// mirror.js - Исправленная версия с интеллектуальным выбором сфер

class FutureMirror {
    constructor() {
        this.lifeSpheres = ['Работа', 'Отношения', 'Здоровье', 'Финансы', 'Личное развитие'];
        this.sphereEmphasis = {
            'Работа': ['работа', 'проект', 'карьера', 'начальник', 'коллеги', 'офис', 'задача', 'дедлайн', 'зарплата', 'компания'],
            'Отношения': ['отношения', 'партнер', 'друг', 'семья', 'любовь', 'конфликт', 'ссора', 'общение', 'муж', 'жена'],
            'Здоровье': ['здоровье', 'боль', 'усталость', 'сон', 'энергия', 'спорт', 'питание', 'самочувствие', 'болезнь'],
            'Финансы': ['деньги', 'финансы', 'заработок', 'траты', 'инвестиции', 'долг', 'бюджет', 'экономия'],
            'Личное развитие': ['учёба', 'развитие', 'обучение', 'навыки', 'знания', 'чтение', 'курс', 'саморазвитие']
        };
        this.init();
    }

    init() {
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyze());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearInput());
        document.getElementById('startExperimentBtn').addEventListener('click', () => this.startExperiment());
        
        console.log('🔮 Зеркало Будущего инициализировано');
    }

    async analyze() {
        const text = document.getElementById('userInput').value.trim();
        if (!text) {
            this.showNotification('Введите текст для анализа', 'warning');
            return;
        }

        const btn = document.getElementById('analyzeBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Анализирую...';
        btn.disabled = true;

        try {
            await this.simulateProcessing();
            const analysis = this.performAnalysis(text);
            this.displayResults(analysis);
            this.showNotification('Анализ завершён локально', 'success');
        } catch (error) {
            this.showNotification('Ошибка анализа', 'error');
            console.error('Analysis error:', error);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    performAnalysis(text) {
        const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        
        const emotion = this.detectEmotion(text);
        const topics = this.detectTopics(text);
        const patterns = this.extractPatterns(text);
        const textAnalysis = this.analyzeSpecificPatterns(text);
        const sphereFocus = this.analyzeSphereFocus(text);
        
        const stats = {
            wordCount: words.length,
            sentenceCount: (text.match(/[.!?]+/g) || []).length,
            readingTime: Math.ceil(words.length / 200),
            complexity: this.calculateComplexity(text),
            sphereFocus: sphereFocus
        };
        
        const scenarios = this.generateScenarios(emotion, patterns, topics, textAnalysis, sphereFocus);
        const experiment = this.generateExperiment(emotion, patterns, topics, textAnalysis, sphereFocus);
        
        return {
            text,
            emotion,
            topics,
            patterns,
            stats,
            scenarios,
            experiment,
            textAnalysis,
            sphereFocus,
            timestamp: new Date().toISOString()
        };
    }

    analyzeSphereFocus(text) {
        const textLower = text.toLowerCase();
        const scores = {};
        let totalScore = 0;
        
        Object.entries(this.sphereEmphasis).forEach(([sphere, keywords]) => {
            let sphereScore = 0;
            keywords.forEach(keyword => {
                if (textLower.includes(keyword)) {
                    sphereScore += 1;
                }
            });
            scores[sphere] = sphereScore;
            totalScore += sphereScore;
        });
        
        // Если вообще не найдено ключевых слов, распределяем равномерно
        if (totalScore === 0) {
            Object.keys(scores).forEach(sphere => {
                scores[sphere] = 1;
            });
            totalScore = Object.keys(scores).length;
        }
        
        // Нормализуем проценты
        const percentages = {};
        Object.entries(scores).forEach(([sphere, score]) => {
            percentages[sphere] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
        });
        
        return percentages;
    }

    generateScenarios(emotion, patterns, topics, textAnalysis, sphereFocus) {
        // Генерируем отдельные сценарии ТОЛЬКО для существенных сфер
        const allScenarios = {};
        
        // Определяем основные сферы (уровень влияния > 15%)
        const significantSpheres = this.lifeSpheres.filter(sphere => sphereFocus[sphere] > 15);
        
        // Если нет явных сфер, берем топ-2
        let spheresToShow = significantSpheres;
        if (spheresToShow.length === 0) {
            spheresToShow = Object.entries(sphereFocus)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2)
                .map(([sphere]) => sphere);
        }
        
        // Ограничиваем максимум 3 сферами
        spheresToShow = spheresToShow.slice(0, 3);
        
        spheresToShow.forEach(sphere => {
            const sphereWeight = sphereFocus[sphere] / 100;
            
            // Базовые вероятности для этой сферы
            let baseProbabilities = {
                continuation: 60,
                intervention: 30,
                transformation: 10
            };
            
            // Корректируем на основе эмоций
            if (emotion.type === 'негативный') {
                baseProbabilities.continuation += 15 * sphereWeight;
                baseProbabilities.intervention -= 8 * sphereWeight;
                baseProbabilities.transformation -= 7 * sphereWeight;
            } else if (emotion.type === 'позитивный') {
                baseProbabilities.continuation -= 20 * sphereWeight;
                baseProbabilities.intervention += 12 * sphereWeight;
                baseProbabilities.transformation += 8 * sphereWeight;
            }
            
            // Корректируем на основе паттернов
            const strongPatterns = patterns.filter(p => p.strength > 0.7).length;
            baseProbabilities.continuation += strongPatterns * 4 * sphereWeight;
            
            // Корректируем на основе сферы
            if (sphere === 'Здоровье') {
                baseProbabilities.continuation += 5;
                baseProbabilities.transformation -= 3;
            } else if (sphere === 'Финансы') {
                baseProbabilities.intervention += 8;
            } else if (sphere === 'Личное развитие') {
                baseProbabilities.transformation += 7;
            } else if (sphere === 'Отношения') {
                baseProbabilities.intervention += 5;
            }
            
            // Корректируем на основе проблемы
            if (textAnalysis.problemType === 'эмоциональное выгорание' && sphere === 'Работа') {
                baseProbabilities.continuation += 10;
                baseProbabilities.transformation -= 5;
            } else if (textAnalysis.problemType === 'межличностные конфликты' && sphere === 'Отношения') {
                baseProbabilities.continuation += 12;
            } else if (textAnalysis.problemType === 'хроническая усталость' && sphere === 'Здоровье') {
                baseProbabilities.continuation += 15;
                baseProbabilities.transformation -= 8;
            }
            
            // Нормализуем
            const total = Object.values(baseProbabilities).reduce((a, b) => a + b, 0);
            Object.keys(baseProbabilities).forEach(key => {
                baseProbabilities[key] = Math.round((baseProbabilities[key] / total) * 100);
            });
            
            // Создаем сценарии для этой сферы
            allScenarios[sphere] = [
                {
                    id: 'continuation',
                    title: this.getContinuationTitle(sphere, textAnalysis),
                    description: this.getContinuationDescription(sphere, textAnalysis),
                    riskLevel: this.calculateRiskLevel(sphere, emotion, patterns, 'continuation'),
                    probability: baseProbabilities.continuation,
                    icon: this.getSphereIcon(sphere)
                },
                {
                    id: 'intervention',
                    title: 'Управляемые изменения',
                    description: this.getInterventionDescription(sphere, textAnalysis),
                    riskLevel: 'medium',
                    probability: baseProbabilities.intervention,
                    icon: '📈'
                },
                {
                    id: 'transformation',
                    title: 'Качественный прорыв',
                    description: this.getTransformationDescription(sphere, textAnalysis),
                    riskLevel: 'low',
                    probability: baseProbabilities.transformation,
                    icon: '🚀'
                }
            ];
        });
        
        return allScenarios;
    }

    displayScenarios(scenarios) {
        const scenariosContainer = document.getElementById('scenariosContainer');
        
        // Если нет сценариев
        if (Object.keys(scenarios).length === 0) {
            scenariosContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #6b7280;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Введите более конкретное описание ситуации</p>
                    <p style="font-size: 0.875rem; margin-top: 0.5rem;">
                        Например: "рабочий стресс", "проблемы в отношениях", "усталость"
                    </p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        // Проходим по сферам в определенном порядке
        const displayOrder = ['Работа', 'Отношения', 'Здоровье', 'Финансы', 'Личное развитие'];
        
        displayOrder.forEach(sphere => {
            if (!scenarios[sphere]) return;
            
            const sphereColor = this.getSphereColor(sphere);
            const sphereScenarios = scenarios[sphere];
            
            html += `
                <div class="sphere-section" style="border-left-color: ${sphereColor};">
                    <div class="sphere-title">
                        ${this.getSphereIcon(sphere)} ${sphere}
                        <span style="font-size: 0.875rem; color: #6b7280; margin-left: auto;">
                            Влияние: ${Math.round(Math.max(...sphereScenarios.map(s => s.probability)))}%
                        </span>
                    </div>
                    <div class="scenarios-grid">
            `;
            
            // Отображаем сценарии для этой сферы
            sphereScenarios.forEach(scenario => {
                const riskColors = {
                    high: { border: '#dc2626', bg: '#fef2f2', text: '#dc2626' },
                    medium: { border: '#d97706', bg: '#fffbeb', text: '#d97706' },
                    low: { border: '#374151', bg: '#f8fafc', text: '#374151' }
                };
                
                const color = riskColors[scenario.riskLevel] || riskColors.medium;
                
                html += `
                    <div class="scenario-card ${scenario.riskLevel}-risk" style="border-left-color: ${color.border}; background: ${color.bg};">
                        <div class="scenario-probability" style="border-color: ${color.border}; color: ${color.text};">
                            ${scenario.probability}%
                        </div>
                        <div class="scenario-title">
                            ${scenario.icon} ${scenario.title}
                        </div>
                        <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem;">
                            ${scenario.description}
                        </p>
                        
                        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.25rem;">
                                <span style="color: #6b7280;">Уровень риска:</span>
                                <span style="color: ${color.text}; font-weight: 600;">
                                    ${scenario.riskLevel === 'high' ? 'ВЫСОКИЙ' : 
                                     scenario.riskLevel === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                                </span>
                            </div>
                            <div class="progress-indicator">
                                <div class="progress-fill-risk"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        scenariosContainer.innerHTML = html;
    }

    // Остальные методы остаются без изменений...

}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.mirror = new FutureMirror();
});
