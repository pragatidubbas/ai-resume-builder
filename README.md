# AI Resume Builder — Build Track

Project 3 of the Build Track series. An 8-step guided workflow for building an AI-powered resume builder application.

## Routes

- `/rb/01-problem` - Problem Definition
- `/rb/02-market` - Market Research
- `/rb/03-architecture` - System Architecture
- `/rb/04-hld` - High-Level Design
- `/rb/05-lld` - Low-Level Design
- `/rb/06-build` - Build Implementation
- `/rb/07-test` - Testing & QA
- `/rb/08-ship` - Ship & Deploy
- `/rb/proof` - Proof of Completion

## Features

### Premium Layout System
- Top bar with project name, step indicator, and status badge
- Context header for step title
- 70/30 split: Main workspace + Build panel
- Footer with Next button (gated by artifact upload)

### Build Panel
- Copy prompt to clipboard
- "Build in Lovable" link
- Status buttons (It Worked / Error)
- Screenshot upload
- Artifacts stored in localStorage

### Gating System
- Steps unlock sequentially
- Next button disabled until artifact uploaded
- Progress tracked across all 8 steps

### Proof Page
- 8-step status grid
- Input fields for Lovable, GitHub, Deploy links
- Copy Final Submission button (enabled when all steps complete)

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
