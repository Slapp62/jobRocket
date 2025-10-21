import {Image} from "@mantine/core";
import logo from '/logo-50-nobg.png'
import { Link } from "react-router-dom";

export function Logo() {
    
  return ( 
    <Link to="/" style={{textDecoration: 'none'}}>
        <Image
        src={logo}
        alt="Logo"
        height={40}
        />
    </Link>
  )
}