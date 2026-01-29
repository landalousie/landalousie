type Props = React.SVGProps<SVGSVGElement>;

export const SubtractIcon: React.FC<Props> = (props) => {
  return (
    <svg
      {...props}
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path>
    </svg>
  );
};
