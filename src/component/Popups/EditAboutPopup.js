import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, TextField } from '@material-ui/core'
import { API_ENDPOINT } from '../../config';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));


export default function Popup(props) {

  const { openAboutEditPopup, setOpenAboutEditPopup, aboutMe } = props
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const defaultDescription = aboutMe.description;
  const accessToken = localStorage.getItem('token');

  const defaultUrl = aboutMe.imageUrl;

  const [errormsg, setMessage] = useState("");
  //Edit Intro Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const EditAbout = async (setMsg) => {
    try {
      const update = {
        id: aboutMe.id,
      };
      if (imageUrl) {
        update.imageUrl = imageUrl
      } else {
        update.imageUrl = defaultUrl
      }

      if (description) {
        update.description = description
      } else {
        update.description = defaultDescription
      }
    
      await authAxios.put(`/AboutMe/${aboutMe.id}`, update);

      setOpenAboutEditPopup(false);
      window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  useEffect(() => {
    setMessage("")
  }, [props])



  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openAboutEditPopup}
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
        <p style={{ color: 'red' }} id="Msg" className={classes.center} >{errormsg}</p>
        <form onSubmit={test} className={classes.form}>

          <Typography
            variant="h6"
            style={{ margin: '20px', marginLeft: '0px' }}
          >
            Edit The About Me Section

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ImageURL"
            label="ImageURL"
            defaultValue={defaultUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            id="ImageURL"
          />
          <TextareaAutosize
            style={{ minWidth: "500px", minHeight: "100px", marginTop: "30px", marginBottom: "30px" }}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={defaultDescription}
            aria-label="minimum height"
            placeholder="Enter your Description" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => EditAbout()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenAboutEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}