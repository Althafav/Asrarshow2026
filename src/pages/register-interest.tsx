import RegisterInterestForm from "@/components/Form/RegisterInterestForm";
import SeoHead from "@/components/Globals/Layout/SEOHead";
import GenericData from "@/constants/countryData";
import { deliveryClient, SITE_URL } from "@/modules/Globals";

export default function Page({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
  attendAs,
}: any) {
  if (!pageData) return null;
  return (
    <div>
      <SeoHead
        pageTitle={pageData.metadata__pagetitle.value}
        metaTitle={pageData.metadata__metatitle.value}
        metaDescription={pageData.metadata__metadescription.value}
        canonicalUrl={`${SITE_URL}register-interest`}
        ogUrl={`${SITE_URL}register-interest`}
      />
      <div className="relative py-20">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="absolute  inset-0 w-full h-full object-cover object-top "
        />

        <div className="relative z-1 container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h1 className="text-primary mb-4 text-3xl sm:text-4xl font-medium">
                {pageData.bannerheading.value}
              </h1>
              <div
                className="prose text-white prose-invert"
                dangerouslySetInnerHTML={{
                  __html: pageData.bannerdescription.value,
                }}
              />
            </div>

            <div>
              <RegisterInterestForm
                pageData={pageData}
                CountriesData={CountriesData}
                CountriesCode={CountriesCode}
                attendAs={attendAs}
                mainsource={mainsource}
                subsource={subsource}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query, locale }: any) {
  const mainsource = query.mainsource || "Website";
  const subsource = query.subsource || "/";
  const attendAs = query.attend || "";

  let codename = "book_your_stand___form_2026";

  if (attendAs.toLowerCase() === "exhibitor") {
    codename = "book_your_stand___form_2026";
  } else if (attendAs.toLowerCase() === "visitor") {
    codename = "register_interest_form_sponsor";
  }

  const langMap: Record<string, string> = {
    en: "default",
    ar: "Arabic",
  };
  const language = langMap[locale ?? "en"];

  const res = await deliveryClient
    .item(codename)
    .depthParameter(2)
    .languageParameter(language)
    .toPromise();

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  return {
    props: {
      pageData: res.data.item.elements || null,
      mainsource,
      subsource,
      attendAs,
      CountriesCode,
      CountriesData,
    },
  };
}
