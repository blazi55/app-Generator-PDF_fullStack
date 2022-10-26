import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import {useState} from 'react';

export default function FirstPage() {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[fontSizeTitle, setFontSizeTitle] = useState(0);
  const[fontSizeDescription, setFontSizeDescription] = useState(0);

  const onSave = (e) => {
    window.location.reload(false);
    e.preventDefault()
    if(fontSizeDescription == 0 || fontSizeTitle == 0) {
      alert('Halo ustaw rozmiar czcionki paczusiu :)')
    } else {
      const pdfSave = {title, description, fontSizeTitle, fontSizeDescription}
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
      <>
        <div className="firstPage">
          <ul>
            <TextField id="outlined-basic" inputProps={{style:{width: 350, color: 'black'}}} label="Podaj Tytuł" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
          </ul>
          <ul>
          <textarea className="text" placeholder="Podaj Opis" onChange={(e) => setDescription(e.target.value)}/>
          </ul>
        </div>
        <div className="secondPage">
          <div className="text1">
            <Button variant="outlined" style={{margin: 20}} onClick={onSave}> Zatwierdź dane </Button>
            <Button variant="outlined" style={{margin: 20}} onClick={onGet}> Pobierz PDF </Button>
          </div>
          <FormControl style={{width: 250, marginTop: 20}}>
          <InputLabel id="demo-simple-select-label">Rozmiar Czcionki Tytułu</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Rozmiar Czcionki Tytułu"
              onChange={(e) => setFontSizeTitle(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={19}>19</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={21}>21</MenuItem>
              <MenuItem value={22}>22</MenuItem>
              <MenuItem value={23}>23</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{width: 250, marginTop: 20}}>
          <InputLabel id="demo-simple-select-label">Rozmiar Czcionki Opisu</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Rozmiar Czcionki Opisu"
              onChange={(e) => setFontSizeDescription(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={19}>19</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={21}>21</MenuItem>
            </Select>
          </FormControl>
        </div>
      </>
    );
  }