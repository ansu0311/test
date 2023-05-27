import Link from "next/link";

const Header = () => {
  return (
    <header>
      <ul className='flex flex-row gap-x-4'>
        <li>
          <Link href='/signup' className='p-4 underline text-xl'>
            SignUp
          </Link>
        </li>
        <li>
          <Link href='/signin' className='p-4 underline text-xl'>
            SignIn
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
