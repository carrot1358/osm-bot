"use client";
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { loginUser, logout, selectUser, selectIsAuthenticated, selectIsLoading } from '@/lib/slices/authSlice';
import { clearBotToken } from '@/lib/slices/ncdsBotSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  const login = async (pid: string, password: string): Promise<boolean> => {
    try {
      const result = await dispatch(loginUser({ pid, password }));
      return loginUser.fulfilled.match(result);
    } catch {
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearBotToken()); // Clear bot data when user logs out
  };

  return { 
    user, 
    isAuthenticated,
    login, 
    logout: handleLogout, 
    isLoading 
  };
}