// import 'react-native-url-polyfill/auto';
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '../types/database.types';

// const supabaseUrl = 'https://pbfatmwhjiyxkjdlamdb.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZmF0bXdoaml5eGtqZGxhbWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjU2NzQsImV4cCI6MjA2MTI0MTY3NH0.Vxya2ewJ-BcecuySP8KAWllv8C3g50QM9r-VCuHbZV4';

// // Storage adapter qui fonctionne sur web et mobile
// const createStorage = () => {
//   // Pour le web, utiliser localStorage
//   if (typeof window !== 'undefined' && window.localStorage) {
//     return {
//       getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
//       setItem: (key: string, value: string) => {
//         window.localStorage.setItem(key, value);
//         return Promise.resolve();
//       },
//       removeItem: (key: string) => {
//         window.localStorage.removeItem(key);
//         return Promise.resolve();
//       },
//     };
//   }
  
//   // Pour mobile, on utilisera AsyncStorage mais seulement quand il est disponible
//   return {
//     getItem: async (key: string) => {
//       try {
//         const AsyncStorage = require('@react-native-async-storage/async-storage').default;
//         return await AsyncStorage.getItem(key);
//       } catch {
//         return null;
//       }
//     },
//     setItem: async (key: string, value: string) => {
//       try {
//         const AsyncStorage = require('@react-native-async-storage/async-storage').default;
//         await AsyncStorage.setItem(key, value);
//       } catch {
//         // Silently fail
//       }
//     },
//     removeItem: async (key: string) => {
//       try {
//         const AsyncStorage = require('@react-native-async-storage/async-storage').default;
//         await AsyncStorage.removeItem(key);
//       } catch {
//         // Silently fail
//       }
//     },
//   };
// };

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: createStorage(),
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });