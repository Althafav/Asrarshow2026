import React, { useMemo, useState } from "react";

const text = "#4B4B4B";

type FormState = {
  businessActivity: string;
  mainObjective: string;

  overallOutcome: string;

  achievedSales: string;

  salesVsExpectation: string;

  visitorQuality: string;

  organizationManagement: string;

  costReasonable: string;

  participateNextEdition: string;

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

  const [form, setForm] = useState<FormState>({
    businessActivity: "",
    mainObjective: "",
    overallOutcome: "",
    achievedSales: "",
    salesVsExpectation: "",
    visitorQuality: "",
    organizationManagement: "",
    costReasonable: "",
    participateNextEdition: "",
    suggestion: "",
  });

  const commonRatingOptions = useMemo(
    () => ["Excellent", "Very good", "Good", "Acceptable", "Not satisfied"],
    []
  );

  const isBusinessOther = form.businessActivity.startsWith("Other:");
  const isParticipateConditions = form.participateNextEdition.startsWith(
    "Yes, under certain conditions:"
  );

  const businessOtherText = isBusinessOther
    ? form.businessActivity.replace(/^Other:\s*/i, "")
    : "";

  const participateConditionsText = isParticipateConditions
    ? form.participateNextEdition.replace(
        /^Yes, under certain conditions:\s*/i,
        ""
      )
    : "";

  const requiredFilled =
    form.businessActivity.trim().length > 0 &&
    (!isBusinessOther || businessOtherText.trim().length > 0) &&
    form.mainObjective.trim().length > 0 &&
    form.overallOutcome.trim().length > 0 &&
    form.achievedSales.trim().length > 0 &&
    form.salesVsExpectation.trim().length > 0 &&
    form.visitorQuality.trim().length > 0 &&
    form.organizationManagement.trim().length > 0 &&
    form.costReasonable.trim().length > 0 &&
    form.participateNextEdition.trim().length > 0 &&
    (!isParticipateConditions || participateConditionsText.trim().length > 0) &&
    form.suggestion.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!requiredFilled) return;

    try {
      setSubmitting(true);

      // TODO: send to your API route
      // await fetch("/api/asrar-survey", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      console.log("Survey payload:", form);
      alert("Thank you! Your response has been recorded.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h1 className="text-xl font-bold" style={{ color: text }}>
            Asrar Show – Exhibitor Feedback Survey
          </h1>
          <p className="mt-3 text-sm leading-6" style={{ color: text }}>
            Thank you for participating in Asrar Show. We appreciate you taking
            the time to complete this survey to help us enhance the exhibitor
            experience in future editions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          {/* Type of business activity */}
          <div className="space-y-3">
            <FieldLabel>Type of business activity</FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              <OptionRow
                name="businessActivity"
                value="Brand"
                label="Brand"
                checked={form.businessActivity === "Brand"}
                onChange={(v) =>
                  setForm((p) => ({ ...p, businessActivity: v }))
                }
              />
              <OptionRow
                name="businessActivity"
                value="Boutique"
                label="Boutique"
                checked={form.businessActivity === "Boutique"}
                onChange={(v) =>
                  setForm((p) => ({ ...p, businessActivity: v }))
                }
              />
              <OptionRow
                name="businessActivity"
                value="Individual business / Instagram store"
                label="Individual business / Instagram store"
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
                label="Other"
                checked={form.businessActivity.startsWith("Other")}
                onChange={() =>
                  setForm((p) => ({ ...p, businessActivity: "Other: " }))
                }
              />
            </div>

            {form.businessActivity.startsWith("Other") && (
              <div className="mt-2">
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{ color: text }}
                >
                  Other: (please specify)
                </label>

                <input
                  value={businessOtherText}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      businessActivity: `Other: ${e.target.value}`,
                    }))
                  }
                  placeholder="Type here..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>
            )}
          </div>

          {/* Main objective */}
          <div className="space-y-3">
            <FieldLabel>
              What was your main objective for participating in the exhibition?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Direct sales",
                "Brand awareness",
                "Acquiring new customers",
                "Market testing",
              ].map((label) => (
                <OptionRow
                  key={label}
                  name="mainObjective"
                  value={label}
                  label={label}
                  checked={form.mainObjective === label}
                  onChange={(v) => setForm((p) => ({ ...p, mainObjective: v }))}
                />
              ))}
            </div>
          </div>

          {/* Overall outcome */}
          <div className="space-y-3">
            <FieldLabel>
              How would you rate the overall outcome of your participation?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {commonRatingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="overallOutcome"
                  value={label}
                  label={label}
                  checked={form.overallOutcome === label}
                  onChange={(v) =>
                    setForm((p) => ({ ...p, overallOutcome: v }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Achieved sales */}
          <div className="space-y-3">
            <FieldLabel>
              Did you achieve sales during the exhibition?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {["Yes – High", "Yes – Medium", "Yes – Low", "No"].map(
                (label) => (
                  <OptionRow
                    key={label}
                    name="achievedSales"
                    value={label}
                    label={label}
                    checked={form.achievedSales === label}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, achievedSales: v }))
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Sales vs expectations */}
          <div className="space-y-3">
            <FieldLabel>
              How would you rate your sales performance compared to your
              expectations?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {commonRatingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="salesVsExpectation"
                  value={label}
                  label={label}
                  checked={form.salesVsExpectation === label}
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
              How would you rate the quality of visitors in terms of purchase
              intent?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {commonRatingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="visitorQuality"
                  value={label}
                  label={label}
                  checked={form.visitorQuality === label}
                  onChange={(v) =>
                    setForm((p) => ({ ...p, visitorQuality: v }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-3">
            <FieldLabel>
              How would you rate the overall organization and management of the
              exhibition?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {commonRatingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="organizationManagement"
                  value={label}
                  label={label}
                  checked={form.organizationManagement === label}
                  onChange={(v) =>
                    setForm((p) => ({ ...p, organizationManagement: v }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Cost */}
          <div className="space-y-3">
            <FieldLabel>
              Was the participation cost reasonable compared to the return?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              {["Yes", "To some extent", "No"].map((label) => (
                <OptionRow
                  key={label}
                  name="costReasonable"
                  value={label}
                  label={label}
                  checked={form.costReasonable === label}
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
              Based on this experience, would you like to participate in the
              next edition?
            </FieldLabel>

            <div className="grid gap-3 sm:grid-cols-2">
              <OptionRow
                name="participateNextEdition"
                value="Yes, definitely"
                label="Yes, definitely"
                checked={form.participateNextEdition === "Yes, definitely"}
                onChange={(v) =>
                  setForm((p) => ({ ...p, participateNextEdition: v }))
                }
              />

              <OptionRow
                name="participateNextEdition"
                value="Yes, under certain conditions"
                label="Yes, under certain conditions"
                checked={form.participateNextEdition.startsWith(
                  "Yes, under certain conditions"
                )}
                onChange={() =>
                  setForm((p) => ({
                    ...p,
                    participateNextEdition: "Yes, under certain conditions: ",
                  }))
                }
              />

              <OptionRow
                name="participateNextEdition"
                value="Not sure"
                label="Not sure"
                checked={form.participateNextEdition === "Not sure"}
                onChange={(v) =>
                  setForm((p) => ({ ...p, participateNextEdition: v }))
                }
              />

              <OptionRow
                name="participateNextEdition"
                value="No"
                label="No"
                checked={form.participateNextEdition === "No"}
                onChange={(v) =>
                  setForm((p) => ({ ...p, participateNextEdition: v }))
                }
              />
            </div>

            {form.participateNextEdition.startsWith(
              "Yes, under certain conditions"
            ) && (
              <div className="mt-2">
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{ color: text }}
                >
                  Yes, under certain conditions: (please specify)
                </label>

                <input
                  value={participateConditionsText}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      participateNextEdition: `Yes, under certain conditions: ${e.target.value}`,
                    }))
                  }
                  placeholder="Type conditions here..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>
            )}
          </div>

          {/* Suggestion */}
          <div className="space-y-3">
            <FieldLabel>
              What is your most important suggestion to improve your experience
              and increase sales in the next edition?
            </FieldLabel>

            <textarea
              value={form.suggestion}
              onChange={(e) =>
                setForm((p) => ({ ...p, suggestion: e.target.value }))
              }
              placeholder="Write your suggestion..."
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
              Please fill all required fields before submitting.
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs" style={{ color: text }}>
              By submitting, you confirm the information provided is accurate.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition",
                submitting ? "bg-gray-400" : "bg-[#4B4B4B] hover:opacity-90"
              )}
            >
              {submitting ? "Submitting..." : "Submit survey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
