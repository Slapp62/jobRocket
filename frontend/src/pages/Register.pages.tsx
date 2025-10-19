import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Anchor, Box, Button, Checkbox, Fieldset, Flex, Image, PasswordInput,TextInput, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function RegisterForm()  {
    const jumpTo = useNavigate();
    const registerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 700px)');
    const defaultAvatar = 'https://images.unsplash.com/vector-1748280445815-10a4bb2ba7e3?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const [imageURL, setURL] = useState(defaultAvatar);
    
    const { reset, register, handleSubmit, formState: {errors, isValid, isDirty} } = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(registrationSchema),
    });

    const onSubmit = async (data:FieldValues) => {
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        if (!data.image?.url?.trim()) {data.image.url = defaultAvatar};
        if (!data.image?.alt?.trim()) {data.image.alt = 'default fox avatar'};

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${API_BASE_URL}/api/users/`, data);
            
            if (response.status === 201) {
                jumpTo('/login');
                toast.success('Registered!') 
            }
        } catch (error: any) {
            toast.error(error.response.data.message || error.message);
        }
    }
        
    return (
        <Flex style={{width: isMobile ? '95%' : "70%"}} mx='auto' direction='column'>
            <Box ref={registerRef} ta='center'><h1>Registration Form</h1></Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex mx='auto' direction='column' w={isMobile ? '95%' : "60%"} justify='space-between' gap={5}>
                    <Fieldset legend="Full Name">
                        <TextInput 
                            label="First"
                            {...register('name.first')}
                            required
                            error= {errors.name?.first?.message}
                            />

                        <TextInput 
                            label="Middle"
                            {...register('name.middle')}
                            error={errors.name?.middle?.message}
                            />
                        <TextInput 
                            label="Last"
                            {...register('name.last')}
                            required
                            error={errors.name?.last?.message}
                            />
                    </Fieldset>

                    <Fieldset legend="Contact">
                        <TextInput  
                            rightSection={<IconPhone/>} 
                            label="Phone"
                            required
                            {...register('phone', {
                                onChange: (e) => {
                                    e.target.value = e.target.value.replace(/[^\d-]/g, '');
                                },
                            })}
                            error={errors.phone?.message}
                            />
                    </Fieldset>
                        
                    <Fieldset legend="Credentials">
                        <TextInput 
                            label="Email"
                            {...register('email')}
                            required
                            error={errors.email?.message}
                            />
                        <PasswordInput 
                            label="Password"
                            {...register('password')}
                            required
                            error={errors.password?.message}
                            />
                    </Fieldset>

                    <Fieldset legend="Avatar">
                        <Image
                            fallbackSrc="https://images.unsplash.com/vector-1738926319239-4121e97afc01?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            src={imageURL} 
                            h={150}
                            w={150}
                            mx='auto'
                        />
                        <TextInput
                            label="URL"
                            defaultValue={imageURL}
                            {...register('image.url', {
                                onChange: (e) => {
                                    setURL(e.target.value);
                                },
                            }
                            )}
                            error={errors.image?.url?.message}
                            />
                        <TextInput
                            label="Image Alt"
                            defaultValue='default fox avatar'
                            {...register('image.alt')}
                            error={errors.image?.alt?.message}
                            />
                    </Fieldset>
                </Flex>

                <Flex direction='column' style={{width: isMobile ? '95%' : "60%"}} mx="auto" justify='space-between'>
                    <Fieldset legend="Address">
                        <TextInput 
                            label="State"
                            {...register('address.state')}
                            error={errors.address?.state?.message}
                            />
                        <TextInput 
                            label="Country"
                            {...register('address.country')}
                            required
                            error={errors.address?.country?.message}
                            />
                        <TextInput 
                            label="City"
                            {...register('address.city')}
                            required
                            error={errors.address?.city?.message}
                            />
                        <TextInput 
                            label="Street"
                            {...register('address.street')}
                            required
                            error={errors.address?.street?.message}
                            />
                        <TextInput
                            label="House Number"
                            {...register('address.houseNumber', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                                },
                            })}
                            required
                            error={errors.address?.houseNumber?.message}
                        />
                        <TextInput
                            label="Zipcode"
                            {...register('address.zip', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                                },
                            })}
                            required
                            error={errors.address?.zip?.message}
                        />
                    </Fieldset>

                    <Fieldset legend="Account Type">
                        <Checkbox mx='auto' mt={20} label='Create a Business Account' {...register('isBusiness')}/>
                    </Fieldset>
                </Flex>
                
                <Flex gap={10} align="center" w="95%" mx='auto' my={20} style={{flexDirection: isMobile ? 'row' : "column"}}>
                    <Button variant="outline" type='reset' w={200} disabled={!isDirty}
                        onClick={() => {
                            reset(); 
                            registerRef.current?.scrollIntoView({behavior:'smooth'});
                        }}>
                        Reset Form
                    </Button>
                    <Button type="submit" mx='auto' w={200} disabled={!isValid}>Submit</Button>

                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Already have an account?{' '}
                        <Anchor size="sm" component="button" onClick={() => jumpTo('/login')} underline="hover">
                            Login
                        </Anchor>
                    </Text>
                </Flex>
            </form> 
     </Flex>
  )
}