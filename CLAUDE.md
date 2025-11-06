# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Memoir Maker** - A static web application that helps writers visualize their memoirs through different genre lenses and visual formats. Users upload 1-10 images with memory details, select a genre and format, then receive a generated preview showing how their memoir could be arranged and presented.

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Visualization**: P5.js for dynamic layout generation
- **Hosting**: GitHub Pages (static site)
- **Storage**: Browser sessionStorage (no backend/database)

## Project Structure

```
MakeAMemoir/
├── index.html              # Main HTML with all 4 screens
├── css/
│   └── styles.css          # Gem-tone palette, script fonts, responsive
├── js/
│   ├── app.js              # Main application controller, navigation
│   ├── memoryManager.js    # Upload handling, data storage (sessionStorage)
│   ├── genreEngine.js      # 9 genres, snippet generation, prompts
│   ├── formatRenderer.js   # 5 format layouts, timeline ordering
│   └── previewGenerator.js # P5.js canvas management, download
├── lib/
│   └── p5.min.js          # P5.js library (CDN or local)
└── README.md              # Deployment and usage instructions
```

## Development Commands

### Running Locally
```bash
# Option 1: Python 3
python -m http.server 8000

# Option 2: Python 2
python -m SimpleHTTPServer 8000

# Option 3: Node.js (if npx available)
npx http-server

# Then open: http://localhost:8000
```

### Deployment to GitHub Pages
```bash
# Push to main branch (or designated branch)
git add .
git commit -m "Update site"
git push origin main

# GitHub Pages will auto-deploy from main branch
```

## Architecture Overview

### User Flow (4 Screens)
1. **Upload Memories**: Upload 1-10 images with title, description, date, emotional notes
2. **Select Genre**: Choose from 9 genres (literary fiction, thriller, coming-of-age, noir, romance, hero's journey, magical realism, horror, sci-fi dystopia)
3. **Select Format & Timeline**: Choose from 5 formats (comic book panels, graphic novel, illustrated vignettes, photo essay, simple text) + timeline order (chronological or in media res)
4. **Generated Preview**: View mockup with genre-specific narrative snippet, writing prompts, and visual layout

### Data Model
```javascript
// Memory object
{
  id: unique_id,
  image: base64_string,        // FileReader conversion
  title: string,
  description: string,
  date: string,
  emotionalNotes: string,
  emotionCategory: string      // derived for color mapping
}

// Session state (stored in sessionStorage)
{
  memories: [Memory],
  selectedGenre: string,
  selectedFormat: string,
  timelineOrder: 'chronological' | 'in-media-res'
}
```

### Genre Engine
Each genre has:
- **Narrative style keywords**: For snippet rewriting
- **Color palette**: Gem-tones mapped to genre mood
- **Timeline logic**: How memories are reordered
- **Writing prompts**: Genre-specific questions

Emotional notes map to gem-tone colors:
- Joy/Happiness → Citrine, amber
- Sadness → Sapphire, aquamarine
- Anger → Ruby, garnet
- Peace → Jade, emerald
- Mystery → Amethyst, tanzanite
- Neutral → Onyx, pearl

### Format Renderer
P5.js generates 5 distinct layouts:
- **Comic Book Panels**: Grid with borders, speech bubbles
- **Graphic Novel**: Full-bleed, varied panel sizes
- **Illustrated Vignettes**: Scattered artistic arrangement
- **Photo Essay**: Magazine-style editorial
- **Simple Text Layout**: Minimalist, book manuscript aesthetic

### Timeline Ordering
- **Chronological**: Sort by date (earliest to latest)
- **In Media Res**: Start with most emotionally intense, then flashback/forward

## Key Features

- **No data persistence**: All data exists only in browser session
- **Client-side only**: No server, no database, no API calls
- **Navigation**: Users can go back/edit at any point
- **Multiple previews**: Try different genre/format combos without re-uploading
- **Download**: Save preview as image via P5.js `saveCanvas()`
- **Start Over / New Project**: Clear all data and restart

## Styling Guidelines

- **Font**: Script-like headings (Dancing Script or Pacifico from Google Fonts)
- **Colors**: Gem-tone palette with dark backgrounds
- **Layout**: Flexbox/Grid, responsive, mobile-friendly
- **Design**: Clean, minimalist, plenty of whitespace

## File Size Optimization

- Use minified P5.js
- No CSS framework overhead
- Minimal JavaScript dependencies
- Lazy load images where possible
