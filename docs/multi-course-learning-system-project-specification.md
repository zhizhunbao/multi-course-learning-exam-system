# Multi-Course Learning System Project Specification

1. **Project Overview**

   - Project Name: Multi-Course Learning & Examination System
   - GitHub Repository: multi-course-learning-exam-system
   - Project Description: A learning and examination platform that supports multiple courses, featuring four core modules: learning, practice, laboratory, and examination
   - Target Users: Students, instructors, educational institutions
   - Use Cases: Online education, course learning, skills training, examination assessment
   - Deployment URL: https://zhizhunbao.github.io/multi-course-learning-exam-system/

2. **Technology Stack Requirements**

   - Frontend Framework: React 18
   - Build Tool: Vite
   - Styling Solution: Tailwind CSS
   - State Management: React Context + useReducer
   - Routing: React Router v6
   - Internationalization: react-i18next
   - Deployment: GitHub Pages
   - Additional Dependencies: lucide-react (icons), framer-motion (animations)
   - PDF Handling: react-pdf, pdfjs-dist
   - AI Integration: Google Gemini API
   - File Uploads: react-dropzone
   - File Format: Use JSX only; do not use TypeScript (TSX)

3. **Project Structure**

   - Directory Organization: Feature-based modular structure
   - Component Design: Atomic, reusable components
   - File Naming: PascalCase for components, camelCase for utility functions
   - Code Organization: Group code by feature modules; centralize imports and exports
   - Course Modules: Dedicated course data directories with hot-swappable support
   - Extension Mechanism: Course registration system with dynamic content loading

4. **Functional Requirements**

   - Learning Module: Course content delivery, progress tracking, note-taking
   - Practice Module: Question banks, answer history, error review collection
   - Laboratory Module: Lab guides, code editor, result verification
   - Examination Module: Online exams, timer, score analytics
   - User System: Streamlined login (name only), role management (admin/general), local state storage, personal dashboard
   - Course Management: Course list, course details, chapter navigation
   - Course Expansion: Dynamically add new courses with modular structures
   - Admin Features: Course creation, PDF upload, content management, user permission control
   - Access Control: Role-based authorization; admins create courses, general users learn only
   - PDF Resource Management: Batch PDF uploads, live previews, content extraction
   - AI Content Generation: Auto-generate course materials, practice items, and exam questions from PDFs
   - Intelligent Course Creation: One-click generation of full course structures from PDFs
   - PDF Processing: Batch uploads, content extraction, format conversion
   - Intelligent Course Assembly: Automatically build complete courses from PDF content
   - Content Quality Control: Preview, edit, and review workflows for generated materials

5. **Data Design**

   - Course Data: Course metadata, chapter content, learning resources
   - User Data: User profiles, roles (admin/general), learning progress, score records
   - State Storage: Browser localStorage/sessionStorage
   - Question Data: Practice questions, exam questions, answer options
   - Supported Question Types: Multiple choice, fill-in-the-blank, short answer, coding
   - Laboratory Data: Lab guides, code templates, test cases
   - Data Format: JSON files organized by course and module
   - Course Structure: Standardized course configuration format with pluggable support
   - Modular Design: Each course ships as an independent data package covering all four modules
   - Role Permissions: Admin role data, permission configurations, access control rules
   - PDF Resource Storage: Original PDF files, cached extracted text
   - AI-Generated Content: Versioning for generated course content, questions, and answers
   - Content Review: Editing and approval workflows for AI-generated output

6. **User Roles & Permission System**

   - Role Types: Administrator, general user
   - Access Control: Role-based authorization
   - User Authentication: Streamlined login
   - Security Measures: Permission validation and operation control

7. **User Interface Design**

   - Visual Style: Modern, minimalist, education-focused; consistent with Algonquin College branding
   - Layout: Responsive design with sidebar navigation
   - Interactions: Smooth animations and intuitive user flows
   - Theme: Algonquin College color palette; bilingual UI (Chinese & English)
   - Brand Consistency: Maintain institutional visual identity
   - Role-Specific Views: Tailor functionality by user role
   - Permission Feedback: Friendly access control messaging

8. **Development Guidelines**

   - Code Style: Write human-readable code
   - Component Design: Follow single-responsibility principle to keep components concise
   - State Management: Use state judiciously to avoid unnecessary complexity
   - Error Handling: Provide helpful error messages and exception handling
   - Performance Optimization: Prioritize UX with efficient loading and rendering
   - Tooling: Prefer MCP tools for code generation and file operations
   - File Format: All React components must use the .jsx extension; no TypeScript
   - PDF Handling: Support various PDF formats, including encrypted or corrupted files
   - AI Integration: Support Google Gemini API
   - Content Quality: Validate AI-generated content and enable manual review workflows
   - Permission Security: Enforce role-based access control
   - Admin Features: Support course and content management capabilities

9. **Deployment Requirements**

   - Environment: GitHub Pages
   - Build: Vite production build
   - Deployment: Automated via GitHub Actions
   - Domain: Default GitHub Pages domain
   - Repository URL: https://github.com/zhizhunbao/cst8504-aat-midterm-practice-project
   - Live Site: https://zhizhunbao.github.io/multi-course-learning-exam-system/
