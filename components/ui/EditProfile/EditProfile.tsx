import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/globalStyles';

const { width: screenWidth } = Dimensions.get('window');

interface EditProfileProps {
  onBack?: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onBack }) => {
  const router = useRouter();
  const { colors } = useTheme();
  
  // Mock user data - in real app, this would come from state/API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    university: 'Bangalore University',
    course: 'Computer Science Engineering',
    year: '3rd Year',
    bio: 'Passionate about technology and helping fellow students. Love to share knowledge and learn new things.',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    year: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset errors
    setErrors({
      name: '',
      email: '',
      phone: '',
      university: '',
      course: '',
      year: '',
    });

    let hasError = false;

    // Validate name
    if (!userData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      hasError = true;
    } else if (userData.name.trim().length < 2) {
      setErrors(prev => ({ ...prev, name: 'Name must be at least 2 characters' }));
      hasError = true;
    }

    // Validate email
    if (!userData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    } else if (!validateEmail(userData.email.trim())) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      hasError = true;
    }

    // Validate phone
    if (!userData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
      hasError = true;
    } else if (!validatePhone(userData.phone.trim())) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid Indian phone number' }));
      hasError = true;
    }

    // Validate university
    if (!userData.university.trim()) {
      setErrors(prev => ({ ...prev, university: 'University is required' }));
      hasError = true;
    }

    // Validate course
    if (!userData.course.trim()) {
      setErrors(prev => ({ ...prev, course: 'Course is required' }));
      hasError = true;
    }

    // Validate year
    if (!userData.year.trim()) {
      setErrors(prev => ({ ...prev, year: 'Academic year is required' }));
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              onBack?.();
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    onBack?.();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Picture Section */}
          <View style={[styles.profilePictureSection, { backgroundColor: colors.surface }]}>
            <View style={styles.profilePictureContainer}>
              <View style={[styles.profilePicture, { backgroundColor: colors.secondary, borderColor: colors.card, shadowColor: colors.shadow }]}>
                <Ionicons name="person" size={60} color={colors.primary} />
              </View>
              <TouchableOpacity style={[styles.editPictureButton, { backgroundColor: colors.primary, borderColor: colors.card }]}>
                <Ionicons name="camera" size={20} color={colors.buttonText} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.profilePictureText, { color: colors.textSecondary }]}>Tap to change profile picture</Text>
          </View>

          {/* Personal Information Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Full Name <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.name ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                value={userData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.name ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.name}</Text> : null}
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Email Address <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.email ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your email address"
                placeholderTextColor={colors.textSecondary}
                value={userData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text> : null}
            </View>

            {/* Phone Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Phone Number <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.phone ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.textSecondary}
                value={userData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                autoCorrect={false}
              />
              {errors.phone ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.phone}</Text> : null}
            </View>
          </View>

          {/* Academic Information Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Academic Information</Text>

            {/* University Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                University <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.university ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your university name"
                placeholderTextColor={colors.textSecondary}
                value={userData.university}
                onChangeText={(value) => handleInputChange('university', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.university ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.university}</Text> : null}
            </View>

            {/* Course Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Course <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.course ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your course name"
                placeholderTextColor={colors.textSecondary}
                value={userData.course}
                onChangeText={(value) => handleInputChange('course', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.course ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.course}</Text> : null}
            </View>

            {/* Year Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Academic Year <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  errors.year ? { borderColor: colors.error } : null
                ]}
                placeholder="e.g., 1st Year, 2nd Year, 3rd Year, 4th Year"
                placeholderTextColor={colors.textSecondary}
                value={userData.year}
                onChangeText={(value) => handleInputChange('year', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.year ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.year}</Text> : null}
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About Me</Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
              <TextInput
                style={[styles.textArea, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={colors.textSecondary}
                value={userData.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoCapitalize="sentences"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton, 
              { backgroundColor: colors.buttonBackground },
              isSubmitting && { backgroundColor: colors.textSecondary }
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={[styles.submitButtonText, { color: colors.buttonText }]}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...globalStyles.paddingHeader,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Profile Picture Section
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  profilePictureText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  // Section Styles
  section: {
    ...globalStyles.paddingSection,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Input Styles
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  asterisk: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    height: 48,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    height: 100,
  },
  inputError: {
    // Error styling handled in component
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  // Submit Button
  submitButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  submitButtonDisabled: {
    // Disabled styling handled in component
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
