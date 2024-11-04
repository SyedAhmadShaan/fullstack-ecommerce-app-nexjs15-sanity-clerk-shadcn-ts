// components/Sidebar.tsx

import Link from "next/link";

const categories = [
  "Fashion Collection",
  "Electronics Item",
  "Home Appliance",
  "Kitchen Item",
  "Furniture",
  "Food",
  "Gadgets",
  "Toys and Games",
  "Health & beauty",
];

export const Sidebar = () => {
  return (
    <aside className="space-y-4">
      <div className="rounded-lg border bg-card">
        <div className="px-4 py-3 font-medium">Categories</div>
        <div className="divide-y">
          {categories.map((category) => (
            <Link
              key={category}
              href="#"
              className="flex items-center justify-between px-4 py-2 text-sm hover:bg-accent"
            >
              {category}
              <span className="text-muted-foreground">→</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
