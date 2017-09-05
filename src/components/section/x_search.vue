<template>
  <div class="input-group">
    <input type="text" class="form-control" name="keyword" placeholder="Search for..." @keyup.enter="SearchClick" v-model.trim="searchStr">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click.stop.prevent="SearchClick">Search</button>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'x-search',
    data: function () {
      return {
        searchStr: ''
      }
    },
    methods: {
      SearchClick: function () {
        this.$emit('onSearch', [this.searchStr])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input:focus {
    border-color: #CC6666;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  }
</style>
