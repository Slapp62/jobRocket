import { ActionIcon } from "@mantine/core";
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { TCards } from "@/Types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export function FavoritesButton({ card} : { card: TCards}) {
    const toggleLike = useLikeUnlike(); 
    
    const heartOutline = <IconHeart />;
    const heartFilled = <IconHeartFilled/>;
    const userID = useSelector((state: RootState) => state.userSlice.user?._id);
    if (!userID) {return null};
    const isLiked = card.likes?.includes(userID);
    if (isLiked === undefined) {return null};

    return (
        <ActionIcon style={{flex: 1}} color="purple" c='purple' variant='outline' size={40} onClick={() => toggleLike(card, userID, isLiked)}>
            {isLiked ? heartFilled : heartOutline}
        </ActionIcon>
    )
}