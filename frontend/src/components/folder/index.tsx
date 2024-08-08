import { useState } from "react";
import "./styles.css";


interface FolderProps {
  name: string;
  description: string;
  stack: string;
  url_folder: string;
  url_main: string;
  links: any;
}

export const Folder: React.FC<FolderProps> = ({ name, description, stack, url_folder, url_main, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const linksArray = Object.entries(links) as [string, string][];

  return (
    <div className={`folder-container ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <div className="folder">

        {/*Back folder*/}
        <div className="folder-back">
          {isOpen ? (
            <div className="folder-content flex-col justify-center items-center h-full">
              <div className="text-xl font-bold text-center mt-1">
                {name}
              </div>
              <div className="text-[clamp(0.75rem,1.5vw,1.5rem)] font-bold text-center mt-5 pb-2">
                {description}
              </div>
              <div className="text-[clamp(1.5vw,1.5rem)] font-bold text-center mt-3 pb-2 flex flex-wrap justify-center">
                {linksArray.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700 px-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/*Front folder*/}
        <div className={`folder-front ${isOpen ? "open" : ""}`}>
          {isOpen ? (
            <div className="folder-content flex justify-evenly items-center h-full">

              <div className="justify-center items-center mt-2 hidden xms:flex max-w-full">
                <img src={url_main} alt="Main picture" className="mt-2 rounded w-1/2 h-1/2 object-contain" />
              </div>

              <div className="flex-col font-bold text-center mt-1 ml-2">
                <p className="text-left text-xl mb-1">Stack</p>
                <p className="text-left text-md text-[clamp(0.75rem,1.5vw,1.5rem)]">{stack}</p>
              </div>

            </div>
          ) : (
            <div className="folder-content flex-col justify-center items-center">
              <div className="text-sm font-bold mt-1">
                <p className="text-left">{name}</p>
                <img src={url_folder} alt="" className="ml-12 object-cover w-1/2 h-1/2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

