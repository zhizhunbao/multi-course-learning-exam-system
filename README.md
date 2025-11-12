# Multi-Course Learning and Examination System

A comprehensive learning and examination platform supporting multiple courses with four core modules: Learning, Practice, Experiment, and Exam.

## Project Overview

- **Project Name**: Multi-Course Learning and Examination System
- **GitHub Repository**: multi-course-learning-exam-system
- **Description**: A comprehensive platform supporting multiple courses with integrated learning, practice, experiment, and examination modules
- **Target Users**: Students, Teachers, Educational Institutions
- **Use Cases**: Online Education, Course Learning, Skills Training, Exam Assessment
- **Live Demo**: https://zhizhunbao.github.io/multi-course-learning-exam-system/

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Routing**: React Router v6
- **Internationalization**: react-i18next (English & Chinese)
- **Deployment**: GitHub Pages
- **Key Dependencies**:
  - lucide-react (Icons)
  - framer-motion (Animations)
  - react-pdf, pdfjs-dist (PDF Processing)
  - react-markdown (Markdown Rendering)
  - markmap-lib, markmap-view (Mind Mapping)
  - katex (Mathematical Expressions)
  - d3 (Data Visualization)

## Features

### Core Modules

- **Learning Module**:

  - Course content display with Markdown/PDF support
  - Progress tracking with visual indicators
  - Interactive note-taking functionality
  - Multi-language support (English/Chinese)
  - Mind map visualization for course structures

- **Practice Module**:

  - Dynamic question bank with multiple sets per course
  - Real-time answer recording and validation
  - Display of available practice sets per course
  - Time tracking for practice sessions
  - Wrong answer collection for review

- **Experiment Module**:

  - Interactive experiment guides
  - Built-in code editor with syntax highlighting
  - Result validation and feedback
  - Support for multiple programming languages

- **Exam Module**:
  - Timed online examinations
  - Multiple question types (Multiple Choice, Fill-in-the-Blank, Short Answer, Programming)
  - Automatic scoring and statistics
  - Exam history and performance analytics

### User System

- Simplified login (name-based authentication)
- Role-based access control (Admin/Student/Teacher)
- Local state persistence
- User profile management

### Course Management

- Comprehensive course listing with metadata
- Dynamic course addition support
- Modular course structure
- Course progress tracking
- Chapter navigation and bookmarking

### Admin Features

- Course creation and management
- PDF upload and content management
- User permission control
- Batch PDF processing with preview
- Content extraction and organization

## Current Courses

The system currently supports three graduate-level AI courses:

1. **CST8502 - Machine Learning**

   - 12 lectures, 8 labs, 4 assignments, 2 exams
   - Topics: Data Preprocessing, Supervised/Unsupervised Learning, Model Evaluation, Deep Learning

2. **CST8503 - Knowledge Representation and Reasoning**

   - 12 lectures, 8 labs, 4 assignments, 2 exams
   - Topics: Predicate Logic, Prolog Programming, Knowledge Graphs, Inference Engines

3. **CST8504 - AI Techniques**
   - 12 lectures, 8 labs, 4 assignments, 2 exams
   - Topics: Python Programming, NumPy/Pandas, Data Visualization, Algorithm Optimization

## Project Structure

```
src/
├── common/                  # Common utilities
│   ├── modules/            # Shared modules
│   │   ├── Layout/        # Main layout
│   │   ├── Login/         # Authentication
│   │   └── Markdown/      # Markdown renderer
│   └── i18n.js            # Internationalization config
├── modules/                # Feature modules
│   ├── admin/             # Admin management
│   ├── course-management/ # Course CRUD operations
│   ├── learning/          # Learning module
│   ├── practice/          # Practice module
│   ├── experiment/        # Experiment module
│   └── exam/             # Exam module
├── context/               # React Context providers
├── services/              # API and data services
└── App.jsx               # Main application component

public/
└── pdfs/                  # Course materials
    ├── machine-learning/
    ├── knowledge-reasoning/
    └── ai-techniques/
```

## Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

The project uses GitHub Pages with automated deployment via GitHub Actions.

### Deployment Process

1. Push code to the `main` branch
2. GitHub Actions automatically builds the project
3. Built artifacts are deployed to GitHub Pages
4. Site is accessible at the deployment URL

### Access URL

- Live Site: https://zhizhunbao.github.io/multi-course-learning-exam-system/

## User Guide

### Logging In

1. Navigate to the system homepage
2. Enter your name and select a role (Student/Teacher/Admin)
3. Click login to access the system

### Learning Workflow

1. Select a course from the dashboard
2. Enter the Learning module to view course content
3. Complete practice exercises and experiments
4. Take exams for assessment

### Admin Workflow

1. Login with admin credentials
2. Access the admin panel
3. Create and manage courses
4. Upload PDF materials to generate course content

## Development Guidelines

- Use JSX file format (no TypeScript)
- Follow React best practices and hooks conventions
- Style with Tailwind CSS utility classes
- Maintain code readability and modularity
- Leverage React Context for state management
- Implement proper error handling and loading states

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please contact us through:

- GitHub Issues: [Project Issues Page](https://github.com/zhizhunbao/multi-course-learning-exam-system/issues)
- Email: wang1059@algonquinlive.com

## Changelog

### Recent Updates

- **2025-11-12**: Updated README to English version with comprehensive documentation
- **2025-11-10**: Added practice set count display in course selection
- **2025-11-08**: Enhanced Practice Module with dynamic question bank loading
- **2025-11-05**: Fixed undefined options error in ExamModule, improved system stability
- **2025-10-28**: Implemented multi-language support with English and Chinese locales
- **2025-10-20**: Integrated Markdown rendering with KaTeX support for mathematical expressions

---

© 2025 Algonquin College. All rights reserved.
