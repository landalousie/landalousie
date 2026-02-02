import cx from 'clsx';

type Props = React.SVGProps<SVGSVGElement>;

export const CheckCircleIcon: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  return (
    <svg
      {...rest}
      className={cx('h-6 w-6', className)}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
