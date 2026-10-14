const base =
  'condensed inline-flex min-h-12 items-center justify-center rounded-[2px] px-6 py-3 text-center text-base transition-colors';

const variants = {
  primary: 'bg-jaune text-noir hover:bg-[#ffd75e]',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-noir',
  dark: 'bg-noir text-white hover:bg-acier',
  outlineDark: 'border-2 border-noir text-noir hover:bg-noir hover:text-white',
};

export default function Button({ variant = 'primary', className = '', ...props }) {
  const Tag = props.href ? 'a' : 'button';
  return <Tag className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
