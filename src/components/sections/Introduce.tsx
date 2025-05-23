"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import Image from "next/image";
import myPicture from "~/public/images/my-picture.jpeg";

export const Introduce: FC = () => {
  const t = useTranslations("Introduce");

  const handleClick = () => {
    if (typeof window === "undefined") return;
    const targetSection = document.getElementById("about");

    if (targetSection) {
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;
      const sectionTop = targetSection.offsetTop;
      const offsetTop = sectionTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-5 flex flex-col gap-y-3 sm:gap-y-5 justify-center items-center h-[calc(100%-100px)]">
      <Image
        priority
        src={myPicture}
        alt="sajad mahdian personal picture"
        className="w-[180px] sm:w-[250px] md:w-[300px] rounded-full"
      />
      <div className="text-center text-[20px] sm:text-[25px] md:text-[30px]">
        {t("welcome")}
      </div>
      <div className="text-center text-[20px] sm:text-[25px] md:text-[30px]">
        {t("my-name")}
      </div>
      <div className="text-center text-[20px] sm:text-[25px] md:text-[30px]">
        {t("carrie")}
      </div>
      <button
        onClick={handleClick}
        className="text-center text-[13px] sm:text-[14px] md:text-[15px] px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition"
      >
        {t("know-more")}
      </button>
    </div>
  );
};
