import cx from 'clsx';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={cx(
        'bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all',
        className
      )}
    />
  );
};
