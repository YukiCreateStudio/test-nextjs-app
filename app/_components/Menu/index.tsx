"use client";

import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

export default function Menu() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  return (
    <div>
      <nav className={classNames(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/news" onClick={close}>
              ニュース
            </Link>
          </li>
          <li>
            <Link href="/members" onClick={close}>
              メンバー
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close}>
              お問い合わせ
            </Link>
          </li>
        </ul>
        <button
          className={classNames(styles.button, styles.close)}
          onClick={close}
        >
          <Image src="/close.svg" alt="close" width={24} height={24} priority />
        </button>
      </nav>
      <button className={styles.button} onClick={open}>
        <Image src="/menu.svg" alt="メニュー" width={24} height={24} />
      </button>
    </div>
  );
}
