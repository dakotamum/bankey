import React /*,{ useState }*/ from 'react'
import '../App.css'

function AboutPage( {navigateTo} ){

  return (
    <>
      <div>
        <div>
          Developed by Dakota Mumford
        </div>
        <button onClick={()=> navigateTo("homepage")}>home</button>
      </div>
    </>
  );
}

export default AboutPage
