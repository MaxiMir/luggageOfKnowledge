export default function ({store, redirect}) {
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/admin/login?message=login') // function nuxt
  }
}
