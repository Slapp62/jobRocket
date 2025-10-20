import { TUsers } from "@/Types";
import { registrationSchema } from "@/validationRules/register.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Anchor, Box, Button, FloatingIndicator, Tabs, Fieldset, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from './formTabs.module.css';
import { SharedCredentials } from "@/components/registrationForms/shareCredentials";
import { JobseekerFields } from "@/components/registrationForms/jobseekerFields";
import { BusinessFields } from "@/components/registrationForms/businessFields";

export function RegisterForm()  {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [tabValue, setTabValue] = useState<string | null>('jobseeker');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
    const jumpTo = useNavigate();
    const registerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 700px)');

    const { reset, register, handleSubmit, control, setValue, formState: {errors, isValid, isDirty} } = useForm<TUsers>({
        mode: 'all',
        resolver: joiResolver(registrationSchema),
        shouldUnregister: false, // Keep data when switching tabs
        defaultValues: {
            profileType: 'jobseeker', // Default to jobseeker
        },
        criteriaMode: 'all', // Show all errors
    });

    const onSubmit = async (data:FieldValues) => {
        // Build the request payload - profileType is already set by tab change
        const payload: any = {
            email: data.email,
            password: data.password,
            phone: data.phone,
            profileType: data.profileType,
        };

        // Add ONLY the appropriate profile based on type
        // This ensures we don't send the forbidden profile to backend
        if (data.profileType === 'jobseeker') {
            payload.jobseekerProfile = data.jobseekerProfile;
            // Don't include businessProfile
        } else {
            payload.businessProfile = data.businessProfile;
            // Don't include jobseekerProfile
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${API_BASE_URL}/api/users/`, payload);

            if (response.status === 201) {
                jumpTo('/login');
                toast.success('Registration successful!')
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        }
    }
        
    return (
        <Flex style={{width: isMobile ? '95%' : "70%"}} mx='auto' direction='column'>
            <Box ref={registerRef} ta='center'><h1>Registration Form</h1></Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex mx='auto' direction='column' w={isMobile ? '95%' : "60%"} justify='space-between' gap={5}>
                    <SharedCredentials register={register} errors={errors} control={control} />
                

                
                    <Fieldset legend="Choose An Account Type">

                      <Tabs variant="none" value={tabValue} onChange={(newValue) => {
                        setTabValue(newValue);
                        // Update profileType in form when tab changes
                        setValue('profileType', newValue as 'jobseeker' | 'business');
                      }}>
                        <Tabs.List ref={setRootRef} className={classes.list}>
                          <Tabs.Tab value="jobseeker" ref={setControlRef('jobseeker')} className={classes.tab}>
                            Job Seeker
                          </Tabs.Tab>
                          <Tabs.Tab value="business" ref={setControlRef('business')} className={classes.tab}>
                            Business
                          </Tabs.Tab>

                          <FloatingIndicator
                            target={tabValue ? controlsRefs[tabValue] : null}
                            parent={rootRef}
                            className={classes.indicator}
                          />
                        </Tabs.List>

                        <Tabs.Panel value="jobseeker">
                          <JobseekerFields register={register} errors={errors} control={control} />
                        </Tabs.Panel>
                        <Tabs.Panel value="business">
                          <BusinessFields register={register} errors={errors} control={control} />
                        </Tabs.Panel>
                      </Tabs>

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