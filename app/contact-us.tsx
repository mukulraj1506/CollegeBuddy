import ContactUs from '@/components/ui/ContactUs';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function ContactUsScreen() {
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
      <ContactUs onBack={handleBack} />
    </>
  );
}
