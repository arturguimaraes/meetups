import { useContext } from "react";
import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const favoritesContext = useContext(FavoritesContext);

  const isFavorite = favoritesContext.isFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (isFavorite) {
      favoritesContext.removeFavorite(props.id);
    } else {
      favoritesContext.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        address: props.address,
        description: props.description,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div>
          <img className={classes.image} src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>{isFavorite ? 'Remove from Favorites' : 'To Favorites'}</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
