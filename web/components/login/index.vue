<script setup>
import { ref } from 'vue';
import { z } from 'zod';
import { useToggle } from '@vueuse/core';

const { signIn } = useAuth();

const form = ref();
const typePassword = ref(true);
const errorMessage = ref(null);
const state = ref({
    email: undefined,
    password: undefined,
});

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string(),
});

const togglePassword = useToggle(typePassword);

const submit = async () => {
    try {
        await form.value?.validate();

        const { email, password } = state.value;
        await signIn('credentials', { email, password, callbackUrl: '/rumah-sakit/batam' });
    } catch (error) {
        errorMessage.value = error?.response._data.message;
    }

    return null;
};
</script>

<template>
    <div class="min-h-screen flex justify-center items-center">
        <div class="max-w-md w-full flex flex-col space-y-[2rem]">
            <div class="flex justify-center items-center space-x-4 px-4">
                <div>
                    <img src="/favicon.ico" alt="logo" class="w-auto h-32">
                </div>
                <div class="text-2xl font-bold text-center text-black">
                    Dinas Kesehatan Kota Batam
                </div>
            </div>

            <ErrorHandler v-if="errorMessage" :error="errorMessage" />

            <UForm ref="form" :schema="schema" :state="state" class="flex flex-col space-y-[2rem] px-4" @submit="submit">
                <UFormGroup name="email">
                    <UInput v-model="state.email" placeholder="Email" />
                </UFormGroup>
                <UFormGroup name="password">
                    <UInput v-model="state.password" :type="typePassword ? 'password' : 'text'" placeholder="Password"
                        :ui="{ icon: { trailing: { pointer: '' } } }">
                        <template v-if="state.password" #trailing>
                            <UButton color="gray" variant="link"
                                :icon="typePassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" :padded="false"
                                @click="togglePassword()" />
                        </template>
                    </UInput>
                </UFormGroup>
                <UButton type="submit" block>
                    Sign In
                </UButton>
                <div class="flex justify-end">
                    <NuxtLink to="/" class="flex items-center space-x-1">
                        <UIcon name="i-solar-alt-arrow-left-line-duotone" class="w-6 h-6" />
                        <span>BACK</span>
                    </NuxtLink>
                </div>
            </UForm>
        </div>
    </div>
</template>