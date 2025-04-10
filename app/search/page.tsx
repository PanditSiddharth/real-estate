"use client";
import { CldImage } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  return ( <div>


    <CldUploadWidget uploadPreset="sidssite">
      {({ open }) => (
        <button onClick={() => open()}>
          Upload an Image
        </button>
      )}
    </CldUploadWidget>
  

    <CldImage
      alt='Sample image'
      src="" // Use this sample image or upload your own via the Media Explorer
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      crop={{
        type: 'auto',
        source: true
      }}
    />
  </div>
  );
}