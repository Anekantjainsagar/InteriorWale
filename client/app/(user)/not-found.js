import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-[120px] md:text-[180px] font-extrabold text-global-2 leading-none">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-global-1 mt-4 mb-6">
          Page Not Found
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-button-1 text-global-3 px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
