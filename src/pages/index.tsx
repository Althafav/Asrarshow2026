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
    .item("home_page_2026")
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
      <HeroBanner
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
        cta={pageData.bannercta.linkedItems}
        imageUrl={pageData.bannerimage.value[0]?.url}
      />

      <Section>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-10">
            <div className="sm:col-span-5 col-span-12 ">
              <h2 className="sm:text-5xl text-3xl max-w-lg">
                {pageData.whyexhibitheading.value}
              </h2>
            </div>

            <div className="col-span-12 sm:col-span-7">
              <div className="grid sm:grid-cols-3 gap-5">
                {pageData.whyexhibititems.linkedItems.map((item: any) => {
                  return (
                    <div key={item.system.id}>
                      <div className="bg-gradient-primary p-2 rounded-xl mb-4 inline-flex items-center justify-center">
                        <img
                          src={item.elements.image.value[0]?.url}
                          alt={item.elements.image.value[0]?.name || "Icon"}
                        />
                      </div>

                      <h3 className="text-xl font-bold ">
                        {item.elements.name.value}
                      </h3>
                      <div
                        className="prose max-w-none font-light"
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
        </div>
      </Section>

      <Section className="relative">
        <img
          src={pageData.bgsaudihighlight.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 container mx-auto ">
          <div className="">
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-5xl text-white">
                {pageData.saudihightlightheading.value}
              </h2>
            </div>
            <div className="flex justify-end mt-8">
              <div className="max-w-4xl">
                <div
                  className="prose max-w-none prose-invert text-white"
                  dangerouslySetInnerHTML={{
                    __html: pageData.saudihightlightdescription.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 items-center">
            <div className="">
              <h2 className="mb-3 text-3xl text-secondary">
                {pageData.asrarzoneheading.value}
              </h2>

              <div
                className="prose "
                dangerouslySetInnerHTML={{
                  __html: pageData.asrarzonedescription.value,
                }}
              />
            </div>

            <div className="">
              <div
                className="
    grid grid-cols-1 gap-4
    md:grid-cols-3 md:auto-rows-[220px]
    lg:auto-rows-[240px]
  "
              >
                {pageData.asrarzoneitems.linkedItems.map(
                  (item: any, index: number) => {
                    const image = item?.elements?.image?.value?.[0];
                    const title = item?.elements?.name?.value ?? "";
                    const isFeatured = index === 0;

                    return (
                      <article
                        key={item.system.id}
                        className={[
                          "group relative isolate overflow-hidden rounded-2xl bg-neutral-900",
                          "ring-1 ring-white/10 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]",
                          "transition-all duration-300 hover:-translate-y-1 hover:ring-white/20",
                          // Featured spans on md+
                          isFeatured ? "md:col-span-2 md:row-span-2" : "",
                          // On mobile keep nice ratios for every card
                          isFeatured
                            ? "aspect-16/10 md:aspect-auto"
                            : "aspect-video md:aspect-auto",
                        ].join(" ")}
                      >
                        {/* Image */}
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.description || "Asrar Zone Image"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            priority={isFeatured}
                            sizes={
                              isFeatured
                                ? "(min-width: 768px) 66vw, 100vw"
                                : "(min-width: 768px) 33vw, 100vw"
                            }
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-sm text-white/70">
                            No Image
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-black/10" />
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/15" />

                        {/* Text */}
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                          <h3
                            className={[
                              "text-white font-semibold leading-snug line-clamp-2",
                              "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]",
                              isFeatured
                                ? "text-xl md:text-2xl"
                                : "text-base md:text-lg",
                            ].join(" ")}
                          >
                            {title}
                          </h3>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative">
        <img
          src={pageData.whocomingbackgroundimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover "
        />
        <div className="relative z-10 container mx-auto">
          <h2 className="text-center text-secondary text-3xl sm:text-4xl">
            {pageData.whocomingheading.value}
          </h2>

          <div className="grid sm:grid-cols-4 gap-5 mt-8">
            {pageData.whocomingitems.linkedItems.map((item: any) => {
              return (
                <div className="bg-secondary p-10 rounded-2xl" key={item.system.id}>
                  <h3 className="text-white text-center text-lg">
                    {item.elements.name.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-12 gap-5">
            <div className="sm:col-span-4">
              <h2 className=" text-secondary text-3xl sm:text-4xl">
                {pageData.whoinvolvedheading.value}
              </h2>
            </div>

            <div className="sm:col-span-8">
              <div className="grid sm:grid-cols-4 gap-5">
                {pageData.whoinvolveditems.linkedItems.map((item: any) => {
                  return (
                    <div className="" key={item.system.id}>
                      <div className="bg-secondary inline-flex mb-3 items-center justify-center p-3 rounded-xl">
                        <img src={item.elements.image.value[0]?.url} alt="" />
                      </div>
                      <h3 className=" text-lg font-medium leading-snug">
                        {item.elements.name.value}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="w-full bg-white py-8">
            <div className="flex justify-center flex-wrap gap-10">
              {/* OUR CHARITY PARTNER */}
              <div className="flex items-center gap-6">
                <h2 className="text-2xl sm:text-3xl max-w-62.5 font-medium uppercase  tracking-wide text-[#6B6B6B]">
                  {pageData.charitypartnerheading.value}
                </h2>

                <a
                  target="_blank"
                  href={
                    pageData.charitypartneritems.linkedItems?.[0]?.elements
                      ?.link?.value
                  }
                  className="flex h-39.5 w-48 items-center justify-center rounded-[10px] border border-[#EAEAEA] bg-white"
                >
                  {/* take first charity partner logo */}
                  <img
                    src={
                      pageData.charitypartneritems.linkedItems?.[0]?.elements
                        ?.image?.value?.[0]?.url
                    }
                    alt="Charity Partner"
                    className="max-h-33.5 max-w-41 object-contain"
                  />
                </a>
              </div>

              {/* OUR SPONSORS */}
              <div className="flex items-center gap-6">
                <h2 className="sm:text-3xl text-2xl font-medium uppercase  tracking-wide text-[#6B6B6B]">
                  {pageData.sponsorheading.value}
                </h2>

                <div className="flex h-34.5 items-center rounded-[10px] border border-[#EAEAEA] bg-white px-6">
                  {pageData.sponsoritems.linkedItems.map(
                    (item: any, idx: number) => (
                      <a
                        target="_blank"
                        href={item.elements.link.value}
                        key={item.system.id}
                        className="flex items-center"
                      >
                        <img
                          src={item.elements.image.value?.[0]?.url}
                          alt="Sponsor"
                          className="h-34.5 w-auto object-contain"
                        />

                        {/* vertical divider between logos */}
                        {idx !==
                          pageData.sponsoritems.linkedItems.length - 1 && (
                          <span className="mx-6 h-6.5 w-px bg-[#EAEAEA]" />
                        )}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
