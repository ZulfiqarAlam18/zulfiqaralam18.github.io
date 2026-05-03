# ScanLite Project Description

## 1. Project Summary

ScanLite is a cross-platform document scanning and file conversion application originally developed as a personal project. It combines Flutter for the user-facing app and FastAPI for backend document conversion services. The app focuses on scanning documents, extracting text with OCR, applying image filters, generating PDFs, converting office files, merging PDFs, and supporting English and Urdu workflows.

The project is structured for Android, iOS, Web, macOS, Linux, and Windows, with the Android release build configured for Play Store distribution using a production signing key.

## 2. Core Purpose

The application is designed to help users:

- Scan paper documents into PDFs.
- Improve image quality with filters.
- Extract readable text from images and scans.
- Convert PDFs into Word, Excel, and PowerPoint formats.
- Convert office documents into PDF.
- Merge multiple PDFs.
- Work in both English and Urdu.
- Store scans locally on the device.

## 3. Technology Stack

### Frontend

- Flutter 3.11+ / Dart 3.11+
- Provider for state management
- Hive and SharedPreferences for local storage
- Google ML Kit for document scanning and OCR
- http for backend communication
- pdf, image, share_plus, file_picker, image_picker, permission_handler, and other support packages

### Backend

- FastAPI 0.115.12
- Uvicorn
- PyMuPDF
- python-docx
- pytesseract
- Pillow
- LibreOffice CLI for office-to-PDF conversion
- OpenPyXL and python-pptx are used by the code and should be available for full backend functionality

## 4. High-Level Architecture

ScanLite uses a layered design:

- Presentation/UI layer in Flutter screens and widgets.
- Application/service layer for scanners, filters, OCR, PDF generation, storage, translation, theme, and backend API access.
- Local data layer with Hive, SharedPreferences, and device file system storage.
- Backend microservice for document conversion tasks that are easier or more reliable on Python.

The app bootstraps services in `lib/main.dart`, then injects them into the widget tree with `MultiProvider`.

## 5. Main User Flows

### Scanning Flow

1. User opens the camera scanner.
2. Google ML Kit document scanner captures one or more pages.
3. Captured images move into multi-page management.
4. Images can be filtered, saved, and converted into PDF.

### OCR Flow

1. User scans or imports an image.
2. OCR service extracts text on-device.
3. Extracted text can be copied, shared, or saved.

### Conversion Flow

1. User selects a conversion tool.
2. Flutter app uploads the file to the backend API.
3. Backend converts the document and returns the output file.
4. User saves or shares the result.

### Storage Flow

1. Generated files are stored locally.
2. Scan metadata is saved in Hive.
3. Recent scans and conversion files are shown in the UI.

## 6. Flutter Application Structure

### Entry Point

- `lib/main.dart`

This file initializes Flutter bindings, sets up the app services, loads theme/language/storage settings, and defines routing.

### Core Folder

- `lib/core/config/backend_config.dart`
  - Stores backend base URL logic.
  - Uses localhost for web and desktop-like targets.
  - Uses a LAN IP on Android for device testing.

- `lib/core/theme/app_theme.dart`
  - Defines light and dark themes.
  - Uses Google Fonts Inter.
  - Sets the color palette and app bar styling.

- `lib/core/utils/app_logger.dart`
  - Debug logging helper.
  - Logs navigation, actions, warnings, and errors.

- `lib/core/utils/connectivity_util.dart`
  - Provides internet connectivity checking.
  - Includes file-size formatting helpers.

- `lib/core/utils/snackbar_util.dart`
  - Handles app-wide snack bar display.

### Widgets

- `lib/widgets/splash_screen.dart`
  - Launch screen shown on startup before the main interface.

## 7. Feature Modules

### Home Feature

- `lib/features/home/presentation/home_screen.dart`
  - Main landing screen.
  - Shows recent scans and shortcuts.
  - Handles scan actions, PDF thumbnail loading, sharing, rename flow, and adding pages.

- `lib/features/home/presentation/main_scaffold_screen.dart`
  - Main bottom navigation shell.
  - Contains Home, OCR, and Converter tabs.

