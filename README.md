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

## 🌐 Live Deployments & Portals

Parkora is fully deployed and live on production! Here are the links to access the platform's user portals, along with setup instructions:

### 1. 🧑‍💻 Customer App
*   **Live URL**: [https://parkora-web.vercel.app/](https://parkora-web.vercel.app/)
*   **Onboarding**: Click **Sign Up** to register a new customer account. You can then search for parking garages in Chennai, browse available slots (CAR, BIKE, BICYCLE, HEAVY), and book a slot.

### 2. 🏢 Manager App
*   **Live URL**: [https://parkora-web-manager.vercel.app/](https://parkora-web-manager.vercel.app/)
*   **Onboarding**: Register a manager account. Once registered, you can create a parking company, add garages, define slots, set pricing, and hire valets.

### 3. 🛡️ Admin App
*   **Live URL**: [https://parkora-web-admin.vercel.app/](https://parkora-web-admin.vercel.app/)
*   **Access Credentials**:
    *   **Email**: `romeokanhai@gmail.com` (Your pre-authorized Admin account)
    *   **Password**: *Use the password created for this email during Firebase registration.*
*   **Role**: Verify new garages and oversee overall platform booking/manager activities.

### 4. 🔑 Valet App
*   **Live URL**: [https://parkora-web-valet.vercel.app/](https://parkora-web-valet.vercel.app/)
*   **Onboarding**: Valet accounts are created and managed by Parking Managers from the Manager Portal. Once added, valets can sign in to accept pickup/dropoff tasks.

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
