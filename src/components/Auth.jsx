import { useState } from 'react';

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);

    // For now, this just bypasses real authentication to let you see the dashboard.
    // We can connect this to a real database (like Firebase) later!
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-darkbg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-cardbg p-8 rounded-2xl border border-gray-800 shadow-2xl">

                {/* Logo/Icon */}
                <div className="w-12 h-12 bg-brandBlue/10 rounded-xl flex items-center justify-center mb-6 border border-brandBlue/20 mx-auto">
                    <svg width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-gray-400 text-center mb-8">
                    {isLogin ? 'Enter your credentials to access your dashboard' : 'Sign up to monitor your energy realtime'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brandBlue hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors mt-2"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-brandBlue hover:text-blue-400 font-medium transition-colors"
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>

            </div>
        </div>
    );
}