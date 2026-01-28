<script setup>

</script>

<template>
  <div class="login-container">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">register</legend>

      <label class="label">name</label>
      <input type="text" class="input" placeholder="nickname" />
      <p class="label">sus passWort</p>

      <label class="label">password</label>
      <input type="text" class="input" placeholder="Password" />
      <p class="label">sus passWort</p>

      <label class="label">repeat passWort</label>
      <input type="text" class="input" placeholder="repeat" />
      <p class="label">sus passWort - 2</p>
    </fieldset>
    <button class="btn "
            @click="console.log('sus')"
    >register</button>
  </div>
</template>

<style scoped>

</style>