Collaborative Project: Cropix

Overview
- Cropix is a mobile-first crop disease detection and community platform.
- The Flutter app provides UI/UX, authentication, disease detection flow, and community features.
- The FastAPI backend hosts ML inference, community APIs, and user profile services.
- Backend is deployed on AWS EC2, images are stored in AWS S3, and authentication is handled by AWS Cognito.

Primary Features
- Disease detection from leaf images using a trained TensorFlow/Keras model.
- Confidence scoring, disease descriptions, and treatment recommendations from remedies.json.
- Community posts with images, comments, and likes.
- User profiles backed by Cognito user data.

Tech Stack
Frontend (Flutter)
- Flutter + Dart
- GetX for state management and routing
- amplify_flutter + amplify_auth_cognito for AWS Cognito auth
- http for API calls
- image_picker for image capture/selection
- flutter_screenutil for responsive layouts

Backend (FastAPI)
- FastAPI for REST APIs
- TensorFlow/Keras for model inference
- SQLAlchemy + PostgreSQL for community data
- boto3 for AWS S3 uploads
- python-dotenv for environment configuration
- Deployed on AWS EC2 with Uvicorn

Cloud Services
- AWS EC2: backend deployment
- AWS S3: community image storage
- AWS Cognito: authentication and JWT verification

Roles and Responsibilities
- Your role: Flutter UI development, backend deployment on EC2, and API integration.
- Backend developer role: FastAPI backend development and ML model training.

Architecture Summary
- Mobile app sends multipart/form-data requests to the FastAPI /detect endpoint.
- Backend preprocesses the image (224x224 RGB, EfficientNet preprocessing) and runs model inference.
- Backend returns predicted disease, confidence, description, and recommendations.
- Community endpoints handle posts, comments, likes, and optional image upload to S3.
- User endpoints integrate AWS Cognito JWTs for authenticated profile management.

Backend Details (FastAPI, EC2, S3, Cognito)
- FastAPI app in cropix_backend/main.py with /detect, /community, /users, /health, /classes routes.
- ML model file: cropix_backend/models/PlantsDiseaseDetection_Model (1).keras
- Class names: cropix_backend/models/class_names.json
- Remedies data: cropix_backend/remedies.json
- AWS S3: community image uploads, public-read objects, bucket and region configured by env vars.
- AWS Cognito: JWT verification in cropix_backend/auth.py
- Database: PostgreSQL by default, SQLite fallback for local dev.
- Deployed on EC2, bound to 0.0.0.0:8000 using Uvicorn.

Frontend Details (Flutter)
- GetMaterialApp with GetX routing and ScreenUtil configuration.
- Amplify Auth Cognito configured at startup.
- Detect module provides crop selection, camera/gallery image capture, and results UI.
- AuthService manages sign-up, sign-in, sign-out, and password reset flows.
- Multiple modules implement login, register, onboarding, profile, settings, dashboard, community, etc.

Repository Structure
- cropix_backend: FastAPI backend, ML model, and community services.
- gnec_hackathon2k25_project: Flutter application and platform scaffolding.

File-by-File Inventory

cropix_backend
- cropix_backend/.env.example: Example environment variables for DB and S3.
- cropix_backend/.gitignore: Git ignore rules for backend.
- cropix_backend/README.md: Backend quick start and endpoint summary.
- cropix_backend/auth.py: AWS Cognito JWT verification helpers and auth dependencies.
- cropix_backend/create_db.py: Creates PostgreSQL database and tables.
- cropix_backend/db.py: SQLAlchemy engine, session, and init_db.
- cropix_backend/main.py: FastAPI app, ML model loading, /detect and health endpoints, routers.
- cropix_backend/migrate_users.py: Migration script for users table and Cognito integration.
- cropix_backend/remedies.json: Disease descriptions and treatment recommendations.
- cropix_backend/requirements.txt: Python dependencies for backend and community services.
- cropix_backend/models/README.md: Notes about model file placement and formats.
- cropix_backend/models/PlantsDiseaseDetection_Model (1).keras: Trained ML model for disease detection.
- cropix_backend/models/class_names.json: Class index to disease name mapping.
- cropix_backend/community/__init__.py: Community package initializer.
- cropix_backend/community/crud.py: CRUD operations for posts, comments, and likes.
- cropix_backend/community/models.py: SQLAlchemy models for User, Post, Comment, Like.
- cropix_backend/community/routes.py: Community API routes and S3 image upload logic.
- cropix_backend/community/schemas.py: Pydantic schemas for API requests and responses.
- cropix_backend/community/user_routes.py: User profile APIs with Cognito integration.

