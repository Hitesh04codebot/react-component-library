React Component Library
A comprehensive React component library built with TypeScript, featuring customizable UI components with modern styling, accessibility features, and full documentation.

🚀 Live Demos
Main Application: Vercel Deployment

Storybook Documentation: Chromatic Deployment

GitHub Repository: https://github.com/Hitesh04codebot/react-component-library

📦 Components
InputField
A highly customizable input component with multiple variants, validation states, and interactive features.

Features:

✅ Text input with label, placeholder, helper text, error message

✅ Multiple states: disabled, invalid, loading

✅ Variants: filled, outlined, ghost

✅ Sizes: small, medium, large

✅ Optional: clear button, password toggle

✅ Light & dark theme support

✅ Full accessibility (ARIA labels)

✅ Responsive design

DataTable
A powerful data table component with sorting, selection, and responsive capabilities.

Features:

✅ Display tabular data with custom rendering

✅ Column sorting (ascending/descending)

✅ Row selection (single/multiple)

✅ Loading state with spinner

✅ Empty state handling

✅ Responsive design

✅ Dark theme support

✅ Accessibility compliant

🛠️ Technologies Used
React 18 - UI framework

TypeScript - Type safety

TailwindCSS - Styling and responsive design

Storybook - Component documentation

Lucide React - Icons

Jest & React Testing Library - Testing

📋 Prerequisites
Node.js 16.0 or higher

npm or yarn package manager


🎨 Features
Responsive Design
Mobile-first approach with TailwindCSS

Adaptive layouts for all screen sizes

Touch-friendly interactions

Accessibility
ARIA labels and roles

Keyboard navigation support

Screen reader compatible

Focus management

Theme Support
Light and dark mode ready

Customizable color schemes

Consistent design tokens

Performance
Optimized re-renders

Efficient sorting algorithms

Lazy loading ready


<img width="1900" height="868" alt="image" src="https://github.com/user-attachments/assets/bc8dff1b-475a-4137-b37f-0656ec529d02" />
<img width="1860" height="282" alt="image" src="https://github.com/user-attachments/assets/6d42e525-6c3d-457d-a6ae-76650550d66f" />

Each component includes:

Multiple usage examples

Interactive controls

Accessibility testing

Responsive testing

src/
  components/
    InputField/
      InputField.tsx          # Main component
      InputField.stories.tsx  # Storybook stories
      InputField.test.tsx     # Unit tests
      index.ts               # Barrel export
    DataTable/
      DataTable.tsx
      DataTable.stories.tsx
      DataTable.test.tsx
      index.ts
  App.tsx                    # Demo application
  index.tsx                  # Application entry point
.storybook/                  # Storybook configuration
public/                     # Static assets
screenshots/                # Documentation images

🏆 Acknowledgments
React team for the amazing framework

TailwindCSS for the utility-first CSS framework

Storybook team for component documentation tools

Lucide for the beautiful icons

