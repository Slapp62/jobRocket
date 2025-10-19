import { ActionIcon } from "@mantine/core"
import { IconBrandLinkedin, IconBrandWhatsapp, IconBrandTwitter } from "@tabler/icons-react"

const SocialIcons = (props : {cardID : string}) => {
    const cardUrl = `${window.location.origin}/card-details/${props.cardID}`;
    const shareText = `Check out this listing: ${cardUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?`+`url=${encodeURIComponent(shareText)}`;
    const xUrl =`https://twitter.com/intent/tweet?` +`text=${encodeURIComponent(shareText)}` +`&url=${encodeURIComponent(cardUrl)}`;
    
    return (
        <>
            <ActionIcon size={40} variant='light' color='indigo'>
                <IconBrandLinkedin onClick={() => window.open(linkedInUrl, '_blank')}/>
            </ActionIcon>

            <ActionIcon size={40} variant='light' color='indigo'>
                <IconBrandWhatsapp onClick={() => window.open(whatsappUrl, '_blank')}/>
            </ActionIcon>

            <ActionIcon size={40} variant='light' color='indigo'>
                <IconBrandTwitter onClick={() => window.open(xUrl, '_blank')}/>
            </ActionIcon>
        </>
    )
}

export default SocialIcons