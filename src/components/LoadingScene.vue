<template>
    <div class="loading-page">
        <img class="loading-page--spinner" src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/90-ring.svg">
    </div>
</template>

<style scoped lang="scss">
.loading-page {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.4);

    &--spinner {
        position: relative;
        width: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>