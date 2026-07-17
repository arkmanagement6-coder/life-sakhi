import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserDoc } from '../dbSchema';

interface AuthContextProps {
  user: User | null;
  userProfile: UserDoc | null;
  loading: boolean;
  loginWithGoogle: () => Promise<any>;
  loginWithEmail: (email: string, pass: string) => Promise<any>;
  registerWithEmail: (email: string, pass: string, name: string, role: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  mockLogin: (email: string, role: string, name: string) => void;
  updateUserProfileDetails: (email: string, phone: string, address: string, profileImageUrl?: string) => Promise<void>;
  approveUserStatus: (uid: string, status: 'active' | 'rejected') => void;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Seed initial mock users list if not present
  useEffect(() => {
    const existingUsers = localStorage.getItem('life_sakhi_all_users');
    let needsSeed = !existingUsers;
    if (existingUsers) {
      const parsed = JSON.parse(existingUsers);
      const hasRaviAdmin = parsed.some((u: any) => u.email.toLowerCase() === 'admin@gmail.com');
      if (!hasRaviAdmin) {
        needsSeed = true;
      }
    }

    if (needsSeed) {
      const initialUsers = [
        {
          uid: "mock-uid-admin-ravi",
          email: "admin@gmail.com",
          displayName: "Ravi Dhakre",
          phone: "+91 98765 43210",
          role: "admin",
          status: "active",
          address: "Agra",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          uid: "mock-uid-ravi",
          email: "ravi@example.com",
          displayName: "Ravi Kumar",
          phone: "+91 99999 88888",
          role: "block_coordinator",
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          uid: "mock-uid-savitri",
          email: "savitri@example.com",
          displayName: "Savitri Devi",
          phone: "+91 98765 43210",
          role: "women_distributor",
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          uid: "mock-uid-kiran",
          email: "kiran@example.com",
          displayName: "Kiran Sharma",
          phone: "+91 87654 32109",
          role: "women_distributor",
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(initialUsers));
    }
  }, []);

  // Load profile from localStorage if using mock, or setup firebase listener
  useEffect(() => {
    // Check if there is a mock session
    const mockSession = localStorage.getItem('life_sakhi_mock_user');
    if (mockSession) {
      const data = JSON.parse(mockSession);
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const latestProfile = allUsers.find((u: any) => u.uid === data.uid) || data;

      localStorage.setItem('life_sakhi_mock_user', JSON.stringify(latestProfile));

      setUser({
        uid: latestProfile.uid,
        email: latestProfile.email,
        displayName: latestProfile.displayName,
        phoneNumber: latestProfile.phone,
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
      setUserProfile(latestProfile);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserDoc;
            setUserProfile(profile);
            localStorage.setItem('life_sakhi_mock_user', JSON.stringify(profile));
          } else {
            const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
            const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
            const localUser = allUsers.find((u: any) => u.email.toLowerCase() === firebaseUser.email?.toLowerCase());

            const profile: UserDoc = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: localUser?.displayName || firebaseUser.displayName || 'Trust Member',
              phone: localUser?.phone || firebaseUser.phoneNumber || '',
              role: localUser?.role || 'user',
              status: localUser?.status || 'active',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(doc(db, "users", firebaseUser.uid), profile);
            setUserProfile(profile);
            localStorage.setItem('life_sakhi_mock_user', JSON.stringify(profile));
          }
        } catch (err) {
          console.warn("Firestore profile fetch failed. Falling back to local data.", err);
          const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
          const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
          const localUser = allUsers.find((u: any) => u.email.toLowerCase() === firebaseUser.email?.toLowerCase());

          const profile: UserDoc = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: localUser?.displayName || firebaseUser.displayName || 'Trust Member',
            phone: localUser?.phone || firebaseUser.phoneNumber || '',
            role: localUser?.role || 'user',
            status: localUser?.status || 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setUserProfile(profile);
        }
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
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (e: any) {
      console.warn("Firebase Google login failed/not configured. Falling back to mock login.", e);
      return {
        email: "google.user@example.com",
        displayName: "Google User",
        uid: "mock-google-uid-123"
      };
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      return result.user;
    } catch (e: any) {
      console.warn("Firebase Email login failed/not configured. Checking mock credentials.", e);
      // Fallback to mock session
      return {
        email,
        displayName: email.split('@')[0],
        uid: "mock-email-uid-" + Math.random().toString(36).substring(7)
      };
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, role: any, phone: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, pass);
      if (credential.user) {
        await updateProfile(credential.user, { displayName: name });
        const userDoc: UserDoc = {
          uid: credential.user.uid,
          email,
          displayName: name,
          phone,
          role,
          status: (role === 'user' || role === 'donor' || role === 'admin') ? 'active' : 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(doc(db, "users", credential.user.uid), userDoc);
        
        // Also write to local storage list for local fallback query sync
        const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
        const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
        allUsers.push(userDoc);
        localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsers));

        localStorage.setItem('life_sakhi_mock_user', JSON.stringify(userDoc));
        setUserProfile(userDoc);
      }
    } catch (e: any) {
      console.warn("Firebase Registration failed/not configured. Saving mock user session.", e);
      const mockUser: UserDoc = {
        uid: "mock-uid-" + Math.random().toString(36).substring(7),
        email,
        displayName: name,
        phone,
        role,
        status: (role === 'user' || role === 'donor') ? 'active' : 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      allUsers.push(mockUser);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsers));
      
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
    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    let existingUser = allUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (!existingUser) {
      existingUser = {
        uid: "mock-uid-" + Math.random().toString(36).substring(7),
        email,
        displayName: name || email.split('@')[0].toUpperCase(),
        phone: "+91 99999 88888",
        role: role as any,
        status: (role === 'user' || role === 'donor' || role === 'admin') ? 'active' : 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      allUsers.push(existingUser);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsers));
    } else {
      // Keep existing role and displayName to avoid overwriting them
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsers));
    }

