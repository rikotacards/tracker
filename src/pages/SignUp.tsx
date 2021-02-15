import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseutils";
import { useHistory } from "react-router-dom";
import { generateUserDocument } from "../firebase/dbActions";
import {
  Typography,
  makeStyles,
  Theme,
  Button,
  TextField,
  CircularProgress
} from "@material-ui/core";
import GoogleSignIn from "src/assets/googleSignIn/google-signIn-blue-2x.png";
import "firebase/auth";
import firebase from "firebase/app";
import { TaskItemList } from "src/components/TaskItemList/TaskItemList";
import { isMobile } from "src/platform/platform";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: isMobile() ? "column" : "row",
    alignItems: isMobile() ? undefined : "flex-start",
    justifyContent: "center",
  },
  taskItemList: {
    marginLeft: theme.spacing(2),
    maxHeight: '100vh',
    overflowX: 'scroll',
    maxWidth: '500px'
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  formContainer: {
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
    marginBottom: theme.spacing(1)
  },
  signUpText: {
    marginTop: theme.spacing(2)
  },
  loading: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
  }
}));
export const SignUp: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();

  const [isSignInProcessing, setSignInProcessing] = React.useState(false);
  const [isSignInSuccess, setSignInSuccess] = React.useState(false);
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
      const { user } = await auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          setSignInProcessing(true);
          return user;
        });
      user &&
        generateUserDocument(user, { displayName }).then(() => {
          setSignInProcessing(false);
          setSignInSuccess(true);
          history.push("/");
        });
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

  if (isSignInSuccess || isSignInProcessing) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.container}>
        <Typography color="primary" variant="h6" className={classes.signUpText}>
          <b> Sign Up</b>
        </Typography>
        <div className={classes.signUpContainer}>
          {error !== null && <Typography variant="caption">{error}</Typography>}
          <form className={classes.formContainer}>
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
            onClick={signInGooglehandler}
          >
            <img
              alt="google-signin"
              className={classes.googleSignInButton}
              src={GoogleSignIn}
            />
          </Button>
          <p className="text-center my-3">
            <Typography variant="caption">Already have an account?</Typography>
            <Link to="/signIn" className="text-blue-500 hover:text-blue-600">
              <Typography variant="caption"> Sign in </Typography>
            </Link>
          </p>
        </div>
      </div>
      <div className={clsx(!isMobile() && classes.taskItemList)}>
      <TaskItemList isMobileVariant={true} demoUserId={"OMqRbaSORWf7c57XDaguSF94Qgm1"} userId={"OMqRbaSORWf7c57XDaguSF94Qgm1"}/>
      </div>
    </div>
  );
};
