# Reviews Carousel

A responsive web component that displays reviews in an interactive carousel format with adaptive layouts for desktop, tablet, and mobile devices.

## Project Structure

```
project-root/
├── index.html                    # Main HTML structure
├── css/styles.css               # Styling and responsive design
├── js/
│   ├── script.js                # Main carousel functionality
│   └── utils.js                 # Utility functions
├── data/reviews_sample.json     # Review data source
└── assets/                      # SVG icons (star, arrows)
```

## Features

- **Responsive Design**: Adapts layout based on screen size
- **Smooth Animations**: CSS transforms with 0.3s transitions
- **Touch-Friendly**: Optimized for mobile interactions
- **Dynamic Loading**: Fetches data from JSON source
- **Pagination**: Dots and arrow navigation

## Responsive Behavior

| Screen Size | Cards Visible | Navigation | Layout |
|-------------|---------------|------------|--------|
| Desktop (>1024px) | 4 | Horizontal | Row |
| Tablet (768-1024px) | 2 | Horizontal | Row |
| Mobile (≤768px) | 2 | Vertical | Column |

## Core Functions

- **`renderReviews()`** - Generates HTML for review cards
- **`getVisibleCount()`** - Determines cards per view based on screen width
- **`updateCarousel()`** - Handles positioning and responsive behavior
- **`renderDots()`** - Creates pagination dots

## Data Format

```json
[
  {
    "name": "John Doe",
    "rating": 5,
    "review": "Excellent service and care..."
  }
]
```

## Dependencies

- Google Fonts: Poppins (800 weight)
- Hartwell-Regular font
- Modern browser with ES6+ support

## Quick Start

1. Clone the project
2. Add your review data to `data/reviews_sample.json`
3. Open `index.html` in a browser
4. Carousel initializes automatically

## Architecture

Event-driven JavaScript with modular design, CSS custom properties for theming, and fetch API for data loading with error handling.