import HeroLayout from "../_components/HeroLayout";
import Sheet from "../_components/Sheet";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <HeroLayout title="Members" sub="メンバー" />
      <Sheet>{children}</Sheet>
    </>
  );
}
