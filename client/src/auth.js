// import {createAuthProvider} from 'react-token-auth'
// // This is where we refresh our token

// export const [useAuth, authFetch, login, logout] =
//     createAuthProvider({
//         accessTokenKey: 'access_token',
//         onUpdateToken: (token) => fetch('/refresh', {
//             method: 'POST',
//             body: token.refresh_token
//         })
//         .then(r => r.json())
//     })


import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  getAccessToken: 'access_token',
  storage: localStorage,
  onUpdateToken: (token) =>
    fetch('/refresh', {
      method: 'POST',
      body: token.refreshToken,
    }).then((r) => r.json()),
});