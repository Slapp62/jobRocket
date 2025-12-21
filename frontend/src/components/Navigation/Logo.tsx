import icon from '/flavicon-180.png';
import { Link } from 'react-router-dom';
import { Group, Image, Title } from '@mantine/core';

export function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Group align="center" justify="center" p={5} gap={5}>
        <Image src={icon} alt="Logo" h={40} w={40} />
        <Title fz={30} c="white">
          JobRocket
        </Title>
      </Group>
    </Link>
  );
}
