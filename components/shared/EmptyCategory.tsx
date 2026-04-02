"use client";

import { useParams, useRouter } from "next/navigation";
import { BROWSEITEMS } from "@/constants/data";
import { PackageOpen, ArrowLeft } from "lucide-react";

interface EmptyCategoryProps {
  categorySlug?: string; // Optional override dla category slug
}

const EmptyCategory: React.FC<EmptyCategoryProps> = ({ categorySlug }) => {
  const params = useParams();
  const router = useRouter();
  
  // Get category slug from props or URL params
  const slug = categorySlug || (params?.slug as string) || "";
  
  // Find the category display name from BROWSEITEMS
  const categoryItem = BROWSEITEMS.find(item => item.slug === slug);
  const categoryName = categoryItem?.itemname || slug;
  
  const handleGoBack = () => {
    router.push("/");
  };

  const handleBrowseAll = () => {
    router.push("/browse");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12">
      {/* Icon */}
      <div className="mb-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
        <PackageOpen 
          size={64} 
          className="text-gray-400 dark:text-gray-500" 
        />
      </div>
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        No {categoryName} Yet
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
        We currently don&apos;t have any {categoryName.toLowerCase()} products in stock. 
        Check back soon or explore other categories!
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>
        
        <button
          onClick={handleBrowseAll}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
        >
          Browse All Categories
        </button>
      </div>
      
      {/* Suggested categories (if available) */}
      {BROWSEITEMS.length > 0 && (
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Or try these categories:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {BROWSEITEMS.slice(0, 4).map((item) => (
              <button
                key={item.slug}
                onClick={() => router.push(`/browse/${item.slug}`)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-sm"
              >
                {item.itemname}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyCategory;