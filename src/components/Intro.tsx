import config from "@config";
import { GridLines } from "./GridLines";
import { Reveal } from "./Reveal";

/** The white intro that slides up over the end of the hero. */
export function Intro() {
  return (
    <section className="relative z-10 -mt-[10vh] bg-white pb-[18vh] text-ink md:pb-[26vh]">
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <div className="col-span-4 md:col-span-6 md:col-start-3">
          <Reveal>
            <p className="t-eyebrow mb-4 text-[15px]">{config.destination.eyebrow}</p>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-h3 [text-indent:33%]">{config.destination.intro}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
