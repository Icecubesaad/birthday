'use client';

import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  icon?: string;
  iconImage?: string;
  label: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, iconImage, label, position, onDoubleClick }) => {
  return (
    <div
      className={styles.desktopIcon}
      style={{ left: position.x, top: position.y }}
      onDoubleClick={onDoubleClick}
    >
      <div className={styles.iconImage}>
        {iconImage ? (
          <img src={iconImage} alt={label} className={styles.iconImg} />
        ) : (
          icon
        )}
      </div>
      <span className={styles.iconLabel}>{label}</span>
    </div>
  );
};

export default DesktopIcon;
