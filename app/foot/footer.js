import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>About Us</h3>
          <p>We are a tech company committed to innovation and pushing the boundaries of technology.</p>
        </div>
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p>contact@company.com</p>
          <p>+123 456 7890</p>
        </div>
        <div className={styles.section}>
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="http://diu.iiitvadodara.ac.in" target="_blank" rel="noopener noreferrer">
                IIITV - International Campus Diu
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Developers Page</h3>
          <Link href="/developer">Access Developer's Page</Link>
        </div>
        <div className={styles.section}>
          <h3>Admin Panel</h3>
          <Link href="../admin/login">Go to Admin Panel</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>©All copyright reserved by student gymkhana</p>
      </div>
    </footer>
  );
};

export default Footer;
