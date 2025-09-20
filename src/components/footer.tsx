export const CreativeCommons = {
  by: "cc-by",
  byNc: "cc-by-nc",
  byNcNd: "cc-by-nc-nd",
  byNcSa: "cc-by-nc-sa",
  byNd: "cc-by-nd",
  bySa: "cc-by-sa",
} as const;

export type CreativeCommonsType = keyof typeof CreativeCommons;

function CreativeCommonsView({ ccLink, ccImage }: { ccLink: string; ccImage: string }) {
  return (
    <div className="flex flex-col items-center mb-2.5">
      <div className="w-[51px] h-[18px] mb-1.5 overflow-hidden">
        <a href={ccLink} target="_blank" rel="noopener noreferrer">
          <img src={ccImage} alt="知识共享许可协议" className="w-full h-full" />
        </a>
      </div>
      <p className="text-center mb-0 text-xs text-gray-600 dark:text-gray-400">
        本作品采用
        <a
          href={ccLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 hover:underline mx-1"
        >
          知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
        </a>
        进行许可。
      </p>
    </div>
  );
}

function CopyrightView({ author }: { author: string }) {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2.5">
        Copyright © {currentYear} {author}. 保留所有权利。
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2.5">
        Powered by <span className="font-semibold">Stella</span>
      </p>
    </>
  );
}

export default function Footer({ author, creativeCommons }: { author: string; creativeCommons: CreativeCommonsType }) {
  // Get the Creative Commons license type
  const creativeCommonsKey = creativeCommons as CreativeCommonsType | undefined;
  const creativeCommonsValue = creativeCommonsKey ? CreativeCommons[creativeCommonsKey] : undefined;

  // Build CC link and image path
  const ccName = creativeCommonsValue?.slice(3); // Remove 'cc-' prefix
  const ccLink = ccName ? `http://creativecommons.org/licenses/${ccName}/4.0/` : "";
  const ccImage = creativeCommonsValue ? `/images/${creativeCommonsValue}.png` : "";

  return (
    <footer className="flex flex-col items-center py-12 mt-8 border-t border-gray-200 dark:border-gray-800">
      {creativeCommons && ccImage ? <CreativeCommonsView ccLink={ccLink} ccImage={ccImage} /> : null}
      {author ? <CopyrightView author={author} /> : null}
    </footer>
  );
}