gnec_hackathon2k25_project
- gnec_hackathon2k25_project/.gitignore: Git ignore rules for Flutter project.
- gnec_hackathon2k25_project/.metadata: Flutter tool metadata.
- gnec_hackathon2k25_project/analysis_options.yaml: Dart analyzer and lint settings.
- gnec_hackathon2k25_project/BACKEND_FRONTEND_INTEGRATION.md: Integration notes and API response format.
- gnec_hackathon2k25_project/IMAGE_UPLOAD_FIX.md: Image upload validation fix notes.
- gnec_hackathon2k25_project/QUICK_TEST.md: Quick test guide for backend and app.
- gnec_hackathon2k25_project/pubspec.yaml: Flutter package configuration and dependencies.
- gnec_hackathon2k25_project/pubspec.lock: Locked dependency versions.

Flutter lib
- gnec_hackathon2k25_project/lib/amplifyconfiguration.dart: Amplify configuration values.
- gnec_hackathon2k25_project/lib/main.dart: App entry point, Amplify setup, GetX routing.
- gnec_hackathon2k25_project/lib/app/constants/app_colors.dart: App color palette.
- gnec_hackathon2k25_project/lib/app/models/alert_model.dart: Alert data model.
- gnec_hackathon2k25_project/lib/app/routes/app_pages.dart: GetX page definitions and bindings.
- gnec_hackathon2k25_project/lib/app/routes/app_routes.dart: Route name constants.
- gnec_hackathon2k25_project/lib/app/services/auth_service.dart: Amplify Cognito auth service.
- gnec_hackathon2k25_project/lib/app/services/auth_service_email_testing.dart: Alternate auth service for testing flows.
- gnec_hackathon2k25_project/lib/app/views/widgets/plant_guard_logo.dart: Reusable logo widget.