- `lib/features/home/presentation/recent_scans_screen.dart`
  - Displays local scan history.

### Scanner Feature

- `lib/features/scanner/application/scanner_service.dart`
  - Wraps Google ML Kit document scanner.
  - Starts scanning and navigates to multi-page management.

- `lib/features/scanner/presentation/camera_scanner_screen.dart`
  - User-facing camera scanner screen.

### OCR Feature

- `lib/features/ocr/application/ocr_service.dart`
  - Text extraction using ML Kit text recognition.
  - Can also calculate a confidence score.

- `lib/features/ocr/presentation/ocr_extraction_screen.dart`
  - Screen for OCR extraction and review.

### Filters Feature

- `lib/features/filters/application/filter_service.dart`
  - Performs image filtering and enhancement.
  - Supports grayscale, black and white, and enhance modes.
  - Uses compute isolates and caching.

- `lib/features/filters/presentation/document_filter_screen.dart`
  - UI for adjusting filter values and previews.

### PDF Feature

- `lib/features/pdf/application/pdf_service.dart`
  - Generates PDF files from images.

- `lib/features/pdf/presentation/multi_page_management_screen.dart`
  - Lets the user arrange pages before output.

- `lib/features/pdf/presentation/pdf_preview_screen.dart`
  - PDF preview viewer.

### Tools / Conversion Feature

- `lib/features/tools/application/conversion_api_service.dart`
  - HTTP client for the backend conversion API.
  - Handles file upload and response parsing.

- `lib/features/tools/presentation/tools_screen.dart`
  - Wrapper screen that opens the conversion hub.

- `lib/features/tools/presentation/conversion_hub_screen.dart`
  - Main conversion dashboard.
  - Shows tools such as PDF to Word, PDF to Excel, PDF to PPT, PDF to Image, Merge PDF, Image to PDF, and Office to PDF.

- `lib/features/tools/presentation/office_to_pdf_screen.dart`
  - Handles Word, PowerPoint, and Excel to PDF conversion flows.

- `lib/features/tools/presentation/pdf_to_word_screen.dart`
- `lib/features/tools/presentation/pdf_to_excel_screen.dart`
- `lib/features/tools/presentation/pdf_to_ppt_screen.dart`
- `lib/features/tools/presentation/pdf_to_image_screen.dart`
- `lib/features/tools/presentation/pdf_merge_screen.dart`
- `lib/features/tools/presentation/image_to_pdf_screen.dart`
  - Individual conversion screens for each tool.

### Storage Feature

- `lib/features/storage/application/storage_service.dart`
  - Initializes Hive.
  - Stores recent scan metadata.
  - Saves temporary, permanent, and PDF files.

- `lib/features/storage/domain/scan_metadata.dart`
  - Hive data model for scan records.

- `lib/features/storage/domain/scan_metadata.g.dart`
  - Generated Hive adapter.

### Settings Feature

- `lib/features/settings/application/theme_service.dart`
  - Persists light/dark/system theme mode.

- `lib/features/settings/presentation/settings_screen.dart`
  - Settings UI.

- `lib/features/settings/presentation/about_screen.dart`
  - About page.

- `lib/features/settings/presentation/privacy_policy_screen.dart`
  - Privacy policy page.

### Translation Feature

- `lib/features/translation/application/language_service.dart`
  - Persists current language.
  - Provides app UI translations for English and Urdu.

- `lib/features/translation/application/translation_service.dart`
  - Offline dictionary-based English to Urdu and Urdu to English translation.

## 8. Backend Structure

### Entry Point

- `backend/app/main.py`
  - Creates the FastAPI application.
  - Registers `/health` and all conversion endpoints.
  - Initializes shared service instances.

### Configuration

- `backend/app/config.py`
  - Holds app name and version.
  - Defines local folders for uploads and results.
  - Creates directories at startup.

### Schemas

- `backend/app/schemas.py`
  - Pydantic response models.

### Backend Services

- `backend/app/services/storage.py`
  - Saves uploaded files with UUID-based names.

- `backend/app/services/office_converter.py`
  - Uses `soffice` in headless mode to convert office files into PDF.

