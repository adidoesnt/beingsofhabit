export type LinkType = {
  label: string;
  href: string;
  active?: boolean;
  subpaths?: LinkType[] | null;
};

export const Link = ({ href, label, active, subpaths }: LinkType) => {
  const underline = active ? "underline" : "";

  return (
    <li className="relative group">
      <a href={href} className={underline}>
        {label}
      </a>
      {subpaths && subpaths.length > 0 && (
        <ul className="hidden group group-hover:flex flex-col gap-2 absolute top-0 z-10 bg-beige p-2 translate-y-6 translate-x-[-6px] min-w-[200px]">
          {subpaths.map((subpath, index) => (
            <Link key={index} {...subpath} />
          ))}
        </ul>
      )}
    </li>
  );
};
