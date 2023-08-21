import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth:{
      region: 'region_here',
      userPoolId: 'user_pool_id_here',
      userPoolWebClientId: 'user_pool_web_client_id_here',     
    },
    oauth: {
        domain: 'your_cognito_domain',
        scope: [
          'phone',
          'email',
          'profile',
          'openid',
          'aws.cognito.signin.user.admin'
        ],
        redirectSignIn: 'http://localhost:5173/',
        redirectSignOut: 'http://localhost:5173/',
        clientId: '1g0nnr4h99a3sd0vfs9',
        responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
});

Auth.currentAuthenticatedUser()
    .then(user => {
        console.log("user", user);
    })
    .catch(err => {
        console.log(err);
        Auth.federatedSignIn();
    });

const app = createApp(App)

app.use(router)

app.mount('#app')
