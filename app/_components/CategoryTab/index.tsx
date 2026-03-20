import styles from "./index.module.css";
import { Category } from "@/app/_libs/microcms";

type Props = {
  category: Category;
};

export default function CategoryTab({ category }: Props) {
  return (
    <>
      <span className={styles.tag}>{category.name}</span>
    </>
  );
}
