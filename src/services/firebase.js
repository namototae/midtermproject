import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBMiqNNTUIlI7n8fKl-mqBW7s3IgVgbVd4",
  authDomain: "my-first-react-app-349a9.firebaseapp.com",
  databaseURL: "https://my-first-react-app-349a9.firebaseio.com",
  projectId: "my-first-react-app-349a9",
  storageBucket: "my-first-react-app-349a9.appspot.com",
  messagingSenderId: "540799648562"
}

const auth = firebase.auth
const provider = new firebase.auth.FacebookAuthProvider()

function init () {
  return firebase.initializeApp(config);
}

async function login () {
  // login to facebook
  const result = await auth().signInWithPopup(provider)
  return result
}

async function logout () {
  // logout from facebook
  const result = await auth().signOut()
  return result
}

function autoLogin (callback) {
  return auth().onAuthStateChanged((x) => callback(x))
}

function pushChat ({ sender, photoURL, message, sentAt }) { // Add chat
  /*
    chatlog: [
      {
        sender: String,
        photoURL: String,
        message: String,
        sentAt: Date
      },
      ...
    ]
  */
  const ref = firebase.database().ref('/chatlog')
  return ref.push({ sender, message, sentAt })
}

function getChatLog () {
  // Will pull data automatically
  return firebase.database().ref('/chatlog')
}

function clearChatLog () {

}

// Export as object {}
export {
  init,
  login,
  logout,
  autoLogin,
  getChatLog,
  pushChat
}