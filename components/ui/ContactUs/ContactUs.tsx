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
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/globalStyles';

const { width: screenWidth } = Dimensions.get('window');

interface ContactUsProps {
  onBack?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset errors
    setNameError('');
    setEmailError('');
    setSubjectError('');
    setMessageError('');

    let hasError = false;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      hasError = true;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate subject
    if (!subject.trim()) {
      setSubjectError('Subject is required');
      hasError = true;
    } else if (subject.trim().length < 5) {
      setSubjectError('Subject must be at least 5 characters');
      hasError = true;
    }

    // Validate message
    if (!message.trim()) {
      setMessageError('Message is required');
      hasError = true;
    } else if (message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear form
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              // Navigate back
              onBack?.();
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send message. Please try again.',
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Contact Us</Text>
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
          {/* Contact Information */}
          <View style={[styles.contactInfoSection, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Get in Touch</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>

            {/* Contact Methods */}
            <View style={styles.contactMethods}>
              <View style={[styles.contactMethod, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <View style={[styles.contactIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name="mail" size={20} color={colors.primary} />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Email</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>support@collegebuddy.in</Text>
                </View>
              </View>

              <View style={[styles.contactMethod, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <View style={[styles.contactIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name="call" size={20} color={colors.primary} />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Phone</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>+91 98765 43210</Text>
                </View>
              </View>

              <View style={[styles.contactMethod, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <View style={[styles.contactIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name="location" size={20} color={colors.primary} />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Address</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>123 University Road, Bangalore, Karnataka 560001, India</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Send us a Message</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Name <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  nameError ? { borderColor: colors.error } : null
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                }}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {nameError ? <Text style={[styles.errorText, { color: colors.error }]}>{nameError}</Text> : null}
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
                  emailError ? { borderColor: colors.error } : null
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
              />
              {emailError ? <Text style={[styles.errorText, { color: colors.error }]}>{emailError}</Text> : null}
            </View>

            {/* Subject Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Subject <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  subjectError ? { borderColor: colors.error } : null
                ]}
                placeholder="What's this about?"
                placeholderTextColor={colors.textSecondary}
                value={subject}
                onChangeText={(text) => {
                  setSubject(text);
                  if (subjectError) setSubjectError('');
                }}
                autoCapitalize="sentences"
                autoCorrect={false}
              />
              {subjectError ? <Text style={[styles.errorText, { color: colors.error }]}>{subjectError}</Text> : null}
            </View>

            {/* Message Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Message <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text },
                  messageError ? { borderColor: colors.error } : null
                ]}
                placeholder="Tell us how we can help you..."
                placeholderTextColor={colors.textSecondary}
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  if (messageError) setMessageError('');
                }}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                autoCapitalize="sentences"
                autoCorrect={false}
              />
              {messageError ? <Text style={[styles.errorText, { color: colors.error }]}>{messageError}</Text> : null}
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
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Text>
            </TouchableOpacity>
          </View>
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
  // Contact Info Section
  contactInfoSection: {
    ...globalStyles.paddingSection,
    marginBottom: 30,
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contactMethods: {
    gap: 24,
    paddingHorizontal: 10,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 2,
  },
  contactDetails: {
    flex: 1,
    paddingTop: 4,
  },
  contactLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  // Form Section
  formSection: {
    ...globalStyles.paddingSection,
  },
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
    height: 120,
  },
  inputError: {
    // Error styling handled in component
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    // Disabled styling handled in component
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactUs;
