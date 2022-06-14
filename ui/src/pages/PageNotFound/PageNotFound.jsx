import {Link} from 'react-router-dom';
import styles from './PageNotFound.module.css';
export default function PageNotFound(){


return(
    <>


    <h1 className={styles}>PageNotFound 404</h1>
    <h2 className={styles.link}>
    <Link to="/"> Home </Link>
    </h2>
    </>
);

}