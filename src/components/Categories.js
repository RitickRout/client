import React from 'react'
import {Link}  from "react-router-dom"


function Categories() {

  return (
<div className="dropdown">
  <span className=" dropdown-toggle" type="button" dropdown-toggle aria-expanded="false">
   Categories
  </span>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="Art"     >Art</Link></li>
    <li><Link className="dropdown-item" to="Science"  >Science</Link></li>
    <li><Link className="dropdown-item" to="Food"    >Food</Link></li>
    <li><Link className="dropdown-item" to="Design"     > Design</Link></li>
    <li><Link className="dropdown-item" to="Technology"  >Technology</Link></li>
  </ul>
</div>
  )
}

export default Categories