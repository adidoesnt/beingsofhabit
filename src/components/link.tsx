type Link = {
  label: string;
  href: string;
};

export const Link = ({ href, label }: Link) => {
  return (
    <li>
      <a href={href}>{label}</a>
    </li>
  );
};
