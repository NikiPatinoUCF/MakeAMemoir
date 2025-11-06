// Memory Manager - Handles upload, storage, and management of memory data

const MemoryManager = {
    memories: [],
    maxMemories: 10,

    // Initialize from sessionStorage
    init() {
        const stored = sessionStorage.getItem('memoirMemories');
        if (stored) {
            this.memories = JSON.parse(stored);
        }
    },

    // Add a new memory
    addMemory(imageData) {
        if (this.memories.length >= this.maxMemories) {
            alert(`Maximum of ${this.maxMemories} memories allowed`);
            return null;
        }

        const memory = {
            id: Date.now() + Math.random(),
            image: imageData,
            title: '',
            description: '',
            date: '',
            emotionalNotes: '',
            emotionCategory: 'neutral'
        };

        this.memories.push(memory);
        this.save();
        return memory;
    },

    // Update a memory
    updateMemory(id, field, value) {
        const memory = this.memories.find(m => m.id === id);
        if (memory) {
            memory[field] = value;

            // Update emotion category when emotional notes change
            if (field === 'emotionalNotes') {
                memory.emotionCategory = this.detectEmotion(value);
            }

            this.save();
        }
    },

    // Remove a memory
    removeMemory(id) {
        this.memories = this.memories.filter(m => m.id !== id);
        this.save();
    },

    // Get all memories
    getMemories() {
        return this.memories;
    },

    // Get memory count
    getCount() {
        return this.memories.length;
    },

    // Clear all memories
    clearAll() {
        this.memories = [];
        this.save();
    },

    // Save to sessionStorage
    save() {
        sessionStorage.setItem('memoirMemories', JSON.stringify(this.memories));
    },

    // Detect emotion category from emotional notes
    detectEmotion(notes) {
        if (!notes) return 'neutral';

        const text = notes.toLowerCase();

        // Joy/Happiness keywords
        if (/\b(joy|happy|happiness|delight|excited|celebration|cheerful|bright|wonderful)\b/.test(text)) {
            return 'joy';
        }

        // Sadness keywords
        if (/\b(sad|sadness|sorrow|grief|melancholy|lonely|loss|tears|crying|depressed)\b/.test(text)) {
            return 'sadness';
        }

        // Anger keywords
        if (/\b(anger|angry|rage|fury|frustrated|irritated|mad|resentment|bitter)\b/.test(text)) {
            return 'anger';
        }

        // Peace/Calm keywords
        if (/\b(peace|peaceful|calm|serene|tranquil|quiet|relaxed|content|gentle)\b/.test(text)) {
            return 'peace';
        }

        // Mystery/Wonder keywords
        if (/\b(wonder|mysterious|awe|curious|strange|magical|enchanted|mystical|surreal)\b/.test(text)) {
            return 'mystery';
        }

        return 'neutral';
    },

    // Get emotion color based on category
    getEmotionColor(category) {
        const colors = {
            joy: '#f4d03f',        // Citrine
            sadness: '#2e86de',    // Sapphire
            anger: '#ee5a6f',      // Ruby
            peace: '#0be881',      // Jade
            mystery: '#a55eea',    // Amethyst
            neutral: '#f1f2f6'     // Pearl
        };
        return colors[category] || colors.neutral;
    },

    // Get emotion intensity (0-1) based on text length and keywords
    getEmotionIntensity(notes) {
        if (!notes) return 0.3;

        const text = notes.toLowerCase();
        let intensity = 0.5;

        // Check for intensity modifiers
        if (/\b(very|extremely|incredibly|utterly|completely|deeply|profoundly)\b/.test(text)) {
            intensity += 0.3;
        }
        if (/\b(slightly|somewhat|a bit|mildly|fairly)\b/.test(text)) {
            intensity -= 0.2;
        }

        // Length of emotional notes also affects intensity
        if (text.length > 100) intensity += 0.1;
        if (text.length > 200) intensity += 0.1;

        return Math.max(0.2, Math.min(1, intensity));
    },

    // Validate that all required fields are filled
    validateMemories() {
        return this.memories.every(m =>
            m.title.trim() !== '' &&
            m.description.trim() !== '' &&
            m.date.trim() !== ''
        );
    },

    // Check if ready to continue (at least 1 memory with required fields)
    canContinue() {
        return this.memories.length > 0 && this.validateMemories();
    }
};

// Initialize on load
MemoryManager.init();
