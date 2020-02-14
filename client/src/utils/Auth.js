import history from './history'
import auth0 from 'auth0-js'

// let instance = null

export default class Auth {
  constructor() {
    // if(!instance) {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-hg8bw4xn.auth0.com',
      clientID: 'klwFrTa1Du1sVAq1EAzjEUDOXYF8vegH',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
    this.userProfile = {}
    // instance = this
    // }

  }




  login = () => {
    this.auth0.authorize()
  }

  handAuth = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult) {
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)

        let expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()))
        localStorage.setItem('expiresAt', expiresAt)

        this.getProfile();
        setTimeout(() => { history.replace('/auth_check') }, 700);
      } else {
        console.log(err)
      }
    })
  }

  getAccessToken = () => {
    if (localStorage.getItem('access_token')) {
      const accessToken = localStorage.getItem('access_token')
      return accessToken
    } else {
      return null
    }
  }

  getProfile = () => {
    let accessToken = this.getAccessToken()
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = { profile }
        }
      })
    }
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
    setTimeout(() => { history.replace('/auth_check') }, 200);
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    return new Date().getTime() < expiresAt
  }

}
