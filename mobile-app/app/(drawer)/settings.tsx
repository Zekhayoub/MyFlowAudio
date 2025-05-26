import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  StyleSheet,
} from 'react-native';
import Header from '../../src/components/common/Header';
import theme from '../../src/styles/theme';
import globalStyles from '../../src/styles/globalStyles';

const SettingsScreen: React.FC = () => {
  // États des paramètres
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [highQualityEnabled, setHighQualityEnabled] = useState(false);

  const settingsGroups = [
    {
      title: 'Audio et lecture',
      items: [
        {
          title: 'Lecture automatique',
          icon: '⏯️',
          description: 'Continuer avec des chansons similaires',
          component: (
            <Switch
              value={autoPlayEnabled}
              onValueChange={setAutoPlayEnabled}
              trackColor={{ false: theme.colors.button_and_input, true: theme.colors.gradient1 }}
              thumbColor={autoPlayEnabled ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        },
        {
          title: 'Qualité audio élevée',
          icon: '🎧',
          description: 'Streaming en haute qualité (consomme plus de données)',
          component: (
            <Switch
              value={highQualityEnabled}
              onValueChange={setHighQualityEnabled}
              trackColor={{ false: theme.colors.button_and_input, true: theme.colors.gradient1 }}
              thumbColor={highQualityEnabled ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        },
        {
          title: 'Mode hors ligne',
          icon: '📱',
          description: 'Télécharger pour écouter sans connexion',
          component: (
            <Switch
              value={offlineModeEnabled}
              onValueChange={setOfflineModeEnabled}
              trackColor={{ false: theme.colors.button_and_input, true: theme.colors.gradient1 }}
              thumbColor={offlineModeEnabled ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Notifications push',
          icon: '🔔',
          description: 'Nouvelles sorties, recommandations',
          component: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.button_and_input, true: theme.colors.gradient1 }}
              thumbColor={notificationsEnabled ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        },
      ],
    },
    {
      title: 'Apparence',
      items: [
        {
          title: 'Mode sombre',
          icon: '🌙',
          description: 'Interface sombre (activé par défaut)',
          component: (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: theme.colors.button_and_input, true: theme.colors.gradient1 }}
              thumbColor={darkModeEnabled ? theme.colors.primary : theme.colors.secondary}
            />
          ),
        },
      ],
    },
  ];

  const actionItems = [
    {
      title: 'Stockage et cache',
      icon: '💾',
      description: 'Gérer l\'espace de stockage',
      onPress: () => console.log('Manage storage'),
    },
    {
      title: 'Confidentialité',
      icon: '🔒',
      description: 'Paramètres de confidentialité',
      onPress: () => console.log('Privacy settings'),
    },
    {
      title: 'Aide et support',
      icon: '❓',
      description: 'FAQ et contact',
      onPress: () => console.log('Help and support'),
    },
    {
      title: 'À propos',
      icon: 'ℹ️',
      description: 'Version et informations légales',
      onPress: () => console.log('About'),
    },
  ];

  return (
    <View style={globalStyles.container}>
      <Header title="Paramètres" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.settingsGroup}>
              <Text style={globalStyles.sectionTitle}>{group.title}</Text>
              
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingItem}>
                  <View style={styles.settingIcon}>
                    <Text style={styles.settingEmoji}>{item.icon}</Text>
                  </View>
                  
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  
                  {item.component}
                </View>
              ))}
            </View>
          ))}

          {/* Action Items */}
          <View style={styles.actionsGroup}>
            <Text style={globalStyles.sectionTitle}>Autres paramètres</Text>
            
            {actionItems.map((item, index) => (
              <Pressable key={index} style={styles.actionItem} onPress={item.onPress}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionEmoji}>{item.icon}</Text>
                </View>
                
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionDescription}>{item.description}</Text>
                </View>
                
                <Text style={styles.actionArrow}>→</Text>
              </Pressable>
            ))}
          </View>

          {/* Storage Info */}
          <View style={styles.storageSection}>
            <Text style={globalStyles.sectionTitle}>Stockage</Text>
            
            <View style={styles.storageCard}>
              <View style={styles.storageRow}>
                <Text style={styles.storageLabel}>Musique téléchargée</Text>
                <Text style={styles.storageValue}>1.2 GB</Text>
              </View>
              
              <View style={styles.storageRow}>
                <Text style={styles.storageLabel}>Cache de l'app</Text>
                <Text style={styles.storageValue}>247 MB</Text>
              </View>
              
              <View style={styles.storageRow}>
                <Text style={styles.storageLabel}>Total utilisé</Text>
                <Text style={[styles.storageValue, styles.storageTotal]}>1.4 GB</Text>
              </View>
              
              <Pressable style={styles.clearCacheButton}>
                <Text style={styles.clearCacheText}>Vider le cache</Text>
              </Pressable>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfoSection}>
            <Text style={globalStyles.sectionTitle}>Informations</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Version de l'application</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dernière mise à jour</Text>
                <Text style={styles.infoValue}>24 mai 2025</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Développé par</Text>
                <Text style={styles.infoValue}>Équipe MusicApp</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: theme.spacing.md,
  },

  // Settings Groups
  settingsGroup: {
    marginBottom: theme.spacing.xl,
  },
  
  settingItem: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  
  settingIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  settingEmoji: {
    fontSize: 24,
  },
  
  settingContent: {
    flex: 1,
  },
  
  settingTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  settingDescription: {
    color: theme.colors.secondary,
    fontSize: 14,
  },

  // Action Items
  actionsGroup: {
    marginBottom: theme.spacing.xl,
  },
  
  actionItem: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.button_and_input,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  actionEmoji: {
    fontSize: 24,
  },
  
  actionContent: {
    flex: 1,
  },
  
  actionTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  actionDescription: {
    color: theme.colors.secondary,
    fontSize: 14,
  },
  
  actionArrow: {
    fontSize: 18,
    color: theme.colors.secondary,
  },

  // Storage Section
  storageSection: {
    marginBottom: theme.spacing.xl,
  },
  
  storageCard: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.button_and_input,
  },
  
  storageLabel: {
    color: theme.colors.secondary,
    fontSize: 14,
  },
  
  storageValue: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  
  storageTotal: {
    color: theme.colors.gradient1,
    fontSize: 16,
  },
  
  clearCacheButton: {
    backgroundColor: theme.colors.button_and_input,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  
  clearCacheText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // App Info
  appInfoSection: {
    marginBottom: theme.spacing.xl,
  },
  
  infoCard: {
    backgroundColor: theme.colors.modal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.button_and_input,
  },
  
  infoLabel: {
    color: theme.colors.secondary,
    fontSize: 14,
  },
  
  infoValue: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SettingsScreen;