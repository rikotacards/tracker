import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebaseutils";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { generateUserDocument } from "../firebase/dbActions";
import {
  Typography,
  makeStyles,
  Theme,
  Button,
  TextField
} from "@material-ui/core";
import GoogleSignIn from "src/assets/googleSignIn/google-signIn-blue-2x.png";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  signUpContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  googleSignInButton: {
    maxWidth: "200px"
  },
  signInWithGoogleButton: {
    padding: 0,
    margin: theme.spacing(0.5)
  },
  signUpButton: {
    margin: theme.spacing(1),
    width: "100%"
  },
  input: {
    margin: theme.spacing(1)
  },
  signUpText: {
    marginTop: theme.spacing(2)
  }
}));
export const SignUp: React.FC = () => {
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const history = useHistory();
  if (user) {
    history.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createUserWithEmailAndPasswordHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      user && generateUserDocument(user, { displayName });
    } catch (error) {
      console.log("error", error);
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className={classes.container}>
      <Typography variant="body2" className={classes.signUpText}>
        Sign Up
      </Typography>
      <div className={classes.signUpContainer}>
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className={classes.signUpContainer}>
          <TextField
            className={classes.input}
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Username"
            id="displayName"
            size="small"
            variant="outlined"
            error={!!error}
            onChange={event => onChangeHandler(event)}
          />
          <TextField
            type="email"
            className={classes.input}
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
            className={classes.input}
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
            size="small"
            variant="contained"
            color="primary"
            className={classes.signUpButton}
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </Button>
        </form>
        <Typography variant="caption">or</Typography>
        <Button
          className={classes.signInWithGoogleButton}
          onClick={signInWithGoogle}
        >
          <img
            alt="google-signin"
            className={classes.googleSignInButton}
            src={GoogleSignIn}
          />
        </Button>
        <p className="text-center my-3">
          <Typography variant="caption">Already have an account?</Typography>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            <Typography variant="caption"> Sign in </Typography>
          </Link>
        </p>
      </div>
    </div>
  );
};