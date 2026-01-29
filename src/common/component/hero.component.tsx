import { OvalShape, RectangleShape } from '#common/shapes';

interface Props {
  ariaLabelledby?: string;
}

export const Hero: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { ariaLabelledby, children } = props;
  return (
    <section
      className="bg-primary-100 dark:bg-primary-950/40 relative isolate flex min-h-75 items-center justify-center overflow-clip rounded-4xl p-12"
      aria-labelledby={ariaLabelledby}
    >
      <div className="bg-primary-900/40 absolute inset-0 z-0 mix-blend-multiply transition-colors dark:bg-black/60"></div>
      <div className="relative z-10">{children}</div>
      <div
        className="text-primary-500/25 dark:text-primary-500/35 absolute top-[-48%] right-[-30%] h-60 w-105 md:top-[-45%] md:right-[-10%]"
        aria-hidden="true"
      >
        <OvalShape />
      </div>
      <div
        aria-hidden="true"
        className="text-primary-500/25 dark:text-primary-500/35 absolute top-[70%] left-[-40%] h-60 w-105 overflow-clip md:top-[55%] md:left-[-5%]"
      >
        <RectangleShape />
      </div>
    </section>
  );
};
