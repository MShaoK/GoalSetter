// Docs: https://www.npmjs.com/package/react-google-login
import React, { useState } from "react";
import PageLayout from '../components/PageLayout';
import GoogleLogin from 'react-google-login';

import {
  Container,
  Typography,
} from "@material-ui/core";


export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  /**
   * Response from Google's API
   * 
   * @param {*} response contains the Id's, Tokens and profile info
   */
  const responseGoogle = (response) => {
    console.log(response);
    var id_token = response.getAuthResponse().id_token;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/users/1/authentication/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  };


  return (
    <PageLayout>
      <Container>
        <Typography component="h1" variant="h4">
          Log In With Your Google Account
        </Typography>
        <GoogleLogin
          clientId="1004621807794-p8l00rg7mov16oqp0ui2r1hku5po74qq.apps.googleusercontent.com"
          onSuccess={(response) => { responseGoogle(response) }}
          onFailure={(response) => { responseGoogle(response) }}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
      </Container>
    </PageLayout>
  );
};