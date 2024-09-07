type Link = {
  label: string;
  href: string;
  active?: boolean;
};

export const Link = ({ href, label, active }: Link) => {
  const underline = active ? "underline" : "";
  return (
    <li>
      <a href={href} className={underline}>
        {label}
      </a>
    </li>
  );
};
