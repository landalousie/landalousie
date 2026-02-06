import cx from 'clsx';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      type="checkbox"
      className={cx('w-5 h-5 accent-secondary-900 cursor-pointer', className)}
    />
  );
};
