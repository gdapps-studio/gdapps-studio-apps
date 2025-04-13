import clsx from 'clsx';

export const PageLayout = ({ children, className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...props} className={clsx('min-h-screen bg-black text-white', className)}>
      {children}
    </div>
  );
};
