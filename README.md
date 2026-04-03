# Next.js Full Stack PC Webshop

> A modern, full-stack e-commerce platform for PC components built with Next.js 15, React 19, MongoDB, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan?logo=tailwind-css)](https://tailwindcss.com/)

## Live Demo

🔗 **[View Live Demo](https://next-js-full-stack-pc-webshop-6pef.vercel.app/)**

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## Features

### E-commerce Core

- **Product Catalog**: Browse PC components by categories (CPU, GPU, RAM, etc.)
- **Smart Filtering**: Filter by manufacturer, price range with real-time updates
- **Shopping Cart**: Add/remove items with quantity management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### User Experience

- **Dark/Light Mode**: Seamless theme switching with persistence
- **Smooth Animations**: GSAP-powered drawer animations and transitions
- **Loading States**: Skeleton loading and error boundaries
- **Empty States**: User-friendly messages with navigation suggestions

### Technical Features

- **Server-Side Rendering**: Static generation with dynamic routes
- **Database Integration**: MongoDB with Mongoose ODM
- **State Management**: Zustand for cart and authentication
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Graceful degradation and user feedback

## Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS + Material-UI components
- **Animations**: GSAP for smooth transitions
- **Icons**: React Icons + Lucide React

### Backend & Database

- **Runtime**: Node.js with serverless functions
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Built-in TypeScript + runtime validation
- **State**: Zustand with localStorage persistence

### Development Tools

- **Language**: TypeScript for type safety
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier integration
- **Version Control**: Git with conventional commits

## Screenshots

> _Screenshots will be added after deployment_

| Desktop View | Mobile View |
| ------------ | ----------- |
| ![Desktop]() | ![Mobile]() |

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Install locally](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/downloads))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/next-js-full-stack-pc-webshop.git
   cd next-js-full-stack-pc-webshop
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Variables](#-environment-variables))

4. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: MongoDB connection string
MONGO_DB_URI=mongodb://localhost:27017/pc-webshop

# For MongoDB Atlas (alternative)
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/pc-webshop

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Environment
NODE_ENV=development
```

> **Tip**: Copy from `.env.example` and update with your values

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com) and import your repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Configure MongoDB Atlas** (for production)
   - Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Update `MONGO_DB_URI` in Vercel environment variables

### Alternative Deployments

- **Netlify**: Add `netlify.toml` configuration
- **Docker**: Use provided `Dockerfile`
- **Railway**: One-click deploy from GitHub

## API Reference

### Products API

```typescript
// Get all products
GET /api/products
Response: { success: boolean, data: IProduct[] }

// Get product by slug
GET /api/products/[slug]
Response: { success: boolean, data: IProduct }

// Create product (Admin)
POST /api/products
Body: Partial<IProduct>
```

### Data Models

```typescript
interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  slug: string;
  isFeatured?: boolean;
  stock?: number;
}
```

## Project Structure

```
next-js-full-stack-pc-webshop/
├── app/                          # Next.js App Router
│   ├── api/products/            # API routes for products
│   ├── browse/[slug]/           # Category pages
│   ├── products/[slug]/         # Product detail pages
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── cart/                    # Shopping cart components
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── product/                 # Product-related components
│   ├── sidebar/                 # Filter sidebar components
│   └── shared/                  # Reusable components
├── lib/                         # Utilities and configurations
│   ├── actions/                 # Server actions
│   ├── stores/                  # Zustand state stores
│   └── database.ts              # MongoDB connection
├── types/                       # TypeScript type definitions
├── constants/                   # Static data and configuration
└── public/                      # Static assets
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Add JSDoc comments for functions
- Update tests for new features
- Follow conventional commit messages
- Ensure all ESLint rules pass

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Troubleshooting

### Common Issues

**MongoDB Connection Error**

```bash
Error: Please define MONGO_DB_URI in .env file!
```

→ Ensure `.env.local` exists with valid `MONGO_DB_URI`

**Build Errors**

```bash
Module not found: Can't resolve '@/...'
```

→ Check TypeScript paths in `tsconfig.json`

**Port Already in Use**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

→ Kill process: `npx kill-port 3000` or use different port

## Author

**István Szabó**

- GitHub: [@yourusername](https://github.com/szkajvolker)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/istvan-szabo-junior-frontend-developer/)
- Portfolio: [Your Website](https://istvan-portfolio.netlify.app/)

---

### Acknowledgments

- Next.js for the amazing framework
- MongoDB for flexible database solution
- Tailwind CSS for utility-first styling
- Vercel for seamless deployment

---

**Star this repository if you found it helpful!**
