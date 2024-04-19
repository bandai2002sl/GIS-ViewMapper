import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  useMapEvents,
} from 'react-leaflet';

const MapClickHandler = ({ onMapClick, onMapClickCreatingPolygon }) => {
  useMapEvents({
    click(e) {
      onMapClickCreatingPolygon ? onMapClickCreatingPolygon(e.latlng) : onMapClick(e.latlng);
    },
  });
  return null;
};

const MyComponent = ({ data, selectedMarkerId }) => {
  const map = useMap();
  const [polygonPositions, setPolygonPositions] = useState([]);

  useEffect(() => {
    const selectedMarker = data.find((item) => item.id === selectedMarkerId);
    if (selectedMarker?.toaDo?.includes('MULTIPOLYGON')) {
      // Xử lý chuỗi MULTIPOLYGON
      const polyData = selectedMarker.toaDo
        .replace(/MULTIPOLYGON\(\(\((.*)\)\)\)/, '$1')
        .split(',')
        .map((coords) => {
          const [lat, lng] = coords.trim().split(' ').map(Number);
          return [lat, lng]; // Chú ý đảo lat và lng nếu cần
        });
        // Cập nhật trạng thái với các vị trí đa giác
      setPolygonPositions(polyData);

      // Bay đến tọa độ đầu tiên của đa giác
      if (polyData.length > 0) {
        map.flyTo(polyData[0], 12, { duration: 2 });
      }
    } else {
      // Xử lý tọa độ POINT 
      const toaDoArray = selectedMarker?.toaDo.match(/POINT\(([^)]+)\)/);
      if (toaDoArray && toaDoArray[1]) {
        const [longitude, latitude] = toaDoArray[1].split(" ");
        map.flyTo([parseFloat(latitude), parseFloat(longitude)], 14, {
          duration: 2,
        });
      }
    }
  }, [data, selectedMarkerId, map]);

  return (
    <>
      {polygonPositions.length > 0 && <Polygon positions={polygonPositions} color="blue" />}
    </>
  );
};


const Map = ({ data, selectedMarkerId, isPolygon = false }) => {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [creatingPolygon, setCreatingPolygon] = useState(false);
  const [completedPolygon, setCompletedPolygon] = useState(false);
  const [multiPolygonString, setMultiPolygonString] = useState('');
  

  const handleMapClick = (latlng) => {
    if (!creatingPolygon) {
      setClickedPosition(latlng);
    }
  };

  const handleMapClickCreatingPolygon = (latlng) => {
    setSelectedPoints([...selectedPoints, [latlng.lat, latlng.lng]]);
  };

  const startCreatingPolygon = () => {
    setCreatingPolygon(true);
    setCompletedPolygon(false);
    setSelectedPoints([]);
  };

  const completePolygonSelection = () => {
    setCreatingPolygon(false);
    setCompletedPolygon(true);
  
    // Đảm bảo rằng điểm cuối cùng trùng với điểm đầu tiên
    const closedPoints = [...selectedPoints, selectedPoints[0]];
  
    const formattedString = `MULTIPOLYGON(((${closedPoints.map(point => `${point[0]} ${point[1]}`).join(', ')})))`;
    setMultiPolygonString(formattedString);
  };

  const createCustomIcon = (iconName) => {
    return new L.Icon({
      iconUrl: `/images/icons/${iconName}.png`, // Thay thế đường dẫn thực tế"/images/cosokinhdoanh/" + imageName + ".png"
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <MapContainer center={[21.0285, 105.8542]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {data.map((item) => {
          const toaDoArray = item.toaDo.match(/POINT\(([^)]+)\)/);
          if (toaDoArray && toaDoArray[1]) {
            const [longitude, latitude] = toaDoArray[1].split(" ");
            return (
              <Marker
                key={item.id}
                position={[parseFloat(latitude), parseFloat(longitude)]}
                icon={createCustomIcon(item.icon)}
              >
                <Popup>Địa điểm: {item.ten}{item.diaDiem}{item.diaChi}</Popup>
              </Marker>
            );
          }
          return null;
        })}
        <MyComponent data={data} selectedMarkerId={selectedMarkerId} />
        <MapClickHandler 
          onMapClick={handleMapClick} 
          onMapClickCreatingPolygon={creatingPolygon ? handleMapClickCreatingPolygon : null}
        />
        {creatingPolygon && selectedPoints.length > 0 && (
          <Polygon positions={selectedPoints} color="red" />
        )}
        {completedPolygon && selectedPoints.length > 0 && (
          <Popup position={selectedPoints[0]}>
            Tọa độ đa giác: {multiPolygonString}
          </Popup>
        )}
        {clickedPosition && !creatingPolygon && (
          <Popup position={clickedPosition}>
            Tọa độ: Point({clickedPosition.lng.toFixed(4)} {clickedPosition.lat.toFixed(4)}) 
          </Popup>
        )}
      </MapContainer>
      {!completedPolygon && (
        <button onClick={startCreatingPolygon}>Bắt đầu tạo đa giác</button>
      )}
      {creatingPolygon && (
        <button onClick={completePolygonSelection}>Hoàn thành đa giác</button>
      )}
    </div>
  );
};

export default React.memo(Map, (prevProps, nextProps) => prevProps.selectedMarkerId === nextProps.selectedMarkerId);
