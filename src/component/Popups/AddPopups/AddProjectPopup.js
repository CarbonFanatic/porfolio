import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, TextField } from '@material-ui/core'
import { API_ENDPOINT } from '../../../config';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core'
import ObjectID from 'bson-objectid'
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));


export default function Popup(props) {

  const { openProjectAddPopup, setOpenProjectAddPopup} = props
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectType, setProjectType] = useState("");
  const accessToken = localStorage.getItem('token');


  const [errormsg, setMessage] = useState("");
  //Edit WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const AddProject= async (setMsg) => {
  
    try {
      const objectId = new ObjectID();
      const originalHex = objectId.toHexString();
      const add = {
        
        id: originalHex,
      };
      if (title) {
        add.title = title
      } else {
        add.title = "Missing Title"
      }
      if (description) {
        add.description = description
      } else {
        add.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
      if (link) {
        add.link = link
      } else {
        add.link = ""
      }
      if (imageUrl) {
        add.imageUrl = imageUrl
      } else {
        add.imageUrl = "https://res.cloudinary.com/deopztejj/image/upload/v1621798827/woocommerce-placeholder-500x655_dwdbya.png"
      }
      if (projectType) {
        add.type = projectType
      } else {
        add.type = "Miscellaneous"
      }
    
     await authAxios.post(`/Projects`, add);
     setOpenProjectAddPopup(false);
     window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  
  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openProjectAddPopup}
      fullWidth
    >
      <DialogTitle>
        <div>
          <Typography variant="h6" component="div">
            Add
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
            Add Project

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Title"
            label="Title"
            value={title}
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
            value={link}
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
            value={projectType}
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            id="ImageUrl"
          />
          <TextareaAutosize
            style={{ minWidth: "500px", minHeight: "100px", marginTop: "30px", marginBottom: "30px" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            aria-label="minimum height"
            placeholder="Enter your Description" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => AddProject()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenProjectAddPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}