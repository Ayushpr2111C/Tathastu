# ABTalks 60-Day Coding Challenge — Hackathon Master Prompt

1. Creating a readme file:
We are participating in a 48-hour ABTalks Hackathon to redesign the ABTalks 60-Day Coding Challenge. We don't want to create just a beautiful UI redesign; we want to redesign the **complete student experience**. The core idea is: **“We didn't redesign a website. We redesigned the student's 60-day learning journey.”**

ABTalks helps Indian college students choose a coding track, build something every day, and maintain a public learning streak by submitting a GitHub commit and LinkedIn post. Most students use the platform on mobile, often late at night after college. Our goal is to solve the problems behind the challenge—consistency, lack of guidance, difficulty knowing what to build, lack of visible skill progression, and difficulty turning completed work into career opportunities.

We want to transform ABTalks from a simple challenge tracker into an **AI-powered coding companion**. The student journey should be: **Discover → Start → Learn → Build → Get Guidance → Submit → Reflect → Improve → Showcase → Become Recruiter-Ready.**

The required routes are `/`, `/dashboard`, and `/day/12`. The landing page should build trust, clearly explain the 60-day challenge, communicate its benefits, and motivate new students to join. The dashboard should act as the student's command center, showing their streak, today's task, overall progress, achievements, XP, student standing, skill development, AI mentor, roadmap, and personalized insights. The challenge-day page should let students understand the task, receive guidance and resources, build their solution, submit their GitHub repository/commit and LinkedIn post, complete the challenge, and reflect on what they learned.

Our key features include an **AI Study Mentor** that explains tasks, breaks problems into steps, answers doubts, provides hints, recommends resources, and motivates students; a **Smart Learning Roadmap** showing Today → Tomorrow → Next Week → Next Milestone → Final Project; **Smart Difficulty Progression** where projects become progressively harder; a **Skill Heatmap** showing development in technologies such as Python, React, AI/ML, SQL, and Docker; **XP, Levels and Badges** to encourage progress; **Streak Freeze** to protect students from losing weeks of progress because of one missed day; **Daily Reflection** to capture what students learned; **AI Weekly Insights** to analyze their progress and recommend improvements; **Personalized Motivation** based on actual progress instead of generic quotes; and a frictionless **One-Click Submission** experience for GitHub and LinkedIn.

Our two major differentiators are the **Recruiter Report Card** and **AI Portfolio Builder**. Instead of ending the challenge with a simple “60/60 Completed” badge, the Recruiter Report Card should summarize projects completed, technologies used, GitHub activity, longest streak, consistency, skills developed, milestones, and portfolio readiness. The AI Portfolio Builder should use the student's 60-day journey to help generate resume content, portfolio content, GitHub README content, LinkedIn summaries, and professional project descriptions. The idea is that students shouldn't just finish the challenge—they should leave with tangible career value.

Our core differentiation is: **Traditional platform: Task → Submission → Streak. Our platform: Task → Understand → Build → Get Guidance → Submit → Reflect → Improve → Track Skills → Build Portfolio → Become Recruiter-Ready.** We don't just track progress; **we help create it.**

The design should be **mobile-first**, optimized primarily for a 390px viewport, with desktop as secondary. Take inspiration from Apple, Linear, Notion, GitHub, and Duolingo. The visual style should feel premium, modern, minimal, clean, and startup-quality, with strong typography, excellent spacing, meaningful progress visualization, subtle micro-interactions, and carefully designed cards. Avoid making it look like a generic AI dashboard, using excessive gradients, glassmorphism, unnecessary animations, or “AI everywhere.”

The experience must also handle real-world edge cases. On the **first day**, the student should see a welcoming introduction, challenge explanation, first task, AI Mentor introduction, and clear starting action instead of an empty dashboard. If a student **misses a day**, the experience should be supportive rather than punitive, offering recovery options, streak protection where available, and a clear next action. For an **empty profile**, provide useful placeholders, a setup checklist, and an obvious first action.

