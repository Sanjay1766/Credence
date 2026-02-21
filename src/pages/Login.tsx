// ============================================
// CREDENCE - Login Page
// ============================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Github, GraduationCap, Building2, Briefcase } from 'lucide-react';

type UserRole = 'student' | 'institution' | 'hiring' | null;

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'student',
    title: 'Credense for Students',
    subtitle: 'Build your proof graph',
    icon: <GraduationCap className="w-8 h-8" />,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Track your skills, connect GitHub & LeetCode, and showcase your verified abilities to recruiters.',
  },
  {
    id: 'institution',
    title: 'Credense for Institution',
    subtitle: 'Empower your students',
    icon: <Building2 className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Monitor student progress, verify skills at scale, and help your graduates stand out.',
  },
  {
    id: 'hiring',
    title: 'Credense for Hiring Partners',
    subtitle: 'Find verified talent',
    icon: <Briefcase className="w-8 h-8" />,
    gradient: 'from-orange-500 to-red-500',
    description: 'Access pre-verified candidates, reduce hiring time, and make data-driven decisions.',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login - Replace with actual authentication
    setTimeout(() => {
      if (email && password) {
        // Extract name from email (e.g., sanjay.srivatsav@email.com -> Sanjay Srivatsav)
        const emailName = email.split('@')[0];
        const fullName = emailName
          .split(/[._-]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join(' ');
        
        dispatch({
          type: 'SET_USER',
          payload: {
            id: '1',
            email: email,
            fullName: fullName,
            role: selectedRole || 'student',
            createdAt: new Date(),
            onboardingComplete: false,
          },
        });
        dispatch({ type: 'SET_LLM_CONNECTED', payload: true });
        
        // Navigate based on role
        if (selectedRole === 'student') {
          navigate('/dashboard');
        } else if (selectedRole === 'institution') {
          navigate('/institution/dashboard');
        } else if (selectedRole === 'hiring') {
          navigate('/hiring/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Please enter your credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  const selectedRoleData = roleOptions.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-dark-900 bg-grid flex flex-col items-center justify-center p-8">
      {/* Centered Content Container */}
      <div className="w-full max-w-lg">
        {/* Logo & Branding - Always Centered */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">Credense</h1>
          <p className="text-lg text-gray-400 mb-2">
            The future of skill verification and Hiring
          </p>
          <p className="text-gray-500">
            Choose your path and get started
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            // Role Selection View
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {roleOptions.map((role, index) => (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRole(role.id)}
                    className="w-full group"
                  >
                    <div className="card p-6 hover:border-accent-primary/50 transition-all duration-300 group-hover:scale-[1.02]">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg`}>
                          {role.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-semibold text-white group-hover:text-accent-primary transition-colors">
                            {role.title}
                          </h3>
                          <p className="text-sm text-gray-400">{role.subtitle}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="mt-8 text-center text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </motion.div>
          ) : (
            // Login Form View
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="card p-8">
                {/* Back Button */}
                <button
                  onClick={handleBackToRoles}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to options</span>
                </button>

                {/* Role Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedRoleData?.gradient} flex items-center justify-center text-white`}>
                    {selectedRoleData?.icon && (
                      <div className="w-5 h-5">
                        {selectedRoleData.id === 'student' && <GraduationCap className="w-5 h-5" />}
                        {selectedRoleData.id === 'institution' && <Building2 className="w-5 h-5" />}
                        {selectedRoleData.id === 'hiring' && <Briefcase className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{selectedRoleData?.title}</h3>
                    <p className="text-xs text-gray-400">{selectedRoleData?.subtitle}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h2>
                <p className="text-gray-400 mb-8 text-center">Enter your credentials to continue</p>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-accent-danger/10 border border-accent-danger/30 text-accent-danger text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="input-label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input pl-12"
                        placeholder={selectedRole === 'student' ? 'you@university.edu' : selectedRole === 'institution' ? 'admin@university.edu' : 'hr@company.com'}
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
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-dark-400 bg-dark-700 text-accent-primary focus:ring-accent-primary" />
                      <span className="text-sm text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-accent-primary hover:underline">
                      Forgot password?
                    </a>
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
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {selectedRole === 'student' && (
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
                )}

                <p className="mt-8 text-center text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-accent-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
