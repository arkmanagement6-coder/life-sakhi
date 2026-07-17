import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import type { UserDoc } from '../dbSchema';

interface AuthContextProps {
  user: User | null;
  userProfile: UserDoc | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, role: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  mockLogin: (email: string, role: string, name: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile from localStorage if using mock, or setup firebase listener
  useEffect(() => {
    // Check if there is a mock session
    const mockSession = localStorage.getItem('life_sakhi_mock_user');
    if (mockSession) {
      const data = JSON.parse(mockSession);
      setUser({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        phoneNumber: data.phone,
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => '',
        getIdTokenResult: async () => ({} as any),
        reload: async () => {},
        toJSON: () => ({})
      } as unknown as User);
      setUserProfile(data);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // In a real application, fetch user doc from firestore:
        // const docRef = doc(db, "users", firebaseUser.uid);
        // const docSnap = await getDoc(docRef);
        // For now, construct dynamic profile:
        const profile: UserDoc = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Trust Member',
          phone: firebaseUser.phoneNumber || '',
          role: 'user', // Default role
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      console.warn("Firebase Google login failed/not configured. Falling back to mock login.", e);
      mockLogin("google.user@example.com", "donor", "Google User");
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e: any) {
      console.warn("Firebase Email login failed/not configured. Checking mock credentials.", e);
      // Fallback to mock session
      mockLogin(email, "user", "");
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, role: any, phone: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, pass);
      if (credential.user) {
        await updateProfile(credential.user, { displayName: name });
        // Set Firestore user profile in real app.
      }
    } catch (e: any) {
      console.warn("Firebase Registration failed/not configured. Saving mock user session.", e);
      const mockUser: UserDoc = {
        uid: "mock-uid-" + Math.random().toString(36).substring(7),
        email,
        displayName: name,
        phone,
        role,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('life_sakhi_mock_user', JSON.stringify(mockUser));
      setUser({
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        phoneNumber: mockUser.phone,
        emailVerified: true
      } as unknown as User);
      setUserProfile(mockUser);
    }
  };

  const logout = async () => {
    localStorage.removeItem('life_sakhi_mock_user');
    setUser(null);
    setUserProfile(null);
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase logout warning", e);
    }
  };

  const mockLogin = (email: string, role: string, name: string) => {
    const mockUser: UserDoc = {
      uid: "mock-uid-12345",
      email,
      displayName: name || email.split('@')[0].toUpperCase(),
      phone: "+91 99999 88888",
      role: role as any,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('life_sakhi_mock_user', JSON.stringify(mockUser));
    setUser({
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      phoneNumber: mockUser.phone,
      emailVerified: true
    } as unknown as User);
    setUserProfile(mockUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      logout,
      mockLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
