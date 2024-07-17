import React, { useState } from 'react';

interface ImageData {
    id: number;
    preview: string;
    file: File;
}

export const UploadImageAdmin: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages: ImageData[] = Array.from(e.target.files).map((file, index) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return {
                    id: Date.now() + index,
                    preview: URL.createObjectURL(file),
                    file
                };
            });

            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const handleDeleteImage = (imageId: number) => {
        setImages((prevImages) => prevImages.filter(image => image.id !== imageId));
    };

    const handleSubmit = () => {
        const webpFiles = images.map(image => image.file);
        // Process webpFiles array, e.g., send to server
        console.log(webpFiles);
    };

    return (
        <div className="relative border-2 w-full h-auto gap-5 rounded p-4">
            <label
                htmlFor="file-input"
                className="bg-blue-500 text-white py-2 px-4 w-full rounded cursor-pointer text-center"
            >
                Click Here
            </label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                id="file-input"
                className="hidden"
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="relative">
                        <img src={image.preview} alt="Preview" className="w-24 h-24 object-cover" />
                        <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white py-1 px-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
                Submit
            </button>
        </div>
    );
};

