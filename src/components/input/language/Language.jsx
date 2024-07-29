import React from 'react'
import styles from './Language.module.css'
function Language({title, data,lang}) {
    // console.log(data);
  return (
    <>
    <label className={styles.Language} htmlFor="">{title}
    <select onChange={(e)=>{lang(e.target.value)}}>
        {data.map((item, index) => {
            return (
                <option key={index} value={item.name}>{item.name}</option>
            )
        })}
    </select>
    </label>
    
    </>
  )
}

export default Language