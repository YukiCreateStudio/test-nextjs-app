import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIMIT } from "@/app/_constants";
import { getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export default async function Page({ params }: Props) {
  const paramsData = await params;
  const current = parseInt(paramsData.current, NEWS_LIMIT);
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    offset: NEWS_LIMIT * (current - 1),
  });
  if (news.length === 0) {
    notFound();
  }
  console.log("current:", current);
  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
