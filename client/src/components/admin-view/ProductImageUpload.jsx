import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUpload, File, X } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);
  function handleImageFileChange(e) {
    console.log(e.target.files);
    const imageFile = e.target?.files[0];
    console.log(imageFile);
    setImageFile(imageFile);
  }

  function handleImageRemove(e) {
    // inputRef.current.value = "";
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    setImageFile(droppedFile);
  }
  return (
    <>
      <div className="grid grid-cols-4 mb-3">
        <Label className="flex items-center justify-centertext-lg font-semibold mb-2">
          Upload Image
        </Label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-dashed border-2 rounded-md  py-6 col-span-3"
        >
          <Input
            id="image-upload"
            type="file"
            // className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col justify-center items-center"
            >
              <div className="content-center font-semibold">
                <CloudUpload />
              </div>
              <span>Drag and drop or click to upload image file</span>
            </Label>
          ) : (
            <div className="flex justify-between items-center">
              {/* <div> */}
              <File />
              <span>{imageFile.name}</span>
              {/* </div> */}

              <Button variant="secondary" onClick={handleImageRemove}>
                <X />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductImageUpload;