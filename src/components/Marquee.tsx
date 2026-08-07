interface MarqueeProps {
  text: string;
}

export default function Marquee({ text }: MarqueeProps) {
  const group = Array(4).fill(text);

  return (
    <div aria-hidden="true" className="relative z-10 overflow-hidden border-y border-black/15 bg-[var(--lime)] py-3.5 text-[var(--ink)]">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {group.map((item, index) => (
              <div key={`${copy}-${index}`} className="flex items-center">
                <span className="display-title mx-5 text-[clamp(1.4rem,2.2vw,2rem)] uppercase tracking-[0.035em]">{item}</span>
                <span className="mx-3 font-serif text-2xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
