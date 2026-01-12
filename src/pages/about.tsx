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
    .item("about_page_2026")
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
  if (!pageData) return null;
  return (
    <div>
      <SeoHead
        pageTitle={pageData.metadata__pagetitle.value}
        metaTitle={pageData.metadata__metatitle.value}
        metaDescription={pageData.metadata__metadescription.value}
        canonicalUrl={`${SITE_URL}`}
        ogUrl={`${SITE_URL}`}
      />
      <div className="relative py-20 sm:py-30 ">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover "
        />
        <div className="container mx-auto relative z-1">
          <h1 className="text-primary text-3xl sm:text-4xl mb-3">
            {pageData.bannerheading.value}
          </h1>
          <div
            className="text-white max-w-4xl"
            dangerouslySetInnerHTML={{
              __html: pageData.bannerdescription.value,
            }}
          />
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl">
                {pageData.aboutheading.value}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {pageData.aboutitems.linkedItems.map((item: any) => {
                return (
                  <div key={item.system.id} className="bg-tertiary p-5">
                    <img
                      src={item.elements.image.value[0]?.url}
                      alt={item.elements.name.value}
                      className="mb-3"
                    />
                    <h3 className="text-xl font-medium mb-3">
                      {item.elements.name.value}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative py-10 sm:py-30">
        <img
          src={pageData.missionvisionbg.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover "
        />
        <div className="relative z-10 container mx-auto ">
          <div className="">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl text-gradient-primary mb-3">
                {pageData.missionheading.value}
              </h2>

              <div
                className="prose max-w-none prose-invert text-white"
                dangerouslySetInnerHTML={{
                  __html: pageData.missiondescription.value,
                }}
              />
            </div>
            <div className="flex justify-end mt-8">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-5xl text-gradient-primary text-primary mb-3">
                  {pageData.visionheading.value}
                </h2>
                <div
                  className="prose max-w-none prose-invert text-white"
                  dangerouslySetInnerHTML={{
                    __html: pageData.visiondescription.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl mb-3">
            {pageData.objectiveheading.value}
          </h2>
          <p>{pageData.objectivesubheading.value}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {pageData.objectiveitems.linkedItems.map(
              (item: any, index: number) => {
                const isLastRow =
                  index >= pageData.objectiveitems.linkedItems.length - 2;

                return (
                  <div
                    key={item.system.id}
                    className={`rounded-xl border border-[#E6C68B] bg-tertiary p-6
            ${isLastRow ? "lg:col-span-6" : "lg:col-span-4"}
          `}
                  >
                    <h3 className="mb-3 text-xl font-semibold text-[#1E1E1E]">
                      {index + 1}. {item.elements.name.value}
                    </h3>

                    <div
                      className="text-sm leading-relaxed text-[#4A4A4A]"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
