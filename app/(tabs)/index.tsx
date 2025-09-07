import HomePage from '@/components/ui/HomePage/HomePage';
import React from 'react';

export default function HomeScreen() {
  const handleLoginPress = () => {
    // TODO: Implement login functionality
  };

  const handleSignUpPress = () => {
    // TODO: Implement sign up functionality
  };

  return (
    <HomePage 
      onLoginPress={handleLoginPress}
      onSignUpPress={handleSignUpPress}
    />
  );
}
