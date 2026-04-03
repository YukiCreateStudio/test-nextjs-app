import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import { NEWS_LIMIT } from "@/app/_constants";
import { getNewsList } from "@/app/_libs/microcms";

type Props = {
  searchParams: { q: string };
};

export default async function Page(props: Props) {
  const { q } = await props.searchParams;
  // console.log("q:", q);
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    q: q,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} basePath={`/news/search?q=${q}`} />
    </>
  );
}
