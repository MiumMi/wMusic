export const allmixin = {
  data () {
    return {

    }
  },
  methods: {
    routerPush (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.push({ name, params, query })
    }
  },
  computed: {

  }
}
