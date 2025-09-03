import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Login from '../Login';
import SignUp from '../SignUp';

const { width, height } = Dimensions.get('window');

interface HomePageProps {
  onLoginPress?: () => void;
  onSignUpPress?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginPress, onSignUpPress }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginPress = () => {
    setShowLogin(true);
    onLoginPress?.();
  };

  const handleSignUpPress = () => {
    setShowSignUp(true);
    onSignUpPress?.();
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
  };

  const handleBackFromSignUp = () => {
    setShowSignUp(false);
  };

  const handleLogin = (email: string, password: string) => {
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    // You can add your authentication logic here
  };

  const handleSignUp = (username: string, email: string, password: string) => {
    // Handle sign up logic here
    console.log('Sign up attempt:', { username, email, password });
    // You can add your registration logic here
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password pressed');
  };

  const handleSignUpFromLogin = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleLoginFromSignUp = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  // If login is shown, render the Login component
  if (showLogin) {
    return (
      <Login
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
        onSignUp={handleSignUpFromLogin}
        onBack={handleBackFromLogin}
      />
    );
  }

  // If sign up is shown, render the SignUp component
  if (showSignUp) {
    return (
      <SignUp
        onSignUp={handleSignUp}
        onLogin={handleLoginFromSignUp}
        onBack={handleBackFromSignUp}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* App Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>CollegeBuddy</Text>
      </View>
      
      {/* Homepage Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/HomePage/HomePage.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginPress}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUpPress}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#06498e',
    textAlign: 'center',
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: width * 0.9,
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#06498e',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#b8b6ba',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
