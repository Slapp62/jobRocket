import { Button, Center, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BsFillEmojiTearFill } from "react-icons/bs";


const Error404 = () => {
    const nav = useNavigate();
    
    const goHome = () => {
        nav("/");
    };

    return (
        <Center>
            <Flex direction='column' align='center' justify='center' mt={100} >
                <BsFillEmojiTearFill size={100}/>
                <h1 className="text-3xl font-bold">404: Page Not Found</h1>
                <Button onClick={goHome}>Return to Homepage</Button>
            </Flex>
            
        </Center>
    );
};

export default Error404;