<template>
  <div>

    <p>
      Network error
    </p>

    <p class="error">
      <slot />
    </p>

  </div>
</template>

<style scoped>
div {
  margin: auto;
  background: var(--main-bg);
  box-shadow: var(--box-shadow);
}

p {
  padding: 1rem;
  text-align: center;
}

.error {
  font-size: .6rem;
  background: var(--rgba-dark);
}
</style>