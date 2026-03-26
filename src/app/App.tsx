import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CreateAccountPage from './components/CreateAccountPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import VerifyResetPage from './components/VerifyResetPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import HomePage from './components/HomePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import FullSymptomListPage from './components/FullSymptomListPage';
import ConnectionsPage from './components/ConnectionsPage';
import ActivitiesPage from './components/ActivitiesPage';
import CalendarPage from './components/CalendarPage';
import DataPage from './components/DataPage';
import SettingsPage from './components/SettingsPage';
import DoctorHomePage from './components/DoctorHomePage';
import DoctorClientsPage from './components/DoctorClientsPage';
import DoctorActivitiesPage from './components/DoctorActivitiesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'create-account' | 'reset-password' | 'verify-reset' | 'terms-of-service' | 'privacy-policy' | 'home' | 'doctor-home' | 'doctor-clients' | 'doctor-activities' | 'full-symptom-list' | 'connections' | 'activities' | 'calendar' | 'data' | 'settings'>('login');
  const [signupEmail, setSignupEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [previousPage, setPreviousPage] = useState<'login' | 'signup' | 'create-account' | 'reset-password' | 'verify-reset'>('login');

  return (
    <>
      {currentPage === 'login' ? (
        <LoginPage
          onNavigateToSignup={() => setCurrentPage('signup')}
          onNavigateToReset={() => setCurrentPage('reset-password')}
          onNavigateToTerms={() => {
            setPreviousPage('login');
            setCurrentPage('terms-of-service');
          }}
          onNavigateToPrivacy={() => {
            setPreviousPage('login');
            setCurrentPage('privacy-policy');
          }}
          onNavigateToHome={(role) => setCurrentPage(role === 'doctor' ? 'doctor-home' : 'home')}
        />
      ) : currentPage === 'home' ? (
        <HomePage
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToSymptomList={() => setCurrentPage('full-symptom-list')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'doctor-home' ? (
        <DoctorHomePage 
           onNavigateToLogin={() => setCurrentPage('login')}
           onNavigateToConnections={() => setCurrentPage('doctor-clients')}
           onNavigateToActivities={() => setCurrentPage('doctor-activities')}
           onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'doctor-clients' ? (
        <DoctorClientsPage 
           onNavigateToHome={() => setCurrentPage('doctor-home')}
           onNavigateToActivities={() => setCurrentPage('doctor-activities')}
           onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'doctor-activities' ? (
        <DoctorActivitiesPage 
           onNavigateToHome={() => setCurrentPage('doctor-home')}
           onNavigateToClients={() => setCurrentPage('doctor-clients')}
           onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'data' ? (
        <DataPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'calendar' ? (
        <CalendarPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'connections' ? (
        <ConnectionsPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'activities' ? (
        <ActivitiesPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToSettings={() => setCurrentPage('settings')}
        />
      ) : currentPage === 'settings' ? (
        <SettingsPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      ) : currentPage === 'full-symptom-list' ? (
        <FullSymptomListPage
          onNavigateBack={() => setCurrentPage('home')}
        />
      ) : currentPage === 'signup' ? (
        <SignupPage
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToCreateAccount={(email) => {
            setSignupEmail(email);
            setCurrentPage('create-account');
          }}
          onNavigateToTerms={() => {
            setPreviousPage('signup');
            setCurrentPage('terms-of-service');
          }}
          onNavigateToPrivacy={() => {
            setPreviousPage('signup');
            setCurrentPage('privacy-policy');
          }}
        />
      ) : currentPage === 'reset-password' ? (
        <ResetPasswordPage
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToVerify={(email) => {
            setResetEmail(email);
            setCurrentPage('verify-reset');
          }}
        />
      ) : currentPage === 'verify-reset' ? (
        <VerifyResetPage
          email={resetEmail}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateBackToEmail={() => setCurrentPage('reset-password')}
        />
      ) : currentPage === 'terms-of-service' ? (
        <TermsOfServicePage
          onNavigateBack={() => setCurrentPage(previousPage)}
        />
      ) : currentPage === 'privacy-policy' ? (
        <PrivacyPolicyPage
          onNavigateBack={() => setCurrentPage(previousPage)}
        />
      ) : (
        <CreateAccountPage
          email={signupEmail}
          onNavigateToSignup={() => setCurrentPage('signup')}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      )}
    </>
  );
}
