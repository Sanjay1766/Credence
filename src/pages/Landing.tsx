// ============================================
// CREDENCE - Landing Page
// "Don't tell me your skills. Show me the proof."
// ============================================

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  GitBranch,
  Code2,
  TrendingUp,
  Shield,
  Brain,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Star,
  Users,
  Building2
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: GitBranch,
      title: 'GitHub Analysis',
      description: 'Connect your GitHub and let AI analyze your repositories, commits, and contribution patterns.',
    },
    {
      icon: Code2,
      title: 'LeetCode Tracking',
      description: 'Monitor daily problem-solving consistency, difficulty growth, and topic coverage.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Ollama LLM understands project complexity, architecture, and technical depth.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Timeline',
      description: 'Visualize your 4-year skill evolution with verified proof at every milestone.',
    },
  ];

  const howItWorks = [
    { step: 1, title: 'Sign Up', description: 'Create your account and add academic details' },
    { step: 2, title: 'Connect', description: 'Link GitHub, LeetCode, and upload projects' },
    { step: 3, title: 'Analyze', description: 'AI evaluates your work and extracts skills' },
    { step: 4, title: 'Grow', description: 'Track progress and build your proof graph' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 bg-grid overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">Credence</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="btn-ghost"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 mb-8">
            <Brain className="w-4 h-4 text-accent-primary" />
            <span className="text-sm text-accent-primary font-medium">Powered by AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Don't tell me your skills.</span>
            <br />
            <span className="gradient-text">Show me the proof.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Replace your resume with a verified skill graph. Track your growth over 4 years
            of academic progress with AI-analyzed proof from real projects.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Start Building Your Proof
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/profile/demo')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              View Demo Profile
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, value: '10K+', label: 'Students' },
            { icon: Building2, value: '500+', label: 'Universities' },
            { icon: Star, value: '4.9', label: 'Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-6 h-6 text-accent-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Evidence-Based Skill Verification
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We analyze your actual work, not your claims. Every skill in your graph is backed by proof.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-interactive group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How Credence Works
            </h2>
            <p className="text-gray-400 text-lg">
              Four simple steps to build your verified skill profile
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center gap-4"
              >
                <div className="card text-center py-8 px-6 min-w-[200px]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-gray-600 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-border p-12 text-center"
          >
            <Shield className="w-16 h-16 text-accent-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Your Skills, Verified
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students building their professional proof graph.
              Let your work speak for itself.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary text-lg px-10 py-4"
            >
              Create Your Proof Graph
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-600 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Credence</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Credence. Skill Verification Engine.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
