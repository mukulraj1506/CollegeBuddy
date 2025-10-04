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
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
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
          <View style={styles.contactInfoSection}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <Text style={styles.sectionSubtitle}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>

            {/* Contact Methods */}
            <View style={styles.contactMethods}>
              <View style={styles.contactMethod}>
                <View style={styles.contactIcon}>
                  <Ionicons name="mail" size={20} color="#06498e" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>support@collegebuddy.in</Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={styles.contactIcon}>
                  <Ionicons name="call" size={20} color="#06498e" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>+91 98765 43210</Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={styles.contactIcon}>
                  <Ionicons name="location" size={20} color="#06498e" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>123 University Road, Bangalore, Karnataka 560001, India</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Send us a Message</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Name <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                }}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Email Address <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {/* Subject Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Subject <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, subjectError ? styles.inputError : null]}
                placeholder="What's this about?"
                placeholderTextColor="#999"
                value={subject}
                onChangeText={(text) => {
                  setSubject(text);
                  if (subjectError) setSubjectError('');
                }}
                autoCapitalize="sentences"
                autoCorrect={false}
              />
              {subjectError ? <Text style={styles.errorText}>{subjectError}</Text> : null}
            </View>

            {/* Message Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Message <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.textArea, messageError ? styles.inputError : null]}
                placeholder="Tell us how we can help you..."
                placeholderTextColor="#999"
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
              {messageError ? <Text style={styles.errorText}>{messageError}</Text> : null}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
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
  // Contact Info Section
  contactInfoSection: {
    ...globalStyles.paddingSection,
    backgroundColor: '#f8f9fa',
    marginBottom: 30,
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
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
    backgroundColor: '#f0f8ff',
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
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
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
    height: 120,
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
  submitButton: {
    backgroundColor: '#06498e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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

export default ContactUs;
