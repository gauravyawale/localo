export default function AdminDasboard() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-5xl font-bold text-brand mb-4">Welcome to Localo</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
        Discover local shops, groceries, restaurants, and more near you.
      </p>
      <button
        type="button"
        className="mt-6 px-6 py-3 rounded-full bg-brand font-medium hover:bg-brand-dark"
      >
        Explore Now
      </button>
    </section>
  );
}
