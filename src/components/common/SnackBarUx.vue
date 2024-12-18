<!-- <template>
    <v-snackbar :value="snackbar.status" @input="handleInput" :multi-line="snackbar.multiLine" :timeout="snackbar.timeout"
        :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="closeSnackbar">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        snackbar: Object
    },
    methods: {
        closeSnackbar() {
            this.$emit('update-status', false);
        },
        handleInput(value) {
            this.$emit('update-status', value);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
 -->