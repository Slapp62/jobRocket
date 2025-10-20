import { Group,Image,Text } from "@mantine/core";
import logo from '/flavicon-color.png'
import classes from '../ComponentStyles/Logo.module.css'
import { Link } from "react-router-dom";

export function Logo() {
    
  return ( 
    <Link to="/" style={{textDecoration: 'none'}}>
      <Group>
        <Image
        src={logo}
        alt="Logo"
        style={{ width: '75px', height: '50px'}}/>
      
        <Text fw='bold' size="xl" className={classes.textColor}>JobRocket</Text>
      </Group>
    </Link>
  )
}