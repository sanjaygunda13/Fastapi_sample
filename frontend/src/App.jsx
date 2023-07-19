import React, {useEffect, useState} from "react";
import './table.css';
import './button.css';
const App=()=>{
  const [EntryID,setEntryID]=useState("");
  const [AssemblyID,setAssemblyID]=useState("");
  const [InterfaceID,setInterfaceID]=useState("");
  const [Errors,setErrors]=useState("");
  const [Formerr,setFormerr]=useState({});
  const [loading, setLoading] = useState(false);
  

  const [Response,setResponse]= useState("");



  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    // Check if name is empty
    if (EntryID.trim() === '') {
      newErrors.EntryID = 'Assembly ID is required';
      isValid = false;
    }

    if (AssemblyID.trim() === '' || !/^\d+$/.test(AssemblyID)) {
      newErrors.AssemblyID = 'Assembly id must be a valid integer';
      isValid = false;
    }
    if (InterfaceID.trim() === '' || !/^\d+$/.test(InterfaceID)) {
      newErrors.InterfaceID = 'Interface Id must be a valid integer';
      isValid = false;
    }
    setFormerr(newErrors);
    
    return isValid;
  };


  
  const GetPostData=async(e)=>{
    e.preventDefault();
    const isValid = validateForm();
    if (isValid){

    
    setLoading(true);
    try{
    const udata ={
      "entry_id": EntryID,
      "assembly_id": AssemblyID,
      "interface_id": InterfaceID
      
    };
    const requestOptions ={
      method: "post",
      headers:
      {
        'Content-Type': 'application/json'

      },
      body:JSON.stringify(udata)
    };
    const FetData=await fetch("/asa-change",requestOptions);
    const RespData = await FetData.json();
    if (!FetData.ok){
      console.log("hi")
      console.log(FetData)
      setResponse(null);
      setLoading(false);
      setErrors(FetData.statusText)
      console.log(FetData.statusText)
      setEntryID("");
      setAssemblyID("");
      setInterfaceID("");  
      
    }
    else{
      setResponse(RespData)
      setLoading(false);
      console.log(RespData.bound)
      setFormerr();
      setErrors(null);
    }
    console.log(RespData.bound);
  
  } catch (err) {
    console.log(err);
  }
}
    
  };
  
 
  return (
    <div>
  
    <form onSubmit={GetPostData}>

   {Formerr && Object.keys(Formerr).length > 0 ?

    <ul>
    {Object.keys(Formerr).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {Formerr[key]}
          </li>
           ))}
    </ul>
    : (
      <p></p>
    )}
        <label>
          Entry ID:
          <input
            type="text"
            value={EntryID}
            placeholder="Enter Alphanumeric Entry ID"
            onChange={(e) => setEntryID(e.target.value)}
          />
        </label>
        <label>
          Assembly ID:
          <input
            type="text"
            value={AssemblyID}
            placeholder="Enter intiger Assembly ID"
            onChange={(e) => setAssemblyID(e.target.value)}

          />
        </label>
        <label>
          Interface ID:
          <input
            type="text"
            value={InterfaceID}
            placeholder="Enter intiger Interface ID"
            onChange={(e) => setInterfaceID(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>Submit</button>
        {loading && <p>Loading...</p>}
      </form>
      <h3>{Errors}</h3>
    {Response ? (
         
      <table>
       
        <thead>
        <tr>
              <th>Index</th>
              {Object.keys(Response).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
        </thead>
        <tbody>
        {Response.bound.map((_, index) => (
           <tr key={index}>
            <td>{index}</td>
           {Object.keys(Response).map((key) => {
             const value = Response[key][index];
             return <td key={`${key}-${index}`}>{value}</td>;
           })}
         </tr>
         ))}
           
        </tbody>
      </table>
    ) : (
      <p></p>
    )}
  </div>
     );
}

export default App;



