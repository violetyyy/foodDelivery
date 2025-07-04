import { Header, Footer } from "@/components/layout";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#404040]">
      <Header />
      <div
        className=" bg-center bg-no-repeat bg-cover h-[660px] mt-[72px] mb-[100px]"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>
      <Footer />
    </div>
  );
}
