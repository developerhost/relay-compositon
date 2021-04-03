import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBQqCI38ACW5ySI1fkxwoIzvp3dPAYUZbE",
    authDomain: "relay-composition.firebaseapp.com",
    projectId: "relay-composition",
    storageBucket: "relay-composition.appspot.com",
    messagingSenderId: "436458558466",
    appId: "1:436458558466:web:11f11ef54583b1e4c1c31b",
    measurementId: "G-P38S52T5CG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
