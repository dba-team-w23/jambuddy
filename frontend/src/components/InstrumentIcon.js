import React from "react";

export const InstrumentIcon = ({ instrumentName }) => {

  const iconPath = `../instrument_icons/${instrumentName}.png`;

  // Checking if the image exist at path
  let pathError = false;
  try{
       require(iconPath);
   }
   catch(err){
       pathError=true;
   }

// Conditionals
  if (!pathError) {
    return (
      <div>
        <img src={iconPath} alt={`${instrumentName} icon`} width="20" height="20" />
        {instrumentName}
      </div>
    );
  } else {
    return (
      <div>
        <img src="/frontend/src/components/instrument_icons/Other.png" alt="other icon" width="20" height="20" />
        {instrumentName}
      </div>
    );
  }
};
export default InstrumentIcon