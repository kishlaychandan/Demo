import { useState } from 'react'
import './App.css'
import Input from './components/input/Input.jsx';
import Output from './components/output/Output.jsx';
function App() {
  const [translatedText,setTranslatedText]=useState("Translated Text...");
  function setTranslatedTexts(text){
    setTranslatedText(text);
    console.log("translatedText is =====",translatedText);
  }
  return (
    <>
      <Input setTranslatedTexts={setTranslatedTexts}/>
      <Output translatedText={translatedText}/>
    </>
  )
}

export default App