Flutter modules (GetX pattern: bindings, controllers, views)
- gnec_hackathon2k25_project/lib/app/modules/alert_details/bindings/alert_details_binding.dart: Dependency binding for alert details.
- gnec_hackathon2k25_project/lib/app/modules/alert_details/controllers/alert_details_controller.dart: Controller for alert details.
- gnec_hackathon2k25_project/lib/app/modules/alert_details/views/alert_details_view.dart: UI for alert details.
- gnec_hackathon2k25_project/lib/app/modules/alerts/views/alerts_view.dart: Alerts list UI.
- gnec_hackathon2k25_project/lib/app/modules/change_password/bindings/change_password_binding.dart: Dependency binding for change password.
- gnec_hackathon2k25_project/lib/app/modules/change_password/controllers/change_password_controller.dart: Controller for change password.
- gnec_hackathon2k25_project/lib/app/modules/change_password/views/change_password_view.dart: UI for change password.
- gnec_hackathon2k25_project/lib/app/modules/community/views/community_view.dart: Community feed UI.
- gnec_hackathon2k25_project/lib/app/modules/dashboard/bindings/dashboard_binding.dart: Dependency binding for dashboard.
- gnec_hackathon2k25_project/lib/app/modules/dashboard/controllers/dashboard_controller.dart: Controller for dashboard.
- gnec_hackathon2k25_project/lib/app/modules/dashboard/views/dashboard_view.dart: Dashboard UI.
- gnec_hackathon2k25_project/lib/app/modules/detect/bindings/detect_binding.dart: Dependency binding for disease detection.
- gnec_hackathon2k25_project/lib/app/modules/detect/controllers/detect_controller.dart: Image capture and detection API calls.
- gnec_hackathon2k25_project/lib/app/modules/detect/views/detect_view.dart: Disease detection UI and result display.
- gnec_hackathon2k25_project/lib/app/modules/edit_profile/bindings/edit_profile_binding.dart: Dependency binding for edit profile.
- gnec_hackathon2k25_project/lib/app/modules/edit_profile/controllers/edit_profile_controller.dart: Controller for edit profile.
- gnec_hackathon2k25_project/lib/app/modules/edit_profile/views/edit_profile_view.dart: UI for edit profile.
- gnec_hackathon2k25_project/lib/app/modules/home/bindings/home_binding.dart: Dependency binding for home.
- gnec_hackathon2k25_project/lib/app/modules/home/controllers/home_controller.dart: Controller for home.
- gnec_hackathon2k25_project/lib/app/modules/home/views/home_view.dart: Home UI.
- gnec_hackathon2k25_project/lib/app/modules/image_preview/bindings/image_preview_binding.dart: Dependency binding for image preview.
- gnec_hackathon2k25_project/lib/app/modules/image_preview/controllers/image_preview_controller.dart: Controller for image preview.
- gnec_hackathon2k25_project/lib/app/modules/image_preview/views/image_preview_view.dart: UI for image preview.
- gnec_hackathon2k25_project/lib/app/modules/login/bindings/login_binding.dart: Dependency binding for login.
- gnec_hackathon2k25_project/lib/app/modules/login/controllers/login_controller.dart: Controller for login.
- gnec_hackathon2k25_project/lib/app/modules/login/views/login_view.dart: Login UI.
- gnec_hackathon2k25_project/lib/app/modules/navigation_test/navigation_test_view.dart: Navigation test screen.
- gnec_hackathon2k25_project/lib/app/modules/nearby_reports/bindings/nearby_reports_binding.dart: Dependency binding for nearby reports.
- gnec_hackathon2k25_project/lib/app/modules/nearby_reports/controllers/nearby_reports_controller.dart: Controller for nearby reports.
- gnec_hackathon2k25_project/lib/app/modules/nearby_reports/nearby_reports_navigation.dart: Navigation helpers for nearby reports.
- gnec_hackathon2k25_project/lib/app/modules/nearby_reports/views/nearby_reports_view.dart: Nearby reports UI.
- gnec_hackathon2k25_project/lib/app/modules/new_post/bindings/new_post_binding.dart: Dependency binding for new post.
- gnec_hackathon2k25_project/lib/app/modules/new_post/controllers/new_post_controller.dart: Controller for new post.
- gnec_hackathon2k25_project/lib/app/modules/new_post/views/new_post_view.dart: New post UI.
- gnec_hackathon2k25_project/lib/app/modules/onboarding/bindings/onboarding_binding.dart: Dependency binding for onboarding.
- gnec_hackathon2k25_project/lib/app/modules/onboarding/controllers/onboarding_controller.dart: Controller for onboarding.
- gnec_hackathon2k25_project/lib/app/modules/onboarding/views/onboarding_view.dart: Onboarding UI.
- gnec_hackathon2k25_project/lib/app/modules/profile/bindings/profile_binding.dart: Dependency binding for profile.
- gnec_hackathon2k25_project/lib/app/modules/profile/controllers/profile_controller.dart: Controller for profile.
- gnec_hackathon2k25_project/lib/app/modules/profile/views/profile_view.dart: Profile UI.
- gnec_hackathon2k25_project/lib/app/modules/register/bindings/register_binding.dart: Dependency binding for register.
- gnec_hackathon2k25_project/lib/app/modules/register/controllers/register_controller.dart: Controller for register.
- gnec_hackathon2k25_project/lib/app/modules/register/views/register_view.dart: Register UI.
- gnec_hackathon2k25_project/lib/app/modules/settings/bindings/settings_binding.dart: Dependency binding for settings.
- gnec_hackathon2k25_project/lib/app/modules/settings/controllers/settings_controller.dart: Controller for settings.
- gnec_hackathon2k25_project/lib/app/modules/settings/views/settings_view.dart: Settings UI.
- gnec_hackathon2k25_project/lib/app/modules/splash/bindings/splash_binding.dart: Dependency binding for splash.
- gnec_hackathon2k25_project/lib/app/modules/splash/controllers/splash_controller.dart: Controller for splash.
- gnec_hackathon2k25_project/lib/app/modules/splash/views/splash_view.dart: Splash UI.
- gnec_hackathon2k25_project/lib/app/modules/verification/bindings/verification_binding.dart: Dependency binding for verification.
- gnec_hackathon2k25_project/lib/app/modules/verification/controllers/verification_controller.dart: Controller for verification.
- gnec_hackathon2k25_project/lib/app/modules/verification/views/verification_view.dart: Verification UI.

