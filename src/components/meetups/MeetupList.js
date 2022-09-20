import MeetupItem from "./MeetupItem";
import { Link } from "react-router-dom";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  if (props.meetups.length === 0) {
    return (
      <p>
        You don't have any meetups created. Click{" "}
        <Link to="/new-meetup">here</Link> to add one.
      </p>
    );
  }

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
