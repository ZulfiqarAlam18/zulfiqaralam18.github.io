# Ascenders-Online: Project Overview & Architecture

## 1. Project Summary
**Ascenders-Online** is a comprehensive educational platform comprised of a mobile application (Flutter) and a robust backend infrastructure. It is designed to manage student enrollments, courses, quizzes, results, and campus exploration. The application provides an intuitive user interface for students to explore facilities, undergo the admission process, consume video course content, and interact with quizzes.

## 2. Tech Stack & Architecture

### Frontend (Mobile App)
* **Framework:** Flutter (Dart)
* **State Management:** GetX
* **UI/UX Dependencies:** `flutter_screenutil` (responsive sizing), `google_fonts`, `flutter_svg`, `shimmer` (loading states), `hugeicons`, `cached_network_image`.
* **Media & Maps:** `video_player`, `chewie`, `youtube_player_flutter` (video content delivery), `flutter_map` (campus exploration via maps), `image_picker`.
* **Security & Utility:** `screen_protector` (preventing screenshots/recordings), `shared_preferences`, `pdf` & `share_plus` (report generation), `url_launcher`.
* **Push Notifications:** Firebase Cloud Messaging (`firebase_core`, `firebase_messaging`, `flutter_local_notifications`).

### Backend (API & Cloud Infrastructure)
* **Core Framework:** Node.js with Express.js
* **Database:** PostgreSQL (Relational schema for courses, students, quizzes, enrollments)
* **Hosting / Servers:** Amazon EC2 (Elastic Compute Cloud)
* **Storage:** Amazon S3 (Used for storing media assets, course videos, images, and user uploads)
* **Authentication & Identity:** Amazon (AWS) Cognito (Secure user authentication, registration, and session management)

## 3. Core Features & Module Breakdown

### 3.1 Mobile App Modules (Views & Controllers)
Based on the project structure, the app is divided into the following key domains:
* **Authentication (`auth/`, `auth_controller.dart`):** Login, registration, and onboarding using AWS Cognito flows.
* **Onboarding (`splash/`, `get started/`, `option/`):** Initial app loading, routing, and role/preference selection.
* **Explore & Campus (`explore/`, `layouts/`, `campus_controller.dart`):** Interactive campus maps (`flutter_map`), facility showcases, and faculty information.
* **Admissions (`Admission Process/`):** Streamlined enrollment workflows for prospective students.
* **Student Dashboard (`student/`):** Logged-in student portal.
* **Courses (`course_controller.dart`):** Video lectures, course materials, and progress tracking (video playback protected by `screen_protector`).
* **Assessments (`quiz_controller.dart`, `result_controller.dart`):** In-app quizzes, math rendering (`flutter_math_fork`), grading, and result generation (with PDF export capabilities).
* **Enrollment (`enrollment_controller.dart`):** Handling user-to-course subscriptions.

## 4. Team Roles & Responsibilities

### **1. You (Deployment, Integration & UI)**
* **API Integration:** Connected the Flutter application to the Node.js/Express.js backend, handling HTTP requests, data parsing, and state updates using GetX.
* **App Deployment:** Managing the end-to-end release process for Android/iOS builds to the respective App Stores.
* **CI/CD Pipeline:** Configured and managed **GitHub Actions** workflows for automated testing, building, and deployment processes.
* **UI Development:** Developed select key screens and integrated core logic into the frontend components.
* **Notification Setup:** Configured Firebase integrations and push notification pipelines.

### **2. Backend Developer**
* **Backend Architecture:** Developed the foundational Node.js/Express.js APIs.
* **Database Management:** Designed and maintained the PostgreSQL database schemas and optimized queries.
* **Cloud Integration:** Implemented AWS Cognito for secure, reliable authentication and AWS S3 for scalable media/document storage.
* **Server Management:** Deployed, configured, and managed the deployment environment on AWS EC2 instances.

### **3. Flutter Developer (UI/Frontend)**
* **UI Construction:** Responsible for building the vast majority of the Flutter screens (Splash, Auth, Dashboard, Quiz UI, Course Player, Explorer).
* **Styling & Responsiveness:** Ensured the app adhered to design requirements using tools like `flutter_screenutil` and customized widgets.
* **Component Architecture:** Developed reusable UI widgets inside `lib/widgets/` to assure visual consistency across the entire application.

## 5. Deployment & CI/CD workflow
* **Source Control:** GitHub
* **Automation:** GitHub Actions is used for CI/CD, containing automated scripts to validate the Flutter code (`flutter analyze`, `flutter test`), build App Bundles (`.aab` / `.apk`), compile iOS builds (`.ipa`), and push artifacts effectively.
* **Environments:** Managed securely via environment secrets within GitHub protecting EC2, S3, Cognito credentials, and keystores.

---
*Generated based on the Ascenders-Online repository structure and specifications.*