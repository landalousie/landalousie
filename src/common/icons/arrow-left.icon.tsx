type Props = React.SVGProps<SVGSVGElement>;

export const ArrowLeftIcon: React.FC<Props> = (props) => {
  return (
    <svg
      {...props}
      className="mr-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      ></path>
    </svg>
  );
};
