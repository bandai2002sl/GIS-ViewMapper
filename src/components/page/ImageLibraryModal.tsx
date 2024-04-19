import React from 'react';

interface ImageLibraryModalProps {
  isOpen: boolean;
  onSelect: (image: string) => void;
  toggle: () => void;
}

const ImageLibraryModal: React.FC<ImageLibraryModalProps> = ({ isOpen, onSelect, toggle }) => {
  const imageLibrary: string[] = ["~/public/images/pin.png",];

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {imageLibrary.map((image, index) => (
            <img
              key={index}
              src={image}
              onClick={() => onSelect(image)}
              style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
              alt={`image-${index}`}
            />
          ))}
        </div>
        <button onClick={toggle}>Đóng</button>
      </div>
    </div>
  );
};

export default ImageLibraryModal;
