import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SidebarBottom({ teams }) {
  return (
    <li>
      <div className="text-xs font-semibold leading-6 text-gray-400">
        Your teams
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {teams.map((team) => (
          <li key={team.name}>
            <Link
              href={team.href}
              className={classNames(
                team.current
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              )}
            >
              <span
                className={classNames(
                  team.current
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                )}
              >
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default SidebarBottom;
