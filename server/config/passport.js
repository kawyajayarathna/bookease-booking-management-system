import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

export const configurePassport = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
    console.warn('Google OAuth is disabled: required Google environment variables are missing')
    return passport
  }
  passport.use(new GoogleStrategy({ clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, callbackURL: GOOGLE_CALLBACK_URL }, (_accessToken, _refreshToken, profile, done) => done(null, profile)))
  return passport
}
export default passport
