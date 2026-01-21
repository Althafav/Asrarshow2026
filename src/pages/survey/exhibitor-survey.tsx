import Head from "next/head";
import React, { useMemo, useState } from "react";

const text = "#4B4B4B";

type FormState = {
  fullName: string;
  mobileNumber: string;

  businessActivity: string;
  businessActivityOther?: string;
  mainObjective: string;

  overallOutcome: string;

  achievedSales: string;

  salesVsExpectation: string;

  visitorQuality: string;

  organizationManagement: string;

  costReasonable: string;

  participateNextEdition: string;
  participateConditions?: string;

  suggestion: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-semibold" style={{ color: text }}>
      {children}
    </label>
  );
}

function OptionRow({
  name,
  value,
  checked,
  label,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (v: string) => void;
}) {
  return (
    <label
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:bg-gray-50"
      style={{ color: text }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default function AsrarSurveyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    mobileNumber: "",
    businessActivity: "",
    businessActivityOther: "",
    mainObjective: "",
    overallOutcome: "",
    achievedSales: "",
    salesVsExpectation: "",
    visitorQuality: "",
    organizationManagement: "",
    costReasonable: "",
    participateNextEdition: "",
    participateConditions: "",
    suggestion: "",
  });

  const commonRatingOptions = useMemo(
    () => [
      { label: "ممتازة ", value: "Excellent" },
      { label: "جيدة جدًا ", value: "Very good" },
      { label: "جيدة ", value: "Good" },
      { label: "مقبولة ", value: "Acceptable" },
      { label: "غير راضي ", value: "Not satisfied" },
    ],
    []
  );

  const commonRatingOptionsF = useMemo(
    () => [
      { label: "ممتاز", value: "Excellent" },
      { label: "جيد جدًا", value: "Very good" },
      { label: "جيد", value: "Good" },
      { label: "مقبول", value: "Acceptable" },
      { label: "غير راضي ", value: "Not satisfied" },
    ],
    []
  );

  // ✅ Clean "Other" handling with separate field
  const isBusinessOther = form.businessActivity === "Other";

  // ✅ Clean "Yes, under certain conditions" handling with separate field
  const isParticipateConditions =
    form.participateNextEdition === "Yes, under certain conditions";

  const requiredFilled =
    form.fullName.trim().length > 0 &&
    form.mobileNumber.trim().length > 0 &&
    form.businessActivity.trim().length > 0 &&
    (!isBusinessOther || (form.businessActivityOther?.trim().length ?? 0) > 0) &&
    form.mainObjective.trim().length > 0 &&
    form.overallOutcome.trim().length > 0 &&
    form.achievedSales.trim().length > 0 &&
    form.salesVsExpectation.trim().length > 0 &&
    form.visitorQuality.trim().length > 0 &&
    form.organizationManagement.trim().length > 0 &&
    form.costReasonable.trim().length > 0 &&
    form.participateNextEdition.trim().length > 0 &&
    (!isParticipateConditions || (form.participateConditions?.trim().length ?? 0) > 0) &&
    form.suggestion.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!requiredFilled) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        "https://payment.aimcongress.com/api/asrar/ExhibitorSurveyForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error:", result);
        alert("Submission failed. Please try again.");
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10" dir="rtl">
      <Head>
        <title>استبيان العارضين – معرض أسرار</title>
      </Head>
      <div className="mx-auto w-full max-w-3xl">
        {isSubmitted && (
          <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            {/* <h2 className="text-lg font-semibold text-green-700">
              Thank You for Your Response! 🎉
            </h2> */}
            <p className="mt-2 text-lg" style={{ color: "#4B4B4B" }}>
              شكرًا لمشاركتك. تم تسجيل ردك بنجاح. 🎉
            </p>
          </div>
        )}

        {!isSubmitted && (
          <>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h1 className="text-xl font-bold" style={{ color: text }}>
                استبيان العارضين – معرض أسرار
              </h1>
              <p className="mt-3 text-sm leading-6" style={{ color: text }}>
                نشكر لكم مشاركتكم في معرض أسرار. نقدر وقتكم في تعبئة هذا
                الاستبيان لمساعدتنا في تحسين تجربة العارضين في النسخ القادمة.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>الاسم الكامل</FieldLabel>
                  <input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="أدخل اسمك الكامل"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                    style={{ color: text }}
                  />
                </div>

                <div>
                  <FieldLabel>رقم الجوال</FieldLabel>
                  <input
                    value={form.mobileNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mobileNumber: e.target.value }))
                    }
                    placeholder="أدخل رقم الجوال"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                    style={{ color: text }}
                  />
                </div>
              </div>
              {/* Type of business activity */}
              <div className="space-y-3">
                <FieldLabel>نوع نشاطك التجاري </FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  <OptionRow
                    name="businessActivity"
                    value="Brand"
                    label="علامة تجارية "
                    checked={form.businessActivity === "Brand"}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, businessActivity: v }))
                    }
                  />
                  <OptionRow
                    name="businessActivity"
                    value="Boutique"
                    label="بوتيك "
                    checked={form.businessActivity === "Boutique"}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, businessActivity: v }))
                    }
                  />
                  <OptionRow
                    name="businessActivity"
                    value="Individual business / Instagram store"
                    label="مشروع فردي/ متجر إنستقرام "
                    checked={
                      form.businessActivity ===
                      "Individual business / Instagram store"
                    }
                    onChange={(v) =>
                      setForm((p) => ({ ...p, businessActivity: v }))
                    }
                  />
                  <OptionRow
                    name="businessActivity"
                    value="Other"
                    label="أخرى"
                    checked={isBusinessOther}
                    onChange={() =>
                      setForm((p) => ({ ...p, businessActivity: "Other" }))
                    }
                  />
                </div>

                {isBusinessOther && (
                  <div className="mt-2">
                    <label
                      className="mb-2 block text-xs font-semibold"
                      style={{ color: text }}
                    >
                      أخرى: (يرجى التحديد)
                    </label>

                    <input
                      value={form.businessActivityOther ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          businessActivityOther: e.target.value,
                        }))
                      }
                      placeholder="اكتب هنا…"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                      style={{ color: text }}
                    />
                  </div>
                )}
              </div>

              {/* Main objective */}
              <div className="space-y-3">
                <FieldLabel>ما هدفك الرئيسي من المشاركة في المعرض؟</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "البيع المباشر ", value: "Direct sales" },
                    { label: "التعريف بالعلامة ", value: "Brand awareness" },
                    {
                      label: "اكتساب عملاء جدد ",
                      value: "Acquiring new customers",
                    },
                    { label: "اختبار السوق ", value: "Market testing" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="mainObjective"
                      value={item.value}
                      label={item.label}
                      checked={form.mainObjective === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, mainObjective: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Overall outcome */}
              <div className="space-y-3">
                <FieldLabel>
                  كيف تقيّم نتائج مشاركتك في المعرض بشكل عام؟
                </FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {commonRatingOptions.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="overallOutcome"
                      value={item.value}
                      label={item.label}
                      checked={form.overallOutcome === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, overallOutcome: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Achieved sales */}
              <div className="space-y-3">
                <FieldLabel>هل حققت مبيعات خلال المعرض؟</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "نعم – عالية", value: "Yes – High" },
                    { label: "نعم – متوسطة", value: "Yes – Medium" },
                    { label: "نعم – ضعيفة", value: "Yes – Low" },
                    { label: "لا", value: "No" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="achievedSales"
                      value={item.value}
                      label={item.label}
                      checked={form.achievedSales === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, achievedSales: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Sales vs expectations */}
              <div className="space-y-3">
                <FieldLabel>
                  كيف تقيّم مستوى المبيعات مقارنة بتوقعاتك؟
                </FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {commonRatingOptions.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="salesVsExpectation"
                      value={item.value}
                      label={item.label}
                      checked={form.salesVsExpectation === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, salesVsExpectation: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Visitor quality */}
              <div className="space-y-3">
                <FieldLabel>
                  كيف تقيّم جودة الزوار من حيث نية الشراء؟
                </FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {commonRatingOptions.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="visitorQuality"
                      value={item.value}
                      label={item.label}
                      checked={form.visitorQuality === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, visitorQuality: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-3">
                <FieldLabel>كيف تقيّم التنظيم العام وإدارة المعرض؟</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {commonRatingOptionsF.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="organizationManagement"
                      value={item.value}
                      label={item.label}
                      checked={form.organizationManagement === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, organizationManagement: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="space-y-3">
                <FieldLabel>هل تكلفة المشاركة مناسبة مقابل العائد؟</FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "نعم ", value: "Yes" },
                    { label: "إلى حد ما", value: "To some extent" },
                    { label: "لا", value: "No" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="costReasonable"
                      value={item.value}
                      label={item.label}
                      checked={form.costReasonable === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, costReasonable: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Participate next edition */}
              <div className="space-y-3">
                <FieldLabel>
                  بعد هذه التجربة، هل تود بالمشاركة في النسخة القادمة؟
                </FieldLabel>

                <div className="grid gap-3 sm:grid-cols-2">
                  <OptionRow
                    name="participateNextEdition"
                    value="Yes, definitely"
                    label="نعم بالتأكيد "
                    checked={form.participateNextEdition === "Yes, definitely"}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, participateNextEdition: v }))
                    }
                  />

                  <OptionRow
                    name="participateNextEdition"
                    value="Yes, under certain conditions"
                    label="نعم بشروط"
                    checked={isParticipateConditions}
                    onChange={() =>
                      setForm((p) => ({
                        ...p,
                        participateNextEdition:
                          "Yes, under certain conditions",
                      }))
                    }
                  />

                  <OptionRow
                    name="participateNextEdition"
                    value="Not sure"
                    label="غير متأكد "
                    checked={form.participateNextEdition === "Not sure"}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, participateNextEdition: v }))
                    }
                  />

                  <OptionRow
                    name="participateNextEdition"
                    value="No"
                    label="لا "
                    checked={form.participateNextEdition === "No"}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, participateNextEdition: v }))
                    }
                  />
                </div>

                {isParticipateConditions && (
                  <div className="mt-2">
                    <label
                      className="mb-2 block text-xs font-semibold"
                      style={{ color: text }}
                    >
                      نعم، في حال توفر شروط معينة (يرجى التحديد)
                    </label>

                    <input
                      value={form.participateConditions ?? ""}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          participateConditions: e.target.value,
                        }))
                      }
                      placeholder="اكتب الشروط هنا…"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                      style={{ color: text }}
                    />
                  </div>
                )}
              </div>

              {/* Suggestion */}
              <div className="space-y-3">
                <FieldLabel>
                  ما أهم اقتراح لديك لتحسين تجربتك ورفع المبيعات في النسخة
                  القادمة؟
                </FieldLabel>

                <textarea
                  value={form.suggestion}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, suggestion: e.target.value }))
                  }
                  placeholder="اكتب مقترحك"
                  rows={5}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>

              {/* Validation message */}
              {submitAttempted && !requiredFilled && (
                <p
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm"
                  style={{ color: text }}
                >
                 يرجى تعبئة جميع الحقول المطلوبة قبل الإرسال.
                </p>
              )}

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition",
                    submitting ? "bg-gray-400" : "bg-secondary hover:opacity-90"
                  )}
                >
                  {submitting ? "Submitting..." : "إرسال"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
