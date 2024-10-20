import config from "@/app/config.json";

const { banner } = config.pages.shop.components;

const BannerText = () => {
  return (
    <>
      <span style={{ whiteSpace: 'nowrap' }}>{banner.text}</span>
      <span>{banner.delimiter}</span>
    </>
  );
};

export const AnimatedBanner = () => {
  return (
    <div className="overflow-hidden w-full bg-gray-300 h-fit p-4 text-2xl my-4 mt-8">
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }

          .scrollable-content {
            display: flex;
            animation: scrollText 20s linear infinite;
            white-space: nowrap;
            gap: 4rem;
          }
        `}
      </style>
      <div className="scrollable-content">
        {Array.from({ length: 20 }).map((_, index) => (
          <BannerText key={index} />
        ))}
      </div>
    </div>
  );
};