# RealNest - Real Estate Management Platform

RealNest is a modern, responsive real estate management application designed for agents, owners, and tenants. This project demonstrates a production-quality frontend architecture with a simulated backend service for a seamless demo experience.

![RealNest Hero](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🚀 Features

-   **Multi-Role Dashboard**: tailored views for Agents, Owners, Tenants, and Admins.
-   **Property Management**: Agents and Owners can create, edit, and delete property listings.
-   **Booking System**: Tenants can schedule visits; Agents/Owners can view booking requests.
-   **Analytics**: Interactive charts for revenue and occupancy trends (using Recharts).
-   **Advanced Search & Filtering**: Filter properties by type, location, or name.
-   **Persistent State**: Uses a browser-based "backend" service that persists data to `localStorage`, preserving your changes across reloads.
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠 Tech Stack

-   **Frontend**: React 18, TypeScript, Vite (implied by environment)
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand
-   **Routing**: React Router DOM (MemoryRouter for sandbox compatibility)
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **Data Persistence**: Custom LocalStorage Service

## 📦 Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/realnest.git
    cd realnest
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

## 🔑 Demo Accounts

The application comes with pre-configured demo accounts. You can click the quick-access buttons on the login page or use these credentials:

| Role | Email | Password | Capability |
|------|-------|----------|------------|
| **Agent** | `agent@realnest.com` | (any) | Full dashboard, create listings, view all bookings |
| **Owner** | `owner@realnest.com` | (any) | Dashboard, manage owned properties |
| **Tenant** | `tenant@realnest.com` | (any) | Book visits, view personal booking history |
| **Admin** | `admin@realnest.com` | (any) | Full system access |

## 📂 Project Structure

```
realnest/
├── components/         # Reusable UI components (PropertyCard, Layout, etc.)
├── pages/             # Route components (Home, Dashboard, PropertyDetail, etc.)
├── services/          # Backend simulation and data services
│   ├── backend.ts     # LocalStorage-based persistence layer
│   └── mockData.ts    # Initial seed data
├── store/             # Global state management (Zustand)
├── types.ts           # TypeScript interfaces and enums
└── App.tsx            # Main application entry point and routing
```

## 💡 How the Backend Simulation Works

Since this is a frontend-focused demo running in a browser environment, there is no Node.js server attached. Instead, `services/backend.ts` acts as an API layer:

1.  **Persistence**: On first load, it seeds data from `mockData.ts` into your browser's `localStorage`.
2.  **CRUD Operations**: Creating a property or booking modifies this local storage data.
3.  **Latency**: Artificial network delays are added to simulate real-world API interactions (loading states).
4.  **Reset**: To reset the data to its original state, clear your browser's local storage for this domain.

---

Built with ❤️ using React and Tailwind CSS.
