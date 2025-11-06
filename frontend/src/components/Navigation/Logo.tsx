import icon from '/flavicon-180.png';
import name from '/name2.png';
import { Link } from 'react-router-dom';
import { Group, Image } from '@mantine/core';

export function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Group align='center' justify='center'>
        <Image src={icon} alt="Logo" height={50} />
        <Image src={name} alt="Logo" height={30} />
      </Group>
    </Link>
  );
}
