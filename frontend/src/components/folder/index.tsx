import { useState } from "react";
import "./styles.css";

export const Folder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`folder-container ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <div className="folder">

        <div className="folder-back">
          {isOpen ?
            <div className="folder-content flex-col justify-center items-center">
              <div className="text-3xl font-bold text-center mt-1">
                Nombre del proyecto
              </div>
              <div className="text-2xl font-bold text-center mt-1">
                Descripción
              </div>
            </div>
            : ""}
        </div>

        <div className={`folder-front ${isOpen ? "open" : ""}`}>
          {isOpen ?
            <div className="folder-content flex-col justify-center items-center">
              <div className="text-xl font-bold text-center mt-1">
                Agradecimientos
              </div>
              <div className="text-xl font-bold text-center mt-1">
                A fulanito
              </div>
            </div>
            :
            <div className="folder-content flex-col justify-center items-center">
              <div className="text-sm font-bold mt-1">
                <p className="text-left">WhatsApp</p>
                <img src="/whatsapp.png" alt="" className="ml-12 object-cover w-1/2 h-1/2" />
              </div>
            </div>

          }
        </div>
      </div>
    </div>
  );
};


