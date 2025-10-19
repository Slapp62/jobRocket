import { TCards } from "@/Types";
import { cardSchema } from "@/validationRules/card.joi";
import { Paper, Title, Flex, Fieldset, TextInput, Textarea, Button } from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "@/store/cardSlice";
import { cleanedCardData } from "@/utils/getCleanedData";
import { RootState } from "@/store/store";

export function EditCard() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";
    const {id} = useParams();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    
    const allCards = useSelector((state: RootState) => state.cardSlice.cards)
    const cardData = allCards?.find((card) => card._id === id)
    const { register, handleSubmit, reset, trigger, formState: {errors, isValid, isDirty} } = useForm<TCards> ({
            mode: 'all',
            resolver: joiResolver(cardSchema),
            defaultValues: cardData ? cleanedCardData(cardData) : {}
    })

    useEffect(() => {
        const defaultUserValues = cardData ? cleanedCardData(cardData) : {};
        reset(defaultUserValues);
    }, [reset, cardData])
    
    const onSubmit = async (data:FieldValues) => {
        data.address.houseNumber = Number(data.address.houseNumber);
        data.address.zip = Number(data.address.zip);
        try {
            const response = await axios.put(`${API_BASE_URL}/api/cards/${id}`, data);
            if (response.status === 200) {
                dispatch(editCard({card : response.data as TCards}));
                toast.success('Card Updated Successfully!', {position: `bottom-right`}); 
                setDisabled(true)         
            }
        } catch (error : any) {
                toast.error(`Update Failed! ${error.response.data.message}`, {position: `bottom-right`});
                
        } 
    }

    return (
        <Paper>
            <Title ta="center" my={10}>Edit Listing</Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction='column' gap={10} py={10} mx="auto" style={{width: isMobile ? '90%' : '40%'}}>
                    <Fieldset legend='Job Info'>
                        <TextInput 
                            label='Title'
                            required
                            disabled={isDisabled}
                            {...register('title')}
                            error= {errors.title?.message}
                        />
                        <TextInput 
                            label='Subtitle'
                            required
                            disabled={isDisabled}
                            {...register('subtitle')}
                            error= {errors.subtitle?.message}
                        />
                        <Textarea 
                            label='Description'
                            required
                            disabled={isDisabled}
                            {...register('description')}
                            error= {errors.description?.message}
                        />
                        <TextInput 
                            label='Phone'
                            required
                            disabled={isDisabled} 
                            {...register('phone', {
                                onChange: (e) => {
                                    e.target.value = e.target.value.replace(/[^\d-]/g, '');
                                },
                            })}
                            error= {errors.phone?.message}
                        />
                        <TextInput 
                            label='Email'
                            required
                            disabled={isDisabled}
                            {...register('email')}
                            error= {errors.email?.message}
                        />
                        <TextInput 
                            label='Website' 
                            disabled={isDisabled}
                            {...register('web')}
                            error= {errors.web?.message}
                        />
                        <TextInput 
                            label='URL' 
                            disabled={isDisabled}
                            {...register('image.url')}
                            error= {errors.image?.url?.message}
                        />
                        <TextInput 
                            label='Alt Text'
                            disabled={isDisabled} 
                            {...register('image.alt')}
                            error= {errors.image?.alt?.message}
                        />
                    </Fieldset>
                    
                    <Fieldset legend='Address'>
                        <TextInput 
                            label='State' 
                            disabled={isDisabled}
                            {...register('address.state')}
                            error= {errors.address?.state?.message}
                        />
                        <TextInput 
                            label='Country' 
                            required
                            disabled={isDisabled}
                            {...register('address.country')}
                            error= {errors.address?.country?.message}
                        />
                        <TextInput 
                            label='City' 
                            required
                            disabled={isDisabled}
                            {...register('address.city')}
                            error= {errors.address?.city?.message}
                        />
                        <TextInput 
                            label='Street' 
                            required
                            disabled={isDisabled}
                            {...register('address.street')}
                            error= {errors.address?.street?.message}
                        />
                        <TextInput 
                            label='House Number' 
                            required
                            disabled={isDisabled}
                            {...register('address.houseNumber', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '')},
                            })}
                            error= {errors.address?.houseNumber?.message}
                        />
                        <TextInput 
                            label='Zipcode' 
                            required
                            disabled={isDisabled}
                            {...register('address.zip', {
                                onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, '')},
                            })}
                            error= {errors.address?.zip?.message}
                        />
                    </Fieldset>      
                </Flex>
                
                <Flex justify='center' my={10} gap={10}>
                    <Button size='md' onClick={() => {
                        setDisabled(false)
                        trigger();
                    }}>Edit</Button>  

                    <Button size='md' type='reset' onClick={() => {
                        reset();
                        setDisabled(false)
                    }}>Reset</Button>
                    
                    <Button type='submit' size='md' disabled={!isValid || !isDirty}>Update</Button>  
                </Flex>
            </form>
        </Paper>
    );
}
