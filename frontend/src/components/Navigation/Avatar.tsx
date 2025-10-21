import { RootState } from '@/store/store';
import { toggleAdminView } from '@/store/userSlice';
import { ActionIcon, Avatar} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function AvatarIcon(props: {closeDrawer?: () => void}) {
    const dispatch = useDispatch();
    const jumpTo = useNavigate();
    const user = useSelector((state:RootState) => state.userSlice.user);
    const avatarSrc = user?.profileType === 'business'
        ? user.businessProfile?.logo?.url || undefined
        : undefined;
    const fallbackInitial = user?.profileType === 'jobseeker'
        ? user.jobseekerProfile?.firstName?.charAt(0)
        : user?.businessProfile?.name?.charAt(0) || user?.email?.charAt(0) || '?';
    
  return (
      <ActionIcon variant='outline' color='green' radius={100} size={40} onClick={() => {
        dispatch(toggleAdminView(false));
        jumpTo(`/edit-profile/${user?._id}`);
        if (props.closeDrawer) {props.closeDrawer()};
      }}>
        <Avatar src={avatarSrc} style={{ cursor: 'pointer' }} size={30} radius="xl">
          {fallbackInitial?.toUpperCase()}
        </Avatar>
      </ActionIcon>
  )
}