We have only **48 hours**, so we must prioritize exceptional mobile UX, a clear student journey, strong visual design, meaningful AI, career-focused outcomes, a smooth demo, strong storytelling, and technical feasibility. We should use mocked data where necessary and avoid unnecessary backend complexity. A polished MVP is more valuable than many unfinished features.

Whenever suggesting a feature, evaluate **what problem it solves, how it works, why students need it, why it is different, how it should appear in the UI, how we can implement it within 48 hours, and how we should demonstrate it to judges**. Do not add features simply to make the project look bigger.

Our ultimate goal is to make the judges think: **“They didn't just redesign ABTalks. They understood why students struggle during a 60-day journey and redesigned the entire experience around that problem.”**





2. # PROJECT: Neura60 — ABTalks 60-Day Coding Challenge Redesign

Build a complete, production-quality web application called **Neura60** for **Team Tathastu**.

## CORE IDEA

We are redesigning the ABTalks 60-Day Coding Challenge.

IMPORTANT:
This is NOT just a visual redesign.

The goal is to redesign the COMPLETE STUDENT EXPERIENCE.

The central product philosophy is:

> "We didn't redesign a website. We redesigned the student's 60-day learning journey."

The experience should take a student through:

LEARN → BUILD → SUBMIT → REFLECT → IMPROVE → SHARE → GROW

The website must feel like a polished modern EdTech + AI product, suitable for a hackathon final demo.

---

# TECH STACK

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Three.js / React Three Fiber where appropriate
- Recharts or another lightweight charting library
- LocalStorage for persistence
- No backend required for the demo
- No external API keys required

The application must run with:

npm install
npm run dev

and build successfully with:

npm run build

---

# DESIGN DIRECTION

Create a premium futuristic dark interface.

Visual style:

- Dark black / charcoal background
- Purple / violet primary accent
- Subtle gradients
- Glassmorphism used carefully
- Thin borders
- Rounded cards
- Soft glow effects
- Smooth micro-interactions
- Modern typography
- Clean spacing
- Professional SaaS / EdTech aesthetic
- Avoid excessive neon
- Avoid clutter
- Avoid generic AI-generated dashboard appearance

The UI should feel like:

Apple-level simplicity
+
modern AI product
+
developer platform
+
gamified learning environment

Use responsive design for:

- Desktop
- Tablet
- Mobile

---

# APPLICATION STRUCTURE

Create the following major areas.

## 1. LANDING PAGE

Create a highly polished landing page.

Hero section:

Headline:

"Your 60-Day Journey to a Better Developer."

Supporting text:

"Neura60 transforms a coding challenge into a complete learning journey — combining challenges, AI mentorship, progress tracking, community and career growth."

Primary CTA:

"Start Your Journey"

Secondary CTA:

"Explore the Challenge"

Include:

- Animated gradient background
- Floating UI elements
- Subtle developer/code visuals
- 60-day progress visualization
- Feature preview cards
- Smooth scroll animations

Sections:

### Why Neura60?

Explain the difference between:

Traditional coding challenge:
- Solve
- Submit
- Repeat

Neura60:
- Learn
- Build
- Submit
- Reflect
- Improve
- Share
- Grow

### Feature showcase

Show:

- Daily challenges
- AI Mentor
- AI Code Review
- Gamification
- Skill analytics
- Learning roadmap
- Community
- Portfolio

### Final CTA

"Your 60 days start here."

---

# 2. AUTHENTICATION

Create a polished authentication modal/page.

Support:

- Login
- Create account
- Demo account

Since there is no backend, use LocalStorage.

Allow demo users such as:

Student:
student@neura60.demo

Admin:
admin@neura60.demo

Do not require real authentication.

After login, route to dashboard.

---

# 3. STUDENT DASHBOARD

Create the main student dashboard.

Top navigation should contain:

