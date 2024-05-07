import { useState } from "react";
export default function ValidString() {
  const [valueOfInput, setValueOfInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    if (valueOfInput.length < 3 || valueOfInput.length > 9) {
      setErrorMessage("Please enter a valid string between 3 and 9 characters");
    } else {
      setErrorMessage("");
    }
  };
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setValueOfInput(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div>
      <label style={{display:"block" ,marginBottom:"4px"}}>First Name</label>
      <input style={{height:"25px",width:"200px" , borderRadius:"5px",paddingLeft:"5px"}} type="text" placeholder="firstname" onChange={(e) => handleChange(e)}></input>
      </div>
      <button style={{backgroundColor:"blueviolet",width:"100px",borderRadius:"20px" , height:"30px" , color:"white"}} onClick={handleClick}>Click</button>
      <span style={{color:"red" , fontSize:"20px"}}>{errorMessage}</span>
    </div>
  );
}
