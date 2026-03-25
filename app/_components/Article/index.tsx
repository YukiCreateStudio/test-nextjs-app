import { News } from "@/app/_libs/microcms"
import styles from "./index.module.css";
import CategoryTab from "../CategoryTab";
import DateTab from "../DateTab";
import Image from "next/image";

type Props = {
  data:News
}

export default function Article ({data}:Props) {
  return (
    <main>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        <CategoryTab category={data.category}/>
        <DateTab date={data.publishedAt ??  data.createdAt}/>
      </div>
      {data.thumbnail && (
        <Image
          className={styles.thumbnail}
          src={data.thumbnail.url}
          alt=""
          width={data.thumbnail.width}
          height={data.thumbnail.height}
        />
      )}
      <div className={styles.content} dangerouslySetInnerHTML={{__html:data.content}}/>
    </main>
  )
}
