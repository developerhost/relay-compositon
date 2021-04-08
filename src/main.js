import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import dotenv from 'dotenv'

Vue.config.productionTip = false
dotenv.config()



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  var firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: "relay-composition.appspot.com",
    messagingSenderId: process.env.VUE_APP_MESSAGINGSNDERID,
    appId: process.env.VUE_APP_APPID,
    measurementId: process.env.VUE_APP_MEASUREMWNTID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
