export const SelectLangButton = ({ changeLanguage, lang }: any) => {
  const languages = [
    { value: "en", label: "English" },
    { value: "id", label: "Indonesia" },
    // Add other language options here
  ];

  // Sort languages based on default value
  const sortedLanguages = [...languages].sort((a, b) => {
    if (a.value === lang) return -1;
    if (b.value === lang) return 1;
    return 0;
  });
  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      defaultValue={lang}
      className="absolute top-10 right-0 lg:right-10 z-50 bg-blue-950 text-lpYellow rounded-sm text-xs sm:text-xs md:text-base w-24 sm:w-24 md:w-28 lg:w-28 p-2 mr-3 sm:mr-4 md:mr-6 lg:mr-8 "
    >
      {sortedLanguages.map((language) => (
        <option
          key={language.value}
          value={language.value}
          className={`text-lpYellow text-start `}
        >
          {language.label}
        </option>
      ))}
    </select>
  );
};
