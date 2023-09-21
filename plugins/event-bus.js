import mitt from "mitt";

export const emitter = mitt();

console.log(emitter);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("eventBus", emitter);
});
