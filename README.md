# Memoir Maker

**Visualize your memories through different genre lenses and formats**

A creative web application that helps writers transform their personal memories into compelling memoir previews by applying different narrative genres and visual layouts.

## Features

### 📸 Upload Memories (1-10 images)
- Upload images with accompanying details:
  - Title
  - Description
  - Date/Timeframe
  - Emotional notes

### 🎭 Choose Your Genre Lens
Transform your memories through 9 different narrative perspectives:
- **Literary Fiction** - Introspective and lyrical
- **Thriller** - Tension and suspense
- **Coming-of-Age** - Growth and transformation
- **Noir** - Shadows and moral ambiguity
- **Romance** - Emotional connections
- **Hero's Journey** - Epic transformation
- **Magical Realism** - Blending ordinary with extraordinary
- **Horror** - Confronting fear and dread
- **Sci-Fi Dystopia** - Oppressive systems and resistance

### 🎨 Select Your Format
Visualize your memoir in 5 distinct layouts:
- **Comic Book Panels** - Grid layout with dynamic captions
- **Graphic Novel** - Full-bleed images with varied panel sizes
- **Illustrated Vignettes** - Scattered artistic arrangement
- **Photo Essay** - Magazine-style editorial layout
- **Simple Text Layout** - Minimalist manuscript style

### 📖 Timeline Options
- **Chronological** - From earliest to latest
- **In Media Res** - Start with the most emotionally intense moment

### 💎 Gem-Tone Color Palette
Emotional notes automatically map to beautiful gem-tone colors:
- Joy/Happiness → Citrine, Amber
- Sadness → Sapphire, Aquamarine
- Anger → Ruby, Garnet
- Peace/Calm → Jade, Emerald
- Mystery/Wonder → Amethyst, Tanzanite
- Neutral → Onyx, Pearl

### ✨ Generated Output
For each genre/format combination, receive:
- Visual mockup of your memoir layout
- Genre-specific narrative snippet for inspiration
- 5 writing prompts to develop your story
- Downloadable preview image

## Usage

### Running Locally

1. Clone this repository:
```bash
git clone https://github.com/NikiPatinoUCF/MakeAMemoir.git
cd MakeAMemoir
```

2. Start a local web server:

**Option 1: Python 3**
```bash
python -m http.server 8000
```

**Option 2: Python 2**
```bash
python -m SimpleHTTPServer 8000
```

**Option 3: Node.js**
```bash
npx http-server
```

3. Open your browser to `http://localhost:8000`

### GitHub Pages Deployment

This site is designed for GitHub Pages deployment:

1. Push your code to the `main` branch (or your designated GitHub Pages branch)
2. Go to your repository Settings → Pages
3. Under "Source", select your branch (usually `main`)
4. Click Save
5. Your site will be available at `https://nikipatinoucf.github.io/MakeAMemoir/`

The site will automatically rebuild when you push changes.

## How It Works

### 1. Upload Your Memories
Start by uploading 1-10 images that represent important moments in your memoir. Fill in the title, description, date, and emotional notes for each memory.

### 2. Select a Genre
Choose how you want to frame your narrative. Each genre applies a different lens to your memories, affecting how they're presented and what writing prompts you receive.

### 3. Choose Format & Timeline
Pick a visual layout that matches your aesthetic vision. Decide whether to present memories chronologically or start with the most intense moment (in media res).

### 4. View & Download Preview
See your memoir come to life! Download the preview image and use the genre-specific narrative snippet and writing prompts to guide your actual memoir writing.

## Technology Stack

- **HTML/CSS/JavaScript** - Pure vanilla, no frameworks
- **P5.js** - Dynamic canvas rendering for visual layouts
- **Google Fonts** - Playfair Display and Lora for elegant typography
- **sessionStorage** - Client-side data persistence (no backend required)

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

## Privacy

All data is stored locally in your browser's session storage. No data is sent to any server. Images and text exist only during your browser session.

## Features in Detail

### Navigation
- **Back buttons** - Return to previous steps to edit your choices
- **Start Over** - Clear all memories but keep genre/format selections
- **New Project** - Reset everything and start fresh

### Flexibility
- Try different genre/format combinations without re-uploading images
- Edit memory details at any time
- Download multiple preview variations

## Credits

Created as part of a class activity exploring creative web development with P5.js.

## License

MIT License - Feel free to use and modify for your own projects.

---

**Ready to make your memoir?** Start visualizing your memories today!
