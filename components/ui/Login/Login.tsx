// API import removed - using dummy data instead
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onBack?: () => void;
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  onBack,
  onLoginSuccess,
}) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login
  const handleLogin = async () => {
  // Reset errors
  setEmailError('');
  setPasswordError('');

  let hasError = false;

  // Validate email
  if (!email.trim()) {
    setEmailError('Email is required');
    hasError = true;
  } else if (!validateEmail(email.trim())) {
    setEmailError('Please enter a valid email address');
    hasError = true;
  }

  // Validate password
  if (!password.trim()) {
    setPasswordError('Password is required');
    hasError = true;
  } else if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters');
    hasError = true;
  }

  if (hasError) return;

  try {
    // ✅ Simulate API call with dummy data
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy success response
    const dummyResponse = {
      data: {
        message: "Login successful",
        user: {
          id: "1",
          name: "John Doe",
          email: email.trim(),
        },
        token: "dummy_token_12345"
      }
    };

    console.log("Login success:", dummyResponse.data);

    // Show success message
    setShowSuccessMessage(true);

    // Hide success message after 1 second and then navigate
    setTimeout(() => {
      setShowSuccessMessage(false);
      // Example: save token locally (if backend returns it)
      // await AsyncStorage.setItem("token", dummyResponse.data.token);

      // Navigate to home/dashboard after successful login
      onLoginSuccess?.();
    }, 1000);

  } catch (error: any) {
    console.error("Login failed:", error.message);

    // For demo purposes, we'll simulate some error cases
    if (email.trim() === "error@test.com") {
      setEmailError("Invalid credentials");
    } else if (password === "error") {
      setPasswordError("Invalid credentials");
    } else {
      setEmailError("Login failed, please try again.");
    }
  }
};

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Success Message Overlay */}
      {showSuccessMessage && (
        <View style={[styles.successOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.successMessage, { backgroundColor: colors.card }]}>
            <Ionicons name="checkmark-circle" size={32} color={colors.success} />
            <Text style={[styles.successText, { color: colors.success }]}>Login Successful!</Text>
          </View>
        </View>
      )}
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.primary }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email/Username Field */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.inputBackground, 
                  borderColor: emailError ? colors.error : colors.inputBorder, 
                  color: colors.text 
                }
              ]}
              placeholder="Enter your email address"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor={colors.primary}
            />
            {emailError ? <Text style={[styles.errorText, { color: colors.error }]}>{emailError}</Text> : null}
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.inputBackground, 
                    borderColor: passwordError ? colors.error : colors.inputBorder, 
                    color: colors.text,
                    paddingRight: 50, // Make space for the eye icon
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIconAbsolute}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={[styles.errorText, { color: colors.error }]}>{passwordError}</Text> : null}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.buttonBackground }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={[styles.loginButtonText, { color: colors.buttonText }]}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.textSecondary }]}>Dont have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={[styles.signUpLink, { color: colors.primary }]}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    height: 48,
  },
  inputError: {
    // Error styling handled in component
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeIconAbsolute: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Success Message Styles
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successMessage: {
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default Login;
