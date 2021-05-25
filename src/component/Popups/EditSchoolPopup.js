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

  const { openSchoolEditPopup, setOpenSchoolEditPopup, school } = props
  const [activeYears, setActiveYears] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [description, setDescription] = useState("");
  const [program, setProgram] = useState("");
 
  const defaultName = school.schoolName;
  const defaultProgram = school.program;
  const defaultActiveYears = school.activeyears;
  const defaultDescription= school.description;

  const [errormsg, setMessage] = useState("");
  const accessToken = localStorage.getItem('token');

  //Edit WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const EditSchool= async (setMsg) => {
    try {
      const update = {
        id: school.id,
      };
      if (activeYears) {
        update.activeyears = activeYears
      } else {
        update.activeyears = defaultActiveYears
      }
      if (description) {
        update.description = description
      } else {
        update.description = defaultDescription
      }
      if (program) {
        update.program = program
      } else {
        update.program = defaultProgram
      }
      if (schoolName) {
        update.schoolName = schoolName
      } else {
        update.schoolName = defaultName
      }
    
      await authAxios.put(`/Education/${school.id}`, update);

      setOpenSchoolEditPopup(false);
      window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  useEffect(() => {
  }, [setOpenSchoolEditPopup])



  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openSchoolEditPopup}
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
            Edit your Education

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="School Name"
            label="School Name"
            defaultValue={defaultName}
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
            defaultValue={defaultProgram}
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
            defaultValue={defaultActiveYears}
            onChange={(e) => setActiveYears(e.target.value)}
            id="ActiveYears"
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
            onClick={() => EditSchool()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenSchoolEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}