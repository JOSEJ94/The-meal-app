# The Meal App

**The Meal App** is a React Native application designed to explore random recipes. Built using **Ignite**, **Expo**, and **TypeScript**, the app showcases a simple yet robust implementation of modern React Native practices, featuring:

- **MobX State Tree** for state management.
- Offline support with image caching.
- Smooth animations powered by **Reanimated**.
- Portrait and landscape mode compatibility.
- **Light/Dark mode** based on device preferences.
- Internationalization (**i18n**) with support for English, Spanish, and Portuguese.
- Automated build processes with **GitHub Actions**.

> [!TIP]
> Not sure yet? Try it for Android [here](https://github.com/JOSEJ94/The-meal-app/releases)

## 📱 Features

1.  **Welcome Screen**:

    - A button to navigate to the Dish Screen.

2.  **Dish Screen**:

    - Displays a **random recipe** with:
      - Dish name.
      - Ingredients list.
      - Cooking instructions.
      - Dish image (with offline caching).
      - A button to open the recipe's **YouTube video**.

3.  **Offline Access**:

    - Cached images ensure the app remains functional without an internet connection.

4.  **Themes**:

    - Light and dark themes dynamically adapt to the device's settings.

5.  **Landscape Mode**:

    - Fully optimized UI for both portrait and landscape orientations.

6.  **i18n**:

    - Support for **English**, **Spanish**, and **Portuguese**.

7.  **Animations**:

    - Seamless transitions and interactions using **Reanimated**.

8.  **Unit Testing**:

    - Ensures app reliability with test coverage.

9.  **Backend Integration**:

    - Connects to TheMealDB API for dish data.

10. **GitHub Actions Integration**:
    - Automated Android builds tagged as releases.

---

## 🚀 Getting Started

Follow these steps to set up and run the app locally:

### **Prerequisites**

1.  Ensure you have the following installed:

    - [Node.js](https://nodejs.org/)
    - Android Studio (for Android emulation) or Xcode (for iOS emulation).

2.  Create a `.env` file in the root of the project with the following variable:
    `EXPO_PUBLIC_API_URL=[TheMealDb API url]`

---

### **Installation**

1.  Clone the repository.
2.  Install dependencies:
    `npm install --legacy-peer-deps`
3.  Run the app:
    `npm run ios` or `npm run android`

---

## 🧪 Running Tests

To run the unit tests, use the following command:
`npm run test`

---

## 🔧 Technologies Used

- **Frameworks & Tools**:
  - [Ignite](https://github.com/infinitered/ignite)
  - [Expo](https://expo.dev/)
  - [React Native](https://reactnative.dev/)
- **Language**:
  - [TypeScript](https://www.typescriptlang.org/)
- **State Management**:
  - [MobX State Tree](https://mobx-state-tree.js.org/intro/welcome)
- **Animation**:
  - [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Styling**:
  - Themed styles with dynamic light/dark mode. (uses [React Navigation](https://reactnavigation.org/))
- **Internationalization**:
  - [React-i18next](https://react.i18next.com/) (3 languages so far)
- **Testing**:
  - [Jest](https://jestjs.io/)
  - [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- **Backend API**:
  - [TheMealDB API](https://www.themealdb.com/api.php)

---

## 🛠️ CI/CD

The project uses **GitHub Actions** for automated builds and releases:

- **Android Build**:
  - Automatically creates and uploads an APK to the repository's release section when changes are pushed to the main branch.

---

## 🌐 Internationalization (i18n)

The app supports three languages:

- **English**
- **Spanish**
- **Portuguese**

To add support for more languages, edit the localization files in the `i18n` directory.

---

## 📂 Directory Structure

Here's an overview of the key project folders:

- **app/**: Everything related to React Native components.
- **ios/**: Everything related to native iOS project (e.g Project configuration, native dependencies).
- **android/**: Everything related to Android project (e.g Project manifest, keystores).

Inside app folder you will find the following key project folders

- **app/components**: Reusable UI components.
- **app/screens**: Screen components (e.g., WelcomeScreen, DishScreen).
- **app/models**: MobX state models and stores.
- **app/navigators**: Navigation objects determining mobile navigation.
- **app/services**: API service integrations.
- **app/utils**: Utility functions and hooks (e.g. orientation).
- **app/i18n**: Translation sources and functions related to translating.
- **app/theme**: Theme files

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch:
    `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them:
    `git commit -m "Add your message here"`
4.  Push to the branch:
    `git push origin feature/your-feature-name`
5.  Open a pull request.
