import React, { useState } from "react";
import BabylonScene from "./BabylonScene";
import { colorOptions } from "./colors";
import SLeft from "./Cupboard/SLeft"; // Sliding door components
import SMiddle from "./Cupboard/SMiddle";
import SRight from "./Cupboard/SRight"; // Ensure this import exists for the right section
import Left from "./Cupboard/Left"; // Openable door components
import Middle from "./Cupboard/Middle";
import Right from "./Cupboard/Right"; // Openable right component

const Layout: React.FC = () => {
  const INITIAL_ROOM_WIDTH = 2400;
  const INITIAL_LAYOUT = "11650";
  const INITIAL_COLOR = "";

  const [roomWidth, setRoomWidth] = useState<number>(INITIAL_ROOM_WIDTH);
  const [roomheight, setRoomHeight] = useState<number>(3000);
  const [layout, setLayout] = useState<string>(INITIAL_LAYOUT);
  const [selectedColor, setSelectedColor] = useState<string>(INITIAL_COLOR);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentColorSet, setCurrentColorSet] = useState<"lam" | "pu">("lam");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [layoutPosition, setLayoutPosition] = useState<string | null>("left");
  const [doorType, setDoorType] = useState<string | null>(null);
  const [selectedDoorType, setSelectedDoorType] = useState<string | null>(null);
  const [selectedLayoutPosition, setSelectedLayoutPosition] = useState<
    string | null
  >(null);

  const handleRoomWidthChange = (width: number) => {
    setRoomWidth(width);
  };

  const handleRoomHeightChange = (height: number) => {
    setRoomHeight(height);
  };

  const handleLayoutImageClick = (modelNumber: number) => {
    setLayout(`${modelNumber}`);
  };

  const handleColorSetSelection = (colorSet: "lam" | "pu") => {
    setCurrentColorSet(colorSet);
    setShowModal(true);
  };

  const handleColorSelect = (colorSrc: string) => {
    setSelectedColor(colorSrc);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const colors = colorOptions[currentColorSet] || [];

  const Menu: React.FC = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Customize Room</h2>
      <div className="flex flex-col space-y-2">
        <h3
          className="text-xl font-semibold cursor-pointer bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setActiveSection("roomWidth")}
        >
          Room Width
        </h3>
        <h3
          className="text-xl font-semibold cursor-pointer bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setActiveSection("layout")}
        >
          Layout
        </h3>
        <h3
          className="text-xl font-semibold cursor-pointer bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setActiveSection("roomheight")}
        >
          Height
        </h3>
        <h3
          className="text-xl font-semibold cursor-pointer bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setActiveSection("color")}
        >
          Color
        </h3>
      </div>
    </div>
  );

  const RoomWidthMenu: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3">Select Room Width</h3>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 flex flex-wrap gap-4">
        {[2400, 3000, 3600].map((width) => (
          <button
            key={width}
            onClick={() => handleRoomWidthChange(width)}
            className={`p-3 rounded-lg border transition duration-300 ease-in-out ${
              roomWidth === width
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600`}
          >
            {width / 300} ft
          </button>
        ))}
      </div>
      <button
        onClick={() => setActiveSection(null)}
        className="mt-4 w-full bg-gray-300 p-3 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
  );

  const HeightMenu: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3">Select Room Height</h3>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 flex flex-wrap gap-4">
        {[2100, 2400].map((height) => (
          <button
            key={height}
            onClick={() => handleRoomHeightChange(height)}
            className={`p-3 rounded-lg border transition duration-300 ease-in-out ${
              roomheight === height
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-600`}
          >
            {height} mm
          </button>
        ))}
      </div>
      <button
        onClick={() => setActiveSection(null)}
        className="mt-4 w-full bg-gray-300 p-3 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
  );

  const LayoutMenu: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3">Select Door Type</h3>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => {
            setDoorType("openable");
            setSelectedDoorType("openable");
            setLayoutPosition("left"); // Optionally reset to left section
          }}
          className={`w-full p-3 rounded hover:bg-gray-300 transition ${
            selectedDoorType === "openable"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Openable Door
        </button>
        <button
          onClick={() => {
            setDoorType("sliding");
            setSelectedDoorType("sliding");
            setLayoutPosition("left"); // Optionally reset to left section
          }}
          className={`w-full p-3 rounded hover:bg-gray-300 transition ${
            selectedDoorType === "sliding"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Sliding Door
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => {
            setLayoutPosition("left");
            setSelectedLayoutPosition("left");
          }}
          className={`w-full p-3 rounded hover:bg-gray-300 transition ${
            selectedLayoutPosition === "left"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Left
        </button>
        <button
          onClick={() => {
            setLayoutPosition("middle");
            setSelectedLayoutPosition("middle");
          }}
          className={`w-full p-3 rounded hover:bg-gray-300 transition ${
            selectedLayoutPosition === "middle"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Middle
        </button>
        <button
          onClick={() => {
            setLayoutPosition("right");
            setSelectedLayoutPosition("right");
          }}
          className={`w-full p-3 rounded hover:bg-gray-300 transition ${
            selectedLayoutPosition === "right"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Right
        </button>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
        {selectedDoorType === "sliding" && layoutPosition === "left" && (
          <SLeft onLayoutSelect={handleLayoutImageClick} />
        )}
        {selectedDoorType === "sliding" && layoutPosition === "middle" && (
          <SMiddle onLayoutSelect={handleLayoutImageClick} />
        )}
        {selectedDoorType === "sliding" && layoutPosition === "right" && (
          <SRight onLayoutSelect={handleLayoutImageClick} />
        )}
        {selectedDoorType === "openable" && layoutPosition === "left" && (
          <Left onLayoutSelect={handleLayoutImageClick} />
        )}
        {selectedDoorType === "openable" && layoutPosition === "middle" && (
          <Middle onLayoutSelect={handleLayoutImageClick} />
        )}
        {selectedDoorType === "openable" && layoutPosition === "right" && (
          <Right onLayoutSelect={handleLayoutImageClick} />
        )}
      </div>
      <button
        onClick={() => setActiveSection(null)}
        className="mt-4 w-full bg-gray-300 p-3 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
  );

  const ColorMenu: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3">Select Color</h3>
      <button
        onClick={() => handleColorSetSelection("lam")}
        className="w-full bg-blue-500 text-white py-3 rounded mb-2 hover:bg-blue-600 transition"
      >
        Select Laminate Exclusive Color
      </button>
      <button
        onClick={() => handleColorSetSelection("pu")}
        className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
      >
        Select PU Color
      </button>
      <button
        onClick={() => setActiveSection(null)}
        className="mt-4 w-full bg-gray-300 p-3 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-4 bg-gray-100 overflow-hidden">
        <BabylonScene
          roomWidth={roomWidth}
          layout={layout}
          height={roomheight}
          colorTexture={selectedColor}
        />
      </div>
      <div className="w-full md:w-1/3 p-6 bg-white shadow-md rounded-lg flex flex-col space-y-6">
        {activeSection === null && <Menu />}
        {activeSection === "roomWidth" && <RoomWidthMenu />}
        {activeSection === "layout" && <LayoutMenu />}
        {activeSection === "roomheight" && <HeightMenu />}
        {activeSection === "color" && <ColorMenu />}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-4/5 max-w-2xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Select a Color</h2>
            <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {colors.map((color) => (
                <div
                  key={color.src}
                  className="border p-2 rounded-lg cursor-pointer transition transform hover:scale-105"
                  onClick={() => handleColorSelect(color.src)}
                >
                  <img
                    src={color.src}
                    alt={color.name}
                    className="w-full h-24 object-cover mb-2 rounded"
                  />
                  <p className="text-center">{color.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;