<template>
    <div class="card-wrap">
        <div ref="meetingRef" style="width: 100%; height: 100%;"></div>
    </div>
</template>

<script>

    import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { putDurationEvent } from '@/helpers/AgendaFunc';
    import { adjustHeightForPcandMobile } from '@/utils/Hardware';

    export default {
        name: 'video-conference',
        setup() {
            const route = useRoute();
            const meetAPI = ref(null);
            const evento = ref(null);
            const fecIni = ref(null);
            const channel = ref(null);


            onMounted(() => {
                adjustHeightForPcandMobile()
                //console.log("VIDEO CONFERENCIA");
                const eventoString = route.query.valor;
                //const reunion = route.query.meeting;
                if (eventoString) {
                    evento.value = JSON.parse(decodeURIComponent(eventoString));
                    //console.log("eventoString: ", evento)
                }
            })

            return {
                evento,
                meetAPI,
                fecIni,
                channel,

                adjustHeightForPcandMobile,
            }
        },
        mounted() {
            this.fecIni = new Date();
            //console.log("VIDEO CONFERENCIA")
            const reunion = this.$route.query.meeting;
            const options = {
                parentNode: this.$refs.meetingRef,
                roomName: reunion,
                width: '100%',
                height: '100%',
                configOverwrite: {
                    startWithAudioMuted: true,
                    startWithVideoMuted: true,
                },
            };

            this.meetAPI = new JitsiMeetExternalAPI(process.env.VUE_APP_JITSI_MEET_URL, options);


            this.meetAPI.addListener('videoConferenceLeft', async (event) => {
                var fecFin = new Date();
                this.meetAPI.dispose();
                const differenceInMinutes = (fecFin - this.fecIni) / 60000;
                const { message, status, data } = await putDurationEvent(this.$store, {
                    idEvento: this.evento.id,
                    duration: differenceInMinutes
                });
                this.$emit('conferenceLeft');
                this.channel.postMessage({ type: 'CONFERENCE_CLOSED', payload: {} });
                window.close();
            });

            this.channel = new BroadcastChannel('video_conference_channel');
        },
        methods: {
            async sleep(ms) {
                return await new Promise(resolve => setTimeout(resolve, ms));
            },
        },
        beforeUnmount() {
            if (this.meetAPI) {
                this.meetAPI.dispose();
            }
        },
    }
</script>


<style lang="scss" scoped>
    .card-wrap {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        height: calc(var(--vh, 1vh) * 100);
    }
</style>




<!-- <template>
    <div>
        <div ref="meeting"></div>
    </div>
</template>

