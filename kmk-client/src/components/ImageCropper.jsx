import { useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import Button from "./Button";
import setCanvasPreview from "../util/setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const ImageCropper = ({imgSrc, error, onClickConfirm}) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState();

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    
        const crop = makeAspectCrop(
          {
            unit: "%",
            width: cropWidthInPercent,
          },
          ASPECT_RATIO,
          width,
          height
        );

        const centeredCrop = centerCrop(crop, width, height);

        setCrop(centeredCrop);
    };

    return (
        <>
            <ReactCrop 
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
            >
                <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: "70vh" }}
                    onLoad={onImageLoad}
                />
            </ReactCrop>
            <Button 
                shape={"rounded"}
                disabled={error}
                onClick={() => {
                    setCanvasPreview(
                        imgRef.current, // HTMLImageElement
                        previewCanvasRef.current, // HTMLCanvasElement
                        convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                        )
                    );
                    const dataUrl = previewCanvasRef.current.toDataURL();
                    onClickConfirm(dataUrl);
                    // closeModal();
                  }}
            >
                Bekräfta
            </Button>
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    );
}
