import Router from "next/router";

export default function BackButton() {
  return (
    <button
      className='border-2 p-4 border-gray-900 dark:border-slate-200 rounded-lg'
      onClick={() => Router.back()}
    >
      Back
    </button>
  );
}
