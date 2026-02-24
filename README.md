# AI Resume Builder

A premium, minimal resume builder with live preview and ATS-friendly formatting.

## Features

### Home Page (/)
- Clean landing page with clear value proposition
- "Build a Resume That Gets Read" headline
- Single CTA to start building

### Builder Page (/builder)
- Two-column layout: Form + Live Preview
- Form sections:
  - Personal Information (name, email, phone, location)
  - Professional Summary
  - Education (multiple entries)
  - Experience (multiple entries)
  - Projects (multiple entries)
  - Skills (comma-separated)
  - Links (GitHub, LinkedIn)
- Load Sample Data button for quick testing
- Real-time preview updates
- Data persists in localStorage

### Preview Page (/preview)
- Clean, print-ready resume layout
- Premium typography
- Black and white minimal design
- ATS-friendly formatting

### Proof Page (/proof)
- Placeholder for future artifacts
- Version tracking
- Export history
- ATS scoring (coming soon)

## Design System

KodNest Premium Design:
- Minimal, calm aesthetic
- Clean typography
- Subtle borders and shadows
- Black (#0a0a0a) and white (#fafafa) color scheme
- Smooth transitions and interactions

## Installation

```bash
npm install
npm run dev
```

## Tech Stack

- React 18
- React Router 6
- Vite
- LocalStorage for state persistence

## Coming Soon

- ATS scoring
- PDF export
- Form validation
- Multiple resume templates
