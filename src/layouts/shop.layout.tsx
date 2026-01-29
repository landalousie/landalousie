import { Contact } from '#pods/contact';
import { NextPickup } from '#pods/next-pickup';

interface Props {
  hero: React.ReactNode;
}

export const ShopLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, hero } = props;
  return (
    <>
      {hero}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
        <div className="min-w-0">{children}</div>
        <aside className="self-start sticky top-24 flex flex-col gap-6 md:flex-row lg:max-w-75 lg:flex-col">
          <Contact />
          <NextPickup />
        </aside>
      </div>
    </>
  );
};
