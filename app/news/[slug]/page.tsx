import { getNewsDetail } from "@/app/_libs/microcms";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params; // ← ここが重要

  const data = await getNewsDetail(slug);

  return <div>{data.title}</div>;
}