- Dashboard
- Challenges
- Roadmap
- Progress
- Community
- AI Mentor
- Portfolio

User profile on the right.

Dashboard should show:

### Welcome section

"Good morning, [Student Name]"

Subtitle:

"Ready to continue your 60-day journey?"

### Current progress

Show:

Day 24 / 60

Progress percentage

XP

Current level

Current streak

Longest streak

### Today's Challenge

Large featured card containing:

- Day number
- Challenge title
- Difficulty
- Estimated time
- Skills
- Description
- Start challenge button

### Continue learning

Show upcoming challenge cards.

### Streak Guardian

Show:

"Your 18-day streak is active."

Include streak protection.

### Recent achievements

Show earned badges.

---

# 4. 60-DAY CHALLENGE SYSTEM

Create a complete challenge page.

Display all 60 days.

Each challenge should have:

- Day
- Title
- Description
- Difficulty
- Category
- Skills
- XP reward
- Status

Statuses:

- Locked
- Available
- In Progress
- Completed

Create filters:

- All
- Completed
- In Progress
- Locked
- Easy
- Medium
- Hard

Create a challenge detail modal/page.

Include:

- Problem statement
- Requirements
- Hints
- Expected outcome
- Skills practiced
- XP reward
- Start challenge button

---

# 5. SUBMISSION SYSTEM

Create a submission interface.

Students should be able to:

- Paste code
- Add GitHub URL
- Add project URL
- Add notes
- Submit challenge

After submission show:

"Submission received."

Create a submission history.

Each submission should display:

- Challenge
- Date
- Status
- XP earned
- AI feedback

---

# 6. DAILY REFLECTION

After completing a challenge, show a reflection modal.

Questions:

"What did you learn today?"

"What was difficult?"

"What would you do differently?"

"How confident do you feel?"

Allow:

- Text response
- Confidence slider

Save responses to LocalStorage.

---

# 7. GAMIFICATION

Create a complete gamification system.

Include:

## XP

Award XP for:

- Completing challenges
- Reflection
- Maintaining streaks
- Community participation

## Levels

Example:

Level 1 — Beginner
Level 2 — Explorer
Level 3 — Builder
Level 4 — Problem Solver
Level 5 — Developer
Level 6 — Advanced Developer

## Badges

Create badges such as:

- First Commit
- 7 Day Streak
- 14 Day Streak
- 30 Day Streak
- Challenge Crusher
- Debug Master
- Reflection Pro
- Community Builder
- AI Explorer
- 60 Day Finisher

Show locked and unlocked badges.

Create an animated level-up modal.

---

# 8. STREAK SYSTEM

Create:

- Current streak
- Longest streak
- Streak calendar
- Streak freeze

Allow students to use a limited streak freeze.

Example:

"You have 2 streak freezes available."

Make the experience visually satisfying.

---

# 9. 3D PROGRESSION EXPERIENCE

Create an interactive progression visualization.

Use Three.js / React Three Fiber.

Represent the 60-day journey as:

- A glowing path
- Nodes representing completed days
- Current day highlighted
- Future days locked

The user should be able to rotate/zoom the visualization.

Keep it performant.

Provide a fallback for devices that cannot handle WebGL.

---

# 10. AI MENTOR

Create an AI Mentor interface.

It should look like a modern AI chat application.

Features:

- Chat interface
- Suggested questions
- Learning context
- Current challenge context

Example suggested prompts:

"Explain this concept."

"Give me a hint."

"What should I learn next?"

"Why is my approach inefficient?"

Since there is no API key, implement a realistic demo response system using predefined contextual responses.

IMPORTANT:

Do not expose fake API keys.

Clearly structure the code so a real AI API can be integrated later.

---

# 11. AI CODE REVIEW

Create an AI Code Review modal/page.

Input:

- Programming language
- Code editor/text area

Output:

- Overall score
- Bugs
- Code quality
- Complexity
- Suggestions
- Strengths

