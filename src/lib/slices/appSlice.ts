import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types/store';

// Initial state
const initialState: AppState = {
  theme: 'system',
  lastVisitedBot: null,
  notifications: {
    enabled: true,
    soundEnabled: false,
  },
};

// App slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },

    // Last visited bot
    setLastVisitedBot: (state, action: PayloadAction<string>) => {
      state.lastVisitedBot = action.payload;
    },

    // Notification settings
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notifications.enabled = action.payload;
    },
    setSoundEnabled: (state, action: PayloadAction<boolean>) => {
      state.notifications.soundEnabled = action.payload;
    },
    updateNotificationSettings: (state, action: PayloadAction<{
      enabled?: boolean;
      soundEnabled?: boolean;
    }>) => {
      Object.assign(state.notifications, action.payload);
    },

    // Reset app state
    resetAppState: (state) => {
      return { ...initialState };
    },
  },
});

// Export actions
export const {
  setTheme,
  setLastVisitedBot,
  setNotificationsEnabled,
  setSoundEnabled,
  updateNotificationSettings,
  resetAppState,
} = appSlice.actions;

// Export selectors
export const selectTheme = (state: { app: AppState }) => state.app.theme;
export const selectLastVisitedBot = (state: { app: AppState }) => state.app.lastVisitedBot;
export const selectNotificationSettings = (state: { app: AppState }) => state.app.notifications;

// Export reducer
export default appSlice.reducer;