import { LinkProps } from 'react-router-dom';

export interface ButtonLinkProps {
  to: LinkProps['to'];
  children: React.ReactNode;
  bgColor?: string;
}
