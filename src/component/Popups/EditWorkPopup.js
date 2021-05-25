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

  const { openWorkEditPopup, setOpenWorkEditPopup, myWork } = props
  const [activeYears, setActiveYears] = useState(myWork.role);
  const [workplaceName, setWorkplaceName] = useState(myWork.workplaceName);
  const [description, setDescription] = useState(myWork.description);
  const [role, setRole] = useState(myWork.role);
  const accessToken = localStorage.getItem('token');

  

  const [errormsg, setMessage] = useState("");
  //Edit WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const EditWork = async (setMsg) => {
    try {
      const update = {
        id: myWork.id,
      };
      if (activeYears) {
        update.activeYears = activeYears
      } else {
        update.activeYears = myWork.activeYears
      }
      if (description) {
        update.description = description
      } else {
        update.description = myWork.description
      }
      if (role) {
        update.role = role
      } else {
        update.role =  myWork.role
      }
      if (workplaceName) {
        update.workplaceName = workplaceName
      } else {
        update.workplaceName =  myWork.workplaceName
      }
    
      await authAxios.put(`/Career/${myWork.id}`, update);

      setOpenWorkEditPopup(false);
      window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  useEffect(() => {
  }, [setOpenWorkEditPopup])



  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openWorkEditPopup}
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
            Edit your Work experience

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="WorkPlace"
            label="WorkPlace"
            defaultValue={myWork.workplaceName}
            onChange={(e) => setWorkplaceName(e.target.value)}
            id="WorkPlace"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Role"
            label="Role"
            defaultValue={myWork.role}
            onChange={(e) => setRole(e.target.value)}
            id="Role"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ActiveYears"
            label="ActiveYears"
            defaultValue={myWork.activeYears}
            onChange={(e) => setActiveYears(e.target.value)}
            id="ActiveYears"
          />
          <TextareaAutosize
            style={{ minWidth: "500px", minHeight: "100px", marginTop: "30px", marginBottom: "30px" }}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={myWork.description}
            aria-label="minimum height"
            placeholder="Enter your Description" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => EditWork()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenWorkEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}