Assets
- gnec_hackathon2k25_project/assets/icon/logo.png: App logo image.
- gnec_hackathon2k25_project/assets/icon/logo1.png: Alternate app logo image.

Web
- gnec_hackathon2k25_project/web/index.html: Flutter web bootstrap page.
- gnec_hackathon2k25_project/web/manifest.json: PWA manifest.
- gnec_hackathon2k25_project/web/favicon.png: Web favicon.
- gnec_hackathon2k25_project/web/icons/Icon-192.png: Web app icon.
- gnec_hackathon2k25_project/web/icons/Icon-512.png: Web app icon.
- gnec_hackathon2k25_project/web/icons/Icon-maskable-192.png: Web app icon (maskable).
- gnec_hackathon2k25_project/web/icons/Icon-maskable-512.png: Web app icon (maskable).

Android
- gnec_hackathon2k25_project/android/.gitignore: Android-specific ignore rules.
- gnec_hackathon2k25_project/android/build.gradle.kts: Android build configuration.
- gnec_hackathon2k25_project/android/gradle.properties: Gradle properties.
- gnec_hackathon2k25_project/android/settings.gradle.kts: Gradle settings.
- gnec_hackathon2k25_project/android/app/build.gradle.kts: App module build configuration.
- gnec_hackathon2k25_project/android/app/proguard-rules.pro: ProGuard/R8 rules.
- gnec_hackathon2k25_project/android/app/src/main/AndroidManifest.xml: Main Android manifest.
- gnec_hackathon2k25_project/android/app/src/debug/AndroidManifest.xml: Debug manifest overrides.
- gnec_hackathon2k25_project/android/app/src/profile/AndroidManifest.xml: Profile manifest overrides.
- gnec_hackathon2k25_project/android/app/src/main/kotlin/com/example/cc_project/MainActivity.kt: Android app entry activity.
- gnec_hackathon2k25_project/android/app/src/main/res/drawable/launch_background.xml: Launch screen background.
- gnec_hackathon2k25_project/android/app/src/main/res/drawable-v21/launch_background.xml: Launch background for API 21+.
- gnec_hackathon2k25_project/android/app/src/main/res/values/styles.xml: Light theme styles.
- gnec_hackathon2k25_project/android/app/src/main/res/values-night/styles.xml: Dark theme styles.
- gnec_hackathon2k25_project/android/app/src/main/res/xml/network_security_config.xml: Network security config.
- gnec_hackathon2k25_project/android/app/src/main/res/mipmap-mdpi/ic_launcher.png: Launcher icon.
- gnec_hackathon2k25_project/android/app/src/main/res/mipmap-hdpi/ic_launcher.png: Launcher icon.
- gnec_hackathon2k25_project/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png: Launcher icon.
- gnec_hackathon2k25_project/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png: Launcher icon.
- gnec_hackathon2k25_project/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png: Launcher icon.
- gnec_hackathon2k25_project/android/gradle/wrapper/gradle-wrapper.properties: Gradle wrapper config.

