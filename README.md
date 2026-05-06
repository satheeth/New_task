# 📝 React Dynamic Form Builder

A highly interactive, responsive, and modern split-pane dynamic form builder application. Build customized forms on the fly and see them render in real-time, complete with a terminal-style JSON output generator.

---

## 🛠️ Proper Tech Stack

This project leverages modern, lightweight, and fast technologies to ensure an optimal developer and user experience without unnecessary bloat.

### Core Technologies

- **React 18:** Core UI library for building the interactive component tree.
- **Vite:** Next-generation frontend tooling providing instantaneous HMR (Hot Module Replacement) and highly optimized production builds.
- **Tailwind CSS:** Utility-first CSS framework used for rapid, responsive, and highly customized styling directly within the markup.

### State Management & Storage

- **React Hooks (`useState`, `useEffect`):** Utilizes pure React state management via the "lifting state up" architectural pattern. No external libraries (like Redux or Zustand) are needed, keeping the bundle size minimal and performant.
- **Browser `localStorage` API:** Implemented for schema persistence so users do not lose their form-building progress upon page refresh or accidental closure.

### Assets & Design

- **Custom SVG Icons:** Lightweight, inline SVGs managed via a dedicated `Icons.jsx` component.
- **Modern UI Patterns:** Glassmorphism, soft drop-shadows, and a Terminal/IDE-styled JSON modal built entirely with Tailwind configuration extensions.

---

## ✨ Key Features

- **🎨 Split-Pane Interface:** Intuitive side-by-side layout featuring the Builder on the left and a Live Preview on the right.
- **⚙️ 7 Comprehensive Field Types:**
  - Text Field
  - Number
  - Dropdown (Select)
  - Email
  - Long Text (Textarea)
  - Checkbox (Multi-select)
  - Radio Button (Single-select)
- **🔄 Real-time Synchronization:** Every keystroke, new option, or requirement toggle in the builder instantly reflects in the live preview.
- **📝 Deep Customization:** Modify field labels, placeholders, requirement constraints, and dynamically add/remove individual options for multi-choice fields.
- **↕️ Field Ordering:** Easily arrange form fields using intuitive up/down arrow controls.
- **💻 Terminal-Style JSON Export:** Submit the live preview form to view the generated, structured output data in a sleek, IDE-inspired JSON modal with a 1-click copy feature.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── FormBuilder.jsx   # Left pane: Controls for adding/editing schema fields
│   ├── LivePreview.jsx   # Right pane: Renders the dynamic HTML form
│   └── Icons.jsx         # Centralized, reusable SVG icon library
├── App.jsx               # Main state orchestrator, layout container, & JSON modal
├── index.css             # Tailwind imports and custom global UI animations
└── main.jsx              # React DOM mounting entry point
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have Node.js (v16 or higher) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd react-dynamic-form-builder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to `http://localhost:5173` (or the local port provided by Vite) in your web browser.

---

## 🧠 Architecture & Scalability

For a deep dive into how the dynamic state is managed, the challenges faced during complex nested state updates, and the roadmap for scaling this application to support 100+ fields concurrently, please refer to the **EXPLANATION.md** file.

---

## 🔮 Future Roadmap

- **Drag and Drop (DnD):** Implementing a library like `@hello-pangea/dnd` for smoother, drag-based field reordering.
- **Advanced Validation:** Adding min/max character limits, regex patterns, and custom error messages to the builder.
- **Conditional Logic:** Allowing fields to show/hide based on the answers provided in previous fields.
- **Schema Export/Import:** Adding the ability to download the raw JSON schema file to load and edit later.
