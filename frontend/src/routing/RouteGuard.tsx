import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

type RouteGuardProps = {
    children: React.ReactNode;
    isBusiness?: boolean;
    isAdmin?: boolean;
}

const RouteGuard = (props: RouteGuardProps) => {
    const {children,  isBusiness, isAdmin} = props;
    
    const user = useSelector((state:RootState) => state.userSlice.user);
    const userLoggedIn = useSelector((state:RootState) => state.userSlice.isLoggedIn);
    const accessMessage = 'You do not have access to this page.'

    if (!userLoggedIn) {
        return <Navigate to="/" replace state={{message: accessMessage}}/>
    }

    if (isBusiness && !user?.isBusiness) {
        return <Navigate to='/login' replace state={{message: accessMessage}}/>
    }

    if (isAdmin && !user?.isAdmin) {
        return <Navigate to='/login' replace state={{message: accessMessage}}/>
    }

    return <>{children}</>
}

export default RouteGuard