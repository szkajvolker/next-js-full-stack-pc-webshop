import Browse from "../browse/Browse";
import Featured from "../featured/Featured";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-n-3 dark:bg-neutral-900 w-full">
      <div className="flex flex-row">
        <Browse />
      </div>
      <div className="flex flex-col px-4 py-8 justify-center items-center">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 dark:text-white">
          Featured products
        </h1>

        <div className="flex flex-row">
          <Featured />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
