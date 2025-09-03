import HomePage from '@/components/ui/HomePage/HomePage';
import React from 'react';

export default function HomeScreen() {
  const handleLoginPress = () => {
    // TODO: Implement login functionality
    console.log('Login pressed');
  };

  const handleSignUpPress = () => {
    // TODO: Implement sign up functionality
    console.log('Sign up pressed');
  };

  return (
    <HomePage 
      onLoginPress={handleLoginPress}
      onSignUpPress={handleSignUpPress}
    />
  );
}
