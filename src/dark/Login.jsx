import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_ENDPOINT } from '../config';
import background from "../../public/assets/images/loginBackground.jpg";
import Helmet from "../component/common/Helmet";
const useStyles = makeStyles((theme) => ({
  paper: {
    mHeight:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    backgroundColor:'white'
  },
  typography: {
    color:'white'
  },
  avatar: { 
    margin: theme.spacing(1),
    marginTop: '20%',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign In");
  const [errormsg, setMessage] = useState("");


  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
    },
  });
  const authenticate = async () => {
    try {
      localStorage.removeItem("token")
      const result = await authAxios.post(`/User/login`, {
        email: email,
        password: password
      });
      const tokens = await (result.data.token)
      console.log(result.data)
      localStorage.setItem('token', tokens);
      window.location.href=('/EditStuff');
    }
    catch (err) {
      console.log(err.message);
      setMessage(" Wrong Email/Password");
    }

  };




  useEffect(() => {
    localStorage.removeItem("token")
    if (props.action) {
      setAction(props.action);
    } else {
      setAction("Sign In");
    }

  }, [props])





  const test = e => {
    e.preventDefault();

  }
  return (
    <div style={{ backgroundImage: `url(${background})`, minHeight:"1080px"  }}>
                  <Helmet pageTitle="Portfolio Landing" />

    <Container  component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography className={classes.typography} component="h1" variant="h5" >
          {action}
        </Typography>
        <p style={{ color: 'red' }} id="errorMsg" className="error">{errormsg}</p>
        <form onSubmit={test} className={classes.form}>
          <TextField
              className={classes.textField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            label="Email"
            name="Email"
            autoComplete="Email"
          />
          <TextField
              className={classes.textField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => authenticate()}
            className={classes.submit}
          >
            Sign In
          </Button>
         
        </form>
      </div>
      
    </Container>
    </div>
  );
}
export default SignIn;



