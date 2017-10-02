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

function pushExam ({ sender, correct, sentAt, easy, }) {
  const ref = firebase.database().ref('/examlog')
  return ref.push({ sender, correct, sentAt, easy, })
}

function pushAnswer ({ sender, luckiness, sentAt }) {
  const ref = firebase.database().ref('/answerlog')
  return ref.push({ sender, luckiness, sentAt })
}

function pushChat ({ sender, message, sentAt }) { // Add chat
  const ref = firebase.database().ref('/chatlog')
  return ref.push({ sender, message, sentAt })
}

function getChatLog () {
  // Will pull data automatically
  return firebase.database().ref('/chatlog')
}

function getAnswerLog () {
  return firebase.database().ref('/answerlog')
}

function getExamLog () {
  return firebase.database().ref('/examlog')
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
  getExamLog,
  pushChat,
  pushAnswer,
  pushExam,
  getAnswerLog
}