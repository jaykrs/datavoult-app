import Image from 'next/image'
import Link from 'next/link'
import NavMain from '../navigation/nav-main';
const Header = () => {
  return (
    <div className='header-top'>
      <div className="container">
        <div className="header-container">
          <div className='site-name'>
            <Link href="/">

              <div className="site-logo">
                <Image className="logo" src="/images/logo/default-monochrome-black.svg" width={118} height={50} alt="hext" />
              </div>{/* site-logo */}

            </Link>
          </div>
          <NavMain />
        </div>{/* header-container */}
      </div>
    </div>
  );
}
export default Header;