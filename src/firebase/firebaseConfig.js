import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuxjnW7FnhhMHh40WU84aeb6bvgNMvpFg",
  authDomain: "mentoriapp-d6c0c.firebaseapp.com",
  projectId: "mentoriapp-d6c0c",
  storageBucket: "mentoriapp-d6c0c.appspot.com",
  messagingSenderId: "173911894446",
  appId: "1:173911894446:web:483e5cf7bd763755f0803f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export {
    app,
    db
}