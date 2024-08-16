<template>
    <div>
videocall
    </div>
</template>

<script setup lang="ts">
import {JanuScaler}  from '@januscaler/browser-sdk'
const client=new JanuScaler()
await client.init({})
const videoCallHandle=await client.videoCall.createServiceHandle()

</script>

<style scoped>

</style>