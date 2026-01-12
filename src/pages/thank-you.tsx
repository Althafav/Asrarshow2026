import React, { useEffect, useState } from "react";
import Section from "@/components/UI/Section";
import CTAButton from "@/components/UI/CTAButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { deliveryClient } from "@/modules/Globals";

export default function thankyou() {
  const router = useRouter();
  const user = router.query.user as string;

  const [pageData, setPageData] = useState<any | null>(null);
  const { locale } = useRouter();

  const langMap: Record<string, string> = {
    en: "default",
    ar: "Arabic",
   
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await deliveryClient
        .item("thankyoupage_2026")
        .depthParameter(2)
        .toPromise();
      setPageData(res.data.item.elements || null);
    };
    fetchData();
  }, [locale]);

  if (!pageData) return null;

  return (
    <Section className="flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold  mb-4">
        {pageData.heading.value} {user ? `, ${user}` : ""}!
      </h1>

      <div
        className="prose  "
        dangerouslySetInnerHTML={{ __html: pageData.content.value }}
      />
      {pageData.ctabuttons.linkedItems.length > 0 && (
        <div className="mt-4 flex gap-3 flex-wrap justify-center">
          {pageData.ctabuttons.linkedItems.map((item: any) => {
            return (
              <CTAButton
                key={item.system.id}
                variant={item.elements.variant.value[0].name}
                buttonname={item.elements.name.value}
                buttonlink={item.elements.link.value}
              />
            );
          })}
        </div>
      )}
    </Section>
  );
}
