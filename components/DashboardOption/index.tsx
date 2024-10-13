import { Linkn } from '../Linkn';

export default function DashboardOption({
  optionName,
  optionIcon,
  optionDescription,
  optionLink,
  textColor,
  textHoverColor,
}: {
  optionName: string;
  optionIcon: string;
  optionDescription: string;
  optionLink: string;
  textColor: string;
  textHoverColor: string;
}) {
  return (
    <Linkn href={optionLink}>
      <div
        className={`border flex rounded-md w-64 p-2 m-4 cursor-pointer shadow-md items-center bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out justify-between ${textHoverColor} ${textColor}`}
      >
        <div className="mr-5">
          <span className="material-symbols-outlined text-5xl ">
            {optionIcon}
          </span>
        </div>
        <div>
          <h1>{optionName}</h1>
          <p className="mt-1 text-xs text-gray-500">{optionDescription}</p>
        </div>
      </div>
    </Linkn>
  );
}
