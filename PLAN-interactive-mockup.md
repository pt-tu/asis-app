# Interactive Mockup Logic

## Overview

Implement the Interactive Mockup logic for the mobile application to simulate production flows before backend integration. This includes Zustand state management, Auth navigation, AI task generation simulation, and Timeline data rendering. The mock data must strictly reflect a final-year medical student's intensive schedule to test UI layout bounds and overlapping times, replicating `asis-web` structures.

## Project Type

MOBILE (React Native / Expo) - Handled strictly by `mobile-developer` agent.

## Success Criteria

- [ ] User can click "Login with Google" and see navigation jump to Timeline.
- [ ] AI Generator simulates processing and outputs a list of medical tasks.
- [ ] "Approve" task action commits them to the Zustand global store.
- [ ] Timeline properly displays 24-hr on-call shifts and clinical rotations with Claymorphism UI mirroring `asis-web`.
- [ ] Tapping a task navigates to `details/[taskId].tsx` passing the parameters and hydrating from Zustand correctly.

## Tech Stack

- Zustand (Global State Management)
- Expo Router (Navigation)
- NativeWind (Tailwind / Claymorphism UI matching web)

## File Structure

- `context/useAppStore.ts`
- `app/(auth)/login.tsx` (Update)
- `app/(tabs)/generate.tsx` (Update)
- `app/(tabs)/timeline.tsx` (Update)
- `app/details/[taskId].tsx` (Update)

## Task Breakdown

### 1. Define Zustand Store & Mock Models

- **Agent**: `mobile-developer`
- **Skill**: `mobile-design`, `clean-code`
- **Dependencies**: None
- **INPUT**: `asis-web/src/types/task.ts`, `mock-tasks.ts`, and medical student schedule requirements.
- **OUTPUT**: `context/useAppStore.ts` with `Task` interface (`id`, `task_name`, `start_time`, `duration_minutes`, `tag`). Initialized with Med-Student dataset including grueling 24h shifts, rotations.
- **VERIFY**: Run `npx tsc --noEmit` to ensure TypeScript compliance and interface alignment with web.

### 2. Mock Auth Flow Navigation

- **Agent**: `mobile-developer`
- **Skill**: `mobile-design`
- **Dependencies**: Task 1
- **INPUT**: `app/(auth)/login.tsx`
- **OUTPUT**: Login button invokes `login()` in Zustand `useAppStore`, triggering `router.replace('/(tabs)/timeline')`.
- **VERIFY**: On app launch, clicking "Continue with Google" redirects precisely to Timeline tab without errors.

### 3. Implement Timeline View

- **Agent**: `mobile-developer`
- **Skill**: `mobile-design`
- **Dependencies**: Task 1
- **INPUT**: `app/(tabs)/timeline.tsx`, Zustand store tasks, web `TAG_COLORS` schema.
- **OUTPUT**: Map over Zustand tasks using `ClayCard`. Apply web's tag background color mappings using Tailwind. Ensure padding/spacing scrolling supports long list items. On click triggers `router.push('/details/' + task.id)`.
- **VERIFY**: Timeline screen accurately lists "Trực gác bệnh viện" alongside its respective UI tag color from `TAG_COLORS`.

### 4. Implement AI Generation Simulation

- **Agent**: `mobile-developer`
- **Skill**: `mobile-design`
- **Dependencies**: Task 1, 3
- **INPUT**: `app/(tabs)/generate.tsx`
- **OUTPUT**: Read TextInput. Mock loading state for 1.5s using `setTimeout`. Show realistic mocked generated list (e.g. "Review cases", "On-call prep"). Add floating action button to "Approve to Timeline", which pushes payload to Zustand store and navigates to `timeline`.
- **VERIFY**: Generate flow adds tasks locally; manually navigating to Timeline proves insertion worked.

### 5. Task Detail Page Data Hydration

- **Agent**: `mobile-developer`
- **Skill**: `mobile-design`
- **Dependencies**: Task 3
- **INPUT**: `app/details/[taskId].tsx`
- **OUTPUT**: Parse `taskId` string from `useLocalSearchParams`. Run `const task = useAppStore((s) => s.tasks.find...)`. Display empty state if missing; display details (Task Name, Tag, Expected Duration) if present.
- **VERIFY**: `details/1` renders correctly with dynamic values instead of hardcoded placeholders.

## Phase X: Verification

- [ ] `npx tsc --noEmit`
- [ ] No violet/purple hex codes (Claymorphism and Project strict rules).
- [ ] Verify UI components respect Expo Safe Area and iOS Human Interface Guidelines spacing (touch targets min 44pt).
