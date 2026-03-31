import Article from "@/app/_components/Article";
import { getNewsDetail } from "@/app/_libs/microcms";
import styles from "./page.module.css";
import ButtonLink from "@/app/_components/ButtonLink";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { draftKey?: string };
};

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const { draftKey } = await props.searchParams;

  const data = await getNewsDetail(
    slug,
    draftKey ? { draftKey } : undefined,
  ).catch(notFound);
  // console.log("slug:", slug);
  // console.log("draftKey:", draftKey);
  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
