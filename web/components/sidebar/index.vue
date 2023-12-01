<script setup>
const { data, signOut } = useAuth();
const isCollapse = ref(false);
const isDropdown1 = ref(false);
const isDropdown2 = ref(false);
const isDropdown3 = ref(false);
const handleOpen = () => {
    isCollapse.value = !isCollapse.value
}

const handleDropdown1 = () => {
    isDropdown1.value = !isDropdown1.value
}
const handleDropdown2 = () => {
    isDropdown2.value = !isDropdown2.value
}
const handleDropdown3 = () => {
    isDropdown3.value = !isDropdown3.value
}
const handleLogout = async() => {
    await signOut({ callbackUrl: '/' });
}
</script>

<template>
    <div class="flex flex-row">
        <aside id="logo-sidebar" :class="{ 'block': isCollapse, 'hidden': !isCollapse }"
            class="absolute md:static md:block z-40 w-64 h-screen pt-10  bg-white border-r border-gray-200"
            aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
                <div>
                    <div>
                        <img src="/logo.jpeg" alt="logo">
                    </div>
                    <ul class="space-y-2 font-medium pt-10">
                        <li v-if="data?.user?.role?.name === 'admin'">
                            <NuxtLink :to="{ name: 'users' }"
                                class="flex items-center p-2 text-primary-900 rounded-lg hover:bg-primary-50 group">
                                <UIcon name="i-solar-user-circle-bold-duotone"
                                    class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                <span class="ms-3">Users Management</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <div @click="handleDropdown1()"
                                class="w-full flex items-center p-2 text-primary-900 rounded-lg hover:bg-primary-50 group">
                                <div class="flex justify-between items-center w-full">
                                    <div class="flex items-center">
                                        <UIcon name="i-solar-hospital-line-duotone"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <span class="ms-3">Biaya Rumah Sakit</span>
                                    </div>
                                    <div class="flex items-center">
                                        <UIcon v-if="!isDropdown1" name="i-solar-alt-arrow-down-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <UIcon v-if="isDropdown1" name="i-solar-alt-arrow-up-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                    </div>
                                </div>
                            </div>

                            <div v-if="isDropdown1">
                                <div class="pl-12 flex flex-col space-y-2">
                                    <NuxtLink to="/rumah-sakit/batam"
                                        class="flex items-center text-primary-500  rounded-lg hover:bg-primary-50 group">
                                        <span>Batam</span>
                                    </NuxtLink>
                                    <NuxtLink to="/rumah-sakit/provinsi"
                                        class="flex items-center text-primary-500 rounded-lg hover:bg-primary-50 group">
                                        <span>Provinsi</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div @click="handleDropdown2()"
                                class="w-full flex items-center p-2 text-primary-900 rounded-lg hover:bg-primary-50 group">
                                <div class="flex justify-between items-center w-full">
                                    <div class="flex items-center">
                                        <UIcon name="i-solar-export-line-duotone"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <span class="ms-3">Biaya Iuran</span>
                                    </div>
                                    <div class="flex items-center">
                                        <UIcon v-if="!isDropdown2" name="i-solar-alt-arrow-down-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <UIcon v-if="isDropdown2" name="i-solar-alt-arrow-up-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                    </div>
                                </div>
                            </div>

                            <div v-if="isDropdown2">
                                <div class="pl-12 flex flex-col space-y-2">
                                    <NuxtLink to="https://edabu.bpjs-kesehatan.go.id/Edabu/Home/Login" target="_blank"
                                        class="flex items-center text-primary-500 rounded-lg hover:bg-primary-50 group">
                                        <span>Edabu</span>
                                    </NuxtLink>
                                    <NuxtLink
                                        to="https://docs.google.com/spreadsheets/d/1paxF_9ug5Sr2Uzht1fDfPEfXm0y0sKSC1at8mKsHsQE/edit?usp=sharing"
                                        target="_blank"
                                        class="flex items-center text-primary-500 rounded-lg hover:bg-primary-50 group">
                                        <span>Manual PBI</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div @click="handleDropdown3()"
                                class="w-full flex items-center p-2 text-primary-900 rounded-lg hover:bg-primary-50 group">
                                <div class="flex justify-between items-center w-full">
                                    <div class="flex items-center">
                                        <UIcon name="i-solar-book-2-bold-duotone"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <span class="ms-3">Rujukan</span>
                                    </div>
                                    <div class="flex items-center">
                                        <UIcon v-if="!isDropdown3" name="i-solar-alt-arrow-down-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />
                                        <UIcon v-if="isDropdown3" name="i-solar-alt-arrow-up-linear"
                                            class="w-6 h-6  text-primary-600 group-hover:text-primary-900" />

                                    </div>
                                </div>
                            </div>

                            <div v-if="isDropdown3">
                                <div class="pl-12 flex flex-col space-y-2">
                                    <NuxtLink to="/rujukan/batam"
                                        class="flex items-center text-primary-500 rounded-lg hover:bg-primary-50 group">
                                        <span>Batam</span>
                                    </NuxtLink>
                                    <NuxtLink to="/rujukan/provinsi"
                                        class="flex items-center text-primary-500 rounded-lg hover:bg-primary-50 group">
                                        <span>Provinsi</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <UButton @click="handleLogout()" variant="ghost" class="flex items-center">
                    <UIcon name="i-heroicons-arrow-left-on-rectangle" class="w-6 h-6" />
                    <span>Sign Out</span>
                </UButton>
            </div>
        </aside>

        <div class="absolute z-40 md:hidden">
            <UButton @click="handleOpen()" variant="ghost">
                <UIcon name="i-solar-hamburger-menu-outline" class="w-6 h-6" :class="{ 'hidden': isCollapse }" />
                <UIcon name="i-solar-close-circle-line-duotone" class="w-6 h-6" :class="{ 'hidden': !isCollapse }" />
            </UButton>
        </div>
    </div>
</template>

<style scoped>
a.router-link-active,
a.router-link-exact-active {
    @apply rounded-lg bg-primary-50;
}

a.router-link-active>div,
a.router-link-exact-active>div {
    @apply text-gray-400;
}
</style>