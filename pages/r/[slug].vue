<script setup>
definePageMeta({
  layout: 'default',
})

const route = useRoute()

await navigateTo(
  {
    path: '/',
    query: {
      ...route.query,
      ref: String(route.params.slug),
    },
  },
  { replace: true },
)
</script>
