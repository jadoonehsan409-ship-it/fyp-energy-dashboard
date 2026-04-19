import { useState } from 'react';

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            // Simulate authentication delay
            setTimeout(() => {
                setLoading(false);
                onLogin();
            }, 500);
        }
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full bg-[#0a0a0a] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-brandBlue focus:ring-brandBlue'
                            }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-[#0a0a0a] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                                errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-brandBlue focus:ring-brandBlue'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-medium py-3 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 ${
                            loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-brandBlue hover:bg-blue-600 text-white'
                        }`}
                    >
                        {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
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
