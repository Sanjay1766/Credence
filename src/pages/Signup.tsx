// ============================================
// CREDENCE - Signup Page
// ============================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, CheckCircle2 } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase', met: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const allRequirementsMet = passwordRequirements.every((r) => r.met);
    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    setIsLoading(true);

    // Simulate signup - Replace with actual authentication
    setTimeout(() => {
      dispatch({
        type: 'SET_USER',
        payload: {
          id: Date.now().toString(),
          email: email,
          fullName: fullName,
          createdAt: new Date(),
          onboardingComplete: false,
        },
      });
      dispatch({ type: 'SET_LLM_CONNECTED', payload: true });
      navigate('/onboarding');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-grid flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-tertiary/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">Credence</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Start building your
            <br />
            <span className="gradient-text">verified skill graph</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md mb-8">
            Join thousands of students replacing resumes with proof-based profiles.
          </p>

          <div className="space-y-4">
            {[
              'AI-powered project analysis',
              'GitHub & LeetCode integration',
              '4-year growth tracking',
              'Professional public profile',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-success" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Credence</span>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 mb-8">Start your skill verification journey</p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-accent-danger/10 border border-accent-danger/30 text-accent-danger text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="input-label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input pl-12"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-12"
                    placeholder="you@university.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-12 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.met ? 'bg-accent-success/20 text-accent-success' : 'bg-dark-600 text-gray-500'
                      }`}>
                        {req.met && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={req.met ? 'text-accent-success' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  required
                  className="mt-1 w-4 h-4 rounded border-dark-400 bg-dark-700 text-accent-primary focus:ring-accent-primary" 
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-accent-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-accent-primary hover:underline">Privacy Policy</a>
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-500" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-dark-800 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button className="mt-4 w-full btn-secondary flex items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
