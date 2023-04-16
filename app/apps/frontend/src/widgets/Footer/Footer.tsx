import { FC } from "react";

interface FooterProps {
  className?: string
}


export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={className}>footer</footer>
  );
};