iOS
- gnec_hackathon2k25_project/ios/.gitignore: iOS-specific ignore rules.
- gnec_hackathon2k25_project/ios/Flutter/AppFrameworkInfo.plist: Flutter framework info.
- gnec_hackathon2k25_project/ios/Flutter/Debug.xcconfig: Debug build config.
- gnec_hackathon2k25_project/ios/Flutter/Release.xcconfig: Release build config.
- gnec_hackathon2k25_project/ios/Runner/AppDelegate.swift: iOS app delegate.
- gnec_hackathon2k25_project/ios/Runner/Info.plist: iOS app metadata.
- gnec_hackathon2k25_project/ios/Runner/Runner-Bridging-Header.h: Swift/ObjC bridging header.
- gnec_hackathon2k25_project/ios/Runner/Base.lproj/LaunchScreen.storyboard: Launch screen storyboard.
- gnec_hackathon2k25_project/ios/Runner/Base.lproj/Main.storyboard: Main storyboard.
- gnec_hackathon2k25_project/ios/Runner.xcodeproj/project.pbxproj: Xcode project configuration.
- gnec_hackathon2k25_project/ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme: Shared Xcode scheme.
- gnec_hackathon2k25_project/ios/Runner.xcodeproj/project.xcworkspace/contents.xcworkspacedata: Xcode workspace data.
- gnec_hackathon2k25_project/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist: Xcode workspace checks.
- gnec_hackathon2k25_project/ios/Runner.xcodeproj/project.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings: Xcode workspace settings.
- gnec_hackathon2k25_project/ios/Runner.xcworkspace/contents.xcworkspacedata: Xcode workspace data.
- gnec_hackathon2k25_project/ios/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist: Xcode workspace checks.
- gnec_hackathon2k25_project/ios/Runner.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings: Xcode workspace settings.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/LaunchImage.imageset/Contents.json: Launch image asset catalog metadata.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/LaunchImage.imageset/README.md: Launch image README.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/LaunchImage.imageset/LaunchImage.png: Launch image asset.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/LaunchImage.imageset/LaunchImage@2x.png: Launch image asset.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/LaunchImage.imageset/LaunchImage@3x.png: Launch image asset.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json: iOS app icon catalog metadata.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@3x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@3x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@3x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-50x50@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-50x50@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-57x57@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-57x57@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-72x72@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-72x72@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png: iOS app icon.
- gnec_hackathon2k25_project/ios/RunnerTests/RunnerTests.swift: iOS unit test scaffold.

macOS
- gnec_hackathon2k25_project/macos/.gitignore: macOS-specific ignore rules.
- gnec_hackathon2k25_project/macos/Flutter/Flutter-Debug.xcconfig: Debug build config.
- gnec_hackathon2k25_project/macos/Flutter/Flutter-Release.xcconfig: Release build config.
- gnec_hackathon2k25_project/macos/Flutter/GeneratedPluginRegistrant.swift: Flutter plugin registrant.
- gnec_hackathon2k25_project/macos/Runner/AppDelegate.swift: macOS app delegate.
- gnec_hackathon2k25_project/macos/Runner/Info.plist: macOS app metadata.
- gnec_hackathon2k25_project/macos/Runner/MainFlutterWindow.swift: macOS main window.
- gnec_hackathon2k25_project/macos/Runner/Release.entitlements: Release entitlements.
- gnec_hackathon2k25_project/macos/Runner/DebugProfile.entitlements: Debug entitlements.
- gnec_hackathon2k25_project/macos/Runner/Base.lproj/MainMenu.xib: Main menu UI.
- gnec_hackathon2k25_project/macos/Runner/Configs/AppInfo.xcconfig: App info build config.
- gnec_hackathon2k25_project/macos/Runner/Configs/Debug.xcconfig: Debug build config.
- gnec_hackathon2k25_project/macos/Runner/Configs/Release.xcconfig: Release build config.
- gnec_hackathon2k25_project/macos/Runner/Configs/Warnings.xcconfig: Build warnings config.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json: macOS app icon catalog metadata.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_16.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_32.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_64.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_128.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_256.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_512.png: macOS app icon.
- gnec_hackathon2k25_project/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_1024.png: macOS app icon.
- gnec_hackathon2k25_project/macos/RunnerTests/RunnerTests.swift: macOS unit test scaffold.
- gnec_hackathon2k25_project/macos/Runner.xcodeproj/project.pbxproj: Xcode project config.
- gnec_hackathon2k25_project/macos/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme: Shared Xcode scheme.
- gnec_hackathon2k25_project/macos/Runner.xcodeproj/project.xcworkspace/contents.xcworkspacedata: Xcode workspace data.
- gnec_hackathon2k25_project/macos/Runner.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist: Xcode workspace checks.
- gnec_hackathon2k25_project/macos/Runner.xcodeproj/project.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings: Xcode workspace settings.
- gnec_hackathon2k25_project/macos/Runner.xcworkspace/contents.xcworkspacedata: Xcode workspace data.
- gnec_hackathon2k25_project/macos/Runner.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist: Xcode workspace checks.