<script>

    import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    export default {
        name: 'video-conference',
        setup() {
            const meetingRef = ref(null);
            const route = useRoute();

            const meetAPI = ref(null);
        },
        mounted() {
            console.log("VIDEO CONFERENCIA")
            const reunion = this.$route.query.meeting;


            const options = {
                parentNode:
                console.log("this.$refs.meeting: ",this.$refs.meeting) this.$refs.meeting,
                roomName: reunion,
                width: '100vw',
                height: '100vh',
                configOverwrite: {
                    startWithAudioMuted: true,
                    startWithVideoMuted: true,
                },
            };

            this.meetAPI = new JitsiMeetExternalAPI(process.env.VUE_APP_JITSI_MEET_URL, options);


            this.meetAPI.addListener('videoConferenceLeft', (event) => {
                //console.log('videoConferenceLeft left:', event);
                this.meetAPI.dispose();
                //this.$router.push('/menu-main');
                window.close();
            });
        },
        beforeUnmount() {
            if (this.meetAPI) {
                this.meetAPI.dispose();
            }
        },
        created() {

            const eventoString = this.$route.query.valor;

            if (eventoString) {
                const evento = JSON.parse(decodeURIComponent(eventoString));
                console.log("eventoString: ", evento)
                //console.log("this.evento", evento);
                this.evento = evento;
            }
        },
        data() {
            return {
                evento: {},
                meetAPI: null,
            }

        },

        methods: {
            async onBackHandle() {
                this.$router.push('/menu-main');
            }
        },


        //this.meetAPI.addListener('cameraError', (event)=>{console.log('cameraError left:', event);});
        //this.meetAPI.addListener('avatarChanged', (event)=>{console.log('avatarChanged left:', event);});
        //this.meetAPI.addListener('audioAvailabilityChanged', (event)=>{console.log('audioAvailabilityChanged left:', event);});
        //this.meetAPI.addListener('audioMuteStatusChanged', (event)=>{console.log('audioMuteStatusChanged left:', event);});
        //this.meetAPI.addListener('breakoutRoomsUpdated', (event)=>{console.log('breakoutRoomsUpdated left:', event);});
        //this.meetAPI.addListener('browserSupport', (event)=>{console.log('browserSupport left:', event);});
        //this.meetAPI.addListener('contentSharingParticipantsChanged', (event)=>{console.log('contentSharingParticipantsChanged left:', event);});
        //this.meetAPI.addListener('dataChannelOpened', (event)=>{console.log('dataChannelOpened left:', event);});
        //this.meetAPI.addListener('endpointTextMessageReceived', (event)=>{console.log('endpointTextMessageReceived left:', event);});
        //this.meetAPI.addListener('nonParticipantMessageReceived', (event)=>{console.log('nonParticipantMessageReceived left:', event);});
        //this.meetAPI.addListener('faceLandmarkDetected', (event)=>{console.log('faceLandmarkDetected left:', event);});
        //this.meetAPI.addListener('errorOccurred', (event)=>{console.log('errorOccurred left:', event);});
        //this.meetAPI.addListener('knockingParticipant', (event)=>{console.log('knockingParticipant left:', event);});
        //this.meetAPI.addListener('largeVideoChanged', (event)=>{console.log('largeVideoChanged left:', event);});
        //this.meetAPI.addListener('log', (event)=>{console.log('log left:', event);});
        //this.meetAPI.addListener('micError', (event)=>{console.log('micError left:', event);});
        //this.meetAPI.addListener('screenSharingStatusChanged', (event)=>{console.log('screenSharingStatusChanged left:', event);});
        //this.meetAPI.addListener('dominantSpeakerChanged', (event)=>{console.log('dominantSpeakerChanged left:', event);});
        //this.meetAPI.addListener('raiseHandUpdated', (event)=>{console.log('raiseHandUpdated left:', event);});
        //this.meetAPI.addListener('tileViewChanged', (event)=>{console.log('tileViewChanged left:', event);});
        //this.meetAPI.addListener('chatUpdated', (event)=>{console.log('chatUpdated left:', event);});
        //this.meetAPI.addListener('incomingMessage', (event)=>{console.log('incomingMessage left:', event);});
        //this.meetAPI.addListener('mouseEnter', (event)=>{console.log('mouseEnter left:', event);});
        //this.meetAPI.addListener('mouseLeave', (event)=>{console.log('mouseLeave left:', event);});
        //this.meetAPI.addListener('mouseMove', (event)=>{console.log('mouseMove left:', event);});
        //this.meetAPI.addListener('participantMenuButtonClick', (event)=>{console.log('participantMenuButtonClick left:', event);});
        //this.meetAPI.addListener('toolbarButtonClicked', (event)=>{console.log('toolbarButtonClicked left:', event);});
        //this.meetAPI.addListener('outgoingMessage', (event)=>{console.log('outgoingMessage left:', event);});
        //this.meetAPI.addListener('displayNameChange', (event)=>{console.log('displayNameChange left:', event);});
        //this.meetAPI.addListener('deviceListChanged', (event)=>{console.log('deviceListChanged left:', event);});
        //this.meetAPI.addListener('emailChange', (event)=>{console.log('emailChange left:', event);});
        //this.meetAPI.addListener('feedbackSubmitted', (event)=>{console.log('feedbackSubmitted left:', event);});
        //this.meetAPI.addListener('filmstripDisplayChanged', (event)=>{console.log('filmstripDisplayChanged left:', event);});
        //this.meetAPI.addListener('moderationStatusChanged', (event)=>{console.log('moderationStatusChanged left:', event);});
        //this.meetAPI.addListener('moderationParticipantApproved', (event)=>{console.log('moderationParticipantApproved left:', event);});
        //this.meetAPI.addListener('moderationParticipantRejected', (event)=>{console.log('moderationParticipantRejected left:', event);});
        //this.meetAPI.addListener('notificationTriggered', (event)=>{console.log('notificationTriggered left:', event);});
        //this.meetAPI.addListener('participantJoined', (event)=>{console.log('participantJoined left:', event);});
        //this.meetAPI.addListener('participantKickedOut', (event)=>{console.log('participantKickedOut left:', event);});
        //this.meetAPI.addListener('participantLeft', (event)=>{console.log('participantLeft left:', event);});
        //this.meetAPI.addListener('participantRoleChanged', (event)=>{console.log('participantRoleChanged left:', event);});
        //this.meetAPI.addListener('participantsPaneToggled', (event)=>{console.log('participantsPaneToggled left:', event);});
        //this.meetAPI.addListener('passwordRequired', (event)=>{console.log('passwordRequired left:', event);});
        //this.meetAPI.addListener('videoConferenceJoined', (event)=>{console.log('videoConferenceJoined left:', event);});
        //this.meetAPI.addListener('videoMuteStatusChanged', (event)=>{console.log('videoMuteStatusChanged left:', event);});
        //this.meetAPI.addListener('videoQualityChanged', (event)=>{console.log('videoQualityChanged left:', event);});
        //this.meetAPI.addListener('readyToClose', (event)=>{console.log('readyToClose left:', event);});
        //this.meetAPI.addListener('recordingLinkAvailable', (event)=>{console.log('recordingLinkAvailable left:', event);});
        //this.meetAPI.addListener('recordingStatusChanged', (event)=>{console.log('recordingStatusChanged left:', event);});
        //this.meetAPI.addListener('subjectChange', (event)=>{console.log('subjectChange left:', event);});
        //this.meetAPI.addListener('suspendDetected', (event)=>{console.log('suspendDetected left:', event);});
        //this.meetAPI.addListener('peerConnectionFailure', (event)=>{console.log('peerConnectionFailure left:', event);});
        //this.meetAPI.addListener('transcribingStatusChanged', (event)=>{console.log('transcribingStatusChanged left:', event);});
        //this.meetAPI.addListener('transcriptionChunkReceived', (event)=>{console.log('transcriptionChunkReceived left:', event);});
        //this.meetAPI.addListener('whiteboardStatusChanged', (event)=>{console.log('whiteboardStatusChanged left:', event);});
        //this.meetAPI.addListener('p2pStatusChanged', (event)=>{console.log('p2pStatusChanged left:', event);});
    }
</script> -->