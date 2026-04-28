# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Expo dev server (scan QR with Expo Go)
npm run android    # Open on Android emulator / connected device
npm run ios        # Open on iOS simulator
npm run web        # Open in browser
```

There is no test runner or linter configured. `node_modules/` is never committed — run `npm install` after cloning.

## Architecture

**NoLimitsTrainings (NLT)** is a React Native fitness app built with Expo (SDK 54, new architecture enabled) and `expo-router` v6 for file-system routing.

### Navigation structure

`app/_layout.jsx` wraps the entire app in three providers and renders a `Stack` navigator:

```
Stack
├── index.jsx          → redirects to /(tabs)/home (logged in) or /onboarding (not)
├── splash / onboarding / login
├── (tabs)/            → bottom tab navigator with 9 tabs
│   home, training, catalogue, nutrition, coaches, communaute, maps, progression, profile
├── programme/[id]     → programme detail (static data keyed by id)
├── seance/[id]        → live workout session (timers, voice, vibration)
├── booking/[coach]    → coach session booking UI
├── chat/[coach]       → coach messaging (simulated auto-replies)
├── timer              → standalone Tabata/HIIT timer
├── notifications / parametres / historique / defis / premium / boutique / apropos / recherche
```

### Three global contexts (`app/`)

| File | Hook | Purpose |
|------|------|---------|
| `AuthContext.js` | `useAuth()` | User auth stored in AsyncStorage (`nlt_user`). Provides `inscription`, `connexion`, `deconnexion`, `mettreAJourProfil`. No real password hashing — purely local. |
| `ThemeContext.js` | `useTheme()` | `theme` object + `themeId` (`'dark'` default). `THEMES` defines all color tokens. |
| `LangueContext.js` | `useLangue()` | `langue` string + `t` translation object from `translations.js`. Supports fr/en/es/pt/de/nl/ar/ja/zh/ko/hi. |

Provider nesting order in `_layout.jsx`: `AuthProvider > ThemeProvider > LangueProvider`.

### Styling convention

Every screen uses `const s = createStyles(theme)` where `createStyles` is a `(theme) => StyleSheet.create({...})` factory defined at the bottom of each file. Theme tokens:

- `theme.bg` / `theme.card` / `theme.card2` — backgrounds
- `theme.texte` / `theme.texteSous` / `theme.texteFaible` — text hierarchy
- `theme.accent` — primary color (`#E63946` red in both themes)
- `theme.bordure` / `theme.inputBg` / `theme.inputBordure` — borders & inputs
- `theme.tabBar` / `theme.tabBordure` — tab bar

Screens without theming (e.g. `login.jsx`) use inline `StyleSheet.create` with hardcoded dark values.

### Data layer

All content (programmes, exercises, coaches, meal data, weekly stats) is **hardcoded as constants** within each screen file — there is no API or Firestore integration for content yet. `firebase.js` initialises Firebase Auth + Firestore (`auth` and `db` exports) but they are not yet used by any screen; `AuthContext` uses AsyncStorage only.

The maps tab (`maps.jsx`) is the only screen that fetches live data — it queries the **Overpass API** for sports facilities near the user's GPS location.

### Key Expo APIs in use

- `expo-router` — navigation
- `expo-speech` — voice coaching during sessions (`seance/[id].jsx`, `timer.jsx`)
- `expo-location` — GPS for maps tab
- `react-native-maps` + Overpass API — interactive map
- `expo-image-picker` — profile photo and coach photo upload
- `expo-screen-orientation` — timer goes landscape
- `expo-notifications` — imported but not wired to real notifications yet
- `expo-av` — listed in dependencies, not yet used in screens

### Naming conventions

Variable/function names throughout the codebase are in **French** (e.g. `exerciceActuel`, `serieActuelle`, `demarrerRepos`, `mettreAJourProfil`). UI strings come from `translations.js` via the `t` object from `useLangue()`, but some strings are still hardcoded in French directly in JSX.
