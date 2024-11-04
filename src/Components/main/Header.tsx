"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Heart, Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { ClerkLoaded, useUser, SignInButton, UserButton } from "@clerk/nextjs";

const defaultCategories = [
  "Fashion Collection",
  "Electronics Item",
  "Home Appliance",
  "Kitchen Item",
  "Furniture",
  "Food",
  "Gadgets",
  "Toys and Games",
  "Health & Beauty",
];

const Header = ({ categories = defaultCategories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const { isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const fetchCartTotal = async () => {
      const response = await fetch("/api/cart-total");
      const data = await response.json();
      setCartTotal(data.total);
    };

    window.addEventListener("scroll", handleScroll);
    fetchCartTotal();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedCount = localStorage.getItem("favoritesCount");
    const count = storedCount ? JSON.parse(storedCount) : 0;
    setFavoritesCount(count);
  }, []);

  const handleAddToFavorites = () => {
    const newCount = favoritesCount + 1;
    setFavoritesCount(newCount);
    localStorage.setItem("favoritesCount", JSON.stringify(newCount));
  };

  const handleOrdersClick = () => {
    router.push(isSignedIn ? "/my-orders" : "/sign-in");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}
      aria-label="Main Header"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link href="/" className="text-2xl font-bold text-pretty">
          ShopSphere
        </Link>

        {/* Mobile Menu Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Main Navigation */}
        <div
          className={`flex-1 md:flex items-center gap-4 mx-4 ${isMenuOpen ? "flex" : "hidden md:flex"}`}
        >
          <form action="/search" className="flex-1 relative">
            <Input
              className="w-full pl-4 pr-10"
              placeholder="Search for Products"
              type="text"
              name="query"
              aria-label="Search Products"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </form>

          <Select defaultValue="all" aria-label="Category Selection">
            <div className="md:w-[180px] w-full">
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Icons & buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Favorites"
            onClick={handleAddToFavorites}
          >
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              {cartTotal}
            </span>
          </Button>

          <div className="flex items-center gap-2">
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <Button onClick={handleOrdersClick} className="ml-4">
            My Orders
          </Button>

          {/* User area */}
          <ClerkLoaded>
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background flex flex-col items-start p-4">
          <Link
            href="/"
            className="py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/products"
            className="py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
