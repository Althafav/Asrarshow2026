import SeoHead from "@/components/Globals/Layout/SEOHead";
import HeroBanner from "@/components/HomePage/HeroBanner";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { GetStaticProps } from "next";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const langMap: Record<string, string> = {
    en: "default",
    ar: "Arabic",

  };
  const language = langMap[locale ?? "en"];
  const res = await deliveryClient
    .item("beauty_page_2026")
    .depthParameter(2)
    .languageParameter(language)
    .toPromise();

  return {
    props: {
      pageData: res.data.item.elements || null,
    },
    revalidate: 60,
  };
};

export default function Page({ pageData }: any) {
   if(!pageData) return null;
  return (
    <div>
      <SeoHead
        pageTitle={pageData.metadata__pagetitle.value}
        metaTitle={pageData.metadata__metatitle.value}
        metaDescription={pageData.metadata__metadescription.value}
        canonicalUrl={`${SITE_URL}beauty`}
        ogUrl={`${SITE_URL}beauty`}
      />
      <div className="relative py-20 sm:py-30">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover object-top "
        />
        <div className="container mx-auto relative z-1">
          <h1 className="text-white font-medium text-3xl sm:text-4xl mb-3">
            {pageData.bannerheading.value}
          </h1>

          <div
            className="prose prose-invert text-white"
            dangerouslySetInnerHTML={{
              __html: pageData.bannerdescription.value,
            }}
          />

          <Section>
            <div>
              <h2 className="text-3xl sm:text-4xl mb-8 text-white">{pageData.featuresheading.value}</h2>
              <div className="grid sm:grid-cols-4 gap-5">
                {pageData.featuresitems.linkedItems.map((item: any) => {
                  return (
                    <div key={item.system.id} className="p-5 bg-tertiary rounded-xl">
                      <h3 className="text-2xl  mb-3 font-medium">
                        {item.elements.name.value}
                      </h3>
                      <div
                      className="prose"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
