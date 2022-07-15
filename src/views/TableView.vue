<template>
  <div class="g-table">
    <GuestTable/>
  </div>
</template>

<script>
  import GuestTable from "@/components/GuestTable";

  export default {
    name: 'GuestTableView',

    components: {
      GuestTable,
    },
  }
</script>
