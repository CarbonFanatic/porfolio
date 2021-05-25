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

  const { openProjectEditPopup, setOpenProjectEditPopup, project} = props
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectType, setProjectType] = useState("");

  const defaultTitle = project.title;
  const defaultLink = project.link;
  const defaultImageUrl = project.imageUrl;
  const defaultProjectType = project.type;
  const defaultDescription= project.description;
  const accessToken = localStorage.getItem('token');

  const [errormsg, setMessage] = useState("");
  //Edit WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const EditProject= async (setMsg) => {
    try {
      const update = {
        id: project.id,
      };
      if (title) {
        update.title = title
      } else {
        update.title = defaultTitle
      }
      if (description) {
        update.description = description
      } else {
        update.description = defaultDescription
      }
      if (link) {
        update.link = link
      } else {
        update.link = defaultLink
      }
      if (imageUrl) {
        update.imageUrl = imageUrl
      } else {
        update.imageUrl = defaultImageUrl
      }
      if (projectType) {
        update.type = projectType
      } else {
        update.type = defaultProjectType
      }
    
      await authAxios.put(`/Projects/${project.id}`, update);

      setOpenProjectEditPopup(false);
      window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  useEffect(() => {
  }, [setOpenProjectEditPopup])



  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openProjectEditPopup}
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
            Edit your Project

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Title"
            label="Title"
            defaultValue={defaultTitle}
            onChange={(e) => setTitle(e.target.value)}
            id="Title"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Link"
            label="Link"
            defaultValue={defaultLink}
            onChange={(e) => setLink(e.target.value)}
            id="Link"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Type"
            label="Type"
            defaultValue={defaultProjectType}
            onChange={(e) => setProjectType(e.target.value)}
            id="Type"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ImageUrl"
            label="ImageUrl"
            defaultValue={defaultImageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            id="ImageUrl"
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
            onClick={() => EditProject()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenProjectEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}