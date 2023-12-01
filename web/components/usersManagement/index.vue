<script setup>
import { useUserStore } from '../../stores/user/index.js';
import { useRoleStore } from '../../stores/role/index.js';

const store = useUserStore();
const role = useRoleStore();

const search = ref('');
const showCreate = ref(false);
const showEdit = ref(false);
const showRemove = ref(false);
const selected = ref([]);
const itemData = ref({});
const page = ref(1);
const pageCount = ref(10);

const columns = [{
    key: 'index',
    label: '#',
    class: 'text-center',
},
{
    key: 'username',
    label: 'Username',
},
{
    key: 'email',
    label: 'Email',
},
{
    key: 'role',
    label: 'Role',
},
{
    key: 'actions',
    label: 'Actions',
}
];


const items = computed(() => useFilter(store.items, search.value, ['username']) || []);
const rows = computed(() => items.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value));
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() => Math.min(page.value * pageCount.value, items.value.length));

const {
    pending,
    error,
    execute,
} = useLazyAsyncData(() => Promise.all([store.getAll(), role.getAll()]), {
    immediate: false,
});

const editDialog = (item) => {
    showEdit.value = true;
    itemData.value = item;
};

onMounted(async () => {
    await execute();
});

</script>

<template>
    <div class="px-12 h-auto w-full py-8">
        <div class="flex flex-col space-y-[4rem] w-full">
            <div class="flex justify-between items-center w-full">
                <div class="text-2xl">
                    Users Management
                </div>

                <div class="ml-auto flex space-x-[2rem]">
                    <div>
                        <UInput v-model="search" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid"
                            :ui="{ icon: { trailing: { pointer: '' } } }">
                            <template #trailing>
                                <UButton v-show="search !== ''" color="gray" variant="link"
                                    icon="i-heroicons-x-mark-20-solid" :padded="false" @click="search = ''" />
                            </template>
                        </UInput>
                    </div>
                    <div class="flex space-x-[0.8rem]">
                        <div>
                            <UTooltip text="Create">
                                <UButton icon="i-heroicons-plus" @click="showCreate = true" />
                            </UTooltip>
                        </div>
                        <div>
                            <UTooltip text="Remove">
                                <UButton icon="i-solar-trash-bin-trash-linear" color="red" :disabled="!selected.length"
                                    @click="showRemove = true" />
                            </UTooltip>
                        </div>
                    </div>
                </div>
            </div>

            <ErrorHandler v-if="error" :error="error?.message" />

            <UTable v-model="selected" :columns="columns" :rows="rows" :loading="pending">
                <template #index-data="{ index }">
                    <div class="text-center">
                        {{ index + 1 }}
                    </div>
                </template>
                <template #role-data="{ row }">
                    {{ row.role.name }}
                </template>
                <template #actions-data="{ row }">
                    <div class="flex space-x-[1rem]">
                        <UTooltip text="Edit">
                            <UButton icon="i-solar-pen-2-linear" size="xs" variant="ghost" color="gray" :padded="false"
                                @click="editDialog(row)" />
                        </UTooltip>
                    </div>
                </template>
            </UTable>
            <div v-if="rows.length" class="
                          flex
                          items-center
                          justify-end
                          py-4
                          gap-8
                        ">
                <div class="text-primary-600">
                    Showing {{ pageFrom }} to {{ pageTo }} of {{ items.length }} results
                </div>
                <USelectMenu v-model="pageCount" :options="[10, 20, 30, 40, 50]" class="w-20" />
                <UPagination v-model="page" :page-count="pageCount" :total="items.length" />
            </div>
        </div>

        <UsersManagementCreate :show="showCreate" @close="showCreate = false" />
        <UsersManagementRemove :show="showRemove" :data="selected" @close="showRemove = false" />
        <UsersManagementEdit :show="showEdit" :data="itemData" @close="showEdit = false" />
    </div>
</template>