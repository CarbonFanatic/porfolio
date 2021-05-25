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

  const { openSchoolAddPopup, setOpenSchoolAddPopup } = props
  const [activeYears, setActiveYears] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [description, setDescription] = useState("");
  const [program, setProgram] = useState("");
  const accessToken = localStorage.getItem('token');

  const [errormsg, setMessage] = useState("");
  //Add WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const AddSchool= async (setMsg) => {
    try {
      setMessage("")
      const objectId = new ObjectID();
      const originalHex = objectId.toHexString();
      const add = {
        
        id: originalHex,
      };
      if (activeYears) {
        add.activeyears = activeYears
      } else {
        setMessage("Fill out all fields")
        return;
      }
      if (description) {
        add.description = description
      } else {
        setMessage("Fill out all fields")
        return;      }
      if (program) {
        add.program = program
      } else {
        setMessage("Fill out all fields")
        return;
      }
      if (schoolName) {
        add.schoolName = schoolName
      } else {
        setMessage("Fill out all fields")
        return;
      }
    
      await authAxios.post(`/Education`, add);

      setOpenSchoolAddPopup(false);
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

    <Dialog open={openSchoolAddPopup}
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
            Add an Education entry

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="School Name"
            label="School Name"
            value= {schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            id="School Name"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Program"
            label="Program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            id="Program"
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ActiveYears"
            label="ActiveYears"
            value={activeYears}
            onChange={(e) => setActiveYears(e.target.value)}
            id="ActiveYears"
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
            onClick={() => AddSchool()}

            className={classes.submit}
          >
            Add Entry
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenSchoolAddPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}