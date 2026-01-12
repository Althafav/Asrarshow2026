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
    .item("master_class_page_2026")
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
        canonicalUrl={`${SITE_URL}master-classes`}
        ogUrl={`${SITE_URL}master-classes`}
      />
      <div className="relative py-20 sm:py-30">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover "
        />
        <div className="container mx-auto relative z-1">
          <h1 className="text-white font-medium text-3xl sm:text-4xl mb-3">
            {pageData.bannerheading.value}
          </h1>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="space-y-10">
            {pageData.masterclassitems.linkedItems.map(
              (item: any, index: number) => (
                <div
                  key={item.system.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center"
                >
                  {/* TEXT */}
                  <div className={`p-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <h3 className="text-2xl sm:text-3xl font-semibold max-w-lg text-black/80">
                      {item.elements.name.value}
                    </h3>

                    <div
                      className="mt-3 prose
                               [&_p]:mb-3 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />
                  </div>

                  {/* IMAGE */}
                  <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-black shadow-md">
                      <div className="relative aspect-16/8 w-full">
                        <Image
                          src={item.elements.image.value[0]?.url}
                          alt={item.elements.name.value}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
