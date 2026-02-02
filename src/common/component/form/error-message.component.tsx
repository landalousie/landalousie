import cx from 'clsx';

export type ErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { className, ...rest } = props;
  return <p {...rest} className={cx('text-sm text-red-500 mt-1', className)} />;
};
