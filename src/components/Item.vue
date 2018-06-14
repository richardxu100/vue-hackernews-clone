<template>
  <li class="news-item">
    <a :href="item.url">{{ item.title }}</a>
    {{ item.by }} {{ item.score }}
  </li>
</template>

<script>
  export default {
    props: ['item']
  }
</script>