# Next.js Full Stack PC Webshop

A modern, full-stack PC webshop built with Next.js, React, MongoDB, and Tailwind CSS. Features include product browsing, filtering, cart management, and admin product upload.

## Features

- Browse products by category (Motherboard, CPU, GPU, etc.)
- Sidebar filters for price and manufacturer
- Responsive design with dark mode
- Product details and add to cart
- Footer with social links
- Products stored in MongoDB
- Components generated and updated with AI

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MongoDB & Mongoose
- Tailwind CSS
- Material UI (MUI)
- Zustand (state management)
- React Icons

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **MongoDB setup:**
   - Create a `.env.local` file in the root directory
   - Add your MongoDB connection string:
   - Ensure MongoDB is running locally or set up your connection string in environment variables.

## Folder Structure

```
app/
  globals.css
  layout.tsx
  page.tsx
  api/
    products/
      route.ts
      [slug]/
        route.ts
  browse/
    [slug]/
      page.tsx
  home/
  products/
    [slug]/
      page.tsx
components/
  browse/
  cart/
  home/
  layout/
  product/
  sidebar/
  ui/
constants/
database/
docs/
lib/
public/
types/
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Author

Istvan Szabo

---

Feel free to contribute or fork for your own webshop project!
