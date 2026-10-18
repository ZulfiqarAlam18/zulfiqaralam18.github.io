# Inforato - Complete Project Description

## Overview
**Inforato** is a highly advanced e-commerce and lifestyle application built with Flutter. Its standout capability is a cutting-edge, **AI-powered Virtual Try-On** feature, which revolutionizes the digital shopping experience by allowing users to realistically visualize apparel and products on themselves before making a purchase. Alongside this core AI integration, the application seamlessly supports a robust set of e-commerce functionalities, including user authentication, detailed product catalogs, shopping cart and wishlist management, secure payment processing, and a comprehensive vendor/seller portal.

---

## Technical Stack & Architecture

### **Frontend & Mobile Platform**
The mobile application is built using the **Flutter framework** with the Dart programming language.

**Key Technologies & Practices:**
- **State Management, Navigation, & Dependency Injection:** Utilizes the [GetX](https://pub.dev/packages/get) ecosystem (`get: ^4.7.2`), maintaining a clean and reactive app structure.
- **Project Pattern:** Model-View-Controller (MVC) alongside a dedicated Presentation layer and robust Network/Helper utilities for API requests.
- **Responsive UI:** Leveraging `flutter_screenutil` to maintain pixel-perfect UI across different screen sizes and ratios.
- **Image & Media Handling:** Uses `cached_network_image`, `flutter_svg`, `image_picker`, `video_player`, and custom image compression services to handle local and remote assets efficiently efficiently.
- **Typography & Styling:** Styled with `google_fonts` and customized themes via extensive `app_color.dart` and `constants.dart`.

### **Backend Infrastructure & Services**
The robust backend architecture ensures high availability, security, and scalability:
- **Server Framework:** Configured with **Node.js** & **Express.js**.
- **Database:** Relational data architecture powered by **PostgreSQL**.
- **Cloud Hosting:** Deployed and actively hosted on **AWS EC2**.
- **Storage:** **AWS S3** is utilized for storing scalable user-uploaded content, product models, and images.
- **Authentication:** Core authentication and user management are strictly handled by **AWS Cognito**, ensuring industry standards for identity management and security tokens.

---

## Roles & Responsibilities

The project was developed with the following primary contributions:

*   **Backend Developer:** Responsible for the core development of the backend services, APIs, and database architecture using Node.js, Express.js, and PostgreSQL.
*   **My Role (Core Developer):**
    *   **Flutter UI Development:** Designed and implemented user-facing interfaces with precision, managing styling, navigation (GetX), custom widgets, state integrations, and incorporating adaptive responsive design elements.
*   **Backend Deployment on EC2:** Managed the backend hosting via SSH configuration, deployment routines, and server environments on Amazon EC2 instances for the Express.js and Postgres layers.
*   **API Integration:** Successfully consumed backend endpoints inside the Flutter application using the `http` package, implementing resilient data parsers (`lib/network/`, `lib/controller/`), secure auth flows via custom middleware, and seamless frontend-backend syncing.

---

## Comprehensive Feature Modules & Directory Structure

The application is meticulously structured into various functional domains. Below is a breakdown of the core modules visible in the `lib` folder.

### 1. Controllers (`lib/controller/`) & Network Helpers
The business logic and API state bridging are mapped closely:
- `auth_controller.dart` / `auth_helper.dart` - Coordinates login, signup, and token sessions via AWS Cognito.
- `ai_controller.dart` / `ai_helper.dart` - Manages backend inference and AI-related tasks, potentially plugging into the Virtual Try-On workflow.
- `product_controller.dart` & `wishlist_controller.dart` - Manages product feeds, individual item details, and users' saved favorited products.
- `cart_controller` & `order_controller.dart` - Handles cart states, total calculations, and pushing checkout operations.
- `sellers_controller.dart` - Logic specific to the vendor/seller portals.
- `profile_controller.dart` - Fetches and manages user profiles.

### 2. UI Views & Presentation (`lib/view/` & `lib/presentation/`)
- **Authentication:** Login, Registration, and Password Reset screens (`auth_screens/`).
- **Dashboard & Bottom NavBar:** The main entry point post-login, holding the global navigation structure for standard users.
- **Product Modules:** Screens dedicated to product listings (`products/`), specific categories (`categories/`), and brand browsing (`brands/`).
- **Cart & Payment:** End-to-end checkout flows including the `cart/` and `payment/` screens.
- **Vendor Space:** Tools and screens designed exclusively for merchants/vendors (`vendor_screens/`).
- **Virtual Try-On / Fitting Room (AI-Powered Core Feature):** The distinguishing feature of the app. It leverages advanced AI modules (`virtual_try_on/`, `fitting_room_screens/`, `ai_controller.dart`) to provide users with a highly engaging and realistic augmented fitting room experience, significantly differentiating the application from standard e-commerce platforms.
- **Settings & User Profile:** Extensive account settings and configuration screens (`settings/`).

### 3. Routing (`lib/routes/` & `lib/routes_for_updated_ui/`)
Holds structured definitions (`app_pages.dart`, `app_routes.dart`) mapping URL string routes to GetX views, allowing decoupled navigation.

### 4. Middleware & Utils
- `auth_middleware.dart`: Protects certain route trees, ensuring the user possesses a valid Cognito session before navigating.
- `image_compression_service.dart`: Compresses payloads on the client-side prior to pushing them to the backend / AWS S3, greatly improving bandwidth usage.

### 5. Constants & Custom Widgets
- `app_color.dart`, `constants.dart`: Global configurations reducing code duplication for themes.
- `custom_app_bar.dart`, `brand_card.dart`, `common_widgets.dart`: Granular, reusable stateless/stateful UI elements providing a consistent experience application-wide.