- `backend/app/services/pdf_to_docx.py`
  - Converts PDF into Word document.
  - Uses text extraction first and OCR fallback if needed.
  - Preserves heading structure based on font size.

- `backend/app/services/pdf_to_excel.py`
  - Converts PDF into Excel by extracting text page by page.

- `backend/app/services/pdf_to_ppt.py`
  - Converts PDF into PowerPoint slides.

- `backend/app/services/pdf_merge.py`
  - Merges two PDF files into one.

## 9. API Endpoints

- `GET /health`
  - Returns service health and version information.

- `POST /convert/office-to-pdf`
  - Accepts Word, PowerPoint, or Excel files.
  - Returns a PDF file.

- `POST /convert/pdf-to-word`
  - Accepts PDF.
  - Returns DOCX.

- `POST /convert/pdf-to-excel`
  - Accepts PDF.
  - Returns XLSX.

- `POST /convert/pdf-to-ppt`
  - Accepts PDF.
  - Returns PPTX.

- `POST /convert/merge-pdf`
  - Accepts two PDF uploads.
  - Returns merged PDF.

## 10. Platform Configuration

### Android

- Current application ID / namespace: `com.zulfi.scanlite`
- Kotlin activity path: `android/app/src/main/kotlin/com/zulfi/scanlite/MainActivity.kt`
- Release signing configured through `android/key.properties`
- Release keystore stored at `android/upload-keystore.jks`
- Manifest declares camera and internet permissions
- Gradle build uses Java 17 and resource shrinking for release

### iOS

- Bundle identifier updated to `com.zulfi.scanlite`
- Test bundle identifiers also updated
- Info.plist includes camera and file-saving permissions

### macOS

- Bundle identifier updated to `com.zulfi.scanlite`
- AppInfo.xcconfig contains branding and copyright values

### Linux

- Application ID set to `com.zulfi.scanlite`

### Windows

- Company metadata updated from defaults to ScanLite branding

### Web

- Web app includes standard Flutter `index.html` and `manifest.json`
- Backend base URL defaults to localhost on web

## 11. Assets and Static Files

- `assets/icon.png`
  - Launcher icon referenced by Flutter launcher icon setup.

- Platform icon assets are present under Android mipmap folders and Apple asset catalogs.

## 12. Dependencies

### Flutter Dependencies

The project uses:

- Flutter SDK
- cupertino_icons
- google_fonts
- provider
- camera
- path_provider
- shared_preferences
- image
- pdf
- share_plus
- google_mlkit_text_recognition
- google_mlkit_document_scanner
- pdfx
- image_picker
- hive
- hive_flutter
- url_launcher
- package_info_plus
- file_picker
- archive
- permission_handler
- docx_creator
- http

### Dev Dependencies

- flutter_test
- flutter_lints
- flutter_launcher_icons
- build_runner
- hive_generator

### Backend Requirements

- fastapi
- uvicorn[standard]
- python-multipart
- python-docx
- PyMuPDF
- pytesseract
- Pillow

Important: the backend code also uses OpenPyXL and python-pptx, so those should be present when running PDF to Excel and PDF to PowerPoint conversions.

## 13. Build and Run Instructions

### Flutter App

