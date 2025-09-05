"use client";
import Footer from "@/components/Home/Footer/Footer";
import { HomeMenu } from "@/components/Home/menu/HomeMenu";
import Navigation from "@/components/Home/Navigation/Navigation";

const Home = () => {
  return (
    <div className="flex flex-col gap-22 bg-neutral-700 items-center">
      <section>
        <Navigation></Navigation>
        <img src="/bg.png" alt="bg" className="w-screen" />
      </section>
      <HomeMenu></HomeMenu>
      <Footer></Footer>
    </div>
  );
};

export default Home;
