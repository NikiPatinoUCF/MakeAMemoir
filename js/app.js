// Main Application Controller

const App = {
    currentScreen: 'upload',
    selectedGenre: null,
    selectedFormat: null,
    selectedTimeline: 'chronological',

    // Initialize the application
    init() {
        this.loadState();
        this.setupEventListeners();
        this.renderMemories();
        this.updateContinueButton();
    },

    // Setup all event listeners
    setupEventListeners() {
        // Screen 1: Upload
        document.getElementById('upload-btn').addEventListener('click', () => {
            document.getElementById('image-upload').click();
        });

        document.getElementById('image-upload').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });

        document.getElementById('start-over-btn').addEventListener('click', () => {
            this.startOver();
        });

        document.getElementById('continue-to-genre-btn').addEventListener('click', () => {
            this.navigateTo('genre');
        });

        // Screen 2: Genre Selection
        document.querySelectorAll('.genre-card').forEach(card => {
            card.addEventListener('click', () => {
                const genre = card.dataset.genre;
                this.selectGenre(genre);
            });
        });

        document.getElementById('back-to-upload-btn').addEventListener('click', () => {
            this.navigateTo('upload');
        });

        // Screen 3: Format Selection
        document.querySelectorAll('.format-card').forEach(card => {
            card.addEventListener('click', () => {
                const format = card.dataset.format;
                this.selectFormat(format);
            });
        });

        document.querySelectorAll('input[name="timeline"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedTimeline = e.target.value;
                this.saveState();
            });
        });

        document.getElementById('back-to-genre-btn').addEventListener('click', () => {
            this.navigateTo('genre');
        });

        // Screen 4: Preview
        document.getElementById('download-preview-btn').addEventListener('click', () => {
            PreviewGenerator.download();
        });

        document.getElementById('edit-memories-btn').addEventListener('click', () => {
            this.navigateTo('upload');
        });

        document.getElementById('try-different-genre-btn').addEventListener('click', () => {
            this.navigateTo('genre');
        });

        document.getElementById('try-different-format-btn').addEventListener('click', () => {
            this.navigateTo('format');
        });

        document.getElementById('new-project-btn').addEventListener('click', () => {
            this.newProject();
        });
    },

    // Handle image upload
    handleImageUpload(files) {
        if (!files || files.length === 0) return;

        const filesArray = Array.from(files);
        const currentCount = MemoryManager.getCount();
        const availableSlots = MemoryManager.maxMemories - currentCount;

        // Check if we have room for any files
        if (availableSlots <= 0) {
            alert(`Maximum of ${MemoryManager.maxMemories} memories already reached`);
            document.getElementById('image-upload').value = '';
            return;
        }

        // Determine how many files we can process
        const filesToProcess = filesArray.slice(0, availableSlots);
        const rejectedCount = filesArray.length - filesToProcess.length;

        // Show warning if some files will be rejected
        if (rejectedCount > 0) {
            alert(`Only ${availableSlots} slot(s) available. ${rejectedCount} file(s) will not be uploaded.`);
        }

        // Process the files
        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const memory = MemoryManager.addMemory(e.target.result);
                if (memory) {
                    this.renderMemories();
                    this.updateContinueButton();
                }
            };
            reader.readAsDataURL(file);
        });

        // Clear input
        document.getElementById('image-upload').value = '';
    },

    // Render memories list
    renderMemories() {
        const container = document.getElementById('memories-list');
        const memories = MemoryManager.getMemories();

        container.innerHTML = '';

        memories.forEach(memory => {
            const card = this.createMemoryCard(memory);
            container.appendChild(card);
        });
    },

    // Create a memory card element
    createMemoryCard(memory) {
        const card = document.createElement('div');
        card.className = 'memory-card';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-memory-btn';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
            MemoryManager.removeMemory(memory.id);
            this.renderMemories();
            this.updateContinueButton();
        });

        const img = document.createElement('img');
        img.className = 'memory-image';
        img.src = memory.image;
        img.alt = memory.title || 'Memory';

        const form = document.createElement('div');
        form.className = 'memory-form';

        const titleInput = this.createInput('text', 'Title', memory.title, (value) => {
            MemoryManager.updateMemory(memory.id, 'title', value);
            this.updateContinueButton();
        });

        const descInput = this.createTextarea('Description', memory.description, (value) => {
            MemoryManager.updateMemory(memory.id, 'description', value);
            this.updateContinueButton();
        });

        const dateInput = this.createInput('text', 'Date/Timeframe', memory.date, (value) => {
            MemoryManager.updateMemory(memory.id, 'date', value);
            this.updateContinueButton();
        });

        const emotionInput = this.createTextarea('Emotional Notes', memory.emotionalNotes, (value) => {
            MemoryManager.updateMemory(memory.id, 'emotionalNotes', value);
        });

        form.appendChild(titleInput);
        form.appendChild(descInput);
        form.appendChild(dateInput);
        form.appendChild(emotionInput);

        card.appendChild(removeBtn);
        card.appendChild(img);
        card.appendChild(form);

        return card;
    },

    // Helper: Create input element
    createInput(type, placeholder, value, onChange) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value || '';
        input.addEventListener('input', (e) => onChange(e.target.value));
        return input;
    },

    // Helper: Create textarea element
    createTextarea(placeholder, value, onChange) {
        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder;
        textarea.value = value || '';
        textarea.addEventListener('input', (e) => onChange(e.target.value));
        return textarea;
    },

    // Update continue button state
    updateContinueButton() {
        const btn = document.getElementById('continue-to-genre-btn');
        btn.disabled = !MemoryManager.canContinue();
    },

    // Select genre
    selectGenre(genre) {
        this.selectedGenre = genre;
        this.saveState();

        // Update UI
        document.querySelectorAll('.genre-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.genre === genre);
        });

        // Auto-navigate to format selection
        setTimeout(() => {
            this.navigateTo('format');
        }, 300);
    },

    // Select format
    selectFormat(format) {
        this.selectedFormat = format;
        this.saveState();

        // Update UI
        document.querySelectorAll('.format-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.format === format);
        });

        // Auto-navigate to preview
        setTimeout(() => {
            this.generatePreview();
        }, 300);
    },

    // Generate preview
    generatePreview() {
        if (!this.selectedGenre || !this.selectedFormat) {
            alert('Please select both genre and format');
            return;
        }

        this.navigateTo('preview');

        // Update subtitle
        const genre = GenreEngine.getGenre(this.selectedGenre);
        const format = FormatRenderer.getFormat(this.selectedFormat);
        document.getElementById('preview-subtitle').textContent =
            `${genre.name} × ${format.name} × ${this.selectedTimeline === 'chronological' ? 'Chronological' : 'In Media Res'}`;

        // Generate narrative snippet
        const narrative = GenreEngine.generateNarrative(this.selectedGenre, MemoryManager.getMemories());
        document.getElementById('narrative-snippet').textContent = narrative;

        // Generate writing prompts
        const prompts = GenreEngine.getPrompts(this.selectedGenre);
        const promptsList = document.getElementById('writing-prompts');
        promptsList.innerHTML = '';
        prompts.forEach(prompt => {
            const li = document.createElement('li');
            li.textContent = prompt;
            promptsList.appendChild(li);
        });

        // Generate visual preview with P5.js
        PreviewGenerator.init(this.selectedGenre, this.selectedFormat, this.selectedTimeline);
    },

    // Navigate to screen
    navigateTo(screen) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(`screen-${screen}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screen;
            this.saveState();

            // Scroll to top
            window.scrollTo(0, 0);
        }
    },

    // Start over (clear memories, keep genre/format)
    startOver() {
        if (confirm('Are you sure you want to start over? This will delete all your uploaded memories.')) {
            MemoryManager.clearAll();
            this.renderMemories();
            this.updateContinueButton();
        }
    },

    // New project (clear everything)
    newProject() {
        if (confirm('Are you sure you want to start a new project? This will delete all your data.')) {
            MemoryManager.clearAll();
            this.selectedGenre = null;
            this.selectedFormat = null;
            this.selectedTimeline = 'chronological';
            this.saveState();
            this.renderMemories();
            this.updateContinueButton();
            this.navigateTo('upload');

            // Clear selections
            document.querySelectorAll('.genre-card, .format-card').forEach(card => {
                card.classList.remove('selected');
            });

            // Reset timeline
            document.querySelector('input[name="timeline"][value="chronological"]').checked = true;
        }
    },

    // Save state to sessionStorage
    saveState() {
        const state = {
            currentScreen: this.currentScreen,
            selectedGenre: this.selectedGenre,
            selectedFormat: this.selectedFormat,
            selectedTimeline: this.selectedTimeline
        };
        sessionStorage.setItem('memoirAppState', JSON.stringify(state));
    },

    // Load state from sessionStorage
    loadState() {
        const stored = sessionStorage.getItem('memoirAppState');
        if (stored) {
            const state = JSON.parse(stored);
            this.currentScreen = state.currentScreen || 'upload';
            this.selectedGenre = state.selectedGenre;
            this.selectedFormat = state.selectedFormat;
            this.selectedTimeline = state.selectedTimeline || 'chronological';

            // Restore UI state
            if (this.selectedGenre) {
                document.querySelectorAll('.genre-card').forEach(card => {
                    card.classList.toggle('selected', card.dataset.genre === this.selectedGenre);
                });
            }

            if (this.selectedFormat) {
                document.querySelectorAll('.format-card').forEach(card => {
                    card.classList.toggle('selected', card.dataset.format === this.selectedFormat);
                });
            }

            // Restore timeline
            const timelineRadio = document.querySelector(`input[name="timeline"][value="${this.selectedTimeline}"]`);
            if (timelineRadio) {
                timelineRadio.checked = true;
            }

            // Navigate to saved screen
            this.navigateTo(this.currentScreen);
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
