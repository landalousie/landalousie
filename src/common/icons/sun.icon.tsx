import cx from 'clsx';

type Props = React.SVGProps<SVGSVGElement>;

export const SunIcon: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  return (
    <svg
      {...rest}
      className={cx(
        'absolute h-full w-full scale-0 rotate-90 text-white opacity-0 transition-all duration-500 dark:scale-100 dark:rotate-0 dark:opacity-100',
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
