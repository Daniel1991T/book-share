import { convertBase64 } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type ImageUploaderFieldProps = {
  imageURLs: [string, string, string];
  setImageURLs: Dispatch<SetStateAction<[string, string, string]>>;
};

const ImageUploaderInputField = ({
  imageURLs,
  setImageURLs,
}: ImageUploaderFieldProps) => {
  // const [imageURLs, setImageURLs] = useState(["", "", ""]); // Initialize with three empty strings

  const handleImageChange =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const newImageURLs = [...Object.values(imageURLs)];
        const fileUrl = URL.createObjectURL(file);
        newImageURLs[index] = (await convertBase64(file)) as string;
        setImageURLs(newImageURLs as [string, string, string]);
      }
    };

  return (
    <div className="flex gap-2">
      {imageURLs.map((url, index) => (
        <label
          key={index}
          className="w-32 h-40 relative border cursor-pointer group border-gray-300 flex justify-center items-center rounded-md"
          style={{
            backgroundColor: url ? "transparent" : "white",
            backgroundImage: url ? `url("${url}")` : "none",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <input
            type="file"
            onChange={handleImageChange(index)}
            accept="image/*"
            style={{ opacity: 0, width: "100%", height: "100%" }}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />
          {!url && (
            <span className="rounded-full px-3 hover:bg-slate-400 text-white py-2 bg-slate-200 absolute z-10 text-sm">
              +
            </span>
          )}
        </label>
      ))}
    </div>
    // <div className="flex gap-2">
    //   {imageURLs.map((url, index) => (
    //     <label
    //       key={index}
    //       className="w-32 h-40 relative border cursor-pointer group border-gray-300 flex justify-center items-center"
    //       style={{
    //         background: url ? `url("${url}") no-repeat center` : "white",
    //         backgroundSize: "cover",
    //       }}
    //     >
    //       <input
    //         type="file"
    //         onChange={handleImageChange(index)}
    //         accept="image/*"
    //         style={{ opacity: 0, width: "100%", height: "100%" }}
    //         className="group-[]:hover:cursor-pointer"
    //       />
    //       {!url && (
    //         <span className=" rounded-full px-3 hover:bg-slate-400 text-white py-2 bg-slate-200 absolute z-10 text-sm">
    //           +
    //         </span>
    //       )}
    //     </label>
    //   ))}
    // </div>
  );
};

export default ImageUploaderInputField;
