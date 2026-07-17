import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDY25IJ_WuKHfvjAlGkCcluS1W5U1mKnOA',
  authDomain: 'parkora-62c26.firebaseapp.com',
  projectId: 'parkora-62c26',
  storageBucket: 'parkora-62c26.firebasestorage.app',
  messagingSenderId: '934259930798',
  appId: '1:934259930798:web:ec9751ff416b8dc5159f3f',
  measurementId: 'G-K1CWPMTJWD',
}

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
// const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp)
