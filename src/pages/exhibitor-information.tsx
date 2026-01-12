import SeoHead from "@/components/Globals/Layout/SEOHead";
import HeroBanner from "@/components/HomePage/HeroBanner";
import CTAButton from "@/components/UI/CTAButton";
import Section from "@/components/UI/Section";
import { highlightWord } from "@/lib/textHelpers";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const langMap: Record<string, string> = {
    en: "default",
    ar: "Arabic",
  };
  const language = langMap[locale ?? "en"];
  const res = await deliveryClient
    .item("exhibitor_information_page_2026")
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
        canonicalUrl={`${SITE_URL}exhibitor-information`}
        ogUrl={`${SITE_URL}exhibitor-information`}
      />
      <div className="relative py-10  bg-tertiary">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 ">
            <div className="pt-20">
              <h1 className="text-secondary text-3xl sm:text-5xl mb-4">
                {pageData.bannerheading.value}
              </h1>
              <div
                className="prose max-w-4xl"
                dangerouslySetInnerHTML={{
                  __html: pageData.bannerdescription.value,
                }}
              />

              {pageData.bannercta.value.length > 0 && (
                <div className="mt-3 flex gap-3 flex-wrap">
                  {pageData.bannercta.linkedItems.map((item: any) => {
                    return (
                      <CTAButton
                        key={item.system.id}
                        variant={item.elements.variant.value[0].name}
                        buttonname={item.elements.name.value}
                        buttonlink={item.elements.link.value}
                        isexternal={item.elements.isexternal.value[0].name}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <img
                src={pageData.bannerimage.value[0]?.url}
                alt=""
                className="object-contain "
              />
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl text-center text-secondary font-medium max-w-3xl mx-auto">
            {highlightWord(pageData.zonesheading.value)}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageData?.zonesitems?.linkedItems?.map((item: any) => (
              <div
                key={item.system.id}
                className="group relative h-140 overflow-hidden rounded-2xl bg-black
                     shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/10"
              >
                {/* Background Image */}
                {item?.elements?.image?.value?.[0]?.url ? (
                  <Image
                    src={item.elements.image.value[0].url}
                    alt={item.elements.name.value}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-zinc-700 to-zinc-900" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl font-semibold text-white drop-shadow-sm">
                    {item.elements.name.value}
                  </h3>

                  <div
                    className="mt-2 max-w-[36ch] text-sm leading-relaxed text-white/80
                         overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
                    dangerouslySetInnerHTML={{
                      __html: item.elements.content.value,
                    }}
                  />

                  <div className="mt-4">
                    <Link
                      href={item.elements.link.value}
                      className="inline-flex items-center justify-center rounded-full
                           border border-[#C9A24D] px-4 py-2 text-xs font-medium
                           text-[#C9A24D] bg-black/35 backdrop-blur-md
                           transition duration-300 hover:bg-black/50 hover:-translate-y-px
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D]/60"
                    >
                      {item.elements.buttonname.value}
                    </Link>
                  </div>
                </div>

                {/* Premium glow on hover (subtle) */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_80%,rgba(201,162,77,0.18),transparent_60%)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
