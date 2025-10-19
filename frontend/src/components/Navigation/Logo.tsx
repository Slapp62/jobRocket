import { Group,Image,Text } from "@mantine/core";
import flavicon from '/briefcase-icon.png'
import classes from '../ComponentStyles/Logo.module.css'
import { Link } from "react-router-dom";

export function Logo() {
    
    return (
        <Group>
              <Image
              src={flavicon}
              alt="Logo"
              style={{ width: '30px', height: '30px'}}/>
            
            <Link to="/" style={{textDecoration: 'none'}}>
                <Text fw='bold' size="xl" className={classes.textColor}>IsraJobs</Text>
            </Link>
              
        </Group>
    )
}