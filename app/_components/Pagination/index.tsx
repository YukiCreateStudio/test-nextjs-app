import { NEWS_LIMIT } from "@/app/_constants";
import styles from "./index.module.css";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = "/news",
}: Props) {
  // console.log(totalCount);
  const pages = Array.from(
    { length: Math.ceil(totalCount / NEWS_LIMIT) },
    (_, i) => i + 1,
  );
  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link
                href={`${basePath}${
                  basePath.includes("?") ? "&" : "?"
                }page=${p}`}
                className={styles.item}
              >
                {p}
              </Link>
            ) : (
              <span className={classNames(styles.item, styles.current)}>
                {p}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
