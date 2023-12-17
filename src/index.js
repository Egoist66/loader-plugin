import Render from "./service/Render";
import App from "./components/App";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes , uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage";
import AppService from "./service/service";

import "./styles/style.scss"

const firebaseConfig = {
    apiKey: "AIzaSyDNBLU1Z4i0GoFGaLm4StdMm4hEL9YkYdc",
    authDomain: "fe-upload-app-9209c.firebaseapp.com",
    projectId: "fe-upload-app-9209c",
    storageBucket: "fe-upload-app-9209c.appspot.com",
    messagingSenderId: "218259613193",
    appId: "1:218259613193:web:8d01ea86437665cc2cfad8"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const {storageBucket} = storage.app.options;


const root = new Render({
    root: "#app",
    app: App()
});

root.render();



AppService.init(storage, ref, uploadBytesResumable, getDownloadURL, listAll);


