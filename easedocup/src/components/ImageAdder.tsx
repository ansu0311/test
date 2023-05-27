import Link from "next/link";

const ImageAdder = () => {
  return (
    <div className='flex flex-col items-center'>
      <Link href='/addImage'>
        <h2 className='text-2xl font-semibold underline'>
          Add Images Instead?
        </h2>
      </Link>
    </div>
  );
};

export default ImageAdder;
