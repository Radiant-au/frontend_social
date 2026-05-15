# Social Media Application

A modern social media web application built with React, Vite, Redux Toolkit, and Tailwind CSS.

## Features

- **Authentication** - User login and registration
- **Home Feed** - View posts from followed users
- **Profile Management** - View and edit user profiles
- **Messages** - Direct messaging between users
- **Notifications** - Real-time notifications
- **Reels** - Short video content
- **Navigation** - Responsive navigation system

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **FontAwesome & Unicons** - Icon libraries
- **React Modal** - Modal dialogs

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd socialMedia
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
socialMedia/
├── public/              # Static assets
├── src/
│   ├── api/            # API calls and services
│   ├── assets/         # Images, fonts, etc.
│   ├── pages/          # Page components
│   │   ├── Auth/       # Authentication pages
│   │   ├── Home/       # Home feed
│   │   ├── Navi/       # Navigation
│   │   ├── Noti/       # Notifications
│   │   ├── messages/   # Messaging
│   │   ├── profile/    # User profiles
│   │   └── reels/      # Reels/Videos
│   ├── redux/          # Redux store and slices
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```
VITE_API_URL=your-api-url
```

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## License

MIT
