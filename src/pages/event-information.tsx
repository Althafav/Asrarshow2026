import SeoHead from "@/components/Globals/Layout/SEOHead";
import HeroBanner from "@/components/HomePage/HeroBanner";
import CalendarIcon from "@/components/UI/Icons/CalendarIcon";
import ClockIcon from "@/components/UI/Icons/ClockIcon";
import VenueIcon from "@/components/UI/Icons/VenueIcon";
import IframeEmbed from "@/components/UI/IframeEmbed";
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
    .item("event_information_page_2026")
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
    <div className="">
      <SeoHead
        pageTitle={pageData.metadata__pagetitle.value}
        metaTitle={pageData.metadata__metatitle.value}
        metaDescription={pageData.metadata__metadescription.value}
        canonicalUrl={`${SITE_URL}event-information`}
        ogUrl={`${SITE_URL}event-information`}
      />
      <div className="relative h-screen flex items-center padding-top-nav">
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

          <div className="mt-8 max-w-xl">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
              {/* Row 1 */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/20">
                <CalendarIcon />
                <p className="text-white text-sm md:text-base">
                  {pageData.showdate.value}
                </p>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/20">
                <ClockIcon />
                <p className="text-white text-sm md:text-base">
                  {pageData.showtiming.value}
                </p>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-4 px-6 py-4">
                <VenueIcon />
                <p className="text-white text-sm md:text-base">
                  {pageData.venue.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl px-5 mx-auto">
          <IframeEmbed src={pageData.maplink.value} />
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl text-center mb-8">
            {pageData.directionheading.value}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {pageData.directionitems.linkedItems.map((item: any) => {
              return (
                <div className="" key={item.system.id}>
                  <div>
                    <img
                      src={item.elements.image.value[0]?.url}
                      alt={item.elements.name.value}
                      className="w-full aspect-video object-cover rounded-3xl"
                    />

                    <div className="p-2">
                      <h4 className="text-xl font-bold mb-3">
                        {item.elements.name.value}
                      </h4>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="relative">
        <img
          src={pageData.policybackgroundimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover "
        />
        <div className="container mx-auto relative z-1">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-10 rounded-xl bg-tertiary">
              <h3 className="text-secondary text-2xl sm:text-3xl mb-3">
                {pageData.admissionpolicyheading.value}
              </h3>

              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.admissionpolicycontent.value,
                }}
              />
            </div>

            <div className="p-10 rounded-xl bg-tertiary">
              <h3 className="text-secondary text-2xl sm:text-3xl mb-3">
                {pageData.badgepolicyheading.value}
              </h3>

              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.badgepolicycontent.value,
                }}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
