import mitt from "mitt";

export const emitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("eventBus", emitter);

  return emitter;
});