Linux
- gnec_hackathon2k25_project/linux/.gitignore: Linux-specific ignore rules.
- gnec_hackathon2k25_project/linux/CMakeLists.txt: Linux build config.
- gnec_hackathon2k25_project/linux/flutter/CMakeLists.txt: Flutter Linux build config.
- gnec_hackathon2k25_project/linux/flutter/generated_plugin_registrant.cc: Flutter plugin registrant.
- gnec_hackathon2k25_project/linux/flutter/generated_plugin_registrant.h: Flutter plugin registrant header.
- gnec_hackathon2k25_project/linux/flutter/generated_plugins.cmake: Generated plugin build config.
- gnec_hackathon2k25_project/linux/runner/CMakeLists.txt: Linux runner build config.
- gnec_hackathon2k25_project/linux/runner/main.cc: Linux app entry point.
- gnec_hackathon2k25_project/linux/runner/my_application.cc: Linux app window implementation.
- gnec_hackathon2k25_project/linux/runner/my_application.h: Linux app window header.

Windows
- gnec_hackathon2k25_project/windows/.gitignore: Windows-specific ignore rules.
- gnec_hackathon2k25_project/windows/CMakeLists.txt: Windows build config.
- gnec_hackathon2k25_project/windows/flutter/CMakeLists.txt: Flutter Windows build config.
- gnec_hackathon2k25_project/windows/flutter/generated_plugin_registrant.cc: Flutter plugin registrant.
- gnec_hackathon2k25_project/windows/flutter/generated_plugin_registrant.h: Flutter plugin registrant header.
- gnec_hackathon2k25_project/windows/flutter/generated_plugins.cmake: Generated plugin build config.
- gnec_hackathon2k25_project/windows/runner/CMakeLists.txt: Windows runner build config.
- gnec_hackathon2k25_project/windows/runner/Runner.rc: Windows resource file.
- gnec_hackathon2k25_project/windows/runner/flutter_window.cc: Flutter window implementation.
- gnec_hackathon2k25_project/windows/runner/flutter_window.h: Flutter window header.
- gnec_hackathon2k25_project/windows/runner/main.cpp: Windows app entry point.
- gnec_hackathon2k25_project/windows/runner/resource.h: Windows resource header.
- gnec_hackathon2k25_project/windows/runner/utils.cc: Utility helpers.
- gnec_hackathon2k25_project/windows/runner/utils.h: Utility helpers header.
- gnec_hackathon2k25_project/windows/runner/win32_window.cc: Windows window implementation.
- gnec_hackathon2k25_project/windows/runner/win32_window.h: Windows window header.
- gnec_hackathon2k25_project/windows/runner/runner.exe.manifest: Windows app manifest.
- gnec_hackathon2k25_project/windows/runner/resources/app_icon.ico: Windows app icon.

Tests
- gnec_hackathon2k25_project/test/widget_test.dart: Flutter widget test scaffold.
