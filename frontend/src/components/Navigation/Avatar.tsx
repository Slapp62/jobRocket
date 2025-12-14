import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { RootState } from '@/store/store';
import { toggleAdminView } from '@/store/userSlice';

export function AvatarIcon(props: { closeDrawer?: () => void }) {
  const dispatch = useDispatch();
  const jumpTo = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <Button
      variant="outline"
      color="white"
      c="white"
      onClick={() => {
        dispatch(toggleAdminView(false));
        jumpTo(`/edit-profile/${user?._id}`);
        if (props.closeDrawer) {
          props.closeDrawer();
        }
      }}
    >
      My Account
    </Button>
  );
}
