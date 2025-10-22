import { ActionIcon } from "@mantine/core";
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { TListing } from "@/Types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export function FavoritesButton({ listing} : { listing: TListing}) {
    const toggleLike = useLikeUnlike();
    
    const heartOutline = <IconHeart />;
    const heartFilled = <IconHeartFilled/>;
    const userID = useSelector((state: RootState) => state.userSlice.user?._id);
    if (!userID) {return null};
    const likes = listing.likes ?? [];
    const isLiked = likes.includes(userID);

    return (
        <ActionIcon style={{flex: 1}} color="purple" c='purple' variant='outline' size={40} onClick={() => toggleLike(listing, userID, isLiked)}>
            {isLiked ? heartFilled : heartOutline}
        </ActionIcon>
    )
}
