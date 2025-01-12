<template>
    <div>
        <div v-if="state === 'initial'">
            <input v-model="username" type="text" placeholder="Enter username" />
            <button @click="registerUser">Register</button>
        </div>
        <div v-if="state === 'registered'">
            <input v-model="usernameToCall" type="text" placeholder="Enter username to call" />
            <button @click="callUser">Call</button>
        </div>
        <div v-if="state === 'incall'">
            <video ref="localVideo" autoplay></video>
            <video ref="remoteVideo" autoplay></video>
            <audio ref="remoteAudio" autoplay style="display:none;"></audio>
            <p>Ongoing call...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VideoCallManager } from '../services/videocall/manager';

const state = ref('initial');
const username = ref('');
const usernameToCall = ref('');
const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);
const remoteAudio = ref<HTMLAudioElement | null>(null);

const videoCallManager = new VideoCallManager({
    token: 'januscaler-demo-token',
    localVideoElement: localVideo,
    remoteVideoElement: remoteVideo,
    remoteAudioElement: remoteAudio,
});

async function registerUser() {
    await videoCallManager.register(username.value);
    state.value = 'registered';
}

async function callUser() {
    await videoCallManager.call(usernameToCall.value);
    state.value = 'incall';
}
</script>


<style scoped>
/* Add your styles here */
</style>
