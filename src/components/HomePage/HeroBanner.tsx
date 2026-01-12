import CTAButton from "../UI/CTAButton";

export default function HeroBanner({
  heading,
  subheading,

  imageUrl,
  cta,
}: any) {
  return (
    <section className="relative w-full h-screen overflow-hidden rounded-xl">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Overlays */}
      {/* <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent" /> */}

      <div className="relative z-10 mx-auto container px-6 py-14 sm:py-20 flex items-center h-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal max-w-xl leading-tight text-primary">
            {heading}
          </h1>

          <p className="mt-2 text-xl font-medium text-white">{subheading}</p>

          {cta.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {cta.map((item: any) => {
                return (
                  <CTAButton
                    key={item.system.id}
                    variant={item.elements.variant.value[0]?.name}
                    buttonname={item.elements.name.value}
                    buttonlink={item.elements.link.value}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
    </section>
  );
}
