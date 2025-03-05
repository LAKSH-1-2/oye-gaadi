import Image from "next/image";

import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative flex place-items-center">
        <h1 className="text-6xl font-bold text-center mb-8 text-white">
          Welcome to <span className="text-yellow-400">Oye Gaadi</span>
          <br />
          Your One-Stop Car Parts Shop
        </h1>
      </div>

      {/* Search Form */}
      <div className="w-full mb-12">
        <SearchForm />
      </div>

      {/* Featured Categories */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-6">
        <div className="group rounded-lg border border-gray-700 px-5 py-4 transition-colors hover:border-yellow-400 hover:bg-gray-700 bg-gray-800">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Engine Parts
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-300">
            High-quality engine components for all car makes and models.
          </p>
        </div>

        <div className="group rounded-lg border border-gray-700 px-5 py-4 transition-colors hover:border-yellow-400 hover:bg-gray-700 bg-gray-800">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Brake Systems
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-300">
            Premium brake pads, rotors, and complete brake kits.
          </p>
        </div>

        <div className="group rounded-lg border border-gray-700 px-5 py-4 transition-colors hover:border-yellow-400 hover:bg-gray-700 bg-gray-800">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Suspension
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-300">
            Shocks, struts, and complete suspension solutions.
          </p>
        </div>

        <div className="group rounded-lg border border-gray-700 px-5 py-4 transition-colors hover:border-yellow-400 hover:bg-gray-700 bg-gray-800">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Body Parts
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-300">
            Exterior and interior body parts for all vehicles.
          </p>
        </div>
      </div>
    </main>
  );
}
