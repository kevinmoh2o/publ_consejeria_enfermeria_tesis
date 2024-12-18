<template>
    <div class="container">
        <div class="entryarea">
            <input type="text" required>
            <div class="labelline">Enter your Name</div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="css" scoped>


.container {
    width: 200px;
    margin: 16px;
}

.entryarea {
    position: relative;
    height: 40px;
    line-height: 40px;
}

input {
    position: absolute;
    width: 100%;
    outline: none;
    font-size: 15px;
    padding: 0 10px;
    line-height: 40px;
    border-radius: 7px;
    border: 1px solid var(--color-before);
    background: transparent;
    transition: 0.1s ease;
    z-index: 1111;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.labelline {
    position: absolute;
    font-size: 15px;
    color: var(--color-before);

    margin: 0 20px;
    background-color: var(--color-fondo-claro);
    transition: 0.2s ease;
    height: 100%;
    top: 50%;
    transform: translate(0, -50%);
}


input:focus,
input:valid {
    color: var(--color-selected);
    border: 2px solid var(--color-selected);
}

input:focus+.labelline,
input:valid+.labelline {
    color: var(--color-selected);
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    transform: translate(0, -40px) scale(0.88);
    z-index: 1111;
}
</style>