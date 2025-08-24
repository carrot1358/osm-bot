"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-health-green/10 to-health-blue/10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
            </div>
          </div>
        } 
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}