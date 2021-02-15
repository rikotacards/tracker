import {
  Typography,
  makeStyles,
  Theme,
  Button,
  Card,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebaseutils";
import { UserContext } from "../Providers/UserProvider";
import GoogleSignIn from "src/assets/googleSignIn/google-signIn-blue-2x.png";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: 'center',
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
  }
}));

export const SignIn: React.FC = () => {
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const history = useHistory();
  if (user) {
    history.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const signInWithEmailAndPasswordHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
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

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {error !== null && <Typography variant="caption">{error}</Typography>}
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
        <Button
          className={classes.signInWithGoogleButton}
          onClick={signInWithGoogle}
        >
          <img
            className={classes.googleSignInButton}
            src={GoogleSignIn}
          />
        </Button>
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
      </div>
    </div>
  );
};
