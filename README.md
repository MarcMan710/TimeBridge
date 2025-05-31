# 🌍 TimeBridge

TimeBridge is a powerful time zone coordination tool designed to help users across multiple time zones schedule meetings quickly and accurately, with intuitive visual tools.

## 🎯 Goal

Help users across multiple time zones coordinate meetings quickly and accurately, with intuitive visual tools.

## 🧩 Core Features

### 1. Time Zone Converter
- Compare times between multiple cities
- Auto-detect user's local timezone
- Add/remove time zones dynamically
- Horizontal or vertical time slider (visual time mapping)

### 2. Meeting Scheduler
- Select multiple participants + their time zones
- Suggest best overlap time
- Generate a sharable invite link
- Optional: Add to calendar (Google, Outlook)

### 3. Calendar View
- See available slots visually on a shared calendar
- Color-coded time blocks (green = all available, orange = partial)

### 4. Timezone Search & Management
- Fast fuzzy search for cities/time zones
- Save common zones for future sessions
- Toggle 12h / 24h formats

### 5. User Accounts (Optional)
- Save preferences and recurring time zones
- Saved meetings & availability

## 🧭 UX Flow

```
Home → Add Time Zones → Convert Time / Suggest Meeting → Share / Save → (Optional: Add to Calendar)
```

## 🖥️ Page Design & Flow

### 1. Landing Page
- Tagline: "Bridge the World's Time Gaps"
- Quick Demo (GIF or animation)
- CTA: "Try Now" / "Plan a Meeting"

### 2. Time Zone Converter Page
> **Compare world clocks easily**

#### Layout:
- Input: Add City / Time Zone
- Timeline Slider:
  - Show current time across added zones
  - Move slider to see time changes live
- Responsive UI for mobile (stacked), desktop (side-by-side)

### 3. Meeting Scheduler Page
> **Plan meetings with global teams**

#### Form:
- Add participants (name + time zone)
- Preferred meeting length (e.g., 30/60 mins)
- Working hours for each participant

#### Output:
- Suggested overlap times
- Visual calendar with color-coded availability
- "Copy Link" or "Send Invite"

### 4. Meeting Summary Page
> After planning a meeting

- Details of meeting time in each participant's local time
- Add to calendar (ICS file or Google/Outlook integration)
- Edit / Reschedule / Duplicate options

## 🧱 UI Components

- 🌐 **Time Zone Chips** (e.g., "New York (UTC-4)", removable)
- 🕘 **Time Slider**: Move across the day, update all zones live
- 📅 **Availability Grid**: Matrix showing overlap hours
- 📤 **Share Modal**: Copy meeting summary URL
- 🧠 **Smart Suggestion Tooltip**: "Best overlap: 9AM–11AM UTC"

## 🖼️ Visual Design

- **Font**: Inter or Roboto
- **Primary Color**: `#2196F3` (blue – clarity, tech)
- **Accent**: `#4CAF50` (green – go/available)
- **UI Style**: Clean, minimal, card-based layout
- **Theme Toggle**: Light/Dark modes

## 🧪 Tech Stack

| Feature              | Suggestion                         |
| -------------------- | ---------------------------------- |
| Frontend             | React + Tailwind CSS               |
| Time Zone Handling   | `luxon` or `date-fns-tz`           |
| Backend (Optional)   | Supabase / Firebase                |
| Sharing Links        | UUID-based URLs                    |
| Calendar Integration | Google Calendar API                |
| Charts/Grid          | Custom CSS Grid or FullCalendar.js |

## ✅ Optional Premium Features

- Set recurring meetings
- Integrate with Zoom or Google Meet
- Multi-language support
- Team availability dashboard