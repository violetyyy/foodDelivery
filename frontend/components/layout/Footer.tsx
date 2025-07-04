export const Footer = () => {
  return (
    <div className="w-screen bg-[#18181B] pt-[60px] pb-[111px] ">
      <div className="w-screen bg-[#EF4444] mb-[76px] py-7 text-white flex gap-[34px] text-3xl font-semibold overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} className="flex-shrink-0 snap-start">
            Fresh fast delivered
          </p>
        ))}
      </div>
      <div className="flex justify-between mb-[104px] mx-[88px]">
        <div className="flex flex-col gap-3 items-center">
          <img src="/logo.svg" alt="logo" className="w-[46px]" />
          <div className="flex flex-col items-center">
            <div className="flex">
              <p className="text-white text-[20px] font-semibold">Nom</p>
              <p className="text-[#EF4444] text-[20px] font-semibold">Nom</p>
            </div>
            <p className="text-white text-[12px] font-normal">Swift delivery</p>
          </div>
        </div>
        <div className="flex gap-[112px]">
          <div className="flex flex-col text-white gap-4 text-[16px]">
            <p className="text-[#71717A]">NOMNOM</p>
            <p>Home</p>
            <p>Contact Us</p>
            <p>Delivery Zone</p>
          </div>
          <div className="flex text-white gap-[56px] text-[16px]">
            <div className="flex flex-col gap-4">
              <p className="text-[#71717A]">MENU</p>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
              <p>Lunch favorites</p>
              <p>Main dishes</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#18181B]">CallMe</p>
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Deserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>
          </div>
          <div className="flex flex-col text-[#71717A] gap-4 text-[16px]">
            <p>FOLLOW US</p>
            <div className="flex gap-4">
              <img src="/fb.png" alt="Facebook Logo" className="w-[28px]" />
              <img src="/ig.png" alt="Instagram Logo" className="w-[28px]" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#18181B]">WOW</p>
        </div>
      </div>
      <div className=" py-8 mx-[88px] border-t border-[#71717A] text-[#71717A] text-[14px] gap-[48px] flex">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
