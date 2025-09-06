import MainNavigation from '@/components/ui/MainNavigation';
import { useRouter } from 'expo-router';
import React from 'react';

export default function DashboardScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Navigate back to home screen
    router.replace('/');
  };

  return <MainNavigation onLogout={handleLogout} />;
}



