# Implementation Plan: ASIS Next Phase

## Overview

Implement a multi-view timeline, dashboard hub architecture, and cross-sync budget/health functionalities for the ASIS mobile application focusing on rigorous schedules. Incorporates resolved edge cases for overdrafts, lazy loading, and modal UX.

## Project Type

**MOBILE**

## Success Criteria

- Segmented control toggles "Today", "Week", "Month" views without lag.
- Month view uses lazy-loading for tasks, initially displaying only dots, opening a Bottom Sheet with a dark/blur modal backdrop.
- Dashboard widgets are touchable and navigate cleanly.
- Finance and Health screens display target visuals in NativeWind v4 + Claymorphism.
- Zustand store correctly links meal plan cost to finance food budget and allows overdrafts with an Amber/Red warning state, without blocking transactions.

## Tech Stack

- **Framework**: React Native + Expo Router
- **Styling**: NativeWind v4, SafeAreaView, ClayCard/ClayButton
- **State**: Zustand + react-native-mmkv

## File Structure

```
app/(tabs)/timeline.tsx       # Modify
app/(tabs)/dashboard.tsx      # Modify
app/dashboard/health.tsx      # New
app/dashboard/finance.tsx     # New
store/index.ts                # Modify (or closest Zustand slice file)
```

## Task Breakdown

### Task 1: Zustand Store Updates

- **Agent**: `mobile-developer`
- **Skill**: _app-builder_
- **Priority**: High
- **Dependencies**: None
- **INPUT**: Existing Zustand store configuration.
- **OUTPUT**: `syncMealCostToBudget` action. Schema to link meals to food budget, allowing negative state with an `isOverdraftWarning` flag.
- **VERIFY**: Unit test or manual logging verifies `syncMealCostToBudget` reduces the budget to negative and toggles the warning flag.

### Task 2: Refactor Timeline for Multi-View

- **Agent**: `mobile-developer`
- **Skill**: _mobile-design_
- **Priority**: High
- **Dependencies**: None
- **INPUT**: `timeline.tsx` with only Today view.
- **OUTPUT**: Segmented control. Week Date Strip. Month Grid + lazily loaded bottom sheet with blur/darken backdrop.
- **VERIFY**: Visually toggling between Day/Week/Month. Tapping month date opens modal backdrop bottom sheet without interactivity behind it.

### Task 3: Dashboard Hub & Spoke Navigation

- **Agent**: `mobile-developer`
- **Skill**: _app-builder_
- **Priority**: Medium
- **Dependencies**: None
- **INPUT**: Static `dashboard.tsx` widgets.
- **OUTPUT**: Wrapping "Monthly Budget" and "Health Goals" in components that apply `router.push('/dashboard/...')`.
- **VERIFY**: Tapping components routes to the respective screens.

### Task 4: Develop Finance Details Screen

- **Agent**: `mobile-developer`
- **Skill**: _mobile-design_
- **Priority**: High
- **Dependencies**: Task 3
- **INPUT**: New `app/dashboard/finance.tsx`.
- **OUTPUT**: Claymorphism UI showing Fixed Income, Goal Setup (Savings), Allocation Grid, and Burn-rate representation. Integrates Zustand store info.
- **VERIFY**: Displays overdraft warning in Amber/Red if `isOverdraftWarning` is true.

### Task 5: Develop Health Details Screen

- **Agent**: `mobile-developer`
- **Skill**: _mobile-design_
- **Priority**: High
- **Dependencies**: Task 3
- **INPUT**: New `app/dashboard/health.tsx`.
- **OUTPUT**: Claymorphism UI for Weight Target, Calorie Ring, Sleep Debt AI Insight Card.
- **VERIFY**: Layout strictly follows the provided color and shape constraints.

## ✅ Phase X COMPLETE

Checking criteria post-implementation:

- Lint: [ ] Pass
- Security: [ ] No critical issues
- Build: [ ] Success
- Date: [TBD]
