import cx from 'clsx';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <label
      {...rest}
      className={cx(
        'block text-sm font-medium text-tbase-500/80 mb-1',
        props.className
      )}
    />
  );
};
