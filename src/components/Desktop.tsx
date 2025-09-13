'use client';

import { useState, useCallback } from 'react';
import styles from './Desktop.module.css';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import PolaroidCamera from './PolaroidCamera';
import LetterWindow from './windows/LetterWindow';
import PhotosWindow from './windows/PhotosWindow';
import CakeWindow from './windows/CakeWindow';
import SpotifyWindow from './windows/SpotifyWindow';
import GiftWindow from './windows/GiftWindow';
import ShoppingWindow from './windows/ShoppingWindow';
import FutureDatesWindow from './windows/FutureDatesWindow';

interface WindowState {
  id: string;
  isOpen: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

const Desktop = () => {
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    letter: { id: 'letter', isOpen: false, position: { x: 100, y: 100 }, zIndex: 100 },
    photos: { id: 'photos', isOpen: false, position: { x: 150, y: 150 }, zIndex: 100 },
    cake: { id: 'cake', isOpen: false, position: { x: 200, y: 120 }, zIndex: 100 },
    spotify: { id: 'spotify', isOpen: false, position: { x: 250, y: 100 }, zIndex: 100 },
    gift: { id: 'gift', isOpen: false, position: { x: 350, y: 200 }, zIndex: 100 },
    shopping: { id: 'shopping', isOpen: false, position: { x: 400, y: 150 }, zIndex: 100 },
    futureDates: { id: 'futureDates', isOpen: false, position: { x: 450, y: 180 }, zIndex: 100 },
  });
  
  const [highestZIndex, setHighestZIndex] = useState(100);

  const openWindow = useCallback((windowId: string) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: true,
        zIndex: highestZIndex + 1
      }
    }));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false
      }
    }));
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        zIndex: highestZIndex + 1
      }
    }));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const updatePosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        position
      }
    }));
  }, []);

  return (
    <div className={styles.desktop}>

      {/* Desktop Icons */}
      <DesktopIcon
        iconImage="/assets/icons/september-14.png"
        label="september 14.txt"
        position={{ x: 50, y: 120 }}
        onDoubleClick={() => openWindow('letter')}
      />
      <DesktopIcon
        icon="📁"
        label="photos"
        position={{ x: 180, y: 120 }}
        onDoubleClick={() => openWindow('photos')}
      />
      <DesktopIcon
        iconImage="/assets/icons/make-a-wish.png"
        label="makeawish.txt"
        position={{ x: 310, y: 120 }}
        onDoubleClick={() => openWindow('cake')}
      />
      <DesktopIcon
        iconImage="/assets/icons/music.png"
        label="music"
        position={{ x: 50, y: 340 }}
        onDoubleClick={() => openWindow('spotify')}
        hasWhiteBackground={true}
      />
      <DesktopIcon
        iconImage="/assets/icons/shopping.png"
        label="shopping.txt"
        position={{ x: 180, y: 360 }}
        onDoubleClick={() => openWindow('shopping')}
      />
      <DesktopIcon
        iconImage="/assets/icons/dates.png"
        label="future dates.txt"
        position={{ x: 310, y: 360 }}
        onDoubleClick={() => openWindow('futureDates')}
      />


      {/* Polaroid Camera */}
      <PolaroidCamera />

      {/* Windows */}
      {windows.letter.isOpen && (
        <Window
          title="september 14.txt - Notepad"
          position={windows.letter.position}
          zIndex={windows.letter.zIndex}
          onClose={() => closeWindow('letter')}
          onFocus={() => bringToFront('letter')}
          onPositionChange={(pos) => updatePosition('letter', pos)}
          width={800}
          height={700}
        >
          <LetterWindow />
        </Window>
      )}

      {windows.photos.isOpen && (
        <Window
          title="untitled - Photos"
          position={windows.photos.position}
          zIndex={windows.photos.zIndex}
          onClose={() => closeWindow('photos')}
          onFocus={() => bringToFront('photos')}
          onPositionChange={(pos) => updatePosition('photos', pos)}
          width={700}
          height={500}
        >
          <PhotosWindow />
        </Window>
      )}

      {windows.cake.isOpen && (
        <Window
          title="makeawish.txt - Notepad"
          position={windows.cake.position}
          zIndex={windows.cake.zIndex}
          onClose={() => closeWindow('cake')}
          onFocus={() => bringToFront('cake')}
          onPositionChange={(pos) => updatePosition('cake', pos)}
          width={650}
          height={550}
        >
          <CakeWindow />
        </Window>
      )}

      {windows.spotify.isOpen && (
        <Window
          title="Spotify - Music Player"
          position={windows.spotify.position}
          zIndex={windows.spotify.zIndex}
          onClose={() => closeWindow('spotify')}
          onFocus={() => bringToFront('spotify')}
          onPositionChange={(pos) => updatePosition('spotify', pos)}
          width={500}
          height={600}
        >
          <SpotifyWindow />
        </Window>
      )}


      {windows.shopping.isOpen && (
        <Window
          title="shopping.txt - Gift Ideas"
          position={windows.shopping.position}
          zIndex={windows.shopping.zIndex}
          onClose={() => closeWindow('shopping')}
          onFocus={() => bringToFront('shopping')}
          onPositionChange={(pos) => updatePosition('shopping', pos)}
          width={600}
          height={500}
        >
          <ShoppingWindow />
        </Window>
      )}

      {windows.futureDates.isOpen && (
        <Window
          title="future dates.txt - Date Planner"
          position={windows.futureDates.position}
          zIndex={windows.futureDates.zIndex}
          onClose={() => closeWindow('futureDates')}
          onFocus={() => bringToFront('futureDates')}
          onPositionChange={(pos) => updatePosition('futureDates', pos)}
          width={500}
          height={450}
        >
          <FutureDatesWindow />
        </Window>
      )}
    </div>
  );
};

export default Desktop;
