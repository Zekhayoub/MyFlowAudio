const colors = {
  // Couleurs principales (identiques à votre web)
  gradient1: '#1E40AF',
  gradient2: '#2563EB', 
  background0: '#000000',     // black
  background: '#171717',
  primary: '#FFFFFF',         // white text
  secondary: '#A3A3A3',       // grey text
  tertiary: '#000000',        // black text for blue & white buttons
  brightened: '#F5F5F5',      // brightened/transparency to brighten object
  button_and_input: '#404040',
  player: '#000000',          // black
  modal: '#262626',
  slider: '#525252',

  // Couleurs supplémentaires pour mobile
  success: '#22C55E',         // Vert pour succès
  error: '#EF4444',           // Rouge pour erreurs
  warning: '#F59E0B',         // Orange pour avertissements
  info: '#3B82F6',            // Bleu pour informations
  
  // Transparences utiles pour mobile
  overlay: 'rgba(0, 0, 0, 0.5)',        // Overlay modal
  cardShadow: 'rgba(0, 0, 0, 0.15)',    // Ombre des cartes
  borderLight: 'rgba(255, 255, 255, 0.1)', // Bordures subtiles
  backgroundOpacity: 'rgba(23, 23, 23, 0.95)', // Background semi-transparent
} as const;

export default colors;