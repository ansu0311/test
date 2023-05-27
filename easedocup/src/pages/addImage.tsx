import React, { useEffect, useState } from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Link from "next/link";
import BackButton from "~/components/BackButton";
import { openDB } from "idb";
import Image from "next/image";

const PageNavigation = () => {
  return (
    <div className='fixed top-52 flex flex-row gap-x-4'>
      <BackButton />
      <div className='p-4 rounded-lg border-2 border-gray-900 dark:border-slate-200 font-semibold'>
        <Link href='/getData'>Next</Link>
      </div>
    </div>
  );
};

const ImageOperations = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  useEffect(() => {
    openDB("photo-store", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("photos")) {
          db.createObjectStore("photos", { autoIncrement: true });
        }
      },
    }).then((db) => {
      const transaction = db.transaction("photos", "readonly");
      const objectStore = transaction.objectStore("photos");
      const getAllPhotos = objectStore.getAll();
      getAllPhotos.onsuccess = () => {
        setPhotos(
          getAllPhotos.result.map((file: File) => URL.createObjectURL(file)),
        );
      };
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      const previewsArray: string[] = [];
      const readerPromises = filesArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then((previews) => {
          setPreviews(previews);
          setPhotoFiles(filesArray);
        })
        .catch((error) => {
          console.error("Error reading file:", error);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (photoFiles.length > 0) {
      openDB("photo-store", 1).then((db) => {
        const transaction = db.transaction("photos", "readwrite");
        const objectStore = transaction.objectStore("photos");
        photoFiles.forEach((photoFile) => {
          objectStore.add(photoFile);
        });
        transaction.oncomplete = () => {
          const newPhotoURLs = photoFiles.map((file) =>
            URL.createObjectURL(file),
          );
          setPhotos([...photos, ...newPhotoURLs]);
          setPreviews([]);
          setPhotoFiles([]);
        };
      });
    }
  };
  const handleRemove = (index: number) => {
    openDB("photo-store", 1).then((db) => {
      const transaction = db.transaction("photos", "readwrite");
      const objectStore = transaction.objectStore("photos");
      const deleteRequest = objectStore.delete(index + 1);
      deleteRequest.onsuccess = () => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
        const updatedPreviews = [...previews];
        updatedPreviews.splice(index, 1);
        setPreviews(updatedPreviews);
      };
    });
  };
  return (
    <div className='flex flex-col items-center h-screen '>
      <Navbar />
      <PageNavigation />
      <div className='flex flex-col h-screen justify-center items-center gap-y-4'>
        <h2 className='p-12 text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500'>
          Add Files
        </h2>
        <div className='flex flex-row gap-y-4'>
          <form onSubmit={handleSubmit} className='mb-4'>
            <input
              type='file'
              onChange={handleFileChange}
              className='mb-2'
              multiple
            />

            {previews.length > 0 && (
              <div className='flex flex-shrink'>
                {previews.map((preview, index) => (
                  <Image
                    key={index}
                    src={preview}
                    width={64}
                    height={64}
                    alt={`Preview ${index}`}
                    className='w-64 h-64 object-contain mb-2 mr-2'
                  />
                ))}
              </div>
            )}

            <button
              type='submit'
              disabled={photoFiles.length === 0}
              className='bg-green-500 text-white py-2 px-4  disabled:bg-gray-400 border-2 border-gray-900 rounded-lg'
            >
              Upload Photos
            </button>
          </form>
        </div>
        {photos.length > 0 ? (
          <ul className='grid grid-cols-3 gap-4'>
            {photos.map((photo, index) => (
              <li key={index} className='relative'>
                <Image
                  src={photo}
                  alt={`Photo ${index}`}
                  width={64}
                  height={64}
                  className='w-full h-64 object-contain'
                />
                <button
                  onClick={() => handleRemove(index)}
                  className='absolute top-2 right-2 bg-red-700 text-white py-1 px-2 rounded-lg border-2 border-gray-900'
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-2xl font-semibold'>Photos not submitted yet !</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ImageOperations;
