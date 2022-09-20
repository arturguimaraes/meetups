import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import StartFirebase from "../database/FirebaseConfig";
import { ref, get, child } from "firebase/database";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [db, setDb] = useState(null);

  //Connects to firebase
  useEffect(() => {
    setIsLoading(true);
    setDb(StartFirebase());
    if (db != null) {
      console.log("Database initiated:", db);
      setIsLoading(false);
    }
  }, [db]);

  //Gets data
  useEffect(() => {
    if (db != null) {
      setIsLoading(true);
      get(child(ref(db), "meetups"))
        .then((snapshot) => {
          setIsLoading(false);
          setErrorLoading(false);
          //Get meeptups
          const data = snapshot.exportVal();
          //Not found
          if (data === null) {
            setMeetups([]);
            return;
          }
          //Found
          const loadedMeetups = [];
          for (const key in data) {
            const meetup = {
              id: key,
              ...data[key],
            };
            loadedMeetups.push(meetup);
          }
          setMeetups(loadedMeetups);
        })
        .catch((error) => {
          console.log("Error fetching data from Firebase:", error);
          setMeetups([]);
          setIsLoading(false);
          setErrorLoading(true);
        });
    }
  }, [db]);

  //Loading
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  //Error loading
  if (errorLoading) {
    return (
      <section>
        <p>Error connecting to Firebase API</p>
        <p>{`${process.env.REACT_APP_FIREBASE_API_URL}/meetups.json`}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={meetups} />
    </section>
  );
}

export default AllMeetupsPage;