```bash
flutter pub get
flutter run
flutter build appbundle --release
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Production Android Build

The project is already configured for signed Android release builds.

```bash
flutter build appbundle --release
```

## 14. Release Signing and Production Setup

Android release signing is configured using:

- `android/key.properties`
- `android/upload-keystore.jks`

The release build is set to fail early if signing configuration is missing. That prevents an unsigned or invalid Play Store bundle from being generated by mistake.

## 15. Routing Map

Routes in `lib/main.dart`:

- `/splash` -> SplashScreen
- `/` -> MainScaffoldScreen
- `/recent_scans` -> RecentScansScreen
- `/camera` -> CameraScannerScreen
- `/multi_page` -> MultiPageManagementScreen
- `/filter` -> DocumentFilterScreen
- `/ocr` -> OcrExtractionScreen
- `/pdf_preview` -> PdfPreviewScreen
- `/settings` -> SettingsScreen

## 16. Local Storage Behavior

The app stores data locally in multiple ways:

- Hive for recent scan metadata.
- SharedPreferences for theme and language preference.
- Device file system for PDFs, images, and exports.

Recent scans are kept in local Hive storage and sorted by creation date.

## 17. Language Support

Supported languages:

- English
- Urdu

LanguageService handles UI translations and persistence. TranslationService provides a lightweight offline dictionary-based translation between English and Urdu.

## 18. UI and Theme

The app uses:

- Light theme
- Dark theme
- Custom color palette centered on a blue primary color
- Inter font family
- Bottom navigation for Home, OCR, and Converter

## 19. Logging and Diagnostics

AppLogger records:

- App start
- Page opens
- Button taps
- Navigation actions
- Debug errors in development mode

This is useful for tracking app flow during testing and debugging.

## 20. Tests

Current test status:

- `test/widget_test.dart` exists but is still the default Flutter counter smoke test.
- There are no meaningful automated unit tests for services yet.
- There are no real widget tests covering app flows yet.

This means the project is functional, but automated regression coverage is still minimal.

## 21. Generated and Non-Manual Files

These files are generated or derived and should generally not be edited by hand:

- `lib/features/storage/domain/scan_metadata.g.dart`
- `.dart_tool/`
- `build/`
- `pubspec.lock`

## 22. Important Risks and Notes

- The backend requirements file should include OpenPyXL and python-pptx for full functionality.
- Android release builds require the keystore and key.properties file to remain safe and backed up.
- The backend URL for Android is development-oriented and may need refinement for production deployments.
- The app currently depends on local device storage rather than cloud sync.
- Translation is dictionary-based, not full natural-language machine translation.
- Tests are still mostly missing, so production confidence depends on manual QA.

## 23. File Inventory

This section lists the important files currently present in the project and their role.

### Root

- `README.md` - default Flutter README text.
- `analysis_options.yaml` - Flutter lint rules.
- `pubspec.yaml` - Flutter package and dependency configuration.
- `pubspec.lock` - resolved dependency versions.
- `SCANLITE_PROJECT_DESCRIPTION.md` - this documentation file.

### Assets

- `assets/icon.png` - app icon source.

### Android

- `android/build.gradle.kts` - Android project build configuration.
- `android/gradle.properties` - Gradle JVM and AndroidX settings.
- `android/settings.gradle.kts` - Gradle settings.
- `android/local.properties` - local SDK path settings.
- `android/key.properties.example` - sample signing config.
- `android/key.properties` - active signing config.
- `android/upload-keystore.jks` - release signing keystore.
- `android/app/build.gradle.kts` - app module build script, namespace, release signing.
- `android/app/proguard-rules.pro` - release shrinker rules.
- `android/app/src/main/AndroidManifest.xml` - permissions and launcher activity.
- `android/app/src/main/kotlin/com/zulfi/scanlite/MainActivity.kt` - Flutter activity entry.
- `android/app/src/main/res/...` - launcher icons, splash assets, styles.
- `android/app/src/debug/AndroidManifest.xml` - debug manifest overlay.
- `android/app/src/profile/AndroidManifest.xml` - profile manifest overlay.

### Backend

- `backend/README.md` - backend setup guide.
- `backend/requirements.txt` - Python dependencies.
- `backend/app/__init__.py` - package initializer.
- `backend/app/config.py` - backend settings.
- `backend/app/main.py` - FastAPI application and routes.
- `backend/app/schemas.py` - response models.
- `backend/app/services/storage.py` - upload storage.
- `backend/app/services/office_converter.py` - office-to-PDF conversion.
- `backend/app/services/pdf_to_docx.py` - PDF-to-Word conversion.
- `backend/app/services/pdf_to_excel.py` - PDF-to-Excel conversion.
- `backend/app/services/pdf_to_ppt.py` - PDF-to-PowerPoint conversion.
- `backend/app/services/pdf_merge.py` - PDF merge utility.

### Flutter App: Core

- `lib/main.dart` - entry point and routing.
- `lib/core/config/backend_config.dart` - backend URL config.
- `lib/core/theme/app_theme.dart` - app theme definitions.
- `lib/core/utils/app_logger.dart` - debug logging helper.
- `lib/core/utils/connectivity_util.dart` - connectivity helper.
- `lib/core/utils/snackbar_util.dart` - snack bar helper.

### Flutter App: Features

- `lib/features/home/presentation/home_screen.dart`
- `lib/features/home/presentation/main_scaffold_screen.dart`
- `lib/features/home/presentation/recent_scans_screen.dart`
- `lib/features/scanner/application/scanner_service.dart`
- `lib/features/scanner/presentation/camera_scanner_screen.dart`
- `lib/features/ocr/application/ocr_service.dart`
- `lib/features/ocr/presentation/ocr_extraction_screen.dart`
- `lib/features/filters/application/filter_service.dart`
- `lib/features/filters/presentation/document_filter_screen.dart`
- `lib/features/pdf/application/pdf_service.dart`
- `lib/features/pdf/presentation/multi_page_management_screen.dart`
- `lib/features/pdf/presentation/pdf_preview_screen.dart`
- `lib/features/tools/application/conversion_api_service.dart`
- `lib/features/tools/presentation/conversion_hub_screen.dart`
- `lib/features/tools/presentation/image_to_pdf_screen.dart`
- `lib/features/tools/presentation/office_to_pdf_screen.dart`
- `lib/features/tools/presentation/pdf_merge_screen.dart`
- `lib/features/tools/presentation/pdf_to_excel_screen.dart`
- `lib/features/tools/presentation/pdf_to_image_screen.dart`
- `lib/features/tools/presentation/pdf_to_ppt_screen.dart`
- `lib/features/tools/presentation/pdf_to_word_screen.dart`
- `lib/features/tools/presentation/tools_screen.dart`
- `lib/features/storage/application/storage_service.dart`
- `lib/features/storage/domain/scan_metadata.dart`
- `lib/features/storage/domain/scan_metadata.g.dart`
- `lib/features/settings/application/theme_service.dart`
- `lib/features/settings/presentation/about_screen.dart`
- `lib/features/settings/presentation/privacy_policy_screen.dart`
- `lib/features/settings/presentation/settings_screen.dart`
- `lib/features/translation/application/language_service.dart`
- `lib/features/translation/application/translation_service.dart`

### Flutter App: Shared Widgets

- `lib/widgets/splash_screen.dart`

### iOS

- `ios/Runner/Info.plist` - app permissions and bundle metadata.
- `ios/Runner.xcodeproj/project.pbxproj` - bundle IDs and build settings.
- `ios/Runner/AppDelegate.swift` - native app entry.
- `ios/Runner/SceneDelegate.swift` - scene lifecycle.
- `ios/Runner/GeneratedPluginRegistrant.*` - generated plugin registration.

### macOS

- `macos/Runner/Configs/AppInfo.xcconfig` - bundle identifier and app metadata.
- `macos/Runner.xcodeproj/project.pbxproj` - bundle IDs and build settings.
- `macos/Runner/AppDelegate.swift` - macOS app entry.
- `macos/Runner/MainFlutterWindow.swift` - Flutter window bootstrap.
- `macos/Runner/Info.plist` - macOS app metadata.

### Linux

- `linux/CMakeLists.txt` - application ID and build config.
- `linux/runner/main.cc` - Linux entry point.
- `linux/runner/my_application.cc` - GTK application implementation.
- `linux/runner/my_application.h` - GTK app class declaration.

### Windows

- `windows/CMakeLists.txt` - Windows build config.
- `windows/runner/Runner.rc` - app metadata and copyright.
- `windows/runner/main.cpp` - Windows entry point.
- `windows/runner/flutter_window.cpp` - Flutter window implementation.
- `windows/runner/flutter_window.h` - window declaration.

### Web

- `web/index.html` - Flutter web shell.
- `web/manifest.json` - web app manifest.
- `web/icons/` - web icons.

### Tests

- `test/widget_test.dart` - placeholder smoke test.

## 24. Final Notes

ScanLite is already far beyond a starter app. It has a real feature set, a dedicated backend, multiple conversion paths, local storage, multilingual support, and production Android signing configured. The main remaining gaps are backend dependency completeness and stronger automated tests.
