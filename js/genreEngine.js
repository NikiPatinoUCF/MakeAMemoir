// Genre Engine - Handles genre-specific narrative transformations and prompts

const GenreEngine = {
    genres: {
        'literary-fiction': {
            name: 'Literary Fiction',
            styleWords: ['introspective', 'lyrical', 'profound', 'contemplative', 'nuanced', 'reflective'],
            narrativeStyle: 'deeply introspective and lyrical',
            colorTheme: ['#a55eea', '#8854d0', '#2e86de'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'In that moment, there was a quiet revelation:',
                    'The memory unfolds with delicate precision:',
                    'There exists a particular truth in this:',
                    'Looking back, the significance becomes clear:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} It lingers, profound and unresolved, a testament to the complexity of human experience.`;
            },
            prompts: [
                'What universal truth does this memory reveal about the human condition?',
                'How has the passage of time changed your understanding of this moment?',
                'What remains unsaid beneath the surface of this experience?',
                'In what ways did this moment challenge or confirm your worldview?',
                'What symbolic meaning can you draw from the smallest details?'
            ]
        },
        'thriller': {
            name: 'Thriller',
            styleWords: ['tense', 'urgent', 'gripping', 'suspenseful', 'relentless', 'fraught'],
            narrativeStyle: 'fast-paced and tension-filled',
            colorTheme: ['#ee5a6f', '#c23616', '#2f3542'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'Time was running out.',
                    'Every second counted.',
                    'There was no turning back:',
                    'The stakes had never been higher:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} The consequences would be irreversible.`;
            },
            prompts: [
                'What was at stake in this moment? What could you have lost?',
                'What created the sense of urgency or danger?',
                'Who or what was working against you?',
                'What decision did you make under pressure, and what were you risking?',
                'How did this moment change the trajectory of what came next?'
            ]
        },
        'coming-of-age': {
            name: 'Coming-of-Age',
            styleWords: ['transformative', 'innocent', 'awakening', 'formative', 'pivotal', 'bittersweet'],
            narrativeStyle: 'reflective and transformative',
            colorTheme: ['#f4d03f', '#ff9f1c', '#54a0ff'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'I didn\'t know it then, but everything was about to change:',
                    'In that moment of innocence, a seed was planted:',
                    'Looking back, I can see how young I was:',
                    'That was the moment I began to understand:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} I would never see the world the same way again.`;
            },
            prompts: [
                'Who were you before this moment, and who did you become after?',
                'What innocence or naivety did you lose in this experience?',
                'What lesson did this moment teach you about adulthood?',
                'How did this experience shape your values or beliefs going forward?',
                'What did you have to leave behind to grow?'
            ]
        },
        'noir': {
            name: 'Noir',
            styleWords: ['shadowy', 'cynical', 'gritty', 'morally ambiguous', 'haunting', 'fatalistic'],
            narrativeStyle: 'dark and morally complex',
            colorTheme: ['#2f3542', '#57606f', '#8c92a0'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'The city never sleeps, and neither do its secrets:',
                    'In the shadows, nothing is what it seems:',
                    'There are no heroes here, only survivors:',
                    'The truth always comes with a price:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} Some questions are better left unanswered.`;
            },
            prompts: [
                'What moral lines were blurred or crossed in this memory?',
                'What were you running from, or what were you chasing?',
                'Who could you trust, and who betrayed that trust?',
                'What darkness did this experience reveal in yourself or others?',
                'What price did you pay for this moment?'
            ]
        },
        'romance': {
            name: 'Romance',
            styleWords: ['tender', 'passionate', 'intimate', 'yearning', 'heartfelt', 'vulnerable'],
            narrativeStyle: 'emotionally intimate and tender',
            colorTheme: ['#ee5a6f', '#ff9f1c', '#a55eea'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'In that heartbeat, the world narrowed to just us:',
                    'Love has a way of making everything else disappear:',
                    'There are moments that define a relationship:',
                    'The heart remembers what the mind forgets:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} It was a moment suspended in time, pure and undeniable.`;
            },
            prompts: [
                'What did this moment reveal about love or connection?',
                'How did this experience make you vulnerable?',
                'What unspoken feelings existed beneath the surface?',
                'How did this relationship change or define you?',
                'What did you learn about intimacy and trust?'
            ]
        },
        'hero-journey': {
            name: 'Hero\'s Journey',
            styleWords: ['epic', 'transformative', 'challenging', 'triumphant', 'mythic', 'courageous'],
            narrativeStyle: 'epic and transformational',
            colorTheme: ['#0be881', '#05c46b', '#f4d03f'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'The call to adventure cannot be ignored:',
                    'Every hero must face their greatest trial:',
                    'In crossing this threshold, there was no return:',
                    'This was the moment of transformation:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} Through fire and trial, a new self emerged.`;
            },
            prompts: [
                'What was the call to adventure that led to this moment?',
                'What trials or challenges did you have to overcome?',
                'Who were your allies, and who were your adversaries?',
                'What inner dragon did you have to slay?',
                'How did you emerge transformed from this experience?'
            ]
        },
        'magical-realism': {
            name: 'Magical Realism',
            styleWords: ['dreamlike', 'surreal', 'enchanted', 'mystical', 'wondrous', 'liminal'],
            narrativeStyle: 'blending reality with the extraordinary',
            colorTheme: ['#a55eea', '#8854d0', '#0be881'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'In the ordinary, there bloomed something extraordinary:',
                    'Reality bent at the edges, revealing:',
                    'Magic exists in the mundane, if you know where to look:',
                    'The world whispered its secrets:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} It existed between worlds, neither fully real nor wholly imagined.`;
            },
            prompts: [
                'What magical or surreal elements could transform this memory?',
                'What symbolic or mythical significance does this moment hold?',
                'How does this memory exist between the real and the impossible?',
                'What ancestral or spiritual connections echo through this experience?',
                'What would happen if the laws of reality bent around this moment?'
            ]
        },
        'horror': {
            name: 'Horror',
            styleWords: ['unsettling', 'eerie', 'dreadful', 'haunting', 'sinister', 'uncanny'],
            narrativeStyle: 'atmospheric and psychologically intense',
            colorTheme: ['#2f3542', '#c23616', '#8854d0'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'Something was wrong, though I couldn\'t name it:',
                    'The air itself seemed to hold its breath:',
                    'Dread crept in at the edges:',
                    'In hindsight, I should have known:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} The fear lingers, even now, in the telling.`;
            },
            prompts: [
                'What created a sense of dread or unease in this memory?',
                'What fears—rational or irrational—did this moment evoke?',
                'What was lurking beneath the surface that you couldn\'t see?',
                'How did this experience haunt you afterward?',
                'What part of yourself did you confront that terrified you?'
            ]
        },
        'sci-fi-dystopia': {
            name: 'Sci-Fi Dystopia',
            styleWords: ['oppressive', 'dehumanizing', 'controlled', 'bleak', 'resistant', 'systematic'],
            narrativeStyle: 'critical and technologically aware',
            colorTheme: ['#57606f', '#00d2ff', '#2f3542'],
            transformDescription(desc, emotion) {
                const prefix = [
                    'Under the surveillance of systems beyond our control:',
                    'In a world that had forgotten freedom:',
                    'Technology promised progress, but delivered:',
                    'The regime controlled everything, except:'
                ];
                return `${prefix[Math.floor(Math.random() * prefix.length)]} ${desc} In the sterile future, humanity persisted in fragments.`;
            },
            prompts: [
                'What systems or structures controlled or oppressed in this moment?',
                'What freedom or agency did you lose (or fight to keep)?',
                'How did technology shape or constrain this experience?',
                'What aspects of humanity survived despite dehumanizing forces?',
                'What would you resist, and what would you sacrifice to resist?'
            ]
        }
    },

    // Get genre data
    getGenre(genreKey) {
        return this.genres[genreKey];
    },

    // Generate narrative snippet based on genre
    generateNarrative(genreKey, memories) {
        const genre = this.genres[genreKey];
        if (!genre || memories.length === 0) return '';

        // Use the first or most emotionally intense memory
        const memory = this.selectFocalMemory(memories);

        return genre.transformDescription(
            memory.description,
            memory.emotionCategory
        );
    },

    // Select the focal memory (most intense emotion)
    selectFocalMemory(memories) {
        let focalMemory = memories[0];
        let maxIntensity = 0;

        memories.forEach(memory => {
            const intensity = MemoryManager.getEmotionIntensity(memory.emotionalNotes);
            if (intensity > maxIntensity) {
                maxIntensity = intensity;
                focalMemory = memory;
            }
        });

        return focalMemory;
    },

    // Get writing prompts for genre
    getPrompts(genreKey) {
        const genre = this.genres[genreKey];
        return genre ? genre.prompts : [];
    },

    // Get genre color theme
    getColorTheme(genreKey) {
        const genre = this.genres[genreKey];
        return genre ? genre.colorTheme : ['#a55eea', '#2e86de', '#0be881'];
    },

    // Reorder memories based on timeline setting
    reorderMemories(memories, timeline) {
        const sorted = [...memories];

        if (timeline === 'chronological') {
            // Sort by date (simple string comparison should work for most date formats)
            sorted.sort((a, b) => {
                const dateA = new Date(a.date || '1900-01-01');
                const dateB = new Date(b.date || '1900-01-01');
                return dateA - dateB;
            });
        } else if (timeline === 'in-media-res') {
            // Start with most emotionally intense, then chronological
            sorted.sort((a, b) => {
                const intensityA = MemoryManager.getEmotionIntensity(a.emotionalNotes);
                const intensityB = MemoryManager.getEmotionIntensity(b.emotionalNotes);
                return intensityB - intensityA;
            });

            // Move the most intense to the front, then arrange rest chronologically
            if (sorted.length > 1) {
                const mostIntense = sorted[0];
                const rest = sorted.slice(1).sort((a, b) => {
                    const dateA = new Date(a.date || '1900-01-01');
                    const dateB = new Date(b.date || '1900-01-01');
                    return dateA - dateB;
                });
                return [mostIntense, ...rest];
            }
        }

        return sorted;
    }
};
