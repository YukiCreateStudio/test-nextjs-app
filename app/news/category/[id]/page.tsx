import CategoryTab from "@/app/_components/CategoryTab";
import NewsList from "@/app/_components/NewsList";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryDetail(id).catch(notFound);
  const { contents: news } = await getNewsList({
    filters: `category[equals]${category.id}`,
  });
  // console.log("category:",category.id);
  return (
    <>
      <p>
        <CategoryTab category={category}/>の一覧
      </p>
      <NewsList news={news} />
    </>
  );
}
