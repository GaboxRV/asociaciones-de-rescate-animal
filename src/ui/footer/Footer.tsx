import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <h2 className={styles.footer__nombre}>Desarrollador &middot; Gabriel Ramirez</h2>
            <ul className={styles.footer__lista}>
                <li>
                    <Link 
                        className={styles.footer__link}
                        href="https://www.linkedin.com/in/gabriel-rv/" 
                    >
                        Linkedin
                    </Link>
                </li>
                <li>
                    <Link 
                        className={styles.footer__link}
                        href="https://github.com/GaboxRV"
                    >
                        Github
                    </Link>
                </li>
            </ul>
            <p className={styles.footer__derechos}>
                <small> 2024 Gabriel Ramirez.</small>
            </p>
        </footer>
    );
}