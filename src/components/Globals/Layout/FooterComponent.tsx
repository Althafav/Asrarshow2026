import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiSnapchatLogoFill } from "react-icons/pi";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<any | null>(null);
  const { locale } = useRouter();

  const langMap: Record<string, string> = {
    en: "default",
    ar: "Arabic",
    zh: "Chinese",
  };
  useEffect(() => {
    if (!locale) return;
    const fetchData = async () => {
      const res = await deliveryClient
        .item("global_component")
        .depthParameter(2)
        .languageParameter(langMap[locale] ?? "default")
        .toPromise();
      setPageData(res.data.item.elements || null);
    };
    fetchData();
  }, [locale]);

  if (!pageData) return null;
  return (
    <div className="relative py-20">
      <img
        src={pageData.footerbackgroundimage.value[0]?.url}
        alt=""
        className="absolute  inset-0 w-full h-full object-cover "
      />
      <div className="container mx-auto relative z-1">
        <h2 className="text-center text-secondary text-2xl sm:text-3xl font-medium mb-2">
          {pageData.footerheading.value}
        </h2>
        <p className="text-center text-xl sm:text-2xl">
          {pageData.footersubheading.value}
        </p>

        <div className="pt-12 flex justify-between w-full items-start flex-wrap gap-5">
          <div>
            <div>
              <div className="inline-block">
                <p>{pageData.followustext.value}</p>
                <div className="border border-b" />
                <div className="social-list flex gap-3 mt-4 relative z-50">
                  <a
                    href={pageData.linkedinlink.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 bg-black  inline-flex justify-center items-center text-white rounded-full"
                  >
                    <FaLinkedinIn size={18} />
                  </a>

                  <a
                    href={pageData.youtubelink.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 bg-black  inline-flex justify-center items-center text-white rounded-full"
                  >
                    <FaYoutube size={18} />
                  </a>

                  <a
                    href={pageData.instagramlink.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 bg-black  inline-flex justify-center items-center text-white rounded-full"
                  >
                    <FaInstagram size={18} />
                  </a>

                  <a
                    href={pageData.xlink.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="w-8 h-8 bg-black  inline-flex justify-center items-center text-white rounded-full"
                  >
                    <FaXTwitter size={18} />
                  </a>

                  <a
                    href={pageData.facebooklink.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 bg-black  inline-flex justify-center items-center text-white rounded-full"
                  >
                    <FaFacebook size={18} />
                  </a>

                  {/* <a
                  href="https://www.tiktok.com/@evworld.ae?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 bg-white inline-flex justify-center items-center text-black rounded-full"
                >
                  <FaTiktok size={18} />
                </a>

                <a
                  href="https://snapchat.com/t/lXXuxOvh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 bg-white inline-flex justify-center items-center text-black rounded-full"
                >
                  <PiSnapchatLogoFill size={18} />
                </a> */}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3">{pageData.broughtbytext.value}</p>

              <img
                className="w-32"
                src={pageData.broughtbylogo.value[0]?.url}
                alt=""
              />
            </div>
          </div>

          <div className=" flex gap-10 sm:gap-20 items-start flex-wrap">
            <div className="">
              {pageData.footermenuitems.linkedItems.map((item: any) => (
                <div key={item.system.id}>
                  <a
                    href={item.elements.link.value}
                    className="text-black text-md font-semibold tracking-wide hover:opacity-85 transition"
                  >
                    {item.elements.name.value}
                  </a>

                  <ul className="mt-4 space-y-2">
                    {item.elements.subitem.linkedItems.map((subItem: any) => (
                      <li key={subItem.system.id}>
                        <a
                          href={subItem.elements.link.value}
                          className="text-black transition text-xs"
                        >
                          {subItem.elements.name.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="max-w-sm">
              <p className="text-2xl sm:text-3xl mb-3">
                {pageData.contacttext.value}
              </p>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: pageData.contentinfo.value }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
