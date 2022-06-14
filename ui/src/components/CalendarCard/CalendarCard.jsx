import React, {useState, useEffect} from "react";

const CalendarCard = ({classtitle, room, faculty}) => {

  const [cardClass, setCardClass] = useState("");
  const [cardRoom, setCardRoom] = useState("");
  const [cardFaculty, setCardFaculty] = useState("");

  useEffect(() => {
    setCardClass(classtitle);
    setCardRoom(room);
    setCardFaculty(faculty);
  }, [])

  return (
    <div>
      <div>{cardClass}</div>
      <div>{cardRoom}</div>
      <div>{cardFaculty}</div>
    </div>
  )
}

export default CalendarCard;