<script setup>
import { z } from 'zod';
import { useRujukanProvinsiStore } from '../../../stores/rujukan/provinsi.js';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close']);

const store = useRujukanProvinsiStore();
const toast = useToast();

const isOpen = ref(false);
const form = ref();

const initState = {
    date: undefined,
    nik: undefined,
    name: undefined,
    address: undefined,
    rt: undefined,
    rw: undefined,
    kelurahan: undefined,
    kecamatan: undefined,
    diagnosa: undefined,
    rsTujuan: undefined
};
const state = ref({ ...initState });

watch(() => props.show, (value) => {
    isOpen.value = value;
});

const schema = z.object({
    date: z.string(),
    nik: z.number().int(),
    name: z.string(),
    address: z.string(),
    rt: z.number(),
    rw: z.number(),
    kelurahan: z.string(),
    kecamatan: z.string(),
    diagnosa: z.string(),
    rsTujuan: z.string(),
});

const {
    status,
    error,
    execute,
} = useLazyAsyncData(() => store.create(state.value), {
    immediate: false,
});

const close = () => {
    Object.assign(state.value, initState);
    error.value = undefined;
    emit('close');
};

const submit = async () => {
    await form.value?.validate();
    await execute();

    if (!error.value) {
        close();

        toast.add({
            title: 'Done',
            description: 'Data has been saved successfully',
            icon: 'i-solar-check-circle-linear',
        });
    }

    return null;
};
</script>

<template>
    <div>
        <UModal v-model="isOpen" prevent-close>
            <UForm ref="form" :schema="schema" :state="state" class="flex flex-col space-y-[2rem]" @submit="submit">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <div class="text-base">
                                Create Rujukan Provinsi
                            </div>
                            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="-my-1" @click="close" />
                        </div>
                    </template>

                    <div class="flex flex-col space-y-[2rem]">
                        <ErrorHandler v-if="error" :error="error?.message" />
                        <UFormGroup label="Date" name="date">
                            <UInput type="date" v-model="state.date" />
                        </UFormGroup>
                        <UFormGroup label="NIK" name="nik">
                            <UInput type="number" v-model="state.nik" />
                        </UFormGroup>
                        <UFormGroup label="Name" name="name">
                            <UInput v-model="state.name" />
                        </UFormGroup>
                        <UFormGroup label="Alamat" name="address">
                            <UInput v-model="state.address" />
                        </UFormGroup>
                        <div class="flex items-center justify-between">
                            <UFormGroup label="RT" name="rt">
                                <UInput type="number" v-model="state.rt" />
                            </UFormGroup>
                            <UFormGroup label="RW" name="rw">
                                <UInput type="number" v-model="state.rw" />
                            </UFormGroup>
                        </div>
                        <div class="flex items-center justify-between">
                            <UFormGroup label="Kelurahan" name="kelurahan">
                                <UInput v-model="state.kelurahan" />
                            </UFormGroup>
                            <UFormGroup label="Kecamatan" name="kecamatan">
                                <UInput v-model="state.kecamatan" />
                            </UFormGroup>
                        </div>
                        <UFormGroup label="Diagnosa" name="diagnosa">
                            <UInput v-model="state.diagnosa" />
                        </UFormGroup>
                        <UFormGroup label="RS Tujuann" name="rsTujuan">
                            <UInput v-model="state.rsTujuan" />
                        </UFormGroup>
                    </div>

                    <template #footer>
                        <div class="flex space-x-[1rem]">
                            <div class="flex-1" />
                            <UButton label="Close" color="white" @click="close" />
                            <UButton label="Save" :loading="status === 'pending'" type="submit" />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </UModal>
    </div>
</template>