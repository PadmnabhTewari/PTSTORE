import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import UserMenu from "@/components/UserMenu";
import ChatBot from '@/components/ChatBot';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT-Store | Kanpur's Premier Shopping Destination",
  description: "Your one-stop shop for all your needs in Kanpur",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <div className="min-h-screen flex flex-col">
            <nav className="bg-gradient-to-r from-orange-600 to-red-600 shadow-lg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link href="/" className="flex items-center">
                      <span className="text-2xl font-bold text-white tracking-tight">PT-Store</span>
                    </Link>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link href="/products" className="inline-flex items-center px-4 pt-1 text-white hover:text-orange-200 transition-colors">
                        Products
                      </Link>
                      <Link href="/categories" className="inline-flex items-center px-4 pt-1 text-white hover:text-orange-200 transition-colors">
                        Categories
                      </Link>
                      <Link href="/cart" className="inline-flex items-center px-4 pt-1 text-white hover:text-orange-200 transition-colors">
                        Cart
                      </Link>
                      <Link href="/orders" className="inline-flex items-center px-4 pt-1 text-white hover:text-orange-200 transition-colors">
                        Orders
                      </Link>
                      <Link href="/profile" className="inline-flex items-center px-4 pt-1 text-white hover:text-orange-200 transition-colors">
                        Profile
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserMenu />
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
              {children}
            </main>
            <footer className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm">© 2024 PT-Store. All rights reserved.</p>
                <p className="text-sm mt-2">Based in Kanpur, Uttar Pradesh</p>
              </div>
            </footer>
            <ChatBot />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
