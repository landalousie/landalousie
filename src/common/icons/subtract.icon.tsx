import cx from 'clsx';

type Props = React.SVGProps<SVGSVGElement>;

export const SubtractIcon: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  return (
    <svg
      {...rest}
      className={cx('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path>
    </svg>
  );
};
