import CategoryTab from "@/app/_components/CategoryTab";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIMIT } from "@/app/_constants";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;

  const rawPage = Math.max(1, Number(sp.page) || 1);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIMIT,
    offset: (rawPage - 1) * NEWS_LIMIT,
    filters: `category[equals]${encodeURIComponent(id)}`,
  });

  const totalPages = Math.ceil(totalCount / NEWS_LIMIT);

  if (totalPages > 0 && rawPage > totalPages) {
    redirect(`/news/category/${id}?page=${totalPages}`);
  }
  if (rawPage === 1 && sp.page) {
    redirect(`/news/category/${id}`);
  }
  if (totalCount === 0) {
    notFound();
  }
  const page = totalPages > 0 && rawPage > totalPages ? totalPages : rawPage;

  const category = await getCategoryDetail(id);

  return (
    <>
      <p>
        <CategoryTab category={category} />
        の一覧
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={page}
        basePath={`/news/category/${id}`}
      />
    </>
  );
}
