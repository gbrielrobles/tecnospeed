<template>
  <div class="dropdown" :class="{ 'is-open': isOpen }">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">{{ stepNumber }}</span>
      <div class="dropdown-info">
        <div class="dropdown-title">{{ title }}</div>
        <div class="dropdown-value">{{ value }}</div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-options">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownBase',
  props: {
    title: String,
    value: String,
    stepNumber: Number
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>