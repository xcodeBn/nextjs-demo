import Link from 'next/link';
import { logout } from '@/app/actions';
import { cookies } from 'next/headers';

export default async function Navigation() {
  const isLoggedIn = (await cookies()).has('auth');

  return (
    <nav className="bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-zinc-300 transition-colors">
              📚 BookHub
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/books" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Books
            </Link>
            <Link 
              href="/authors" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Authors
            </Link>
            <Link 
              href="/publishers" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Publishers
            </Link>
            
            {isLoggedIn ? (
              <form action={logout}>
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link 
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
