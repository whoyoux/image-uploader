import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: 'AIzaSyALFx00Q0exVQc52hHW_09AB2BjodWoxs0',
    authDomain: 'image-uploader-96b73.firebaseapp.com',
    projectId: 'image-uploader-96b73',
    storageBucket: 'image-uploader-96b73.appspot.com',
    messagingSenderId: '949126305123',
    appId: '1:949126305123:web:a66652055ba07c113f2f56',
    measurementId: 'G-W2YLNFKGRF'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (app.name && typeof window !== 'undefined') {
    const analytics = getAnalytics(app);
}

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const storage = getStorage(app);
