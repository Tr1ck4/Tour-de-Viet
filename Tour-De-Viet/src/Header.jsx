import './Header.css'
function Header() {
  return (
    <>
      <header className='backdrop-blur-lg drop-shadow-xlbg-bone-white bg-opacity-10 shadow-lg stroke-rgba(255, 255, 255, 1)'>
        <nav>
          <p className="logo">WELCOME</p>
          <ul>
            <li><a href="#">Login</a></li>
            <li><a href="/register">Sign up</a></li>
            <li className="search">
              <a href="#">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li className="hamburger">
              <a href="#" className="border-2 rounded-full border-black">
                <div className="bar"></div>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
export default Header
