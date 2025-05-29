import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/providers/AuthProvider';
import theme from '../../src/styles/theme';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        Alert.alert(
          'Erreur d\'inscription',
          error.message || 'Impossible de créer le compte'
        );
      } else {
        // Rediriger vers login après inscription réussie
        router.replace('/(auth)/login');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <Pressable 
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  
  inputContainer: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  
  signUpButton: {
    backgroundColor: theme.colors.gradient1,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});