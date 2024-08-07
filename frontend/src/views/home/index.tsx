import { useState, useRef, useEffect } from 'react';
import { Folder } from '../../components/folder';

export const Home = () => {
  const [showFolders, setShowFolders] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="">
      <div className="relative flex flex-col items-center m-10 min-h-[50vw]">

        <div className={`absolute border-4 border-black rounded w-full h-auto object-cover transition-opacity duration-1000 ease-in-out 
           ${showFolders ? 'opacity-0 md:opacity-50' : 'md:opacity-100'}`}>
          <video
            ref={videoRef}
            className="w-full h-auto object-cover rounded"
            src="/portfolio.mp4"
            autoPlay
            muted
            controls={false}
          ></video>
        </div>

        {showFolders && (
          <div className="flex-col w-full">
            <div className="flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 z-5">
              <div className="text-xl font-bold text-yellow-500">
                <p>About me_</p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 z-5">
                <Folder />
                <Folder />
                <Folder />
              </div>
            </div>
            <div className="flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 z-5">
              <div className="text-xl font-bold text-yellow-500">
                <p>My projects</p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 z-5">
                <Folder />
                <Folder />
                <Folder />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
