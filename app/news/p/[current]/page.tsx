import NewsList from "@/app/_components/NewsList";
import { getNewsList } from "@/app/_libs/microcms";
import Link from "next/link";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const paramsData = await params;
  const current = parseInt(paramsData.current,10)
  const { contents: news } = await getNewsList({
    limit:10,
    offset:current
  });
  console.log("current:", current);
  console.log("news:", news);

  return (
    <>
      <NewsList news={news}/>
    </>
  );
}
