<template>
  <main class="p-4 space-y-6 max-w-md mx-auto">
    <div class="grid grid-cols-2 gap-4">
      <router-link to="/video-watermark" class="rounded-2xl border border-border bg-secondary/60 hover:bg-secondary transition p-6 text-center shadow-md">
        <img alt="视频去水印" src="/icons/eye.svg" class="mx-auto w-12 h-12" />
        <p class="mt-2 text-sm">视频去水印</p>
      </router-link>
      <router-link to="/text-extraction" class="rounded-2xl border border-border bg-secondary/60 hover:bg-secondary transition p-6 text-center shadow-md">
        <img alt="文案提取" src="/icons/doc.svg" class="mx-auto w-12 h-12" />
        <p class="mt-2 text-sm">文案提取</p>
      </router-link>
      <router-link to="/text-imitation" class="rounded-2xl border border-border bg-secondary/60 hover:bg-secondary transition p-6 text-center shadow-md">
        <img alt="文案仿写" src="/icons/add.svg" class="mx-auto w-12 h-12" />
        <p class="mt-2 text-sm">文案仿写</p>
      </router-link>
      <router-link to="/ip-replication" class="rounded-2xl border border-border bg-secondary/60 hover:bg-secondary transition p-6 text-center shadow-md">
        <img alt="IP复刻" src="/icons/shield.svg" class="mx-auto w-12 h-12" />
        <p class="mt-2 text-sm">IP复刻</p>
      </router-link>
    </div>
  </main>
</template>