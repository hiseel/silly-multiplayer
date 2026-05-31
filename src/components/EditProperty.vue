<script setup>
import {ref} from "vue";

const props = defineProps(["name", "value", "onchange"]);
const change = ref(props.value);
function reset() {
  change.value = props.value;
}
function submit() {
  props.onchange(change.value);
}
</script>

<template>
  <div class="card flex flex-row">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{props.name}}</legend>
      <input type="text" class="input" :placeholder="value" v-model="change" />
    </fieldset>
    <div v-if="change !== value">
      <input type="submit" value="Submit" class="btn" @click="submit" />
      <input type="reset" value="Reset" class="btn" @click="reset" />
    </div>
  </div>
</template>

<style scoped>

</style>