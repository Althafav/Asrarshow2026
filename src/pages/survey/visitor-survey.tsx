import Head from "next/head";
import React, { useMemo, useState } from "react";

const text = "#4B4B4B";

type FormState = {
  fullName: string;
  mobileNumber: string;

  heardAbout: string;
  firstTime: string;
  mainReason: string;

  overallExperience: string;
  entryExitEase: string;

  variety: string;
  purchase: string;

  likeMost: string;

  recommendScore: string;
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

function ScoreButton({
  value,
  selected,
  onClick,
}: {
  value: string; // keep string
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 w-10 rounded-xl border text-sm font-semibold transition",
        selected
          ? "border-gray-700 bg-gray-100"
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
      style={{ color: text }}
      aria-pressed={selected}
    >
      {value}
    </button>
  );
}

export default function AsrarVisitorSurveyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    mobileNumber: "",

    heardAbout: "",
    firstTime: "",
    mainReason: "",

    overallExperience: "",
    entryExitEase: "",

    variety: "",
    purchase: "",

    likeMost: "",

    recommendScore: "",
  });

  const ratingOptions = useMemo(
    () => [
      { label: "ممتازة ", value: "Excellent" },
      { label: "جيدة جدًا ", value: "Very good" },
      { label: "جيدة ", value: "Good" },
      { label: "مقبولة ", value: "Acceptable" },
      { label: "غير راضي ", value: "Not satisfied" },
    ],
    []
  );

  // Heard About: Other same-field approach
  const isHeardOther = form.heardAbout.startsWith("Other:");
  const heardOtherText = isHeardOther
    ? form.heardAbout.replace(/^Other:\s*/i, "")
    : "";

  const purchaseIsYes =
    form.purchase === "Yes" || form.purchase.startsWith("Yes:");
  const purchaseFactorText = form.purchase.startsWith("Yes:")
    ? form.purchase.replace(/^Yes:\s*/i, "")
    : "";

  const requiredFilled =
    form.fullName.trim().length > 0 &&
    form.mobileNumber.trim().length > 0 &&
    form.heardAbout.trim().length > 0 &&
    (!isHeardOther || heardOtherText.trim().length > 0) &&
    form.firstTime.trim().length > 0 &&
    form.mainReason.trim().length > 0 &&
    form.overallExperience.trim().length > 0 &&
    form.entryExitEase.trim().length > 0 &&
    form.variety.trim().length > 0 &&
    form.purchase.trim().length > 0 &&
    // if purchase is yes, require factor text
    (!purchaseIsYes || purchaseFactorText.trim().length > 0) &&
    form.likeMost.trim().length > 0 &&
    form.recommendScore.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!requiredFilled) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        "https://payment.aimcongress.com/api/asrar/VisitorSurveyForm",
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

        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10" dir="rtl">
      <Head>
        <title>استبيان الزوار – معرض أسرار</title>
      </Head>
      <div className="mx-auto w-full max-w-3xl">
        {isSubmitted && (
          <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            {/* <h2 className="text-lg font-semibold text-green-700">
              Thank You for Your Response! 🎉
            </h2> */}
            <p className="mt-2 text-sm" style={{ color: "#4B4B4B" }}>
              شكرًا لمشاركتك. تم تسجيل ردك بنجاح. 🎉
            </p>
          </div>
        )}

        {/* Form */}
        {!isSubmitted && (
          <>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h1 className="text-xl font-bold" style={{ color: text }}>
                استبيان الزوار – معرض أسرار
              </h1>
              <p className="mt-3 text-sm leading-6" style={{ color: text }}>
                نشكر لكم زيارة معرض أسرار. يهمنا رأيكم لمساعدتنا في تطوير تجربة
                الزوار في النسخ القادمة.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              {/* Name & Mobile */}
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

              {/* Heard about */}
              <div className="space-y-3">
                <FieldLabel>كيف عرفت عن معرض أسرار؟ </FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: "وسائل التواصل الاجتماعي",
                      value: "Social media platforms",
                    },
                    {
                      label: "مؤثر / صانع محتوى ",
                      value: "Influencer / content creator",
                    },
                    {
                      label: "صديق / توصية ",
                      value: "Friend / recommendation",
                    },
                    {
                      label: "إعلان مدفوع ",
                      value: "Paid advertisement",
                    },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="heardAbout"
                      value={item.value}
                      label={item.label}
                      checked={form.heardAbout === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, heardAbout: v }))
                      }
                    />
                  ))}

                  <OptionRow
                    name="heardAbout"
                    value="Other"
                    label="أخرى"
                    checked={form.heardAbout.startsWith("Other")}
                    onChange={() =>
                      setForm((p) => ({ ...p, heardAbout: "Other: " }))
                    }
                  />
                </div>

                {form.heardAbout.startsWith("Other") && (
                  <div className="mt-2">
                    <label
                      className="mb-2 block text-xs font-semibold"
                      style={{ color: text }}
                    >
                      أخرى: (يرجى التحديد)
                    </label>
                    <input
                      value={heardOtherText}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          heardAbout: `Other: ${e.target.value}`,
                        }))
                      }
                      placeholder="اكتب هنا…"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                      style={{ color: text }}
                    />
                  </div>
                )}
              </div>

              {/* First time */}
              <div className="space-y-3">
                <FieldLabel>هل هذه أول مرة تزور معرض أسرار؟</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "نعم ", value: "Yes" },
                    { label: "لا ", value: "No" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="firstTime"
                      value={item.value}
                      label={item.label}
                      checked={form.firstTime === item.value}
                      onChange={(v) => setForm((p) => ({ ...p, firstTime: v }))}
                    />
                  ))}
                </div>
              </div>

              {/* Main reason */}
              <div className="space-y-3">
                <FieldLabel>ما سبب زيارتك الأساسي للمعرض؟</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "التسوق ", value: "Shopping" },
                    {
                      label: "اكتشاف علامات جديدة ",
                      value: "Discovering new brands",
                    },
                    {
                      label: "فعالية نسائية / عائلية ",
                      value: "Women’s / family event",
                    },
                    { label: "مرافقة ", value: "Accompanying someone" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="mainReason"
                      value={item.value}
                      label={item.label}
                      checked={form.mainReason === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, mainReason: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Overall experience */}
              <div className="space-y-3">
                <FieldLabel>
                  كيف تقيّم تجربتك العامة بعد زيارة المعرض؟
                </FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ratingOptions.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="overallExperience"
                      value={item.value}
                      label={item.label}
                      checked={form.overallExperience === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, overallExperience: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Entry / exit */}
              <div className="space-y-3">
                <FieldLabel>
                  كيف تقيّم التنظيم وسهولة الدخول والخروج؟
                </FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ratingOptions.map((item) => (
                    <OptionRow
                      key={item.value}
                      name="entryExitEase"
                      value={item.value}
                      label={item.label}
                      checked={form.entryExitEase === item.value}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, entryExitEase: v }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Variety */}
              <div className="space-y-3">
                <FieldLabel>
                  هل وجدت تنوعًا مناسبًا في العارضين والمنتجات؟
                </FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "نعم ", value: "Yes" },
                    { label: "لا ", value: "No" },
                    { label: "إلى حد ما ", value: "To some extent" },
                  ].map((item) => (
                    <OptionRow
                      key={item.value}
                      name="variety"
                      value={item.value}
                      label={item.label}
                      checked={form.variety === item.value}
                      onChange={(v) => setForm((p) => ({ ...p, variety: v }))}
                    />
                  ))}
                </div>
              </div>

              {/* Purchase */}
              <div className="space-y-3">
                <FieldLabel>هل قمت بالشراء خلال زيارتك؟ </FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  <OptionRow
                    name="purchase"
                    value="Yes"
                    label="نعم "
                    checked={purchaseIsYes}
                    onChange={() =>
                      setForm((p) => ({ ...p, purchase: "Yes: " }))
                    }
                  />
                  <OptionRow
                    name="purchase"
                    value="No"
                    label="لا "
                    checked={form.purchase === "No"}
                    onChange={(v) => setForm((p) => ({ ...p, purchase: v }))}
                  />
                </div>
              </div>

              {/* Purchase factor (stored into purchase itself) */}
              {purchaseIsYes && (
                <div className="space-y-3">
                  <FieldLabel>
                    إذا قمت بالشراء، ما العامل الأهم الذي شجّعك؟
                  </FieldLabel>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "السعر ", value: "Price" },
                      { label: "جودة المنتج ", value: "Product quality" },
                      { label: "العرض أو الخصم ", value: "Offer or discount" },
                      { label: "تجربة المنتج ", value: "Product experience" },
                    ].map((item) => (
                      <OptionRow
                        key={item.value}
                        name="purchaseFactor"
                        value={item.value}
                        label={item.label}
                        checked={purchaseFactorText === item.value}
                        onChange={(v) =>
                          setForm((p) => ({ ...p, purchase: `Yes: ${v}` }))
                        }
                      />
                    ))}
                  </div>

                  {/* Optional: allow custom factor (same-field) */}
                  <div className="mt-2">
                    <label
                      className="mb-2 block text-xs font-semibold"
                      style={{ color: text }}
                    >
                      Or specify other factor (optional)
                    </label>
                    <input
                      value={purchaseFactorText}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          purchase: `Yes: ${e.target.value}`,
                        }))
                      }
                      placeholder="اكتب هنا…"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                      style={{ color: text }}
                    />
                  </div>
                </div>
              )}

              {/* Like most */}
              <div className="space-y-3">
                <FieldLabel>ما أكثر شيء أعجبك في المعرض؟</FieldLabel>
                <input
                  value={form.likeMost}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, likeMost: e.target.value }))
                  }
                  placeholder="اكتب هنا…"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>

              {/* Recommend score (string) */}
              <div className="space-y-3">
                <FieldLabel>
                  بعد هذه التجربة، هل تنصح بزيارة معرض أسرار؟
                  <span
                    className="mt-1 block text-xs font-normal"
                    style={{ color: text }}
                  >
                    علمًا بأن 1 تعني أنك لا تنصح أبدًا و10 تعني أنصح بشدة.
                  </span>
                </FieldLabel>

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(
                    (v) => (
                      <ScoreButton
                        key={v}
                        value={v}
                        selected={form.recommendScore === v}
                        onClick={() =>
                          setForm((p) => ({ ...p, recommendScore: v }))
                        }
                      />
                    )
                  )}
                </div>

                {form.recommendScore && (
                  <p className="text-xs" style={{ color: text }}>
                    Selected:{" "}
                    <span className="font-semibold">{form.recommendScore}</span>
                  </p>
                )}
              </div>

              {/* Validation */}
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
