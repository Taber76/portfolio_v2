import { useState, useRef, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

import { Folder, Chat } from '../../components/index';
import { data } from '../../data/data';

export const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      setShowFolders(true);
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Floating Chat Button */}
      {!isChatOpen &&
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-10"
        >
          <FaComments size={24} />
        </button>}

      {/* Floating Chat Window */}
      <Chat
        isOpen={isChatOpen}
        onClose={toggleChat}
      />

      {/* Video Section */}
      <div className="relative flex flex-col items-center m-10 min-h-[50vw]">
        <div
          className={`absolute border-4 border-black rounded w-auto h-auto object-cover transition-opacity duration-1000 ease-in-out 
            ${showFolders ? 'opacity-0' : 'xl:opacity-100'}`}
        >
          <video
            ref={videoRef}
            style={{ maxHeight: '75vh', width: 'auto', objectFit: 'cover' }}
            className="rounded"
            src="/portfolio.mp4"
            autoPlay
            muted
            controls={false}
          ></video>
        </div>

        {/* Content Sections */}
        {showFolders && (
          <div className="flex flex-col max-w-[120vh]">
            {/* Projects */}
            <div className="flex flex-col justify-center items-start mt-10 ml-10">
              <div className="text-xl font-bold text-yellow-500">
                <p>My projects</p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-10 justify-start items-start mt-5">
                {data.projects.map((project, index) => (
                  <Folder
                    key={index}
                    name={project.name}
                    description={project.description}
                    stack={project.stack}
                    url_folder={project.url_folder}
                    url_main={project.url_main}
                    links={project.links}
                  />
                ))}
              </div>
            </div>

            {/* About me */}
            <div className="flex flex-col justify-center items-start mt-10 ml-10">
              <div className="text-xl font-bold text-yellow-500">
                <p>About me_</p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-10 justify-start items-start mt-5">
                {data.about.map((about, index) => (
                  <Folder
                    key={index}
                    name={about.name}
                    description={about.description}
                    stack={about.stack}
                    url_folder={about.url_folder}
                    url_main={about.url_main}
                    links={about.links}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
