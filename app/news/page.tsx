import HeroLayout from "../_components/HeroLayout";
import NewsList from "../_components/NewsList";
import Sheet from "../_components/Sheet";
import { NEWS_LIMIT } from "../_constants";
import { getNewsList } from "../_libs/microcms";

export default async function page() {
  const { contents: news } = await getNewsList({ limit: NEWS_LIMIT });

  return (
    <>
      <NewsList news={news} />
    </>
  );
}
