import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6'


function Footer() {
  return (
    <footer className="min-h-screen max-w-screen">
      <div className="bg-stone-800 flex flex-wrap font-bold text-xl rounded-lg items-center text-stone-200">
        <div className="w-1/3 flex flex-wrap justify-start p-4">Logo</div>
        <div className="w-1/3">@Copyright 2023 - Shahbaz Ansari</div>
        <div className="w-1/3 flex p-4 justify-end">
          <a className='px-1' target='blank' href='https://twitter.com/Shahbaz__16'>
            <FaXTwitter />
          </a>
          <a className='px-1' target='blank' href='https://github.com/Shahbaz-1696'>
            <FaGithub />
          </a>
          <a className='px-1' target='blank' href='https://www.linkedin.com/in/shahbaz-ansari-628420141/'>
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
