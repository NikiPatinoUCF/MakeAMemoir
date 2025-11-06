// Format Renderer - Defines how each format should be rendered with P5.js

const FormatRenderer = {
    formats: {
        'comic-panels': {
            name: 'Comic Book Panels',
            render(p5, memories, colorTheme, loadedImages) {
                const cols = Math.min(3, memories.length);
                const rows = Math.ceil(memories.length / cols);
                const panelWidth = 280;
                const panelHeight = 320;
                const gap = 20;
                const padding = 30;

                const totalWidth = (cols * panelWidth) + ((cols - 1) * gap) + (padding * 2);
                const totalHeight = (rows * panelHeight) + ((rows - 1) * gap) + (padding * 2);

                p5.createCanvas(totalWidth, totalHeight);
                p5.background(26, 26, 46);

                memories.forEach((memory, index) => {
                    const col = index % cols;
                    const row = Math.floor(index / cols);
                    const x = padding + (col * (panelWidth + gap));
                    const y = padding + (row * (panelHeight + gap));

                    // Panel border (comic style)
                    p5.stroke(MemoryManager.getEmotionColor(memory.emotionCategory));
                    p5.strokeWeight(4);
                    p5.fill(37, 37, 64);
                    p5.rect(x, y, panelWidth, panelHeight, 8);

                    // Draw preloaded image
                    if (loadedImages[index]) {
                        p5.image(loadedImages[index], x + 10, y + 10, panelWidth - 20, 180);
                    }

                    // Title (comic speech bubble style)
                    p5.fill(255);
                    p5.noStroke();
                    p5.textAlign(p5.CENTER);
                    p5.textSize(16);
                    p5.textStyle(p5.BOLD);
                    p5.text(memory.title, x + panelWidth / 2, y + 220);

                    // Description
                    p5.textSize(12);
                    p5.textStyle(p5.NORMAL);
                    const descLines = this.wrapText(p5, memory.description, panelWidth - 30);
                    descLines.slice(0, 3).forEach((line, i) => {
                        p5.text(line, x + panelWidth / 2, y + 245 + (i * 18));
                    });

                    // Date badge
                    p5.fill(colorTheme[index % colorTheme.length]);
                    p5.noStroke();
                    p5.rect(x + 10, y + 295, panelWidth - 20, 20, 4);
                    p5.fill(26, 26, 46);
                    p5.textSize(11);
                    p5.text(memory.date, x + panelWidth / 2, y + 308);
                });
            }
        },

        'graphic-novel': {
            name: 'Graphic Novel',
            render(p5, memories, colorTheme, loadedImages) {
                const canvasWidth = 900;
                const canvasHeight = Math.max(600, memories.length * 250);

                p5.createCanvas(canvasWidth, canvasHeight);
                p5.background(26, 26, 46);

                let yOffset = 30;

                memories.forEach((memory, index) => {
                    // Vary panel sizes for visual interest
                    const isLarge = index % 3 === 0;
                    const panelHeight = isLarge ? 320 : 220;
                    const imageHeight = isLarge ? 200 : 120;

                    // Full-bleed style background
                    p5.fill(37, 37, 64);
                    p5.noStroke();
                    p5.rect(0, yOffset, canvasWidth, panelHeight);

                    // Colored accent bar
                    const accentColor = p5.color(MemoryManager.getEmotionColor(memory.emotionCategory));
                    p5.fill(accentColor);
                    p5.rect(0, yOffset, 8, panelHeight);

                    // Image (full-bleed on left)
                    if (loadedImages[index]) {
                        p5.image(loadedImages[index], 20, yOffset + 20, 350, imageHeight);
                    }

                    // Text content (right side)
                    p5.fill(255);
                    p5.textAlign(p5.LEFT);
                    p5.textSize(22);
                    p5.textStyle(p5.BOLD);
                    p5.text(memory.title, 400, yOffset + 40);

                    p5.textSize(14);
                    p5.textStyle(p5.NORMAL);
                    p5.fill(206, 212, 218);
                    const descLines = this.wrapText(p5, memory.description, 460);
                    descLines.slice(0, 6).forEach((line, i) => {
                        p5.text(line, 400, yOffset + 70 + (i * 20));
                    });

                    // Date
                    p5.fill(colorTheme[index % colorTheme.length]);
                    p5.textSize(12);
                    p5.textStyle(p5.ITALIC);
                    p5.text(memory.date, 400, yOffset + panelHeight - 20);

                    yOffset += panelHeight + 15;
                });
            }
        },

        'illustrated-vignettes': {
            name: 'Illustrated Vignettes',
            render(p5, memories, colorTheme, loadedImages) {
                const canvasWidth = 900;
                const canvasHeight = 700;

                p5.createCanvas(canvasWidth, canvasHeight);
                p5.background(26, 26, 46);

                // Scatter memories in an artistic arrangement
                const positions = this.generateVignettePositions(memories.length, canvasWidth, canvasHeight);

                memories.forEach((memory, index) => {
                    const pos = positions[index];
                    const size = 200 + (Math.sin(index) * 50);

                    // Decorative border (ornate frame)
                    const frameColor = p5.color(MemoryManager.getEmotionColor(memory.emotionCategory));
                    p5.stroke(frameColor);
                    p5.strokeWeight(3);
                    p5.fill(37, 37, 64, 230);

                    // Draw decorative frame
                    p5.rect(pos.x - 10, pos.y - 10, size + 20, size + 120, 15);

                    // Inner frame
                    p5.stroke(frameColor);
                    p5.strokeWeight(1);
                    p5.noFill();
                    p5.rect(pos.x - 5, pos.y - 5, size + 10, size + 110, 10);

                    // Image
                    if (loadedImages[index]) {
                        p5.noStroke();
                        p5.image(loadedImages[index], pos.x, pos.y, size, size * 0.7);
                    }

                    // Title (handwritten style)
                    p5.fill(255);
                    p5.noStroke();
                    p5.textAlign(p5.CENTER);
                    p5.textSize(14);
                    p5.textStyle(p5.ITALIC);
                    const titleLines = this.wrapText(p5, memory.title, size - 10);
                    titleLines.slice(0, 2).forEach((line, i) => {
                        p5.text(line, pos.x + size / 2, pos.y + size * 0.7 + 25 + (i * 18));
                    });

                    // Date
                    p5.fill(colorTheme[index % colorTheme.length]);
                    p5.textSize(11);
                    p5.text(memory.date, pos.x + size / 2, pos.y + size * 0.7 + 65);
                });
            }
        },

        'photo-essay': {
            name: 'Photo Essay',
            render(p5, memories, colorTheme, loadedImages) {
                const canvasWidth = 900;
                const canvasHeight = Math.max(600, memories.length * 280);

                p5.createCanvas(canvasWidth, canvasHeight);
                p5.background(26, 26, 46);

                let yOffset = 40;

                memories.forEach((memory, index) => {
                    const isLeft = index % 2 === 0;

                    // Image
                    if (loadedImages[index]) {
                        const imgX = isLeft ? 40 : 480;
                        p5.image(loadedImages[index], imgX, yOffset, 380, 240);
                    }

                    // Text block (magazine editorial style)
                    const textX = isLeft ? 450 : 40;
                    const textWidth = 380;

                    // Title
                    p5.fill(255);
                    p5.textAlign(p5.LEFT);
                    p5.textSize(24);
                    p5.textStyle(p5.BOLD);
                    const titleLines = this.wrapText(p5, memory.title, textWidth);
                    titleLines.forEach((line, i) => {
                        p5.text(line, textX, yOffset + 20 + (i * 30));
                    });

                    // Date (editorial style)
                    p5.fill(colorTheme[index % colorTheme.length]);
                    p5.textSize(13);
                    p5.textStyle(p5.NORMAL);
                    p5.text(memory.date.toUpperCase(), textX, yOffset + 60 + (titleLines.length * 30));

                    // Description
                    p5.fill(206, 212, 218);
                    p5.textSize(14);
                    p5.textStyle(p5.NORMAL);
                    const descLines = this.wrapText(p5, memory.description, textWidth);
                    descLines.slice(0, 7).forEach((line, i) => {
                        p5.text(line, textX, yOffset + 90 + (titleLines.length * 30) + (i * 22));
                    });

                    yOffset += 300;
                });
            }
        },

        'simple-text': {
            name: 'Simple Text Layout',
            render(p5, memories, colorTheme, loadedImages) {
                const canvasWidth = 800;
                const canvasHeight = Math.max(600, memories.length * 250);

                p5.createCanvas(canvasWidth, canvasHeight);
                p5.background(26, 26, 46);

                let yOffset = 60;

                memories.forEach((memory, index) => {
                    // Small thumbnail
                    if (loadedImages[index]) {
                        p5.image(loadedImages[index], 60, yOffset, 120, 100);
                    }

                    // Text content (manuscript style)
                    const textX = 200;
                    const textWidth = 540;

                    // Title
                    p5.fill(255);
                    p5.textAlign(p5.LEFT);
                    p5.textSize(20);
                    p5.textStyle(p5.BOLD);
                    p5.text(memory.title, textX, yOffset + 20);

                    // Date
                    p5.fill(colorTheme[index % colorTheme.length]);
                    p5.textSize(12);
                    p5.textStyle(p5.ITALIC);
                    p5.text(memory.date, textX, yOffset + 40);

                    // Description
                    p5.fill(206, 212, 218);
                    p5.textSize(13);
                    p5.textStyle(p5.NORMAL);
                    const descLines = this.wrapText(p5, memory.description, textWidth);
                    descLines.slice(0, 5).forEach((line, i) => {
                        p5.text(line, textX, yOffset + 65 + (i * 20));
                    });

                    // Emotion note
                    if (memory.emotionalNotes) {
                        p5.fill(MemoryManager.getEmotionColor(memory.emotionCategory));
                        p5.textSize(11);
                        p5.textStyle(p5.ITALIC);
                        const emotionLines = this.wrapText(p5, `"${memory.emotionalNotes}"`, textWidth);
                        emotionLines.slice(0, 2).forEach((line, i) => {
                            p5.text(line, textX, yOffset + 165 + (i * 16));
                        });
                    }

                    // Divider line
                    p5.stroke(87, 96, 111);
                    p5.strokeWeight(1);
                    p5.line(60, yOffset + 210, canvasWidth - 60, yOffset + 210);
                    p5.noStroke();

                    yOffset += 240;
                });
            }
        }
    },

    // Helper: Wrap text to fit within width
    wrapText(p5, text, maxWidth) {
        if (!text) return [''];

        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const testWidth = p5.textWidth(testLine);

            if (testWidth > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    },

    // Helper: Generate scattered positions for vignettes
    generateVignettePositions(count, width, height) {
        const positions = [];
        const margin = 50;
        const spacing = 250;

        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;

            positions.push({
                x: margin + (col * spacing) + (Math.random() * 30 - 15),
                y: margin + (row * spacing) + (Math.random() * 30 - 15)
            });
        }

        return positions;
    },

    // Get format data
    getFormat(formatKey) {
        return this.formats[formatKey];
    }
};
