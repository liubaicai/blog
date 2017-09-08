<template>
  <div>
    <div id='comments'></div>
  </div>
</template>

<script>
  import Gitment from 'gitment'
  import 'gitment/style/default.css'

  export default {
    name: 'x-comment',
    props: ['gid'],
    mounted: function () {
      if (this.gid) {
        this.initComment()
      }
    },
    watch: {
      'gid' (to, from) {
        this.initComment()
      }
    },
    data: function () {
      return {
      }
    },
    methods: {
      initComment: function () {
        if (this.gid) {
          var gitment = new Gitment({
            id: `${this.gid}`,
            owner: 'liubaicai',
            repo: 'baicai_rails_blog',
            oauth: {
              client_id: 'b202d06a4c5b204e86f6',
              client_secret: '2b0e1be40a33bb2f16b0d909a9c70ee6eb0bdea1'
            }
          })
          gitment.render('comments')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
