<template>
  <div class="body">
    <div class="progress-section">
      <div class="progress-bar-wrap">
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  mounted: function () {
    this.progressBar();
  },
  methods: {
    progressBar() {
      let progressSection = document.querySelector('.progress-section');
      let progressBar = document.querySelector('.progress-bar');
      let progressNum = document.querySelector('.progress-num');

      function getScrollPercentage() {
        return (
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
        );
      }

      function updateProgressBar() {
        progressBar.style.height = `${getScrollPercentage()}%`;
        requestAnimationFrame(updateProgressBar);
      }

      updateProgressBar();
    },
  },
};
</script>

<style scoped>
.progress-section {
  position: fixed;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  will-change: transform;
  transition: 0.3s ease-out;
  z-index: 1;
}

.progress-bar-wrap {
  position: relative;
  width: 10px;
  overflow: hidden;
  background-color: var(--primary-color);
}

.progress-bar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0;
  background-color: var(--secondary-color);
}
@media (max-width: 600px) {
  .progress-section {
    width: 5px;
  }
  .progress-bar-wrap {
    width: 5px;
  }
}
</style>
