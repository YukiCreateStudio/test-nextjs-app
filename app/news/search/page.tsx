import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import { NEWS_LIMIT } from "@/app/_constants";
import { getNewsList } from "@/app/_libs/microcms";
import { notFound, redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page?: string;
    q: string;
  }>;
};

export default async function Page(props: Props) {
  const sp = await props.searchParams;

  const rawPage = Math.max(1, Number(sp.page) || 1);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    q: sp.q,
    offset: (rawPage - 1) * NEWS_LIMIT,
  });

  const totalPages = Math.ceil(totalCount / NEWS_LIMIT);

  if (totalPages > 0 && rawPage > totalPages) {
    redirect(`/news/search?q=${sp.q}&page=${totalPages}`);
  }
  if (rawPage === 1 && sp.page) {
    redirect(`/news/search?q=${sp.q}`);
  }
  if (totalCount === 0) {
    notFound();
  }
  const page = totalPages > 0 && rawPage > totalPages ? totalPages : rawPage;

  // console.log("rawPage:", rawPage);
  // console.log("totalPages:", totalPages);
  // console.log("page:", page);

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={page}
        basePath={`/news/search?q=${sp.q}`}
      />
    </>
  );
}
