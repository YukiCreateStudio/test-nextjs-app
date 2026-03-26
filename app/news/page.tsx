import NewsList from "../_components/NewsList";
import Pagination from "../_components/Pagination";
import { NEWS_LIMIT } from "../_constants";
import { getNewsList } from "../_libs/microcms";

export default async function page() {
  const { contents: news,totalCount } = await getNewsList({ limit: NEWS_LIMIT });

  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount}/>
    </>
  );
}
