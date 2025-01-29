# Colors Game 🎮

A fast-paced, addictive color matching game that tests your reflexes and pattern recognition skills.

## Overview

Colors is an engaging browser-based game where players match colored circles with target colors displayed at the top of the screen. The game features decreasing time limits as you progress, making it increasingly challenging and addictive.

## Features

- Fast-paced color matching gameplay
- Progressive difficulty with decreasing time limits
- Mobile-first responsive design
- PWA support for offline play
- Clean, modern UI with smooth animations
- High score tracking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Running Tests

Execute the test suite:
```bash
npm test
```

## Technology Stack

- [Phaser 3](https://phaser.io/) - HTML5 game framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Jest](https://jestjs.io/) - Testing framework

## Project Structure

```
├── src/
│   ├── config/      # Game configuration
│   ├── scenes/      # Phaser game scenes
│   ├── services/    # Game services
│   └── utils/       # Utility functions
├── public/          # Static assets
└── tests/          # Test files
```

## Development

This project was developed with the assistance of AI technology, showcasing the potential of AI-driven game development while maintaining high code quality and user experience standards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.