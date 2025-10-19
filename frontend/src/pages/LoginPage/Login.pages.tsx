import {
 Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
import classes from './Login.module.css';
import  { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { loginSchema } from '@/validationRules/login.joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { TdecodedToken } from '@/Types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/userSlice';
import {useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRemember] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const {register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: joiResolver(loginSchema)
  });
  
  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_BASE_URL}/api/users/login`,
        {
          email: data.email, 
          password: data.password,
        });
      
      const token = response.data;
      localStorage.setItem('rememberMe', rememberMe ? 'true ': 'false');
      localStorage.setItem('token', token);

      axios.defaults.headers.common['x-auth-token'] = token;

      const { _id } = jwtDecode<TdecodedToken>(token);
      const userResponse = await axios.get(`${API_BASE_URL}/api/users/${_id}`)
      
      dispatch(setUser(userResponse.data))
      toast.success('Logged In!', {position: 'bottom-right'});

      jumpTo('/');
    
    } catch (error : any) {
      toast.error(error.response.data.message, {position: 'bottom-right'});
    } finally {
      setIsLoading(false);
  }
}

  return (
    <Container size={420} my={100}>
      {message && <Title order={3} ta="center" c="red" mb={10}>{message}</Title>}
      {!message && <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>}

        <Paper withBorder p={30} mt={30} radius="md" shadow='lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput 
                    label="Email" 
                    placeholder="you@email.com" 
                    {...register('email')}
                    error= {errors.email?.message}
                />
                <PasswordInput 
                    mt={10}
                    label="Password" 
                    placeholder="Your password" 
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Group justify="space-between" mt="lg">
                    <Checkbox 
                    label="Remember me" 
                    checked={rememberMe}
                    onChange={(event) => setRemember(event.currentTarget.checked)}/>
                </Group>

                <Group justify='center'>
                    <Text c="dimmed" size="sm" ta="center" my='lg'>
                        Don't have an account yet? 
                    </Text>
                    <Button p={0} variant='transparent' component={Link} to='/register'>
                        Create account
                    </Button>
                </Group>

                <Button type='submit' fullWidth loading={isLoading} disabled={!isValid}>
                Sign in
                </Button>
            </form>
        </Paper>
    </Container>
  );
}