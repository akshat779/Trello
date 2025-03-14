# Trello Clone

This project is a **Trello Clone**, a web-based Kanban-style task management application. It allows users to create boards, lists, and cards to organize their tasks. The application is built using modern web technologies such as **React**, **Material-UI**, **Tailwind CSS**, **Zustand**, **dnd-kit**, and **Firebase**.

---

## Features

1. **User Authentication**:
   - Users can log in and log out using Google Authentication.
   - User details (name, email, profile picture) are displayed on the profile page.

2. **Boards**:
   - Users can create boards with custom titles and background colors.
   - Boards are displayed in a grid layout.
   - Boards can be deleted.

3. **Lists**:
   - Users can create lists within a board.
   - Lists can be renamed or deleted.

4. **Cards**:
   - Users can create cards within lists.
   - Cards can be edited, deleted, and moved between lists using drag-and-drop functionality.

5. **Drag-and-Drop**:
   - Cards can be dragged and dropped between lists using **dnd-kit**.

6. **Dynamic Backgrounds**:
   - Each board has a customizable gradient background based on the color chosen by the user.

7. **Responsive Design**:
   - The application is fully responsive and works seamlessly on desktop and mobile devices.

---

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A React component library for building modern, responsive UIs.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **dnd-kit**: A modern drag-and-drop library for React.

### State Management
- **Zustand**: A lightweight state management library for managing global state.

### Backend
- **Firebase**:
  - **Authentication**: Used for user login and logout.
  - **Firestore**: A NoSQL database for storing boards, lists, and cards.

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/akshat779/trello-clone.git
   cd trello-clone

2. **Install Dependencies**
    ```npm install

3. **Set up your Firebase**
    Create a Firebase project in the Firebase Console.
    Enable Firestore Database and Authentication (Google Sign-In).


4. **Run the Application**
    ```npm run dev


## Folder Structure
src/
├── components/
│   ├── AddBoard.jsx        # Component for adding a new board
│   ├── Card.jsx            # Component for individual cards
│   ├── List.jsx            # Component for lists
│   ├── Navbar.jsx          # Navigation bar
│   ├── sideMenu.jsx        # User menu with logout
│   ├── Toast.jsx           # Snackbar for notifications
│   └── Layout.jsx          # Layout component with Navbar and Footer
├── context/
│   ├── AuthContext.jsx     # Context for user authentication
│   └── firebase.js         # Firebase configuration
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Board.jsx           # Boards page
│   ├── BoardDetail.jsx     # Board detail page with lists and cards
│   ├── Profile.jsx         # User profile page
├── store/
│   ├── useBoardStore.jsx   # Zustand store for boards
│   ├── useListStore.jsx    # Zustand store for lists
│   └── useCardStore.jsx    # Zustand store for cards
├── App.jsx                 # Main application component
├── main.jsx                # Entry point for the application
└── index.css               # Global styles