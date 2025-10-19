import { addCard } from '@/store/cardSlice';
import { TCards } from '@/Types';
import { cardSchema } from '@/validationRules/card.joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Fieldset, Flex, Paper, Textarea, TextInput, Title,  } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function CreateCard() {
    const jumpTo = useNavigate();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const dispatch = useDispatch();
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";

    const { register, handleSubmit, formState: {errors, isValid} } = useForm<TCards>({
        mode: 'all',
        resolver: joiResolver(cardSchema)
    });

    const onSubmit = async (data:FieldValues) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        const url = `${API_BASE_URL}/api/cards`
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        
        try {
            const response = await axios.post(url, data)

            if (response.status === 201) {
                dispatch(addCard(response.data));
                toast.success('Card Submitted!', {position: "bottom-right"})
                jumpTo('/my-listings');
            }
        } catch (error:any) {
            toast.error(`Card creation failed! ${error.response.data}`, {position: "bottom-right"})
        }
    }

  return (
    <Paper>
        <Title ta="center" my={10}>Create A Listing</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='column' gap={10} py={10} mx="auto" style={{width: isMobile ? '90%' : '50%'}}>
                <Fieldset legend='Job Info'>
                    <TextInput label='Title'
                        required
                        {...register('title')}
                        error= {errors.title?.message}
                    />
                    <TextInput label='Subtitle'
                        required
                        {...register('subtitle')}
                        error= {errors.subtitle?.message}
                    />
                    <Textarea label='Description'
                        required
                        {...register('description')}
                        error= {errors.description?.message}
                    />

                    <TextInput label='Phone' 
                        required
                        {...register('phone', {
                            onChange: (e) => {
                                e.target.value = e.target.value.replace(/[^\d-]/g, '');
                            },
                        })}
                        error= {errors.phone?.message}
                    />
                    <TextInput label='Email'
                        required
                        {...register('email')}
                        error= {errors.email?.message}
                    />
                    <TextInput label='Website' 
                        {...register('web')}
                        error= {errors.web?.message}
                    />
                    <TextInput label='URL' 
                        {...register('image.url')}
                        error= {errors.image?.url?.message}
                    />
                    <TextInput label='Alt Text' 
                        {...register('image.alt')}
                        error= {errors.image?.alt?.message}
                    />
                </Fieldset>
                
                <Fieldset legend='Address'>
                    <TextInput label='State' 
                        {...register('address.state')}
                        error= {errors.address?.state?.message}
                    />
                    <TextInput label='Country' 
                        required
                        {...register('address.country')}
                        error= {errors.address?.country?.message}
                    />
                    <TextInput label='City' 
                        required
                        {...register('address.city')}
                        error= {errors.address?.city?.message}
                    />
                    <TextInput label='Street' 
                        required
                        {...register('address.street')}
                        error= {errors.address?.street?.message}
                    />
                    <TextInput label='House Number' 
                        required
                        {...register('address.houseNumber', {
                            onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            },
                        })}
                        error= {errors.address?.houseNumber?.message}
                    />
                    <TextInput label='Zipcode' 
                        required
                        {...register('address.zip', {
                            onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            },
                        })}
                        error= {errors.address?.zip?.message}
                    />
                </Fieldset>
                                        
            </Flex>
            
            <Flex justify='center' my={10}>
                <Button type='submit' size='lg' disabled={!isValid}>Create</Button>  
            </Flex>
        </form>
    </Paper>
  );
}