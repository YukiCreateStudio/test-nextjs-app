import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIMIT } from "@/app/_constants";
import { getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ current: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function Page(props: Props) {
  // 👇 Promiseをそれぞれawait
  const { current } = await props.params;
  const { q } = await props.searchParams;

  // 👇 undefined対策
  const keyword = q ?? "";

  // 👇 数値変換
  const page = parseInt(current, 10);

  if (Number.isNaN(page) || page < 1) {
    notFound();
  }

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    q: keyword,
    offset: NEWS_LIMIT * (page - 1),
  });

  if (news.length === 0) {
    notFound();
  }
  console.log("news:",news)

  return (
    <>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={page}
      />
    </>
  );
}
