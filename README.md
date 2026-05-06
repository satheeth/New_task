# 📝 React Dynamic Form Builder

A modern, responsive, and highly interactive form builder application built with **React**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **🎨 Intuitive UI/UX:** A split-pane design featuring a Form Builder on the left and a Real-time Live Preview on the right.
- **⚙️ 7 Field Types:** Support for Text, Number, Dropdown, Email, Long Text (Textarea), Checkbox, and Radio button fields.
- **🔄 Live Preview:** Forms render instantly as you add, remove, or modify fields.
- **📝 Form Customization:** Customize field labels, placeholders, requirement constraints, and multi-choice options.
- **↕️ Field Reordering:** Easily move fields up or down the form list to organize your layout.
- **💾 LocalStorage Persistence:** Your form schema is automatically saved and persists across page reloads.
- **💻 Terminal-Style JSON Export:** Submit your live preview form to view the output data in a sleek, IDE-style JSON modal. Quick-copy functionality included!

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository (or download the source code).
2. Open a terminal in the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the provided `localhost` URL in your browser.

## 🏗️ Architecture & State Management

- **Centralized State:** The form structure (`schema`) is managed in the parent `App.jsx` and passed down to `FormBuilder` and `LivePreview`.
- **Component Modularity:** UI is split cleanly into logical components (`FormBuilder.jsx`, `LivePreview.jsx`, `Icons.jsx`) for maintainability.
- **Immutable Updates:** Complex nested states (like options within a dropdown field) are updated using pure functions to ensure React's rendering lifecycle functions perfectly.

For a more in-depth look at architectural decisions and scaling considerations, check out `EXPLANATION.md`.

## 🛠️ Built With

- React - UI Library
- Vite - Frontend Tooling / Bundler
- Tailwind CSS - Utility-first CSS framework

---

*Designed and built to showcase clean UI patterns and robust React state management.*
