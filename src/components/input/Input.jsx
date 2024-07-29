import React, { useEffect, useState } from "react";
import axios from "axios";
import Language from "./language/Language.jsx";
import styles from "./Input.module.css";
const api = "a2105f2d24msha9d359bd445f97dp1e3a6ejsn455bd2d9e6b2";

function Input({setTranslatedTexts}) {
  const [allLanguage, setAllLanguage] = useState([]);
  const [inputLanguage, setInputLanguage] = useState("");
  const [translateLanguage, setTranslateLanguage] = useState("");
  const [inputText, setInputText] = useState("");

  function setInputLanguagess(lang) {
    allLanguage.map((item)=>{
      if(lang==item.name){
        setInputLanguage(item.code);
      }
    })
    console.log("inputLanguage...", inputLanguage);
  }
  function setTranslateLanguagess(lang) {
    allLanguage.map((item) => {
      if (lang === item.name) {
        setTranslateLanguage(item.code);
      }
    })
    console.log("translateLanguage...", translateLanguage);
  }

  useEffect(() => {
    async function setLanguage() {
      let res = await getLanguage();
      setAllLanguage(res);
    }
    setLanguage();
  }, []);

  // useEffect(() => {
  //     console.log("allLanguage state updated:", allLanguage);
  // }, [allLanguage]);

  async function getLanguage() {
    const options = {
      method: "GET",
      url: "https://text-translator2.p.rapidapi.com/getLanguages",
      headers: {
        "x-rapidapi-key": api,
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
    };
    try {
      const req = await axios.request(options);
      const data = req.data.data.languages;
      return data;
    } catch (error) {
      console.log(error);
    }
    // console.log(":jessica");
  }

  async function translate() {
    // import axios from "axios";

    if(inputText=="" || inputLanguage=="" || translateLanguage=="" || inputLanguage==translateLanguage){
      alert("Please Enter Text and Select different Language")
      return;
    }
    console.log("inputText translate", inputText);
    console.log("inputLanguage tranlate", inputLanguage);
    console.log("translateLanguage transalte", translateLanguage);

    const data = new FormData();
    data.append("source_language", inputLanguage);
    data.append("target_language", translateLanguage);
    data.append("text", inputText);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": api,
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data.data.translatedText);
      setTranslatedTexts(response.data.data.translatedText)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.input}>
        <h1>TRANSLATER</h1>
        <Language
          title="Input Language: "
          data={allLanguage}
          lang={setInputLanguagess}
        />
        <Language
          title="Translate Language: "
          data={allLanguage}
          lang={setTranslateLanguagess}
        />
        <textarea
          placeholder="Write Text"
          name=""
          id=""
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          value={inputText}
        ></textarea>
        <button className={styles.btn} onClick={translate}>Translate</button>
      </div>
    </>
  );
}

export default Input;