<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import {useTheme} from 'vuetify'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { ref } from 'vue'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

const register = () => {
  console.log('register', form)

  axios.post('/api/auth/register', {
    name: form.value.username,
    email: form.value.email,
    password: form.value.password,
    c_password: form.value.password,
  }).then(response => {
    console.log('response >>>', response)
  })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo"/>
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Materio
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Adventure starts here 🚀
        </h5>
        <p class="mb-0">
          Make your app management easy and fun!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => { register() }">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="isPasswordVisible ? 'text' : 'password'"
                label="Password"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    class="text-primary"
                    href="javascript:void(0)"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              class="text-center text-base"
              cols="12"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>

            <VCol
              class="d-flex align-center"
              cols="12"
            >
              <VDivider/>
              <span class="mx-4">or</span>
              <VDivider/>
            </VCol>

            <!-- auth providers -->
            <VCol
              class="text-center"
              cols="12"
            >
              <AuthProvider/>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      :src="authV1Tree"
      :width="250"
      class="auth-footer-start-tree d-none d-md-block"
    />

    <VImg
      :src="authV1Tree2"
      :width="350"
      class="auth-footer-end-tree d-none d-md-block"
    />

    <!-- bg img -->
    <VImg
      :src="authThemeMask"
      class="auth-footer-mask d-none d-md-block"
    />
  </div>
</template>

<style lang="scss">
@use "@core-scss/pages/page-auth.scss";
</style>
