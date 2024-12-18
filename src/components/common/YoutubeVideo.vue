<template>
    <div class="youtube-video-container">
        <iframe width="560" height="315" :src="videoUrl" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    </div>
</template>

<script>
    export default {
        name: 'YoutubeVideo',
        props: {
            videoId: {
                type: String,
                required: true
            }
        },
        computed: {
            videoUrl() {
                return `https://www.youtube.com/embed/${this.videoId}`;
            }
        }
    }
</script>

<style>
    .youtube-video-container {
        width: 100%;
        max-width: 560px;
        aspect-ratio: 16 / 9;
    }

    .youtube-video-container {
        height: 100%;
        /* O cualquier altura específica que necesites */
    }

    .youtube-video-container iframe {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        /* Opcional, si el iframe necesita bordes redondeados explícitos */
    }
</style>