    localStorage.setItem('life_sakhi_mock_user', JSON.stringify(existingUser));
    setUser({
      uid: existingUser.uid,
      email: existingUser.email,
      displayName: existingUser.displayName,
      phoneNumber: existingUser.phone,
      emailVerified: true
    } as unknown as User);
    setUserProfile(existingUser);
  };

  const updateUserProfileDetails = async (email: string, phone: string, address: string, profileImageUrl?: string) => {
    if (userProfile) {
      const updatedProfile: UserDoc = {
        ...userProfile,
        email,
        phone,
        address,
        profileImageUrl: profileImageUrl !== undefined ? profileImageUrl : userProfile.profileImageUrl,
        updatedAt: new Date().toISOString()
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('life_sakhi_mock_user', JSON.stringify(updatedProfile));
      
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const updatedUsers = allUsers.map((u: any) => u.uid === userProfile.uid ? updatedProfile : u);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(updatedUsers));

      // Real Firebase database update
      try {
        await setDoc(doc(db, "users", userProfile.uid), updatedProfile, { merge: true });
      } catch (err) {
        console.warn("Failed to update profile in Firestore", err);
      }
    }
  };

  const approveUserStatus = async (uid: string, status: 'active' | 'rejected') => {
    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    const updatedUsers = allUsers.map((u: any) => {
      if (u.uid === uid) {
        return { ...u, status };
      }
      return u;
    });
    localStorage.setItem('life_sakhi_all_users', JSON.stringify(updatedUsers));

    const currentMock = localStorage.getItem('life_sakhi_mock_user');
    if (currentMock) {
      const current = JSON.parse(currentMock);
      if (current.uid === uid) {
        current.status = status;
        localStorage.setItem('life_sakhi_mock_user', JSON.stringify(current));
        setUserProfile(current);
      }
    }

    // Real Firebase database update status
    try {
      await setDoc(doc(db, "users", uid), { status }, { merge: true });
    } catch (err) {
      console.warn("Failed to update approval status in Firestore", err);
    }
  };

  const sendPasswordReset = async (email: string) => {
    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    const dbUser = allUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      if (dbUser) {
        console.log("Mock password reset link sent to:", email);
        return;
      }
      throw err;
    }
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
      mockLogin,
      updateUserProfileDetails,
      approveUserStatus,
      sendPasswordReset
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
