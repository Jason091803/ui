import SettingsPage from './SettingsPage';

interface DoctorSettingsPageProps {
  userName: string;
  onUpdateUserName?: (name: string) => void;
  onNavigateToHome: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToFeedback?: () => void;
  onNavigateToData?: () => void;
  onNavigateToLogin?: () => void;
}

export default function DoctorSettingsPage(props: DoctorSettingsPageProps) {
  return <SettingsPage variant="doctor" {...props} />;
}
