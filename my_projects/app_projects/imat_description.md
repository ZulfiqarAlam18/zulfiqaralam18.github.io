# IMAT App - Project Description

**IMAT App** is a comprehensive mobile application built to provide an e-learning platform where users can browse, purchase, and consume educational content such as courses, modules, lessons, and quizzes. The platform manages course progress, processes payments, handles video playback, and assesses user knowledge via interactive quizzes.

## 🧑‍💻 Roles & Responsibilities

### **My Role: Frontend Developer (Flutter)**
- **UI Development:** Translated design wireframes into highly responsive and visually appealing screens using Flutter and Material Design principles.
- **State Management & Architecture:** Structured the app utilizing GetX for state management, dependency injection, and clean navigation. 
- **API Integration:** Consumed and integrated REST APIs from the backend using the `dio` and `http` packages to synchronize data and handle asynchronous operations (e.g. course progress, profile updates, and video streaming).
- **Core Functionality:** Developed end-to-end features including user authentication, complex video playback scenarios (Chewie, Youtube Player), interactive quizzes, and local caching.

### **Backend Developer Role**
- **Backend Architecture & Development:** Engineered robust RESTful APIs to serve all endpoints necessary for the IMAT user-experience using **Node.js** with **Express.js**.
- **Database Management:** Designed and managed a relational database using **PostgreSQL** to handle normalized structures regarding user profiles, transactions, and course interactions.
- **Server Deployment & Maintenance:** Handled DevOps tasks, specifically deploying and maintaining the API and database on **Amazon EC2** instances.
- **Cloud Integrations:** 
  - Managed file and media storage using **AWS S3** for course materials and videos.
  - Implemented secure user authentication and authorization utilizing **AWS Cognito**.

---

## 🏗️ Architecture & Tech Stack

### **Frontend App (Flutter)**
Built heavily adhering to Clean Architecture structure (`core`, `data`, `domain`, `presentation`) to separate concerns significantly well alongside GetX bindings.
- **Framework:** Flutter (Dart ^3.8.1)
- **State Management:** GetX (`get: ^4.7.3`)
- **Networking:** Dio (`dio: ^5.4.0`), HTTP (`http: ^1.6.0`)
- **Storage:** Shared Preferences, Flutter Secure Storage
- **UI & Typography:** Google Fonts, Flutter ScreenUtil (responsive layouts), Flutter Svg, Hugeicons
- **Media Playback:** Video Player, Chewie, Youtube Player Flutter

### **Backend Server & Infrastructure**
- **Runtime / Framework:** Node.js, Express.js
- **Database:** PostgreSQL
- **Hosting:** Amazon Elastic Compute Cloud (EC2)
- **Authentication:** Amazon Cognito
- **Asset Storage:** Amazon Simple Storage Service (S3)

---

## 📂 Project Structure (Frontend)

The codebase is organized adopting clean architecture methodologies:

```
lib/
├── core/             # Base level configurations, utilities, and theme data (e.g., core/theme, core/network)
├── data/             # API data handling, data sources, repositories implementations, and models
├── domain/           # Core business logic, Entities, and Use Cases 
├── presentation/     # UI layer consisting of GetX logic 
│   ├── bindings/     # Dependency injection configurations via GetX
│   ├── controllers/  # State controllers handling UI logic and states
│   ├── pages/        # The screens making up the app
│   └── widgets/      # Reusable UI components
├── routes/           # Routing configuration 
├── di.dart           # Global dependency injection setup
└── main.dart         # Entry point configuring the root MaterialApp
```

---

## 🛠️ Key Features

### 1. 🔐 User Authentication & Security
- Secure Sign In / Sign Up, and Password Reset processes connected via AWS Cognito.
- Features dynamic multi-stage onboarding (Splash screens 1 -> 4).
- Secure token storage utilizing `flutter_secure_storage`.

### 2. 📚 Course & Curriculum Management
- **Course Exploration:** Detailed screens for viewing course lists and granular metadata (`course_page.dart`, `courseDetails.dart`).
- **Learning Interface:** Segregated pages to dive deep into `module_page.dart` and `lesson_page.dart`.
- **Media Support:** Extensive video player integrations using native video capabilities or YouTube.
- **Progress Tracking:** Tracks metrics for course completion directly sent to the Node.js backend (`courseProgress_page.dart`).

### 3. 🧠 Interactive Quizzes
- Pre-quiz setups and ongoing quiz assessments via `quiz_page.dart`.
- Evaluation functionality with a summarized graphical `quiz_result_page.dart`.

### 4. 💳 Payments & Transactions
- Handling the financial capabilities within `buy_course.dart` alongside summarizing the status via `payment_details_page.dart` & `payment_success_page.dart`.
- Tracking user purchase records via `transaction_page.dart`.

### 5. 🔔 Notifications & Profile
- Live alerts integrated into the application (`notifications.dart`).
- User profile editing capabilities and App-wide preferences configurations (`profile_page.dart`, `settings_page.dart`).