Use simulated responses for the demo.

Example:

Code Quality: 82/100

Performance: Good

Readability: Excellent

Suggestions:
- Extract repeated logic
- Improve variable naming
- Handle edge cases

Animate the review results.

---

# 12. LEARNING ROADMAP

Create a visual roadmap.

Sections:

1. Programming Foundations
2. Problem Solving
3. Data Structures
4. Algorithms
5. Web Development
6. APIs
7. Databases
8. AI/ML Foundations
9. Projects
10. Career Preparation

Each roadmap node should show:

- Status
- Progress
- Skills
- Related challenges

Completed nodes should visually unlock the next stage.

---

# 13. SKILL HEATMAP

Create a developer skill analytics page.

Skills:

- Python
- JavaScript
- TypeScript
- HTML
- CSS
- React
- Git
- SQL
- Data Structures
- Algorithms
- APIs
- AI/ML

Display:

- Skill level
- Progress
- Challenges completed
- Recent improvement

Create a visually attractive heatmap.

---

# 14. DEVELOPER REPORT

Create a developer progress report.

Show:

- Challenges completed
- XP earned
- Current streak
- Skills developed
- Strongest skills
- Skills needing improvement
- Completion rate
- Average challenge difficulty
- Weekly activity

Use charts.

Create a "Download Report" button.

For demo purposes, generate a printable report page.

---

# 15. COMMUNITY

Create a community page.

Students can see:

- Posts
- Achievements
- Streaks
- Projects
- Discussions

Allow demo interactions:

- Like
- Comment
- Follow

Create sample community posts.

Example:

"Completed Day 30! 🚀"

"I finally understood recursion today."

"Built my first React project."

---

# 16. NOTIFICATIONS

Create a notification center.

Examples:

"Your Day 24 challenge is ready."

"You earned the 14 Day Streak badge."

"Your AI Code Review is ready."

"You have 3 days left in your current milestone."

Allow notifications to be marked read.

---

# 17. PORTFOLIO BUILDER

Create an AI-powered portfolio builder.

Student can enter:

- Name
- Bio
- Skills
- Projects
- GitHub
- LinkedIn

Generate a polished portfolio preview.

Include sections:

- Hero
- About
- Skills
- Projects
- Achievements
- 60-Day Journey
- Contact

Allow changing themes.

---

# 18. ADMIN DASHBOARD

Create an admin dashboard.

Admin should see:

- Total students
- Active students
- Completion rate
- Average streak
- Challenges completed
- Average XP
- Most difficult challenges

Include charts.

Challenge management:

- Create challenge
- Edit challenge
- Delete challenge
- Lock/unlock challenge

Student management:

- View students
- View progress
- View streak
- View submissions

This can all use mock data.

---

# 19. ACCOUNT SYSTEM

Create account settings.

Allow:

- Edit profile
- Change avatar
- Change display name
- View statistics
- Reset progress
- Switch demo account
- Logout

Persist relevant data with LocalStorage.

---

# 20. NAVIGATION

Desktop:

Fixed sidebar or top navigation.

Mobile:

Responsive bottom navigation / hamburger menu.

Use smooth page transitions.

Use React Router if appropriate.

---

# 21. DATA ARCHITECTURE

Create clean TypeScript types.

Suggested structures:

User
Challenge
Submission
Badge
Notification
Skill
RoadmapNode
CommunityPost
Achievement
Reflection

Create centralized mock data.

Do not scatter hardcoded data throughout components.

---

# 22. LOCAL STORAGE

Persist:

- Current user
- Challenge progress
- XP
- Level
- Streak
- Badges
- Reflections
- Submissions
- Notifications
- Community interactions
- Portfolio information

Refreshing the browser should NOT reset the demo.

Create helper utilities for LocalStorage.

---

# 23. UX REQUIREMENTS

The application must:

- Have loading states
- Have empty states
- Have hover states
- Have disabled states
- Have error states
- Have success feedback
- Have confirmation dialogs
- Be keyboard accessible
- Be responsive

