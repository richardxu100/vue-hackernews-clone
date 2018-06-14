<template>
  <li class="news-item">
    <!-- <a>{{ item.title }}</a>
    {{ item.by }} {{ item.url }} {{ item.score }} -->
    {{ item.url }}
  </li>
</template>

<script>
  export default {
    props: ['item']
  }
</script>