import './Header.css'
function Header(){
  return (
    <>
      <header>
        <nav>
              <p class = "logo">WELCOME</p>
              <ul>
                  <li><a href="#">Login</a></li>
                  <li><a href="#">Sign up</a></li>
                  <li class = "search">
                      <a href="#">
                          <i class = "fa-solid fa-magnifying-glass"></i>
                      </a>
                  </li>
                  <li class = "hamburger">
                      <a href="#">
                          <div class="bar"></div>
                      </a>
                  </li>
              </ul>
          </nav>
      </header>
    </>
  )
}
export default Header
