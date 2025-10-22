# 📘 React Mantine School Project

A modern React frontend application built with **React**, **Vite**, **TypeScript**, and **Mantine UI**. This project interfaces with the school's API to display and manage a collection of job listings, featuring search, sorting, animations, and pagination. It allows users to create basic accounts, as well as business accounts with listing creation capabilities. There are also built-in account management features for users and admins.

---

## 🚀 Features

- 🔧 **Built with Vite** for lightning-fast development
- 🎨 **UI powered by Mantine** – clean, responsive, and accessible
- 🔎 **Search functionality** by title, subtitle, or description
- ↕️ **Sorting** by title (A–Z or Z–A) and date created (newest/oldest)
- 📄 **Pagination** (12 listings per page)
- 💫 **Framer Motion animations** for smooth UI transitions
- 🗂️ **Redux state management** for search and sort control
- 🧠 **TypeScript** for strict type safety and developer experience
- 👤 **User Authentication** with support for basic and business accounts
- 📝 **Listing Creation** capabilities for business accounts
- 🔐 **Admin Panel** for managing users and content

---

## 🖥️ Interface Overview

-### Home Page

- Displays a list of listings fetched from the school's API.
- Includes a search bar to filter listings by title, subtitle, or description.
- Sorting options to arrange listings by title or creation date.
- Pagination controls to navigate through multiple pages of listings.
- Smooth animations using Framer Motion for enhanced user experience.

### User Authentication

- Users can register and log in to their accounts.
- Supports both basic and business account types.
- Business accounts have additional privileges, such as listing creation.

### Listing Management

- Business users can create, edit, and delete listings.
- Listings include fields like title, subtitle, description, and creation date.

### Admin Panel

- Admin users have access to a dedicated panel.
- Manage user accounts, including promoting or demoting users.
- Oversee all listings and perform administrative actions as needed.

---

## 🏗️ Project Structure

```
reactMantineProject/
├── public/
├── src/
├── assets/
├── components/
│   ├── Buttons/
│   │   └── FavoritesButton.tsx
│   ├── Navigation/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   ├── Hero.tsx
│   ├── ListingCard.tsx
│   ├── MappedListings.tsx
│   └── SocialMedia.tsx
├── hooks/
│   ├── UseAuthInit.ts
│   ├── UseDeleteListing.ts
│   └── UseLikeUnlike.ts
├── pages/
│   ├── 404.pages.tsx
│   ├── About.pages.tsx
│   ├── CreateListing.pages.tsx
│   ├── EditListing.pages.tsx
│   ├── Favorites.pages.tsx
│   ├── Home.pages.tsx
│   ├── ListingDetails.pages.tsx
│   ├── MyListings.pages.tsx
│   └── Register.pages.tsx
├── routing/
│   ├── AppRouter.tsx
│   └── Layout.tsx
├── store/
│   ├── listingSlice.tsx
│   ├── searchSlice.ts
│   └── store.ts
├── Types.ts
├── main.tsx
├── App.tsx
├── vite-env.d.ts
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
