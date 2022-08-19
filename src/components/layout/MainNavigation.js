import { Link } from "react-router-dom";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const favoritesContext = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorite Meetups <span className={classes.badge}>{favoritesContext.totalFavorites}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
