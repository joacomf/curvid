<template>
  <div class="spinner-container">
    <div class="anillo-doble"></div>
  </div>
</template>

<script>
export default {
  name: 'cargando'
}
</script>

<style lang="scss" scoped>
.spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9)
}
.anillo-doble {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;

  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #333;
    border-color: #333 transparent #333 transparent;
    animation: anillo-doble 1.2s linear infinite;
  }
}

@keyframes anillo-doble {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