Avoid:

- Broken buttons
- Dead navigation
- Placeholder lorem ipsum
- Generic empty screens
- Console errors
- Unhandled exceptions

Every major button should perform a meaningful demo action.

---

# 24. ANIMATIONS

Use Framer Motion.

Animations should include:

- Page transitions
- Card hover
- Modal entrance
- Progress animations
- Badge unlock
- Level up
- Toast notifications
- Streak animation

Keep animations subtle and professional.

Do NOT over-animate the entire interface.

---

# 25. DEMO DATA

Create a realistic demo student:

Name:
Ayush

Day:
24 / 60

XP:
4,280

Level:
Builder

Current streak:
18 days

Longest streak:
23 days

Completed challenges:
23

Skills:

React: 72
JavaScript: 68
Python: 81
Git: 64
Algorithms: 57
SQL: 48

Use realistic challenge names and descriptions.

---

# 26. SUBMISSION PAGE

Create a dedicated submission page matching the ABTalks submission requirements.

Fields:

Problem Statement:
Redesign ABTalks

Public GitHub Repo:
https://github.com/Ayushpr2111C/Tathastu

Live URL:
[deployment URL]

AI Usage Log:
https://github.com/Ayushpr2111C/Tathastu/blob/main/PROMPT.md

Make the form visually polished.

---

# 27. PERFORMANCE

The application must be optimized.

Avoid:

- unnecessary rerenders
- massive dependencies
- blocking animations
- loading huge assets unnecessarily

Lazy load heavy pages/components when appropriate.

Three.js components should be loaded only when needed.

---

# 28. CODE QUALITY

Use:

- Reusable components
- TypeScript
- Clear naming
- Small components
- Centralized types
- Centralized mock data
- Utility functions
- Context/state management where useful

Do not put the entire application inside App.tsx.

Organize code approximately like:

src/
├── components/
│   ├── ai/
│   ├── auth/
│   ├── challenge/
│   ├── community/
│   ├── dashboard/
│   ├── gamification/
│   ├── layout/
│   ├── portfolio/
│   ├── progress/
│   └── common/
│
├── pages/
├── context/
├── data/
├── hooks/
├── types/
├── utils/
├── assets/
├── App.tsx
├── App.css
├── index.css
└── main.tsx

---

# 29. README

Create a professional README.

Include:

# Neura60

A complete redesign of the ABTalks 60-Day Coding Challenge.

## Problem

Explain why traditional coding challenges fail to maintain motivation and provide holistic growth.

## Solution

Explain Neura60.

## Features

List all major features.

## Tech Stack

List technologies.

## Architecture

Explain the project structure.

## Running locally

npm install
npm run dev

## Team

Team Tathastu

## Hackathon

ABTalks 60-Day Coding Challenge

---

# 30. IMPORTANT DEVELOPMENT RULES

Do NOT create only static screenshots.

The website must actually work as an interactive demo.

Every navigation item should lead somewhere.

Every major CTA should work.

Use realistic data.

Do not require backend infrastructure.

Do not require API keys.

Do not expose secrets.

Use LocalStorage for demo persistence.

Make the application feel like a real product rather than a collection of disconnected pages.

---

# FINAL QUALITY BAR

Before finishing:

1. Run npm install
2. Run npm run build
3. Fix all TypeScript errors
4. Fix all console errors
5. Test every navigation item
6. Test login
7. Test challenge completion
8. Test XP
9. Test streak
10. Test badges
11. Test AI Mentor
12. Test AI Code Review
13. Test roadmap
14. Test analytics
15. Test community
16. Test portfolio
17. Test admin dashboard
18. Test mobile responsiveness

The final result should look like a polished hackathon-winning product.

The application should communicate one clear message:

> "We didn't redesign a website.
> We redesigned the student's 60-day learning journey."

Build the complete application now.
