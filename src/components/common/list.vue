<template>
  <div class="wrap-list">
    <h2>组件用例列表</h2>
    <router-link v-for="item in demoList" :key="item.id" :to="{ name: item.routerName}">
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      demoList: [
        {
          id: 0,
          routerName: 'transferDemo',
          name: '穿梭框'
        }
      ]
    }
  }
}
</script>
