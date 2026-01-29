type Props = React.SVGProps<SVGSVGElement>;

export const MoonIcon: React.FC<Props> = (props) => {
  return (
    <svg
      {...props}
      className="absolute h-full w-full scale-100 rotate-0 opacity-100 transition-all duration-500 dark:scale-0 dark:-rotate-90 dark:opacity-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
