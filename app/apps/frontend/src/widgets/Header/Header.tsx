import { FC } from "react";

interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={className}>header</header>
  );
};
