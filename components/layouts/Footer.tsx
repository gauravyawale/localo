"use client";

export default function Footer() {
  return (
    <footer className="py-6 text-center border-t border-neutral-200 dark:border-neutral-700">
      <p className="text-sm text-neutral-500">
        © {new Date().getFullYear()} Localo — Connecting You Locally
      </p>
    </footer>
  );
}
