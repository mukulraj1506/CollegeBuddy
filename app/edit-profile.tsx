import EditProfile from '@/components/ui/EditProfile';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function EditProfileScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false 
        }} 
      />
      <EditProfile onBack={handleBack} />
    </>
  );
}
