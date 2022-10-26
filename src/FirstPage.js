import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {useState} from 'react';

export default function FirstPage() {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');

  const onSave = (e) => {
    e.preventDefault()
    const pdfSave = {title, description}
    console.log(pdfSave)
    fetch("http://localhost:8080/pdf/generate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080/pdf/generate'
      },
        body: JSON.stringify(pdfSave)
    }).then(() => {
        console.log("Added")
    })
  }

  const onGet = async () => {
    fetch('http://localhost:8080/pdf/find').then(response => {
      response.blob().then(blob => {
          // Creating new object of PDF file
        const fileURL = URL.createObjectURL(blob);
          //Open the URL on new Window
         const pdfWindow = window.open();
         pdfWindow.location.href = fileURL;
      })
    })
  };     

    return (
      <div className="firstPage">
        <div className="text1">
          <TextField id="outlined-basic" label="Podaj Tytuł" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="text1">
          <TextField id="outlined-basic" minRows={3} label="Krótki Opis" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="text1">
          <Button variant="outlined" onClick={onSave}> Zatwierdź dane </Button>
        </div>
        <div className="text1">
          <Button variant="outlined" onClick={onGet}> Pobierz PDF </Button>
        </div>
      </div>
    );
  }