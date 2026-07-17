# 🚗 Parkora

Parkora is a modern, premium end-to-end smart parking booking and valet management platform built with a high-performance **Nx monorepo** architecture. It includes four distinct front-end applications tailored to different user roles, powered by a robust, secure GraphQL API gateway.

---

## 🏗️ Architecture & Technology Stack

The platform is engineered using modern, state-of-the-art technologies:

*   **Monorepo Tooling**: [Nx Workspace](https://nx.dev/) (for unified dependency management, caching, and building)
*   **Backend API**: [NestJS](https://nestjs.com/) with [GraphQL (Apollo)](https://graphql.org/)
*   **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) managed via [Prisma ORM](https://www.prisma.io/)
*   **Authentication**: [Firebase Auth & Admin SDK](https://firebase.google.com/) (fully integrated with custom user claims/roles)
*   **Frontend Framework**: [Next.js](https://nextjs.org/) (React)
*   **Payments & Invoicing**: [Stripe](https://stripe.com/)
*   **UI/UX**: Custom premium components with Tailwind CSS & Storybook

---

## 📱 Portals & Interfaces

Parkora provides four dedicated user portals to support the parking ecosystem:

### 1. 🧑‍💻 Customer App (`http://localhost:3001`)
*   Search for available parking spots using interactive Mapbox maps.
*   Filter by space type, features, pricing, and distances.
*   Book slots securely with Stripe payment integration.
*   Manage booking timelines, directions, and view trip history.

### 2. 🏢 Manager App (`http://localhost:3002`)
*   Onboard and register new parking garages and lots.
*   Configure slots, pricing tiers, and operating hours.
*   Hire, manage, and dispatch valet drivers.
*   View real-time booking statistics and revenue analytics.

### 3. 🛡️ Admin App (`http://localhost:3003`)
*   System-wide dashboard for overseeing global operations.
*   Approve/reject registered garages and management teams.
*   Manage user registrations, feedback, and platform settings.

### 4. 🔑 Valet App (`http://localhost:3004`)
*   Real-time job queue for car pickup and drop-off requests.
*   Receive assignment notifications and follow mapping route instructions.
*   Update vehicle statuses (e.g., Picked Up, Parked, Completed).

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [Yarn](https://yarnpkg.com/)
*   [Docker](https://www.docker.com/) (for local database services)

### 🔧 Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Krishnakr21/Parkora.git
    cd Parkora
    ```

2.  **Install Dependencies**:
    ```bash
    yarn install
    ```

3.  **Start Local Services (PostgreSQL & pgAdmin)**:
    Make sure Docker is running, then start the containers:
    ```bash
    docker-compose up -d
    ```

4.  **Database Migration & Seeding**:
    Apply the database schema and seed the initial dataset:
    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```

5.  **Configure Environment Variables**:
    Create `.env` files in the root and under `apps/api/` directories with your Firebase, Mapbox, and Stripe configuration credentials.

---

## 🏃 Running the Application

You can launch all services or run them individually using Nx commands:

*   **Run API Gateway**:
    ```bash
    yarn start:api
    ```
*   **Run Customer App**:
    ```bash
    yarn start:web
    ```
*   **Run Manager App**:
    ```bash
    yarn start:web-manager
    ```
*   **Run Admin App**:
    ```bash
    yarn start:web-admin
    ```
*   **Run Valet App**:
    ```bash
    yarn nx dev @parkora-org/web-valet
    ```
