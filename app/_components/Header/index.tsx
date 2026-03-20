import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";


export default function Header () {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
      <Image
        className={styles.logo}
        src="/logo.svg"
        alt=""
        width={348}
        height={133}
      />
      </Link>
    </header>
  )
}
