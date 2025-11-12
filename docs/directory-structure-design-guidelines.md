# Directory Structure Design Guidelines

```
src/
├── context/                   # State management
│   ├── AppContext.jsx         # Global state (users, courses, progress)
│   ├── ExamContext.jsx        # Exam state (complex, shared)
│   └── LearningContext.jsx    # Learning state (optional)
├── common/                    # Foundation layer
│   ├── modules/               # Shared component modules
│   │   ├── Layout/            # Layout components
│   │   │   ├── Layout.jsx     # Primary layout container
│   │   │   ├── MainLayout.jsx # Main page layout
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Layout i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Header/            # Header module
│   │   │   ├── Header.jsx     # Header component
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Header i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Footer/            # Footer module
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   ├── Footer.css     # Footer styles (complex layouts)
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Footer i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Sidebar/           # Sidebar module
│   │   │   ├── Sidebar.jsx    # Sidebar component
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Sidebar i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Navigator/         # Navigation module
│   │   │   ├── Navigator.jsx  # Primary navigation component
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Navigation i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Login/             # Login module
│   │   │   ├── Login.jsx      # Login page component
│   │   │   ├── index.js       # Exports
│   │   │   └── locales/       # Login i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   ├── Elements/          # Shared UI components
│   │   │   ├── Button.jsx     # Button component
│   │   │   ├── Button.css     # Button styles (rich variants)
│   │   │   ├── Input.jsx      # Input component
│   │   │   ├── Modal.jsx      # Modal component
│   │   │   ├── Card.jsx       # Card component
│   │   │   ├── Card.css       # Card styles (complex layouts)
│   │   │   ├── Table.jsx      # Table component
│   │   │   ├── Form.jsx       # Form component
│   │   │   ├── Alert.jsx      # Alert component
│   │   │   ├── Alert.css      # Alert styles (animations, variants)
│   │   │   ├── Loading.jsx    # Loading indicator
│   │   │   ├── CourseCard.jsx # Course card (domain-specific)
│   │   │   ├── NotificationContainer.jsx # Notification container
│   │   │   ├── index.js       # Aggregated exports
│   │   │   └── locales/       # UI component i18n resources
│   │   │       ├── en.json    # English
│   │   │       └── zh-CN.json # Chinese
│   │   └── index.js           # Aggregated exports
│   └── index.css              # Global styles
├── modules/                   # Business modules
│   ├── course-management/     # Course management module
│   │   ├── CourseManagementModule.jsx # Main component (local state)
│   │   ├── CourseList.jsx     # Course list
│   │   ├── CourseForm.jsx     # Course form
│   │   ├── data/              # Course management data
│   │   │   ├── courses.json   # Core course data
│   │   │   ├── categories.json # Course categories
│   │   │   ├── templates.json # Course templates
│   │   │   └── questions/     # Question bank
│   │   │       ├── fill-blank/ # Fill-in-the-blank
│   │   │       ├── multiple-choice/ # Multiple choice
│   │   │       ├── programming/ # Coding exercises
│   │   │       └── short-answer/ # Short answer
│   │   └── locales/           # Module i18n resources
│   │       ├── en.json        # English
│   │       └── zh-CN.json     # Chinese
│   ├── learning/              # Learning module
│   │   ├── LearningModule.jsx # Main component (uses LearningContext)
│   │   ├── VideoPlayer.jsx    # Video player
│   │   ├── data/              # Learning data
│   │   │   ├── progress.json  # Learning progress
│   │   │   ├── bookmarks.json # Saved content
│   │   │   └── notes.json     # Notes data
│   │   └── locales/           # Module i18n resources
│   │       ├── en.json        # English
│   │       └── zh-CN.json     # Chinese
│   ├── practice/              # Practice module
│   │   ├── PracticeModule.jsx # Main component (local state)
│   │   ├── QuestionCard.jsx   # Question card
│   │   ├── data/              # Practice data
│   │   │   ├── questions.json # Practice questions
│   │   │   ├── answers.json   # Answers
│   │   │   └── statistics.json # Practice statistics
│   │   └── locales/           # Module i18n resources
│   │       ├── en.json        # English
│   │       └── zh-CN.json     # Chinese
│   ├── experiment/            # Laboratory module
│   │   ├── ExperimentModule.jsx # Main component (local state)
│   │   ├── CodeEditor.jsx     # Code editor
│   │   ├── data/              # Laboratory data
│   │   │   ├── experiments.json # Lab scenarios
│   │   │   ├── templates.json  # Code templates
│   │   │   └── results.json    # Experiment results
│   │   └── locales/           # Module i18n resources
│   │       ├── en.json        # English
│   │       └── zh-CN.json     # Chinese
│   ├── exam/                  # Examination module
│   │   ├── ExamModule.jsx     # Main component (uses ExamContext)
│   │   ├── ExamPaper.jsx      # Exam paper
│   │   ├── data/              # Examination data
│   │   │   ├── papers.json    # Papers
│   │   │   ├── scores.json    # Scores
│   │   │   └── records.json   # Exam records
│   │   └── locales/           # Module i18n resources
│   │       ├── en.json        # English
│   │       └── zh-CN.json     # Chinese
│   └── admin/                 # Administration module
│       ├── AdminModule.jsx    # Main component (local state)
│       ├── UserManagement.jsx # User management
│       ├── data/              # Administration data
│       │   ├── users.json     # User records
│       │   ├── permissions.json # Permission configuration
│       │   └── logs.json      # System logs
│       └── locales/           # Module i18n resources
│           ├── en.json        # English
│           └── zh-CN.json     # Chinese
├── App.jsx                    # Root application component
└── main.jsx                   # Application entry point
```
