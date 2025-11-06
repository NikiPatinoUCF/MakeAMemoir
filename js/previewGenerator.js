// Preview Generator - Manages P5.js canvas for preview rendering and download

const PreviewGenerator = {
    p5Instance: null,
    currentGenre: null,
    currentFormat: null,
    currentTimeline: null,
    loadedImages: [],

    // Initialize P5.js sketch
    init(genre, format, timeline) {
        this.currentGenre = genre;
        this.currentFormat = format;
        this.currentTimeline = timeline;
        this.loadedImages = [];

        // Remove existing canvas if any
        if (this.p5Instance) {
            this.p5Instance.remove();
            this.p5Instance = null;
        }

        // Clear container
        const container = document.getElementById('canvas-container');
        container.innerHTML = '';

        // Get memories to preload
        const memories = MemoryManager.getMemories();
        const orderedMemories = GenreEngine.reorderMemories(memories, this.currentTimeline);

        // Create new P5.js instance
        const sketch = (p5) => {
            // Preload all images
            p5.preload = () => {
                orderedMemories.forEach(memory => {
                    if (memory.image) {
                        try {
                            const img = p5.loadImage(memory.image);
                            this.loadedImages.push(img);
                        } catch (error) {
                            console.error('Error loading image:', error);
                            this.loadedImages.push(null);
                        }
                    } else {
                        this.loadedImages.push(null);
                    }
                });
            };

            // Setup and render
            p5.setup = () => {
                p5.noLoop(); // Only draw once
                this.generatePreview(p5, orderedMemories);
            };
        };

        this.p5Instance = new p5(sketch, 'canvas-container');
    },

    // Generate the preview
    generatePreview(p5, orderedMemories) {
        const genre = GenreEngine.getGenre(this.currentGenre);
        const format = FormatRenderer.getFormat(this.currentFormat);

        if (!genre || !format || orderedMemories.length === 0) {
            this.renderError(p5);
            return;
        }

        // Get genre color theme
        const colorTheme = GenreEngine.getColorTheme(this.currentGenre);

        // Render the format with preloaded images
        try {
            format.render(p5, orderedMemories, colorTheme, this.loadedImages);
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
        this.loadedImages = [];
    }
};
