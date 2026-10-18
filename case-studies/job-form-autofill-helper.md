# Job Form Autofill Helper - Project Description

## 🚀 Overview
**Job Form Autofill Helper** is a robust browser extension designed to streamline the tedious process of filling out repetitive online forms and job applications. It allows users to securely store their personal, professional, and custom data once, and automatically injects or suggests these details across various job portals, Google Forms, and other websites.

## 💻 Tech Stack
The extension is built to be lightweight, fast, and entirely client-side without relying on external libraries or servers.

*   **Core Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+).
*   **Extension Framework:** Chrome Extension API (Manifest V3).
*   **Storage:** `chrome.storage.local` API for secure and persistent local data storage.
*   **Architecture Components:**
    *   **Service Worker (`service_worker.js`):** Handles background events and extension icon clicks.
    *   **Content Scripts (`content_script.js`):** Injected into web pages to scan for form fields (using heuristics on labels, IDs, placeholders, and ARIA attributes), provide inline suggestions, and process autofill commands.
    *   **Options Page (`options.html` / `js` / `css`):** A dedicated UI for the user to securely input and manage their profile details, custom fields, and document links.

## 💡 Value Proposition
*   **Massive Time Savings:** Drastically cuts down the time spent re-typing standard information (like name, email, phone, CNIC, and profile links) across dozens of job applications.
*   **Privacy First:** Unlike cloud-based autofill services, all data is stored strictly locally on the user's machine. The extension does not make external network requests with user data.
*   **Intelligent Heuristics:** Employs smart keyword matching (analyzing surrounding DOM nodes, IDs, and placeholders) to accurately identify what data a field expects, even when labels are unconventional.
*   **Customizability:** Users can define custom fields with their own trigger keywords, ensuring the extension adapts to niche or poorly-designed application forms.
*   **Frictionless UX:** Supports multiple methods of interaction, including inline suggestions triggered by typing, an `Alt+Enter` shortcut to accept suggestions, and a global `Alt+Shift+F` command to intuitively autofill an entire page at once.