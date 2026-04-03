import NewsList from "../_components/NewsList";
import Pagination from "../_components/Pagination";
import SearchField from "../_components/SearchField";
import { NEWS_LIMIT } from "../_constants";
import { getNewsList } from "../_libs/microcms";
import { notFound, redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const rawPage = Math.max(1, Number(params.page) || 1);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    offset: (rawPage - 1) * NEWS_LIMIT,
  });

  const totalPages = Math.ceil(totalCount / NEWS_LIMIT);

  if (totalPages > 0 && rawPage > totalPages) {
    redirect(`/news?page=${totalPages}`);
  }
  if (rawPage === 1 && params.page) {
    redirect("/news");
  }
  if (totalCount === 0) {
    notFound();
  }
  const page = totalPages > 0 && rawPage > totalPages ? totalPages : rawPage;

  // console.log("params.page:",params.page)
  // console.log("totalPages:",totalPages)
  // console.log("rawPage:",rawPage)
  // console.log("page",page)

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={page} basePath="/news" />
    </>
  );
}
