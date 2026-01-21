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
    () => ["Excellent", "Very good", "Good", "Acceptable", "Not satisfied"],
    []
  );

  // Heard About: Other same-field approach
  const isHeardOther = form.heardAbout.startsWith("Other:");
  const heardOtherText = isHeardOther
    ? form.heardAbout.replace(/^Other:\s*/i, "")
    : "";

  // Purchase same-field approach
  // - "No"
  // - "Yes"
  // - "Yes: Price"
  // - "Yes: Product quality"
  // etc.
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
        alert("Submission failed. Please try again.");
        return;
      }

      console.log("Visitor Survey payload:", form);
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
            Asrar Show – Visitor Feedback Survey
          </h1>
          <p className="mt-3 text-sm leading-6" style={{ color: text }}>
            Thank you for visiting Asrar Show. Your feedback is important to us
            and will help us enhance the visitor experience in future editions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          {/* Name & Mobile */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <input
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                style={{ color: text }}
              />
            </div>

            <div>
              <FieldLabel>Mobile Number</FieldLabel>
              <input
                value={form.mobileNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mobileNumber: e.target.value }))
                }
                placeholder="Enter your mobile number"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                style={{ color: text }}
              />
            </div>
          </div>

          {/* Heard about */}
          <div className="space-y-3">
            <FieldLabel>How did you hear about Asrar Show?</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Social media platforms",
                "Influencer / content creator",
                "Friend / recommendation",
                "Paid advertisement",
              ].map((label) => (
                <OptionRow
                  key={label}
                  name="heardAbout"
                  value={label}
                  label={label}
                  checked={form.heardAbout === label}
                  onChange={(v) => setForm((p) => ({ ...p, heardAbout: v }))}
                />
              ))}

              <OptionRow
                name="heardAbout"
                value="Other"
                label="Other"
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
                  Other: (please specify)
                </label>
                <input
                  value={heardOtherText}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      heardAbout: `Other: ${e.target.value}`,
                    }))
                  }
                  placeholder="Type here..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>
            )}
          </div>

          {/* First time */}
          <div className="space-y-3">
            <FieldLabel>
              Is this your first time visiting Asrar Show?
            </FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Yes", "No"].map((label) => (
                <OptionRow
                  key={label}
                  name="firstTime"
                  value={label}
                  label={label}
                  checked={form.firstTime === label}
                  onChange={(v) => setForm((p) => ({ ...p, firstTime: v }))}
                />
              ))}
            </div>
          </div>

          {/* Main reason */}
          <div className="space-y-3">
            <FieldLabel>
              What was your main reason for visiting the exhibition?
            </FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Shopping",
                "Discovering new brands",
                "Women’s / family event",
                "Accompanying someone",
              ].map((label) => (
                <OptionRow
                  key={label}
                  name="mainReason"
                  value={label}
                  label={label}
                  checked={form.mainReason === label}
                  onChange={(v) => setForm((p) => ({ ...p, mainReason: v }))}
                />
              ))}
            </div>
          </div>

          {/* Overall experience */}
          <div className="space-y-3">
            <FieldLabel>
              How would you rate your overall experience after visiting the
              exhibition?
            </FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {ratingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="overallExperience"
                  value={label}
                  label={label}
                  checked={form.overallExperience === label}
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
              How would you rate the organization and ease of entry and exit?
            </FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {ratingOptions.map((label) => (
                <OptionRow
                  key={label}
                  name="entryExitEase"
                  value={label}
                  label={label}
                  checked={form.entryExitEase === label}
                  onChange={(v) => setForm((p) => ({ ...p, entryExitEase: v }))}
                />
              ))}
            </div>
          </div>

          {/* Variety */}
          <div className="space-y-3">
            <FieldLabel>
              Did you find an appropriate variety of exhibitors and products?
            </FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Yes", "No", "To some extent"].map((label) => (
                <OptionRow
                  key={label}
                  name="variety"
                  value={label}
                  label={label}
                  checked={form.variety === label}
                  onChange={(v) => setForm((p) => ({ ...p, variety: v }))}
                />
              ))}
            </div>
          </div>

          {/* Purchase */}
          <div className="space-y-3">
            <FieldLabel>Did you make a purchase during your visit?</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionRow
                name="purchase"
                value="Yes"
                label="Yes"
                checked={purchaseIsYes}
                onChange={() => setForm((p) => ({ ...p, purchase: "Yes: " }))}
              />
              <OptionRow
                name="purchase"
                value="No"
                label="No"
                checked={form.purchase === "No"}
                onChange={(v) => setForm((p) => ({ ...p, purchase: v }))}
              />
            </div>
          </div>

          {/* Purchase factor (stored into purchase itself) */}
          {purchaseIsYes && (
            <div className="space-y-3">
              <FieldLabel>
                If you made a purchase, what was the most important factor that
                encouraged you?
              </FieldLabel>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Price",
                  "Product quality",
                  "Offer or discount",
                  "Product experience",
                ].map((label) => (
                  <OptionRow
                    key={label}
                    name="purchaseFactor"
                    value={label}
                    label={label}
                    checked={purchaseFactorText === label}
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
                  placeholder="Type here..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ color: text }}
                />
              </div>
            </div>
          )}

          {/* Like most */}
          <div className="space-y-3">
            <FieldLabel>
              What did you like most about the exhibition?
            </FieldLabel>
            <input
              value={form.likeMost}
              onChange={(e) =>
                setForm((p) => ({ ...p, likeMost: e.target.value }))
              }
              placeholder="Write here..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              style={{ color: text }}
            />
          </div>

          {/* Recommend score (string) */}
          <div className="space-y-3">
            <FieldLabel>
              Based on your experience, would you recommend visiting Asrar Show?
              <span
                className="mt-1 block text-xs font-normal"
                style={{ color: text }}
              >
                1 means “I would not recommend it at all” and 10 means “I would
                highly recommend it.”
              </span>
            </FieldLabel>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((v) => (
                <ScoreButton
                  key={v}
                  value={v}
                  selected={form.recommendScore === v}
                  onClick={() => setForm((p) => ({ ...p, recommendScore: v }))}
                />
              ))}
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
              Please fill all required fields before submitting.
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
              {submitting ? "Submitting..." : "Submit survey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
