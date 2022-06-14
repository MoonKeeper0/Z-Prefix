import React, {useState, useEffect} from "react";
import Shift from "../Shift/Shift";

const Weekday = ({title, data}) => {

  return (
    <div>
      <h3>{title}</h3>
      {data.map( (x, kidx) => <Shift key={kidx}
                                     title={`${x.dept} ${x.number}`} 
                                     inst={`${x.rank} ${x.last}`} 
                                     loc={`Bldg:${x.bldg} Rm:${x.room}`} 
                                     time={`${x.start.slice(0,5)} - ${x.end.slice(0,5)}`}
                                     offering={x.offering}
                                     roster={x.roster}/>
                                     )}
    </div>
  )
}

export default Weekday;