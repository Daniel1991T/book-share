import { useState } from "react";

const ImageUploader = () => {
  const [imageURLs, setImageURLs] = useState(Array(3).fill("")); // Initialize with three empty strings

  const handleImageChange = (index: number) => (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURLs = [...imageURLs];
      newImageURLs[index] = URL.createObjectURL(file);
      setImageURLs(newImageURLs);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {imageURLs.map((url, index) => (
        <div className="w-44 h-52 " key={index}>
          <label
            className="w-40 absolute h-52 rounded-lg border border-gray-300 flex justify-center items-center cursor-pointer"
            style={{
              background: url
                ? `url("${url}") no-repeat center center`
                : "white",
              backgroundSize: "cover",
            }}
          >
            <input
              type="file"
              onChange={handleImageChange(index)}
              accept="image/*"
              style={{ opacity: 0, width: "100%", height: "100%" }}
              className="absolute top-0 left-0"
            />
            {!url && (
              <span className="bg-gray-300 rounded-full py-2 px-3 relative z-0 text-sm">
                +
              </span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
