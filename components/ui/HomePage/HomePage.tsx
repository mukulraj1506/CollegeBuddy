import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Login from '../Login';
import SignUp from '../SignUp';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface HomePageProps {
  onLoginPress?: () => void;
  onSignUpPress?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginPress, onSignUpPress }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const fadeAnim = new Animated.Value(0);

  // Check if user is already logged in when component mounts
  useEffect(() => {
    // For now, we'll simulate checking if user is logged in
    // In a real app, you would check AsyncStorage or your auth state here
    const checkLoginState = () => {
      // This is a placeholder - in a real app you would check persistent storage
      // const isUserLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      // if (isUserLoggedIn === 'true') {
      //   setIsLoggedIn(true);
      //   setShowWelcomeScreen(true);
      //   // Show welcome screen and then navigate to dashboard
      //   Animated.timing(fadeAnim, {
      //     toValue: 1,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }).start();
      //   setTimeout(() => {
      //     Animated.timing(fadeAnim, {
      //       toValue: 0,
      //       duration: 500,
      //       useNativeDriver: true,
      //     }).start(() => {
      //       router.push('/dashboard' as any);
      //     });
      //   }, 1000);
      // }
    };
    
    checkLoginState();
  }, []);

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
    // You can add your authentication logic here
  };

  const handleLoginSuccess = () => {
    // Set logged in state and show welcome screen
    setIsLoggedIn(true);
    setShowWelcomeScreen(true);
    
    // Start fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // After 1 second, fade out and navigate to dashboard
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        router.push('/dashboard' as any);
      });
    }, 1000);
  };

  const handleSignUp = (username: string, email: string, password: string) => {
    // Handle sign up logic here
    // You can add your registration logic here
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
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
        onLoginSuccess={handleLoginSuccess}
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

  // If user is logged in and welcome screen should be shown
  if (isLoggedIn && showWelcomeScreen) {
    return (
      <View style={[styles.welcomeContainer, { backgroundColor: colors.background }]}>
        <Animated.View style={[styles.welcomeContent, { opacity: fadeAnim }]}>
          {/* App Image */}
          <View style={styles.welcomeImageContainer}>
            <Image
              source={require('@/assets/images/HomePage/HomePage.png')}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
          </View>
          
          {/* App Name */}
          <Text style={[styles.welcomeAppTitle, { color: colors.primary }]}>CollegeBuddy</Text>
          
          {/* Made with heart in India */}
          <View style={styles.heartMessageContainer}>
            <Ionicons name="heart" size={16} color="#e74c3c" />
            <Text style={[styles.heartMessage, { color: colors.textSecondary }]}>Made with heart in India</Text>
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.appTitle, { color: colors.primary }]}>CollegeBuddy</Text>
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
          style={[styles.loginButton, { backgroundColor: colors.buttonBackground }]}
          onPress={handleLoginPress}
          activeOpacity={0.8}
        >
          <Text style={[styles.loginButtonText, { color: colors.buttonText }]}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, { backgroundColor: colors.textSecondary }]}
          onPress={handleSignUpPress}
          activeOpacity={0.8}
        >
          <Text style={[styles.signUpButtonText, { color: colors.buttonText }]}>Sign Up</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Welcome screen styles
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeImageContainer: {
    width: width * 0.6,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeImage: {
    width: '100%',
    height: '100%',
  },
  welcomeAppTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  heartMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartMessage: {
    fontSize: 16,
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default HomePage;
