type Props = React.SVGProps<SVGSVGElement>;

export const CloseIcon: React.FC<Props> = (props) => {
  return (
    <svg
      {...props}
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
};
