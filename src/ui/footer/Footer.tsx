import styles from './footer.module.css';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <h2 className={styles.footer__nombre}>Desarrollador &middot; Carlos Gabriel Ramirez Victoria</h2>
            <ul className={styles.footer__lista}>
                <li>
                    <a 
                        className={styles.footer__link}
                        target='_blank'
                        href="https://www.linkedin.com/in/gabriel-rv/" 
                    >
                        Linkedin
                    </a>
                </li>
                <li>
                    <a 
                        className={styles.footer__link}
                        target='_blank'
                        href="https://github.com/GaboxRV"
                    >
                        Github
                    </a>
                </li>
            </ul>
            <p className={styles.footer__derechos}>
                <small> 2024 Gabriel Ramirez.</small>
            </p>
        </footer>
    );
}