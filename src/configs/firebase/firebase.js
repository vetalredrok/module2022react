import {initializeApp} from 'firebase/app';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3ktCgGn_C1tT92-8601EjEdPW3hFJPAs",
    authDomain: "movie-search-73c05.firebaseapp.com",
    projectId: "movie-search-73c05",
    storageBucket: "movie-search-73c05.appspot.com",
    messagingSenderId: "788990545352",
    appId: "1:788990545352:web:277d3e55bbc11e564904fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

