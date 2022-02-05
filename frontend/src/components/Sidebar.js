import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../constants/Links'
import { useGlobalContext } from '../context/sidebar'

const Sidebar = () => {
const { isSidebarOpen, closeSidebar, openSidebar } = useGlobalContext()

  return (
    <section  className="section">
      <span onClick={openSidebar} className="menu-icon">
        <span className="menu-icon--top"></span>
        <span className="menu-icon--middle"></span>
        <span className="menu-icon--bottom"></span>
      </span>
      <aside
        className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
      >
        <button className="close-btn" type="button" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link className='links--list' to={url}>{text}</Link>
              </li>
            )
          })}
        </ul>
      </aside>
    </section>
  )
}

export default Sidebar
