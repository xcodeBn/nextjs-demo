import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams.callbackUrl || '/';

  async function login(formData: FormData) {
    'use server';
    (await cookies()).set('auth', 'true');
    const callbackUrl = formData.get('callbackUrl') as string || '/';
    redirect(callbackUrl);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-50">Login</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
            This is a demo. No password required.
        </p>
        <form action={login}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button 
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-3 rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}