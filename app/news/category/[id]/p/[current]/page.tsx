import CategoryTab from "@/app/_components/CategoryTab";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIMIT } from "@/app/_constants";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
    current: string;
  }>;
};

export default async function Page({ params }: Props) {
  const paramsData = await params;
  const category = await getCategoryDetail(paramsData.id).catch(notFound);
  const current = parseInt(paramsData.current, NEWS_LIMIT);
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }
  const { contents: news, totalCount } = await getNewsList({
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIMIT,
    offset: NEWS_LIMIT * (current - 1),
  });
  if (news.length === 0) {
    notFound();
  }
  console.log("current:", current);
  return (
    <>
      <p>
        <CategoryTab category={category} />
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
