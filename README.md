# AI Resume Builder

A premium, minimal resume builder with live preview, autosave, and ATS scoring.

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
- Auto-save to localStorage (key: `resumeBuilderData`)
- ATS Readiness Score (0-100)
- Smart suggestions based on missing content

### ATS Scoring v1 (Deterministic)

Score calculation:
- +15 points: Summary is 40-120 words
- +10 points: At least 2 projects
- +10 points: At least 1 experience entry
- +10 points: Skills list has 8+ items
- +10 points: GitHub or LinkedIn link exists
- +15 points: Experience/project bullets contain numbers
- +10 points: Education has complete fields
- Cap: 100 points

Score labels:
- 80-100: Excellent (green)
- 60-79: Good (orange)
- 40-59: Fair (orange)
- 0-39: Needs Work (red)

Suggestions (max 3):
- "Write a stronger summary (40–120 words)."
- "Add at least 2 projects."
- "Add at least 1 work experience entry."
- "Add more skills (target 8+)."
- "Add GitHub or LinkedIn link."
- "Add measurable impact (numbers) in bullets."
- "Complete all education fields (school, degree, year)."

### Preview Page (/preview)
- Clean, print-ready resume layout
- Premium typography
- Black and white minimal design
- ATS-friendly formatting
- Empty sections are hidden

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

## Verification Steps

### 1. Test Autosave & Persistence
1. Open `/builder`
2. Fill in some fields (name, email, summary)
3. Refresh the page (F5)
4. ✓ Verify: All data persists and form is pre-filled

### 2. Test Live Preview
1. On `/builder`, type in any field
2. ✓ Verify: Preview panel updates in real-time
3. ✓ Verify: Empty sections don't show in preview

### 3. Test ATS Score - Live Updates
1. Start with empty form (score should be 0)
2. Add summary with 50 words
   - ✓ Score increases by +15
3. Add 2 projects
   - ✓ Score increases by +10
4. Add 1 experience entry
   - ✓ Score increases by +10
5. Add 8+ skills (comma-separated)
   - ✓ Score increases by +10
6. Add GitHub link
   - ✓ Score increases by +10
7. Add numbers in experience description (e.g., "Increased sales by 40%")
   - ✓ Score increases by +15
8. Complete education fields
   - ✓ Score increases by +10
9. ✓ Final score should be 80-90

### 4. Test Suggestions
1. With empty form:
   - ✓ See 3 suggestions
2. As you complete items:
   - ✓ Suggestions update and decrease
3. With complete resume:
   - ✓ No suggestions shown

### 5. Test Load Sample Data
1. Click "Load Sample Data"
2. ✓ Form fills with sample data
3. ✓ Preview updates
4. ✓ ATS score shows (should be 80-90)
5. Refresh page
6. ✓ Sample data persists

### 6. Test Preview Page
1. Fill data in `/builder`
2. Navigate to `/preview`
3. ✓ All data appears correctly
4. ✓ Clean, print-ready layout
5. ✓ Empty sections are hidden

### 7. Test localStorage Key
1. Open browser DevTools → Application → Local Storage
2. ✓ Verify key: `resumeBuilderData`
3. ✓ Verify data structure matches resume format

## Tech Stack

- React 18
- React Router 6
- Vite
- LocalStorage for state persistence

## Coming Soon

- PDF export
- Form validation
- Multiple resume templates
- AI-powered content suggestions
