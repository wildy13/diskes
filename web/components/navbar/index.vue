<script setup>
const route = useRoute();
const { data } = useAuth();

</script>

<template>
    <div :class="{ 'justify-end': route.name === 'dashboard' || 'rujukan-batam' || 'users', 'justify-between': route.name === 'index' }"
        class="flex items-center p-4 w-full">
        <div v-if="route.name === 'index'">
            <img src="/logo.jpeg" alt="logo" class="h-16 w-auto">
        </div>
        <div v-if="route.name === 'index'" class="hidden md:flex flex-col  items-center">
            <div class="font-semibold  text-3xl">Dinas Kesehatan kota Batam</div>
            <div>JL. RAJA HAJI NO. 7 SEKUPANG BATAM</div>
        </div>
        <div>
            <UButton v-if="route.name === 'index'" :to="{ name: 'login' }" class="bg-green-700">
                <UIcon name="i-solar-login-2-line-duotone" />
                <span>Login</span>
            </UButton>
            <div v-else>
                <UAvatar :alt="`${data?.user?.username}`" :ui="{ background: 'bg-white' }" />
            </div>
        </div>
    </div>
</template>