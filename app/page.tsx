import HomePage from "@/components/home/HomePage";

// Prevent static generation to avoid MongoDB connection during build
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
