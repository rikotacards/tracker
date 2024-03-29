import {
  Typography,
  makeStyles,
  Theme,
  Button,
  TextField,
} from "@material-ui/core";
import "firebase/auth";
import firebase from "firebase/app";
import CircularProgress from "@material-ui/core/CircularProgress";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebaseutils";
import GoogleSignIn from "src/assets/googleSignIn/google-signIn-blue-2x.png";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    flexDirection: "column",
    margin: theme.spacing(0, 10, 0, 10),
    border: "1px solid",
    borderColor: theme.palette.divider,
    maxWidth: "500px",
    background: theme.palette.background.paper
  },
  emailPasswordContainer: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1)
  },
  emailPasswordInputWrapper: {
    margin: theme.spacing(0.5)
  },
  signInButton: {
    margin: theme.spacing(0.5)
  },
  googleSignInButton: {
    maxWidth: "200px"
  },
  signInWithGoogleButton: {
    padding: 0,
    margin: theme.spacing(0.5)
  },
  orText: {
    display: "flex",
    alignItems: "center"
  },
  noAccountForgotPassword: {
    borderColor: theme.palette.divider,
    border: "1px solid",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5)
  },
  loading: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
  }
}));

export const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSignInProcessing, setSignInProcessing] = React.useState(false);
  const [isSignInSuccess, setSignInSuccess] = React.useState(false);
  const provider = new firebase.auth.GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signInGooglehandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        setSignInProcessing(true);
        return firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            setSignInProcessing(false);
            setSignInSuccess(true);
            history.push("/");
          });
      })
      .catch(er => {
        console.error(er);
      });
  };
  const signInWithEmailAndPasswordHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        setSignInProcessing(true);

        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setSignInProcessing(false);
            setSignInProcessing(true);
            history.push("/");
          });
      })
      .catch(er => {
        setSignInProcessing(false);
        setSignInProcessing(false);
        setError("Error Signing up with email and password");
        console.error(er);
      });
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  if (isSignInSuccess || isSignInProcessing) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {error !== null && <Typography variant="caption">{error}</Typography>}
        {isSignInProcessing ? null : (
          <>
            <form className={classes.emailPasswordContainer}>
              <TextField
                type="email"
                className={classes.emailPasswordInputWrapper}
                name="userEmail"
                value={email}
                placeholder="Email"
                id="userEmail"
                size="small"
                variant="outlined"
                error={!!error}
                onChange={event => onChangeHandler(event)}
              />
              <TextField
                type="password"
                className={classes.emailPasswordInputWrapper}
                name="userPassword"
                value={password}
                placeholder="Password"
                id="userPassword"
                size="small"
                variant="outlined"
                error={!!error}
                onChange={event => onChangeHandler(event)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.signInButton}
                onClick={event => {
                  signInWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign in
              </Button>
            </form>
            <div className={classes.orText}>
              <Typography className={classes.orText}>or</Typography>
            </div>
          </>
        )}
        {isSignInProcessing ? (
          <CircularProgress />
        ) : isSignInSuccess ? (
          <Button color="primary" size="medium" variant="contained">
            Welcome
          </Button>
        ) : (
          <Button
            className={classes.signInWithGoogleButton}
            onClick={signInGooglehandler}
          >
            <img
              alt="google-signin"
              className={classes.googleSignInButton}
              src={GoogleSignIn}
            />
          </Button>
        )}
        {!isSignInSuccess && !isSignInProcessing ? (
          <div className={classes.noAccountForgotPassword}>
            <Typography variant="caption">Don't have an account? </Typography>
            <Link to="signUp" className="text-blue-500 hover:text-blue-600">
              <Typography variant="caption"> Sign up</Typography>
            </Link>{" "}
            <br />{" "}
            <Link
              to="passwordReset"
              className="text-blue-500 hover:text-blue-600"
            >
              <Typography variant="caption">Forgot Password?</Typography>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
