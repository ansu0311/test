import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import BackButton from "~/components/BackButton";

const GetData = () => {
  return (
    <div className='flex flex-col items-center h-screen'>
      <Navbar />

      <div className='flex flex-col h-screen justify-center items-center gap-y-4'>
        <h2 className='text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500'>
          Results
        </h2>
        <div className='p-4 border-gray-900 dark:border-slate-200 border-2  rounded-lg flex flex-row justify-center'>
          <div className='p-4'>#</div>
          <input
            className='pr-12 text-center dark:bg-slate-950 bg-slate-100'
            type='number'
            defaultValue={12345}
          />
        </div>
        <div className='flex flex-row gap-x-4'>
          <BackButton />
          <button className='p-4 border-2 rounded-lg border-gray-900 dark:border-slate-200'>
            GetData
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default GetData;
