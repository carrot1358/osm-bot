import { User } from './auth';
import { OsmData, FollowupUser } from './bot';

// Auth State
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// NCDs Bot State
export interface NCDsBotState {
  isStarting: boolean;
  botToken: string | null;
  osmData: OsmData | null;
  followupUsers: FollowupUser[];
  selectedUsers: string[]; // Changed from Set to array for serialization
  isLoadingUsers: boolean;
  isProcessing: boolean;
  processedCount: number;
  totalCount: number;
  currentProcessing: string;
}

// App State for general application settings
export interface AppState {
  theme: 'light' | 'dark' | 'system';
  lastVisitedBot: string | null;
  notifications: {
    enabled: boolean;
    soundEnabled: boolean;
  };
}

// Root State
export interface RootState {
  auth: AuthState;
  ncdsBot: NCDsBotState;
  app: AppState;
}