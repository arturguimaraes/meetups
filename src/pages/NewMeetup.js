import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import StartFirebase from "../database/FirebaseConfig";
import { ref, set } from "firebase/database";

function NewMeetupPage() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
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

  //Loading
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function addMeetupHandler(meetupData) {
    console.log("Added:", meetupData);
    ///Insert in database
    set(ref(db, "meetups/" + meetupData.id), meetupData)
      //Success
      .then(() => {
        history.replace("/");
        return true;
      })
      //Error
      .catch((error) => {
        console.log("Error inserting data in Firebase.", error);
      });

    /*fetch(
      "https://react-getting-started-c086f-default-rtdb.firebaseio.com/meetups.json",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Error
        if (data.error) {
          console.log("Error:", data);
          return;
        }
        //Sucess
        console.log(data);
        history.replace("/");
      });*/
  }

  return (
    <section>
      <h1>New Meetup Page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
