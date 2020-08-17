// Docs: https://github.com/anthonyjgrove/react-google-login
import { useGoogleLogin } from 'react-google-login'

const { signIn, loaded } = useGoogleLogin({
  clientId,
  onSuccess,
  onFailure,
  isSignedIn,
  cookiePolicy
})

clientId="1004621807794-p8l00rg7mov16oqp0ui2r1hku5po74qq.apps.googleusercontent.com";
isSignedIn = true;
cookiePolicy='single_host_origin';

export default {
  clientId,
  onSuccess,
  onFailure,
  isSignedIn,
  cookiePolicy
}