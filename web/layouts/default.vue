<template>
    <div class="flex flex-row w-full">
        <Sidebar class="md:w-2/12" />
        <div class="w-full md:w-10/12">
            <Navbar />
            <slot />
        </div>
    </div>
</template>