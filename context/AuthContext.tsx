import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
    signOut
} from 'firebase/auth';

import { auth, googleProvider } from '../config/firebase';

type UserProp = {
    uid: string | null;
    email: string | null;
    displayName: string | null;
};

type AuthContextType = {
    user: UserProp | null;
    login?: () => void;
    logout?: () => void;
};

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserProp | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user?.uid,
                    email: user?.email,
                    displayName: user?.displayName
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        // return await signInWithPopup(auth, googleProvider);
        return await signInWithRedirect(auth, googleProvider);
    };

    const logout = async () => {
        setUser(null);
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
