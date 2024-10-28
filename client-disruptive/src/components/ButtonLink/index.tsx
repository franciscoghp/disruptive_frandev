import { Link } from 'react-router-dom';
import { ButtonLinkProps } from './interface';

const ButtonLink = ({
  to,
  children,
  bgColor = 'bg-indigo-500',
}: ButtonLinkProps) => (
  <Link
    to={to}
    className={`w-full ${bgColor} px-4 py-2 rounded-md text-center text-white`}
  >
    {children}
  </Link>
);

export default ButtonLink;

