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
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
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
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePicture}>
                <Ionicons name="person" size={60} color="#06498e" />
              </View>
              <TouchableOpacity style={styles.editPictureButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profilePictureText}>Tap to change profile picture</Text>
          </View>

          {/* Personal Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Full Name <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={userData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Email Address <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                value={userData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Phone Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Phone Number <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.phone ? styles.inputError : null]}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                value={userData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                autoCorrect={false}
              />
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>
          </View>

          {/* Academic Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Information</Text>

            {/* University Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                University <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.university ? styles.inputError : null]}
                placeholder="Enter your university name"
                placeholderTextColor="#999"
                value={userData.university}
                onChangeText={(value) => handleInputChange('university', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.university ? <Text style={styles.errorText}>{errors.university}</Text> : null}
            </View>

            {/* Course Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Course <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.course ? styles.inputError : null]}
                placeholder="Enter your course name"
                placeholderTextColor="#999"
                value={userData.course}
                onChangeText={(value) => handleInputChange('course', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}
            </View>

            {/* Year Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Academic Year <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.year ? styles.inputError : null]}
                placeholder="e.g., 1st Year, 2nd Year, 3rd Year, 4th Year"
                placeholderTextColor="#999"
                value={userData.year}
                onChangeText={(value) => handleInputChange('year', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.year ? <Text style={styles.errorText}>{errors.year}</Text> : null}
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.textArea]}
                placeholder="Tell us about yourself..."
                placeholderTextColor="#999"
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
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...globalStyles.paddingHeader,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
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
    backgroundColor: '#06498e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profilePictureText: {
    fontSize: 14,
    color: '#666',
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
    color: '#333',
    marginBottom: 20,
  },
  // Input Styles
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  asterisk: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    height: 48,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    height: 100,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  // Submit Button
  submitButton: {
    backgroundColor: '#06498e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
