import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import GetNumber from "~/components/GetNumber";
import ImageAdder from "~/components/ImageAdder";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className='flex flex-col items-center h-screen'>
      <div className='flex flex-row'>
        <h2 className='p-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500'>
          easedocUp
        </h2>
        <h2 className='p-1 text-4xl'>✨✨</h2>
      </div>
      <Navbar />
      <div className='items-center flex-grow p-24 '>
        <GetNumber />
        <br className='p-4' />
        <ImageAdder />
      </div>
      <Footer />
    </main>
  );
}
