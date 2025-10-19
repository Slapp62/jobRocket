# 📘 React Mantine School Project

A modern React frontend application built with **React**, **Vite**, **TypeScript**, and **Mantine UI**. This project interfaces with the school's API to display and manage a collection of cards, featuring search, sorting, animations, and pagination. It allows users to create basic accounts, as well as business accounts with card creation capabilities. There are also built-in account management features for users and admins.

---

## 🚀 Features

- 🔧 **Built with Vite** for lightning-fast development
- 🎨 **UI powered by Mantine** – clean, responsive, and accessible
- 🔎 **Search functionality** by title, subtitle, or description
- ↕️ **Sorting** by title (A–Z or Z–A) and date created (newest/oldest)
- 📄 **Pagination** (12 cards per page)
- 💫 **Framer Motion animations** for smooth UI transitions
- 🗂️ **Redux state management** for search and sort control
- 🧠 **TypeScript** for strict type safety and developer experience
- 👤 **User Authentication** with support for basic and business accounts
- 📝 **Card Creation** capabilities for business accounts
- 🔐 **Admin Panel** for managing users and content

---

## 🖥️ Interface Overview

### Home Page

- Displays a list of cards fetched from the school's API.
- Includes a search bar to filter cards by title, subtitle, or description.
- Sorting options to arrange cards by title or creation date.
- Pagination controls to navigate through multiple pages of cards.
- Smooth animations using Framer Motion for enhanced user experience.

### User Authentication

- Users can register and log in to their accounts.
- Supports both basic and business account types.
- Business accounts have additional privileges, such as card creation.

### Card Management

- Business users can create, edit, and delete cards.
- Cards include fields like title, subtitle, description, and creation date.

### Admin Panel

- Admin users have access to a dedicated panel.
- Manage user accounts, including promoting or demoting users.
- Oversee all cards and perform administrative actions as needed.

---

## 🏗️ Project Structure

```
reactMantineProject/
├── public/
├── src/
├── assets/
├── components/
│ ├── Buttons/
│ │ └── AddToFavorites.tsx
│ ├── Cards/
│ │ └── MiniCard.tsx
│ ├── ComponentStyles/
│ │ ├── FooterStyles.module.css
│ │ ├── LightDarkToggle.module.css
│ │ ├── Logo.module.css
│ │ ├── Navigation.module.css
│ ├── Navbar/
│ │ ├── DeleteUserModal.tsx
│ │ ├── Footer.tsx
│ │ ├── Hero.tsx
│ │ └── LightDarkToggle.tsx
├── hooks/
│ ├── getCleanedData.ts
│ ├── useAuthRedirect.ts
│ ├── useDeleteCard.ts
│ ├── useDeleteProfile.ts
│ ├── useGetAllUsers.ts
│ ├── useGetCards.ts
│ └── useLikeUnlike.ts
├── pages/
│ ├── AdminControls/
│ │ ├── AdminControls.page.tsx
│ │ └── useAdminControls.ts
│ ├── EditProfilePage/
│ │ ├── EditProfile.page.tsx
│ │ └── useEditProfile.ts
│ ├── LoginPage/
│ │ └── Login.page.tsx
│ ├── 404.page.tsx
│ ├── About.page.tsx
│ ├── CardDetails.page.tsx
│ ├── CreateCard.page.tsx
│ ├── EditCard.page.tsx
│ ├── Favorites.page.tsx
│ ├── Home.page.tsx
│ ├── MyListings.page.tsx
│ └── Register.page.tsx
├── Routing/
│ ├── Layout.tsx
│ ├── RouteGuard.tsx
│ └── Router.tsx
├── store/
│ ├── cardSlice.ts
│ ├── searchSlice.ts
│ ├── store.ts
│ └── validationRules.ts
├── themes.ts
├── App.tsx
├── main.tsx
├── Types/
│ └── index.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Slapp62/reactMantineProject.git
cd reactMantineProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build locally

---

## 🌐 Public Site

The site is currently deployed live at `https://reactMantineProject.onrender.com`

---

## 📄 License

This project is for academic purposes only and not intended for production use.

---

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/)
- [Redux](https://redux.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

---

_Developed by Elazar Lapp._
