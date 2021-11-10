import classes from './Layout.module.css';
import MainNavigation from "../navigation/MainNavigation";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
}

export default Layout;