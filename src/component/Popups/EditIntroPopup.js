import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography,TextField } from '@material-ui/core'
import { API_ENDPOINT } from '../../config';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));


export default function Popup(props) {
  
  const { openIntroEditPopup, setOpenIntroEditPopup,introduction } = props
  const [introMessage,setIntroMessage]=useState("");
  const [roles,setRoles]=useState();
  const [basedIn,setBasedIn]=useState("");
  
  const defaultTitle = introduction.title;
  const defaultRolesArray = introduction.myRoles;
  const accessToken = localStorage.getItem('token');

  const defaultBasedIn = introduction.location;

  const errorP = useRef(null);
  const [errormsg, setMessage] = useState("");
   //Edit Intro Function
   const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

});
   const EditIntro = async (setMsg) => {
    try {
      const update ={
        id: introduction.id,
      } ; 
      if (basedIn){
        update.location = basedIn
      } else{
        update.location = defaultBasedIn
      }
      
      if (introMessage){
        update.title = introMessage
      } else{
        update.title = defaultTitle
      }
      if (roles){
        update.myRoles = roles
      } else{
        update.myRoles = defaultRolesArray
      }
    
        await authAxios.put(`/Introduction/${introduction.id}`,update);

        setOpenIntroEditPopup(false);
        window.location.reload();

        setMessage("Project has successfully been edited.");
       

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

};

  useEffect(() => {
    setMessage("")
  }, [props])

  useEffect(() => {
    if (errormsg !== "") {
      errorP.current.scrollIntoView();
    }
  }, [errormsg]);

  
  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openIntroEditPopup}
    fullWidth
    >
      <DialogTitle>
        <div>
          <Typography variant="h6" component="div">
            Edit
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
      <p style={{ color: 'red' }} id="Msg" className={classes.center} ref={errorP}>{errormsg}</p>
        <form onSubmit={test} className={classes.form}>

        <Typography
            variant="h6" 
            style={{margin:'20px',marginLeft:'0px'}}
            >
                  Edit Your Introduction

            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Intro"
                label="Intro"
                defaultValue={defaultTitle}
                onChange={(e) => setIntroMessage(e.target.value)}
                id="Intro"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Roles"
                label="Roles"
                defaultValue={defaultRolesArray}
                onChange={(e) => setRoles(e.target.value.split(','))}
                id="Roles"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="BasedIn"
                label="BasedIn"
                defaultValue={defaultBasedIn}
                onChange={(e) => setBasedIn(e.target.value)}
                id="BasedIn"
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => EditIntro()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenIntroEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog>
  )
}