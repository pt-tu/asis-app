# A.S.I.S Mobile App

Welcome to **A.S.I.S (Autonomous Scheduling and Intelligent System) Mobile App**, a cross-platform React Native application built with [Expo](https://expo.dev) and deeply interconnected with a dedicated Neo-minimalism (Claymorphism) design system.

## 🚀 Features

- **Auth Simulation**: Fast and secure mock authentication logic using Zustand.
- **Smart Timeline**: A beautifully rendered scheduling view (specifically tested with demanding schedules like 24h Medical On-Call shifts).
- **AI Task Generator**: Intelligent text-to-schedule breakdown simulation with "Approve to Timeline" capability.
- **Claymorphism Design System**: Custom layered inner and drop shadows utilizing [NativeWind v4](https://www.nativewind.dev/) mapping web CSS variables for Android/iOS parity.
- **Data Hydration**: Shared `useAppStore` context for dynamic Task Details Deep Linking via Expo Router.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev) & [Expo SDK 54](https://docs.expo.dev/) (Managed Workflow)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with `react-native-mmkv` integrations.
- **Icons**: [Lucide React Native](https://lucide.dev/) (powered by `react-native-svg`)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (+ React Native Worklets)

## 📂 Project Structure

```text
asis-app/
├── app/                           # Systems router & Application screens
│   ├── (auth)/login.tsx           # Authentication screen
│   ├── (tabs)/                    # Base Tab Navigation
│   │   ├── _layout.tsx
│   │   ├── timeline.tsx
│   │   ├── generate.tsx
│   │   └── dashboard.tsx
│   ├── details/[taskId].tsx       # Task Deep Linking Details
│   ├── _layout.tsx                # App Root Layout
│   └── index.tsx                  # Root redirection guard
├── components/ui/                 # Reusable Design System components (ClayCard, ClayButton)
├── context/                       # Zustand Global State (`useAppStore.ts`)
├── global.css                     # Global Styles & Tag Colors (Web mirrored)
└── tailwind.config.js             # NativeWind configs
```

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS recommended)
- [Yarn](https://yarnpkg.com/)
- Expo Go app on your [iOS](https://apps.apple.com/us/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device (or respective Simulator/Emulator).

### Installation

1. Install dependencies:

```bash
yarn install
```

2. Start the Metro development server:

```bash
yarn start -c
```

_(The `-c` flag ensures the babel configurations and tailwind styles compile correctly)._

3. Press `i` to open the iOS simulator, `a` to open the Android emulator, or scan the QR code via Expo Go on your physical device.

---

_Built completely with NativeWind v4 and Expo Router architecture._
