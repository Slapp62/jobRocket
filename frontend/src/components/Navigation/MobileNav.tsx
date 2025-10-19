import { RootState } from "@/store/store";
import { ActionIcon, Group } from "@mantine/core"
import { IconCards, IconHeart, IconPlus, IconUserSearch } from "@tabler/icons-react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export const MobileBottomNav = () => {
    const isAdmin = useSelector((state:RootState) => state.userSlice.user?.isAdmin);

    return (
        <Group
            pos="fixed"
            bottom={0}
            bg="white"
            w="100%"
            justify="space-evenly"
            align="center"
            h={60}
            style={{borderTop: '1px solid rgba(0, 0, 0, 0.11)', zIndex: 999}}
        >
            <ActionIcon 
                component={Link} 
                to="/favorites"  
                variant='subtle' 
                color='black' 
                radius={100} 
                size={40} 
                style={{boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)'}}
                >
                <IconHeart/>
            </ActionIcon>

            <ActionIcon 
                component={Link} 
                to="/my-listings"  
                variant='subtle' 
                color='black' 
                radius={100} 
                size={40} 
                style={{boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)'}}
                >
                <IconCards/>
            </ActionIcon>

            <ActionIcon
                component={Link} 
                to="/create-card"  
                variant='subtle' 
                color='black' 
                radius={100} 
                size={40} 
                style={{boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)'}}
                >
                <IconPlus/>
            </ActionIcon>

            {isAdmin && <ActionIcon
                component={Link} 
                to="/admin"  
                variant='subtle' 
                color='black' 
                radius={100} 
                size={40} 
                style={{boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)'}}
                >
                <IconUserSearch/>
            </ActionIcon>}
        </Group>
    )
}

