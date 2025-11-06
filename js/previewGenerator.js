// Preview Generator - Manages P5.js canvas for preview rendering and download

const PreviewGenerator = {
    p5Instance: null,
    currentGenre: null,
    currentFormat: null,
    currentTimeline: null,

    // Initialize P5.js sketch
    init(genre, format, timeline) {
        this.currentGenre = genre;
        this.currentFormat = format;
        this.currentTimeline = timeline;

        // Remove existing canvas if any
        if (this.p5Instance) {
            this.p5Instance.remove();
            this.p5Instance = null;
        }

        // Clear container
        const container = document.getElementById('canvas-container');
        container.innerHTML = '';

        // Create new P5.js instance
        const sketch = (p5) => {
            p5.setup = () => {
                this.generatePreview(p5);
            };
        };

        this.p5Instance = new p5(sketch, 'canvas-container');
    },

    // Generate the preview
    generatePreview(p5) {
        const memories = MemoryManager.getMemories();
        const genre = GenreEngine.getGenre(this.currentGenre);
        const format = FormatRenderer.getFormat(this.currentFormat);

        if (!genre || !format || memories.length === 0) {
            this.renderError(p5);
            return;
        }

        // Reorder memories based on timeline
        const orderedMemories = GenreEngine.reorderMemories(memories, this.currentTimeline);

        // Get genre color theme
        const colorTheme = GenreEngine.getColorTheme(this.currentGenre);

        // Render the format
        try {
            format.render(p5, orderedMemories, colorTheme);
        } catch (error) {
            console.error('Error rendering preview:', error);
            this.renderError(p5);
        }
    },

    // Render error message
    renderError(p5) {
        p5.createCanvas(800, 400);
        p5.background(26, 26, 46);
        p5.fill(255);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(20);
        p5.text('Unable to generate preview', p5.width / 2, p5.height / 2 - 20);
        p5.textSize(14);
        p5.fill(206, 212, 218);
        p5.text('Please check your memories and try again', p5.width / 2, p5.height / 2 + 10);
    },

    // Download preview as image
    download() {
        if (!this.p5Instance) {
            alert('No preview to download');
            return;
        }

        // Generate filename
        const genre = this.currentGenre.replace(/-/g, '_');
        const format = this.currentFormat.replace(/-/g, '_');
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `memoir_${genre}_${format}_${timestamp}`;

        // Save canvas as PNG
        this.p5Instance.saveCanvas(filename, 'png');
    },

    // Update preview with new settings
    update(genre, format, timeline) {
        this.init(genre, format, timeline);
    },

    // Clean up
    destroy() {
        if (this.p5Instance) {
            this.p5Instance.remove();
            this.p5Instance = null;
        }
    }
};
