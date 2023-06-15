<script setup>
import { storeToRefs } from 'pinia'

import { useAlertStore } from '@/stores/alert.store'

const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)
</script>

<template>
  <div v-if="alert">
    <VAlert
      :type="alert.type"
      variant="outlined"
    >
      <div class="d-flex flex-row align-center justify-space-between">
        <div>
          {{ alert.message }}
        </div>

        <VIcon
          icon="mdi-close"
          @click="alertStore.clear()"
        />
      </div>
    </VAlert>
  </div>
</template>
