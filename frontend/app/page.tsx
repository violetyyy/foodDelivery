import { Header, Footer } from "@/components/layout";
import { HomeMenu } from "@/components/layout/HomeMenu";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#404040]">
      <Header />
      <div
        className=" bg-center bg-no-repeat bg-cover h-[660px] mt-[72px]"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>
      <div className=" flex w-screen justify-center mt-[50px] bg-[#404040] pb-[88px]">
        <HomeMenu />
      </div>
      <Footer />
    </div>
  );
}
