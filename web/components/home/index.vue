<script setup>
const image = ['slide1.png', 'slide2.png', 'slide3.png'];

const currentIndex = ref(0);
let intervalId = null;

const currentImage = computed(() => {
    return image[currentIndex.value];
});

const startCarousel = () => {
    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % image.length;
    }, 3000);
};

onUnmounted(() => {
    clearInterval(intervalId);
});

onMounted(() => {
    startCarousel();
});
</script>

<template>
    <div>
        <section class="h-screen relative">
            <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed"
                style="background-image:url(https://kepegawaiandinkesblog.files.wordpress.com/2017/07/dinkes-jakarta.jpg)">
            </div>
        </section>
        <section class="min-h-screen flex flex-col items-center pt-10">
            <UContainer class="text-center">
                <NuxtLink>
                    <div class="pb-10">
                        <div class="font-semibold text-xl">
                            Publikasi Hasil Analisis Data Stunting Dilakukan Melalui Pertemuan Koordinasi Lintas Sektor
                            Pelaksanaan
                            Surveilans Gizi Kota Batam Tahun 2022
                        </div>
                        <div class="text-gray-400 text-base">
                            BY: DINKES ON: 29 DESEMBER 2022 IN: BIDANG KESEHATAN MASYARAKAT, PENGUMUMAN
                        </div>
                    </div>
                    <div class="text-gray-800">
                        Kegiatan Pertemuan Koordinasi Lintas Sektor Terkait Pelaksanaan Surveilan Gizi oleh Dinas Kesehatan
                        kota
                        Batam merupakan kegiatan yang bertujuan mendeseminasikan dan mengkoordinasikan kegiatan surveilans
                        gizi
                        termasuk stunting kepada lintas sector dan lintas program Kegiatan ini dibuka oleh Bapak Wakil
                        Walikota
                        Batam Selaku Ketua Tim Percepatan Penurunan Stunting Kota Batam dan di
                    </div>
                    <div class="py-4 text-green-500">Continue Reading</div>
                </NuxtLink>
                <NuxtLink>
                    <div class="pb-10">
                        <div class="font-semibold text-xl">
                            REMBUK STUNTING TINGKAT KOTA BATAM TAHUN 2023
                        </div>
                        <div class="text-gray-400 text-base">
                            BY: DINKES ON: 14 AGUSTUS 2023 IN: TAK BERKATEGORI
                        </div>
                    </div>
                    <div class="text-gray-800">
                        Wali Kota Batam, Muhammad Rudi, mengapresiasi peran semua pihak dalam penanganan kasus stunting di
                        Kota Batam. Sejumlah peran penting dari semua pihak sudah dilakukan, salah satunya dari peran Bapak
                        Asuh Anak Stunting Kota Batam. “Sebagai apresiasi pemerintah, kami berikan piagam penghargaan kepada
                        enam perusahaan dan lembaga di Batam yang sudah
                    </div>
                    <div class="py-4 text-green-500">Continue Reading</div>
                </NuxtLink>
                <NuxtLink class="flex flex-col items-center">
                    <img src="/diagram.png" alt="diagram">
                    <div class="font-semibold text-xl">
                        Hasil Survei Kepuasan Masyarakat Dinas Kesehatan
                    </div>
                    <div class="text-gray-400 text-base">
                        BY: DINKES ON: 28 JULI 2023 IN: PELAYANAN, SEKRETARIAT, TAK BERKATEGORI
                    </div>
                    <div class="py-4 text-green-500">Continue Reading</div>
                </NuxtLink>
            </UContainer>
        </section>
        <section class="h-screen relative">
            <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed"
                style="background-image:url('/slide1.png')">
            </div>
        </section>
        <section class="h-screen relative">
            <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed"
                style="background-image:url('/slide2.png')">
            </div>
        </section>
        <section class="h-screen relative">
            <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed"
                style="background-image:url('/slide3.png')">
            </div>
        </section>
    </div>
</template>
