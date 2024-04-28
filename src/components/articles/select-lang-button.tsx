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
      className="absolute top-10 right-10 z-50 bg-blue-950 text-lpYellow rounded-sm w-28 p-2 mr-8 mt-12"
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
