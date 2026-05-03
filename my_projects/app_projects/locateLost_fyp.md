# LocateLost - Complete Project Documentation

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Platform**: Cross-Platform Mobile (Flutter)  
**Status**: Active Development

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Frontend Technology Stack](#frontend-technology-stack)
4. [Backend Technology Stack](#backend-technology-stack)
5. [Infrastructure & Deployment](#infrastructure--deployment)
6. [Team Roles & Responsibilities](#team-roles--responsibilities)
7. [Frontend Architecture](#frontend-architecture)
8. [Backend Architecture](#backend-architecture)
9. [Key Features](#key-features)
10. [Data Models](#data-models)
11. [API Integration](#api-integration)
12. [State Management](#state-management)
13. [Navigation Flow](#navigation-flow)
14. [UI Components & Widgets](#ui-components--widgets)
15. [Authentication & Security](#authentication--security)
16. [Services & Utilities](#services--utilities)
17. [Development Workflow](#development-workflow)
18. [Deployment Guide](#deployment-guide)
19. [Code Conventions & Best Practices](#code-conventions--best-practices)

---

## Project Overview

**LocateLost** is a comprehensive mobile application designed to locate and report missing children using advanced facial recognition technology. The application connects three key stakeholder groups:

- **Parents/Guardians**: Report missing children with detailed information and photos
- **Finders**: Report found children and contribute to the matching system
- **Authorities/Police**: Access, manage, and investigate cases with advanced search and filtering

### Core Objectives

- Provide a unified platform for missing children reports and search
- Use facial recognition APIs for intelligent child matching
- Enable real-time location-based matching and notifications
- Facilitate communication between parents, finders, and authorities
- Maintain secure, compliant data storage per regional laws

### Key Statistics

- **App Name**: LocateLost
- **Current Version**: 1.0.0
- **Supported Platforms**: Android (native), iOS (native), Web (Flutter Web)
- **Design Framework**: Material Design 3
- **Target Screen Size**: 430x932 (Mobile-first with responsive scaling)

---

## Architecture & Tech Stack

### Overall Architecture Pattern

```
┌──────────────────────────────────────────────────────────────┐
│                    Flutter Frontend (Mobile)                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  UI Layer   │→ │ State Layer   │→ │  Service Layer   │    │
│  │  (Screens)  │  │ (GetX)        │  │  (Helpers)       │    │
│  └─────────────┘  └──────────────┘  └──────────────────┘    │
│         ↓                                    ↓                │
│     SharedPreferences & Get Storage    ← Local Caching      │
└──────────────────────────────────────────────────────────────┘
                         ↓ HTTP REST API ↓
┌──────────────────────────────────────────────────────────────┐
│           Backend Server (Node.js/Express + PostgreSQL)      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │ API Routes   │→ │ Controllers  │→ │  Database Layer │    │
│  └──────────────┘  └──────────────┘  └─────────────────┘    │
└──────────────────────────────────────────────────────────────┘
       ↓ S3 Upload          ↓ AWS Cognito         ↓ PostgreSQL
  ┌─────────────┐      ┌──────────────┐    ┌──────────────┐
  │  AWS S3     │      │ AWS Cognito  │    │  PostgreSQL  │
  │  (Images)   │      │ (Auth)       │    │  (Main DB)   │
  └─────────────┘      └──────────────┘    └──────────────┘
```

---

## Frontend Technology Stack

### Core Framework
- **Flutter SDK**: ^3.9.2 (Framework)
- **Dart**: Primary language for all Flutter development

### State Management
- **GetX**: ^4.7.2 - Primary state management and service locator
  - Reactive state management with `.obs` observables
  - Dependency injection with `Get.lazyPut()` and `Get.put()`
  - Routing and navigation management
  - Bindings for lazy-loading controllers per route

### UI & Design
- **Flutter ScreenUtil**: ^5.9.3 - Responsive design and sizing
  - Design base size: `430x932` pixels
  - Responsive units: `.w` (width), `.h` (height), `.r` (radius), `.sp` (font size)
  - Scales across all devices automatically
  
- **Google Fonts**: ^6.3.1 - Custom typography
- **Material Design**: Built-in Flutter Material components
- **Custom Theming**: `app_colors.dart` with semantic color palette

### Data & Storage
- **SharedPreferences**: ^2.5.3 - Secure credential and session storage
  - Stores: Access tokens, refresh tokens, user data, preferences
  - Post-login persistence across app restarts
  
- **GetStorage**: ^2.1.1 - Lightweight local data persistence
  - Encrypted key-value storage
  - Alternative to SharedPreferences for non-sensitive data

### Networking
- **HTTP**: ^1.5.0 - RESTful API client
  - 30-second request timeout
  - Multipart form-data for file uploads
  - JSON request/response handling
  
- **Dio**: ^5.9.0 - Advanced HTTP client (for future use)
  - Better error handling
  - Request/response interceptors
  - Automatic retry logic

### File & Media Handling
- **Image Picker**: ^1.2.0 - Select images from gallery
- **Camera**: ^0.11.2 - Capture images via device camera
- **Path Provider**: ^2.1.5 - Access app-specific directories
- **Path**: ^1.9.1 - Cross-platform path utility

### Location Services
- **Geolocator**: ^13.0.1 - GPS location access
  - Get current coordinates (latitude, longitude)
  - Continuous location tracking
  - Distance calculation
  
- **Permission Handler**: ^12.0.1 - Runtime permission management
  - Request location permissions
  - Handle permission states (denied, denied forever, granted)
  - Show permission dialogs

### Visualization & Charts
- **FL Chart**: ^1.1.0 - Beautiful chart library
- **Charts Flutter**: ^0.12.0 - Alternative charting library
- **Percent Indicator**: ^4.2.5 - Progress indicators and statistics display

### UI Enhancements
- **Carousel Slider**: ^5.1.1 - Image carousel and gallery views
- **Smooth Page Indicator**: ^1.2.1 - Page indicator dots
- **Dotted Border**: ^3.1.0 - Dotted border decorations
- **Cupertino Icons**: ^1.0.8 - iOS-style icons

### Development Tools
- **Flutter Lints**: ^5.0.0 - Code quality linting
- **Flutter Launcher Icons**: ^0.14.1 - Generate app icons for all platforms

---

## Backend Technology Stack

### Runtime & Framework
- **Node.js**: JavaScript runtime environment
- **Express.js**: RESTful API framework
  - Routing and HTTP handling
  - Middleware for authentication, logging, error handling
  - JSON request/response processing

### Database
- **PostgreSQL**: Relational database management system
  - User data storage (parent, finder, authority profiles)
  - Case/report records with relationships
  - Audit logs and historical data
  - Transactions for data consistency

### Authentication & Authorization
- **AWS Cognito**: Managed authentication service
  - User sign-up and login
  - JWT token generation and validation
  - Multi-factor authentication support (future)
  - User pool management
  - Identity verification

### File Storage
- **AWS S3** (Simple Storage Service): Cloud object storage
  - Store report images and photos
  - CDN distribution for image serving
  - Bucket policies for access control
  - Lifecycle policies for old data retention/cleanup

### Environment & Configuration
- **.env files**: Environment variables for configuration
  - Database credentials
  - AWS credentials and region
  - API keys and token secrets
  - Base URLs and endpoints

---

## Infrastructure & Deployment

### Hosting & Deployment

#### Frontend Deployment
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **Web**: Firebase Hosting or AWS S3 + CloudFront

#### Backend Deployment
- **Server**: AWS EC2 (Ubuntu 20.04+)
  - Process Management: PM2
  - Reverse Proxy: Nginx (80/443)
  - Auto-restart on reboot: PM2 startup scripts
  
#### Database
- **PostgreSQL**: AWS RDS or EC2-hosted with daily automated backups

#### SSL/TLS
- AWS Certificate Manager or Let's Encrypt
- HTTPS enforcement on all endpoints

### Current Development URLs
- **Base URL**: Development tunnels (changes frequently)
- Update `lib/utils/constants/endpoints.dart` with production URLs

---

## Team Roles & Responsibilities

### Frontend Developer (Flutter UI Development)
**Your Role**: Primary Flutter application development

#### Responsibilities
1. **UI/UX Implementation**
   - Design and implement screen layouts per Material Design 3 spec
   - Use Flutter ScreenUtil for responsive design
   - Implement custom widgets and components
   - Handle responsive adjustments for tablet/desktop screens

2. **State Management**
   - Create and maintain GetX controllers
   - Implement observable variables and reactive updates
   - Ensure proper binding configuration in routes
   - Handle loading, error, and success states

3. **Feature Development**
   - Parent report feature (upload photos, fill details)
   - Finder report feature (camera capture, image selection)
   - Navigation and routing setup
   - Dashboard and analytics views
   - Settings and profile management

4. **Complex Widgets**
   - Custom TextFormField with validation
   - Custom elevated buttons with loading states
   - Reusable dialogs and modals
   - Image gallery and carousel components
   - Skeleton loaders for smooth loading UX

5. **Testing & Quality Assurance**
   - Write unit tests for controllers
   - Perform widget testing
   - Test on multiple device sizes
   - Debug and fix UI issues

### Backend Developer (API & Deployment)
**Role**: Server-side development and AWS infrastructure management

#### Responsibilities

1. **API Development**
   - Design and implement RESTful endpoints
   - Implement CRUD operations for reports
   - Create search and filter endpoints
   - Handle multipart file uploads to S3
   - API documentation and versioning

2. **Authentication & Security**
   - AWS Cognito integration
   - JWT token management
   - Bearer token validation middleware
   - CORS configuration for frontend access
   - Password hashing and security

3. **Database Management**
   - PostgreSQL schema design
   - Table relationships and constraints
   - Database migrations
   - Query optimization
   - Backup and recovery procedures

4. **AWS Infrastructure**
   - EC2 instance setup and configuration
   - S3 bucket configuration and policies
   - AWS Cognito user pool setup
   - IAM roles and permissions
   - Security group and VPC configuration

5. **Deployment & DevOps**
   - Code deployment to EC2
   - PM2 process management
   - Nginx reverse proxy setup
   - SSL/TLS certificate management
   - Monitoring and logging
   - Troubleshooting and incident response

6. **AWS Services Configuration**
   - S3:
     - Bucket creation and naming
     - CORS policies for frontend access
     - Pre-signed URLs for secure uploads/downloads
     - Lifecycle policies
   - Cognito:
     - User pool creation
     - App client configuration
     - User attributes setup
     - Email verification flows
   - EC2:
     - Instance launch and sizing
     - Key pair creation for SSH access
     - Elastic IP for static address
     - CloudWatch monitoring

#### Team Collaboration
- Maintain API_DOCUMENTATION.md for frontend integration
- Provide backend URLs and endpoints to frontend team
- Support frontend team with API debugging
- Regular communication about deployment schedule

---

## Frontend Architecture

### GetX State Management Pattern

#### Controller Lifecycle
```
1. Binding → Get.lazyPut() in GetPage
2. First navigation to route → Controller initialization
3. onInit() called → Load data, initialize
4. While active → State changes via observable.value = newValue
5. Obx() rebuild → UI reacts to changes
6. Navigation away → onClose() called (cleanup)
```

#### Observable Variables Pattern
```dart
class MyController extends GetxController {
  final RxBool isLoading = false.obs;
  final RxString userName = ''.obs;
  final RxList<Item> items = <Item>[].obs;
  
  void updateUser(String name) {
    userName.value = name;  // Triggers Obx rebuild
  }
}
```

#### UI Reaction Pattern
```dart
// Automatic rebuild on observable change
Obx(() => Text(MyController.instance.userName.value))

// Multiple observables
Obx(() => isLoading.value 
  ? LoadingWidget() 
  : ContentWidget()
)
```

### Data Flow

```
UI Event (Button tap, Form submit)
    ↓
Controller Method (async)
    ↓
Observable.value = loading
    ↓ Obx updates UI
Network Call (API Helper)
    ↓
Parse Response Model
    ↓
Observable.value = result
    ↓ Obx updates UI
```

### Local Persistence

**SharedPreferences** (for auth/sensitive data):
```dart
// Save
final prefs = await SharedPreferences.getInstance();
await prefs.setString('accessToken', token);

// Load
final token = prefs.getString('accessToken');
```

---

## Backend Architecture

### API Structure

**Base URL**: `https://j03ps88p-5000.asse.devtunnels.ms/` (Development - changes frequently)

**Authentication**: All protected endpoints require `Authorization: Bearer {accessToken}` header

**API Endpoints**:
- **Auth** (`/api/auth/`): `POST /login`, `POST /signup`, `POST /logout`, `POST /refresh-token`
- **Users** (`/api/users/`): `GET /profile`, `PUT /profile`, `PUT /profile/image`
- **Parent Reports** (`/api/reports/parent/`): `POST /`, `GET /my`, `GET /:reportId`, `PUT /:reportId`, `DELETE /:reportId`
- **Finder Reports** (`/api/reports/finder/`): `POST /`, `GET /my`, `GET /:reportId`, `PUT /:reportId`, `DELETE /:reportId`
- **Matches** (`/api/matches/`): `GET /`, `POST /:matchId/confirm`

**Response Format**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {"page": 1, "limit": 10, "total": 50, "pages": 5}
}
```

### Database Schema (PostgreSQL)

**Users**: `id, name, email, phone, role, passwordHash, isVerified, profileImage, timestamps`

**Parent Reports**: `id, parentId, childName, fatherName, gender, lostTime, contactNumber, emergency, placeLost, additionalDetails, status, imageUrls (JSONB), timestamps`

**Finder Reports**: `id, finderId, childName, fatherName, gender, foundTime, contactNumber, emergency, placeFound, additionalDetails, status, imageUrls (JSONB), timestamps`

**Matches**: `id, parentReportId, finderReportId, matchScore, status, confirmedBy, timestamps`

### AWS Integration

**Cognito**: User sign-up/login, JWT tokens, user pool management
**S3**: Image storage with CORS policies for frontend access
**EC2**: Host Node.js backend with PM2 process management

---

## Key Features

### 1. Authentication System

**Sign Up Flow:**
- User enters email, phone, password, name, role
- Backend validates and creates user via AWS Cognito
- JWT tokens returned (access + refresh)
- User data saved to SharedPreferences
- Automatic redirect to Home screen

**Login Flow:**
- User enters email and password
- API validates credentials
- JWT tokens returned
- User data persisted
- Session restored on app restart

**Token Management:**
- Access Token: Short-lived (15-30 minutes)
- Refresh Token: Long-lived (7-30 days)
- Automatic refresh on expiration (future implementation)

### 2. Parent Report Feature

**Flow:**
1. Missing Person Details Screen
   - Child name (required)
   - Father name (required)
   - Gender (required)
   - Place lost (optional)
   - Lost date and time (required)

2. Reporter Details Screen
   - Contact number (required)
   - Emergency contact (required)
   - Additional details (optional)

3. Upload Images Screen
   - Capture 1-5 photos via camera
   - Select from gallery
   - Preview and remove images

4. Case Summary Screen
   - Review all entered data
   - Confirm and submit
   - Show success dialog

**Backend Processing:**
- Validate all required fields
- Upload images to S3
- Create report record in PostgreSQL
- Return success with report ID

### 3. Finder Report Feature

**Flow:**
Similar to parent but with optional fields:
- All details are optional
- Can upload photos without details (search-based)
- Multi-step form with camera-first option

**Key Difference:**
- Designed to support quick photo capture first
- Details can be filled later
- Enables rapid reporting if child is found

### 4. Case Matching System

**Facial Recognition Integration (Future):**
- ML model to compare reported faces
- Automatic matching of similar faces
- Match confidence scoring
- Manual review and confirmation

**Matching Workflow:**
1. New finder report created
2. ML model compares with parent reports
3. Potential matches scored
4. Display to parent with confidence
5. Parent confirms or rejects match

### 5. Location-Based Features

**GPS Location Tracking:**
- Request location permission on app startup
- Store location when reports created
- Display location on map view
- Finding reports near lost location

**Map Screen:**
- Show nearby finder reports
- Distance calculation
- Filter by date, distance
- Real-time updates (future: WebSocket)

### 6. Case Management

**My Cases Screen:**
- List all parent reports (created by user)
- List all finder reports (created by user)
- Filter by status (active, investigating, resolved)
- Search by child name
- Pagination support (10 items per page)
- Pull-to-refresh

**Case Details Screen:**
- Full report information
- All uploaded images
- Current status
- Edit option (future)
- Close or reopen case

### 7. Notifications

**Types:**
- New potential match found
- Case status updated
- Admin message
- Expiration warnings

**Delivery (Future):**
- Firebase Cloud Messaging (FCM)
- In-app notification drawer
- Push notifications

### 8. Settings & Profile

**User Profile:**
- View personal information
- Edit profile information
- Upload profile picture
- Change password

**Settings Screens:**
- Notification preferences
- Privacy settings
- Language selection
- Appearance (theme)
- Support and feedback
- About app and terms
- Danger zone (logout, delete account)

---

## Data Models

### Auth Models
- **LoginRequest**: `{email, password}`
- **SignupRequest**: `{name, email, phone, password, role}`
- **AuthResponse**: `{success, message, data: {accessToken, refreshToken, user}}`
- **UserData**: `{id, name, email, phone, role, profileImage, isVerified, createdAt}`

### Parent Report Models
- **ParentReportRequest**: `{childName, fatherName, gender, lostTime, contactNumber, emergency, placeLost?, additionalDetails?, images[]}`
- **ParentReportResponse**: Parent report created with S3 image URLs
- **MyParentReportsResponse**: List with pagination `{page, limit, total, pages}`

### Finder Report Models
- **FinderReportRequest**: All fields optional (designed for flexible reporting)
- **FinderReportResponse**: Finder report created
- **MyFinderReportsResponse**: Paginated list of finder reports

---

## API Integration

### Network Configuration

**Base URL**: `lib/utils/constants/endpoints.dart`
```dart
const String Base_URL = 'https://j03ps88p-5000.asse.devtunnels.ms/';
const String Login_Endpoint = 'api/auth/login';
const String Register_Endpoint = 'api/auth/signup';
const String Parent_Report_Create = 'api/reports/parent';
```

### HTTP Client Configuration

**Timeout**: 30 seconds per request
**Error Handling**: Custom error messages and user-friendly dialogs
**Logging**: Debug prints with emoji prefixes

```dart
print('📤 POST request to: $url');      // Request sent
print('📥 Response status: ${status}'); // Response received
print('✅ Operation successful');       // Success
print('❌ Error: $message');           // Error
```

### Request/Response Pattern

All API calls follow this pattern:

```dart
Future<ResponseModel> apiCall(RequestModel request) async {
  try {
    print('🔐 Attempting operation...');
    
    final url = Uri.parse('$Base_URL$Endpoint');
    print('📤 POST request to: $url');
    
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $accessToken', // If protected
      },
      body: jsonEncode(request.toJson()),
    ).timeout(const Duration(seconds: 30));

    print('📥 Response status: ${response.statusCode}');
    print('📥 Response body: ${response.body}');

    final responseData = jsonDecode(response.body);

    if (response.statusCode == 200 || response.statusCode == 201) {
      print('✅ Operation successful');
      return ResponseModel.fromJson(responseData);
    } else {
      print('❌ Operation failed: ${responseData['message']}');
      return ResponseModel(
        success: false,
        message: responseData['message'] ?? 'Failed',
      );
    }
  } catch (e) {
    print('❌ Error: $e');
    return ResponseModel(
      success: false,
      message: 'An error occurred: ${e.toString()}',
    );
  }
}
```

### Multipart File Upload Pattern

Used for reports with images:

```dart
final uri = Uri.parse('$Base_URL$Endpoint');
final multipartRequest = http.MultipartRequest('POST', uri);

// Add form fields
multipartRequest.fields.addAll(request.toFormData());

// Add files
for (var file in images) {
  final multipartFile = await http.MultipartFile.fromPath(
    'images',
    file.path,
    filename: file.path.split('/').last,
    contentType: MediaType.parse('image/jpeg'),
  );
  multipartRequest.files.add(multipartFile);
}

// Add headers
multipartRequest.headers.addAll(headers);

// Send request
final streamedResponse = await multipartRequest.send().timeout(
  const Duration(seconds: 60)
);
final response = await http.Response.fromStream(streamedResponse);
```

---

## State Management

### GetX Pattern Implementation

#### Controller Structure
```dart
class MyController extends GetxController {
  // Singleton pattern
  static MyController get instance => Get.find<MyController>();
  
  // Observable variables
  final RxBool isLoading = false.obs;
  final RxList<Item> items = <Item>[].obs;
  
  // Dependencies
  final MyHelper _helper = MyHelper();
  
  @override
  void onInit() {
    super.onInit();
    _loadInitialData();
  }
  
  Future<void> _loadInitialData() async {
    isLoading.value = true;
    try {
      // Logic here
    } finally {
      isLoading.value = false;
    }
  }
  
  @override
  void onClose() {
    // Cleanup if needed
    super.onClose();
  }
}
```

#### Route Binding
```dart
GetPage(
  name: AppRoutes.home,
  page: () => const HomeScreen(),
  binding: BindingsBuilder(() {
    Get.lazyPut<MyController>(() => MyController());
  }),
)
```

#### Widget Reactive Update
```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Obx(
      () => MyController.instance.isLoading.value
        ? LoadingWidget()
        : ListView(
            children: MyController.instance.items
              .map((item) => ItemTile(item))
              .toList(),
          ),
    );
  }
}
```

---

## Navigation Flow

### App Navigation Structure

```
SplashScreen
    ↓
Check isLoggedIn
    ├→ No → LoginScreen → SignupScreen → MainNavigationScreen
    └→ Yes → MainNavigationScreen
             ├─ HomeScreen (index: 0)
             ├─ MyCasesScreen (index: 1)
             ├─ CaseDetailsScreen (index: 2)
             └─ MapNearbyReportsScreen (index: 3)

Drawer/Menu
├─ Profile
├─ About
├─ Emergency
├─ Contact Us
├─ FAQ
├─ Stats
├─ Terms & Conditions
└─ Settings (Multiple sub-screens)

Parent Report Flow
├─ MissingPersonDetailsScreen
├─ ReporterDetailsScreen
├─ UploadImagesScreen
└─ ParentCaseSummaryScreen

Finder Report Flow
├─ CameraCaptureScreen (Optional)
├─ FoundPersonDetailsScreen
├─ FinderUploadImagesScreen
└─ FinderCaseSummaryScreen
```

### Navigation Methods

```dart
// Navigate to named route
Get.toNamed(AppRoutes.login);

// Navigate and clear stack
Get.offAllNamed(AppRoutes.mainNavigation);

// Navigate with arguments
Get.toNamed(AppRoutes.caseDetail, arguments: {'reportId': '123'});

// Navigate with initial index for bottom nav
Get.toNamed(AppRoutes.mainNavigation, arguments: 2);

// Go back
Get.back();

// Switch bottom nav tab
NavigationHelper.switchTab(1);
```

---

## UI Components & Widgets

### Core Custom Widgets

#### CustomAppBar
- Configurable back button
- Title and subtitle
- Optional leading/trailing actions
- Responsive height

#### CustomTextFormField
- Text input with validation
- Prefix/suffix icons
- Password field support
- Error message display
- Counter for character limit

#### CustomElevatedButton
- Primary button with customizable colors
- Loading state with spinner
- Disabled state handling
- Responsive sizing

#### CustomBottomNavigation
- 4-tab bottom navigation
- Active/inactive styling
- Icon + label display
- Tab switching with smooth animation

#### CaseSubmissionDialog
- Success/Error feedback after submission
- Action buttons
- Report ID display
- Styled with app colors

#### AnimatedLoadingDialog
- Spinning loader animation
- Cancel option
- Blur background overlay
- Non-dismissible by default

#### SkeletonShimmer / SkeletonCardLoader
- Placeholder loading animation
- Shimmer effect (left to right)
- Multiple card/item variants
- Customizable dimensions

#### ReportCard
- Display report summary
- Image thumbnail
- Child name and status
- Date and action buttons

---

## Authentication & Security

### Token Management

**Access Token:**
- Short-lived (15-30 minutes)
- Used in `Authorization: Bearer` header
- Stored in SharedPreferences

**Refresh Token:**
- Long-lived (7-30 days)
- Enables silent token refresh
- Securely stored encrypted

**Logout Process:**
1. Clear all SharedPreferences keys
2. Send logout request to backend
3. Invalidate refresh token on server
4. Navigate to login screen

### AWS Cognito Integration

**User Pool Configuration:**
- Email-based authentication
- Optional multi-factor authentication
- User attribute verification
- Password complexity requirements

**Flutter Integration:**
1. Configure AWS credentials
2. Implement sign-up/login via Cognito
3. Handle JWT tokens
4. Store tokens securely

### API Security

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer {accessToken}`

**HTTPS Enforcement:**
- All requests to HTTPS endpoint
- Certificate pinning (future)

**Input Validation:**
- Frontend validation for UX
- Backend validation for security
- SQL injection prevention (parameterized queries)

---

## Services & Utilities

### LocationService

**Features:**
- Check if location services enabled
- Request location permissions
- Get current GPS coordinates
- Calculate distance between points
- Handle permission states

**Permission States:**
- `denied`: Not requested yet
- `deniedForever`: Permanently denied
- `whileInUse`: Granted while using app
- `always`: Granted all the time

**Usage:**
```dart
final location = LocationService.instance;
final permission = await location.requestLocationPermission();
if (permission == LocationPermission.whileInUse) {
  final position = await location.getCurrentLocation();
  print('Lat: ${position.latitude}, Lng: ${position.longitude}');
}
```

### DialogUtils

**Methods:**
- `showLoadingDialog()`: Animated loading modal
- `showCaseSubmissionSuccess()`: Success feedback
- `showError()`: Error message dialog
- `showConfirmation()`: Yes/No confirmation

**Pattern:**
```dart
DialogUtils.showLoadingDialog();
// Do async work
Get.back(); // Close dialog
DialogUtils.showCaseSubmissionSuccess(reportId);
```

---

## Development Workflow

### Setting Up Development Environment

#### Prerequisites
- Flutter SDK ^3.9.2
- Dart SDK (included with Flutter)
- Android Studio with Android SDK (for Android development)
- Xcode (for iOS development)
- Git for version control

#### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd locate-lost

# Install dependencies
flutter pub get

# Run app on connected device/emulator
flutter run

# Run on web
flutter run -d chrome --web-renderer html

# Run on iOS (macOS only)
flutter run -d ios
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/name
   ```

2. **Make Changes**
   - Edit files in `lib/`
   - Test locally with `flutter run`

3. **Follow Code Conventions** (See next section)

4. **Test Changes**
   ```bash
   flutter test                    # Run unit tests
   flutter drive                   # Run integration tests
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: describe what changed"
   git push origin feature/name
   ```

6. **Create Pull Request**
   - Describe changes
   - Request review
   - Address feedback

### Hot Reload vs Hot Restart

**Hot Reload** (Press `r` in terminal):
- Reloads code without full app restart
- Preserves app state
- Works for most code changes
- Fails for: Model changes, main() changes

**Hot Restart** (Press `R` in terminal):
- Full app restart
- Clears all state
- Slower but more reliable
- Use for structural changes

### Build Commands

```bash
# Build APK for Android
flutter build apk --release

# Build AAB for Play Store
flutter build appbundle --release

# Build IPA for iOS
flutter build ios --release

# Build web
flutter build web --release

# Enable Null Safety
flutter pub global activate null_safety_cli
```

---

## Deployment Guide

### Frontend Deployment

#### Android (Google Play Store)

1. **Prepare:**
   ```bash
   # Update version in pubspec.yaml
   version: 1.0.0+1
   
   # Build APK
   flutter build apk --release
   
   # Or build AAB (recommended)
   flutter build appbundle --release
   ```

2. **Create Play Store Account**
   - Register developer account
   - Add payment method
   - Create app listing

3. **Upload Build**
   - Go to Play Console
   - Create new release
   - Upload AAB file
   - Add release notes
   - Review and publish

#### iOS (Apple App Store)

1. **Prepare:**
   ```bash
   # Update version in iOS project
   # Build IPA
   flutter build ios --release
   ```

2. **Create App Store Account**
   - Register Apple Developer account
   - Create app identifier
   - Create provisioning profiles

3. **Upload via Xcode or Transporter**
   ```bash
   # Using Xcode
   # Open Runner.xcworkspace
   # Archive and upload
   ```

### Backend Deployment (EC2)

#### Step-by-Step Deployment

1. **Launch EC2 Instance**
   ```bash
   # Use Ubuntu 20.04 LTS
   # Instance type: t3.medium or larger
   # Security groups: Allow 80, 443, 5000 (dev), 22 (SSH)
   ```

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-address
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install -y postgresql postgresql-contrib
   sudo -u postgres createdb locate_lost
   ```

4. **Deploy Application**
   ```bash
   # Clone repository
   git clone <backend-repo-url>
   cd locate-lost-backend
   
   # Install npm dependencies
   npm install --production
   
   # Create .env file
   cp .env.example .env
   # Edit .env with production values
   ```

5. **Configure PM2 (Process Manager)**
   ```bash
   # Install PM2 globally
   sudo npm install -g pm2
   
   # Start application
   pm2 start app.js --name "locate-lost-api"
   
   # Setup startup script
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx Reverse Proxy**
   ```bash
   # Install Nginx
   sudo apt install -y nginx
   
   # Create config file
   sudo nano /etc/nginx/sites-available/locate-lost
   ```
   
   **Nginx Config:**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
   
   ```bash
   # Enable config
   sudo ln -s /etc/nginx/sites-available/locate-lost /etc/nginx/sites-enabled/
   
   # Test and restart
   sudo nginx -t
   sudo systemctl restart nginx
   sudo systemctl enable nginx
   ```

7. **Setup SSL Certificate**
   ```bash
   # Install Certbot
   sudo apt install -y certbot python3-certbot-nginx
   
   # Generate certificate
   sudo certbot certonly --standalone -d your-domain.com
   
   # Update Nginx for HTTPS
   sudo certbot renew --nginx
   ```

8. **Update Frontend API Endpoint**
   ```dart
   // lib/utils/constants/endpoints.dart
   const String Base_URL = 'https://your-domain.com/';
   ```

9. **Rebuild and Deploy Frontend**
   ```bash
   flutter pub get
   flutter build apk --release
   flutter build ios --release
   # Upload to stores
   ```

### Monitoring & Maintenance

#### Check Application Status
```bash
# View PM2 processes
pm2 list

# View application logs
pm2 logs locate-lost-api

# Restart application
pm2 restart locate-lost-api

# Stop application
pm2 stop locate-lost-api
```

#### Database Backups
```bash
# Backup PostgreSQL
sudo -u postgres pg_dump locate_lost > backup.sql

# Restore from backup
sudo -u postgres psql locate_lost < backup.sql
```

#### Monitor Server Resources
```bash
# Check CPU, memory, disk
top
df -h
du -h /path/to/app

# Check Nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Code Conventions & Best Practices

### Dart/Flutter Code Style

#### File Organization
```dart
// 1. Imports
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'relative/imports.dart';

// 2. Constants
const String CONSTANT_NAME = 'value';

// 3. Main class
class MyWidget extends StatelessWidget {
  const MyWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

// 4. Helper functions (if needed)
String helperFunction() => 'value';
```

#### Naming Conventions
- **Classes**: PascalCase (`AuthController`, `LoginScreen`)
- **Constants**: UPPER_SNAKE_CASE (`API_KEY`, `DEFAULT_TIMEOUT`)
- **Variables/Methods**: camelCase (`userName`, `submitForm()`)
- **Private methods**: _camelCase (`_loadInitialData()`)
- **Files**: snake_case (`auth_controller.dart`)

#### GetX Controller Template
```dart
class MyController extends GetxController {
  // Singleton
  static MyController get instance => Get.find<MyController>();
  
  // Observables
  final RxBool isLoading = false.obs;
  final RxString name = ''.obs;
  
  // Dependencies
  final MyHelper _helper = MyHelper();
  
  @override
  void onInit() {
    super.onInit();
    _loadData();
  }
  
  Future<void> _loadData() async {
    try {
      isLoading.value = true;
      // Logic
    } catch (e) {
      print('❌ Error: $e');
    } finally {
      isLoading.value = false;
    }
  }
  
  @override
  void onClose() {
    super.onClose();
  }
}
```

#### Error Handling
```dart
// Always use try-catch
try {
  // Code that might throw
} catch (e) {
  print('❌ Error: $e');
  errorMessage.value = 'An error occurred';
} finally {
  isLoading.value = false;
}
```

### Responsive Design Guidelines

#### Using ScreenUtil
```dart
// Width unit
Container(width: 100.w)  // 100 logical pixels

// Height unit
Container(height: 50.h)  // 50 logical pixels

// Border radius
BorderRadius.circular(12.r)

// Font size
Text('Hello', style: TextStyle(fontSize: 16.sp))

// Padding
Padding(padding: EdgeInsets.all(16.w))
```

#### Design Base Size
- Reference: `430x932` pixels
- Scales proportionally on all devices
- Test on: Phone (5.5"), Tablet (10"), Web

### Documentation Standards

#### Function Documentation
```dart
/// Loads user data from the server
/// 
/// Returns [Future<UserData>] with loaded user information
/// Throws [Exception] if network request fails
Future<UserData> loadUserData() async {
  // Implementation
}
```

#### TODO Comments
```dart
// TODO: Implement facial recognition matching
// FIXME: Fix memory leak in image gallery
// HACK: Temporary workaround for API issue
```

### Testing Standards

#### Unit Test Example
```dart
// test/controllers/auth_controller_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('AuthController', () {
    test('Login with valid credentials', () {
      // Arrange
      final controller = AuthController();
      
      // Act
      // controller.login('email', 'password');
      
      // Assert
      // expect(controller.isLoggedIn.value, true);
    });
  });
}
```

#### Widget Test Example
```dart
// test/views/login_screen_test.dart
void main() {
  testWidgets('Login screen renders properly', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    
    expect(find.byType(LoginScreen), findsOneWidget);
    expect(find.byType(TextField), findsWidgets);
  });
}
```

### Performance Best Practices

1. **Use Const Constructors**
   ```dart
   const Text('Hello')  // Good
   Text('Hello')        // Unnecessary rebuild
   ```

2. **Avoid Excessive Rebuilds**
   - Use `Obx()` only for observables
   - Avoid `GetBuilder` for new projects
   - Use `const` widgets where possible

3. **Image Optimization**
   - Cache images with `cached_network_image` (if added)
   - Use appropriate image formats (WebP when possible)
   - Limit image dimensions

4. **Memory Management**
   - Dispose controllers properly
   - Clear large collections in `onClose()`
   - Avoid holding large objects in memory

### Security Best Practices

1. **Never Hardcode Credentials**
   ```dart
   // WRONG
   const String API_KEY = 'abc123xyz';
   
   // RIGHT
   final apiKey = await _getApiKeyFromSecureStorage();
   ```

2. **Use HTTPS Only**
   - All API endpoints must be HTTPS
   - Enable certificate pinning (future)

3. **Validate Input**
   ```dart
   if (email.isEmpty || !email.contains('@')) {
     print('Invalid email');
     return;
   }
   ```

4. **Sanitize User Input**
   - Validate email format
   - Limit string lengths
   - Escape special characters

---

## Troubleshooting Common Issues

### Flutter Issues

#### "AuthController not found" Error
**Solution:** Ensure binding is added to route:
```dart
GetPage(
  name: AppRoutes.home,
  page: () => const HomeScreen(),
  binding: BindingsBuilder(() {
    Get.lazyPut<AuthController>(() => AuthController());
  }),
)
```

#### Images not displaying after upload
**Solution:** Verify S3 URL format and bucket permissions
- Check `imageUrls` in API response
- Ensure S3 bucket has public read access
- Verify file exists at path

#### Hot Reload not working
**Solution:** Use hot restart instead:
```
Press R in terminal
```

### Backend Issues

#### Database connection refused
**Solution:**
1. Verify PostgreSQL is running: `sudo systemctl status postgresql`
2. Check connection string in `.env`
3. Verify database exists: `sudo -u postgres psql -l`

#### Port 5000 already in use
**Solution:**
```bash
# Kill process using port 5000
sudo lsof -ti :5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

#### S3 upload fails
**Solution:**
1. Verify AWS credentials in `.env`
2. Check S3 bucket name is correct
3. Verify IAM permissions include S3 access
4. Check bucket CORS policy

#### PM2 process not running
**Solution:**
```bash
pm2 logs locate-lost-api  # Check logs
pm2 restart locate-lost-api  # Restart
pm2 delete locate-lost-api  # Delete and recreate
pm2 start app.js --name "locate-lost-api"
```

---

## Summary

**LocateLost** is a comprehensive missing children reporting and matching platform with:

- **Frontend:** Cross-platform Flutter mobile app using GetX for state management
- **Backend:** Node.js/Express REST API with PostgreSQL database
- **Cloud Services:** AWS Cognito for auth, S3 for image storage, EC2 for hosting
- **Key Features:** User authentication, parent/finder reporting, case matching, location services, notifications

### Next Steps for Development

1. ✅ **Project Setup**: Clone repository, install dependencies, configure environment
2. ✅ **Frontend Development**: Implement remaining screens and features
3. ✅ **Backend Development**: Complete API endpoints and database schema
4. ✅ **AWS Setup**: Configure Cognito, S3, and EC2 infrastructure
5. ⏳ **Integration Testing**: Test all frontend-backend interactions
6. ⏳ **Facial Recognition**: Integrate ML model for case matching
7. ⏳ **Notifications**: Implement Firebase Cloud Messaging
8. ⏳ **App Store Submission**: Prepare and publish to Play Store/App Store
9. ⏳ **Feedback & Iteration**: Gather user feedback and improve

### Team Communication

- Regular sync meetings between frontend and backend teams
- API documentation maintained in `API_DOCUMENTATION.md`
- Endpoint URLs updated in `lib/utils/constants/endpoints.dart`
- Backend URL: `https://j03ps88p-5000.asse.devtunnels.ms/` (development - changes frequently)

---

## Contact & Support

For questions or issues, refer to:
- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Copilot Instructions**: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Flutter Docs**: https://docs.flutter.dev/
- **GetX Docs**: https://github.com/jonataslaw/getx
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **AWS Docs**: https://docs.aws.amazon.com/

---

**Document Version**: 1.0  
**Last Updated**: April 2026  
**Maintained By**: Development Team  
**Status**: Active Development
