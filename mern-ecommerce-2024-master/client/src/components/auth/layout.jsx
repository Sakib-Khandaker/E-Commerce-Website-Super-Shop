import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      {/* Left Section */}
      <div className="hidden lg:flex items-center justify-center w-1/2  px-12 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/src/assets/shop.jpg')" }}></div>
        <div className="max-w-md space-y-6 text-top text-rose-500 relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">
            যবিপ্রবি বাজারে আপনাকে স্বাগতম
          </h1>
          <p className="text-lg font-light opacity-90">
            সেরা পণ্য, নির্ভরযোগ্য সেবা, এবং সুবিধাজনক কেনাকাটার অভিজ্ঞতা উপভোগ করুন।
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-8 lg:px-12 bg-white dark:bg-gray-800 shadow-lg">
        <div className="w-full max-w-md space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
