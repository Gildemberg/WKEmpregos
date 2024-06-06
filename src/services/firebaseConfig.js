import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCX-O5S2Cte-BEInH3tNkHhhlYqS4itKyk",
  authDomain: "vendasveiculos-36928.firebaseapp.com",
  projectId: "vendasveiculos-36928",
  storageBucket: "vendasveiculos-36928.appspot.com",
  messagingSenderId: "133711101175",
  appId: "1:133711101175:web:473154ae2d0ff11718a7f2"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);