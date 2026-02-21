import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SkillGraph from './pages/SkillGraph';
import LeetCodeTracker from './pages/LeetCodeTracker';
import GitHubConnect from './pages/GitHubConnect';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Settings from './pages/Settings';

// Institution imports
import InstitutionLayout from './components/InstitutionLayout';
import InstitutionDashboard from './pages/InstitutionDashboard';
import InstitutionStudents from './pages/institution/InstitutionStudents';
import InstitutionAnalytics from './pages/institution/InstitutionAnalytics';
import InstitutionSkills from './pages/institution/InstitutionSkills';
import InstitutionPlacements from './pages/institution/InstitutionPlacements';
import InstitutionReports from './pages/institution/InstitutionReports';
import InstitutionSettings from './pages/institution/InstitutionSettings';

// Hiring imports
import HiringLayout from './components/HiringLayout';
import HiringDashboard from './pages/HiringDashboard';
import HiringTalentSearch from './pages/hiring/HiringTalentSearch';
import HiringShortlisted from './pages/hiring/HiringShortlisted';
import HiringJobs from './pages/hiring/HiringJobs';
import HiringInterviews from './pages/hiring/HiringInterviews';
import HiringMessages from './pages/hiring/HiringMessages';
import HiringReports from './pages/hiring/HiringReports';
import HiringSettings from './pages/hiring/HiringSettings';

function App() {
  const { state } = useApp();
  const { isAuthenticated, onboardingComplete } = state;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:username" element={<PublicProfile />} />

      {/* Onboarding */}
      <Route
        path="/onboarding"
        element={
          isAuthenticated ? (
            onboardingComplete ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Onboarding />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Layout><Dashboard /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/projects"
        element={
          isAuthenticated ? (
            <Layout><Projects /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/skills"
        element={
          isAuthenticated ? (
            <Layout><SkillGraph /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/leetcode"
        element={
          isAuthenticated ? (
            <Layout><LeetCodeTracker /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/github"
        element={
          isAuthenticated ? (
            <Layout><GitHubConnect /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/my-profile"
        element={
          isAuthenticated ? (
            <Layout><Profile /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <Layout><Settings /></Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Institution Routes */}
      <Route
        path="/institution/dashboard"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionDashboard /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/students"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionStudents /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/analytics"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionAnalytics /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/skills"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionSkills /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/placements"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionPlacements /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/reports"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionReports /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/institution/settings"
        element={
          isAuthenticated ? (
            <InstitutionLayout><InstitutionSettings /></InstitutionLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Hiring Partner Routes */}
      <Route
        path="/hiring/dashboard"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringDashboard /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/talent-search"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringTalentSearch /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/shortlisted"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringShortlisted /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/jobs"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringJobs /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/interviews"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringInterviews /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/messages"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringMessages /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/reports"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringReports /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/hiring/settings"
        element={
          isAuthenticated ? (
            <HiringLayout><HiringSettings /></HiringLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
