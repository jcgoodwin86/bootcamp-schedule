# Bootcamp-Schedule App

## Table of Contents

- [Directory Structure](#directory-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Directory Structure

Here's a tree structure of the `app/` directory with a brief description of each file:

```
app/
├── .eslintrc.cjs          # ESLint configuration file
├── components.json        # UI components configuration
├── index.html             # Main HTML file for the app
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite configuration
└── src/
    ├── App.css            # CSS styles for the React app
    ├── App.jsx            # Main React component
    ├── main.jsx          # Entry point for the React app
    ├── index.css          # Global CSS styles
    ├── assets/
    │   └── data.json      # JSON data for the app
    ├── components/
    │   ├── CurriculumList/
    │   │   ├── Chapter.jsx          # Component for displaying chapters
    │   │   ├── Curriculum.jsx       # Component for displaying the curriculum
    │   │   └── Lesson.jsx           # Component for displaying lessons
    ├── DaySchedule/
    │   ├── DaySchedule.jsx      # Component for displaying the day schedule
    │   ├── InputList.jsx        # Component for inputting time and buffer
    │   ├── LessonList.jsx       # Component for listing lessons
    │   ├── TimeNumberInput.jsx  # Component for time input
    │   └── index.js             # Entry point for DaySchedule components
    ├── UI/
    │   ├── accordion.jsx        # UI component for accordion
    │   ├── button.jsx           # UI component for button
    │   ├── card.jsx             # UI component for card
    │   ├── checkbox.jsx         # UI component for checkbox
    │   ├── input.jsx            # UI component for input
    │   └── label.jsx            # UI component for label
    ├── contexts/
    │   ├── DayScheduleContext.jsx   # Context for day schedule
    │   ├── UserContext.js           # Context for user data
    │   └── UserProvider.jsx         # Provider for user context
    ├── hooks/
    │   ├── db/
    │   │   ├── useLoadStateFromDB.jsx  # Hook to load state from DB
    │   │   └── useSaveCurriculumState.jsx # Hook to save curriculum state
    │   ├── useEffectOnUpdate.jsx    # Hook to run effect on update
    │   ├── useLatestLessons.jsx     # Hook to get latest lessons
    │   ├── useModuleData.jsx        # Hook to manage module data
    │   └── useToggle.jsx            # Hook to toggle boolean state
    ├── lib/
    │   └── utils.ts                 # Utility functions
    ├── services/
    │   └── db.js                    # IndexedDB service
    └── utils/
        └── debouncer.js             # Utility function for debouncing
```

## Tech Stack

- **Frontend**: React, JSX, Tailwind CSS, shadcn/ui
- **Backend**: Node.js
- **Database**: IndexedDB (via idb library)
- **Build Tools**: Vite
- **Others**: Puppeteer for web scraping

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jcgoodwin86/bootcamp-schedule.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bootcamp-schedule-app/app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To start the application, run:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
