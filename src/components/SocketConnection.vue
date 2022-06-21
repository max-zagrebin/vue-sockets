<template>
  Socket Connection Test
  <p>
    При отправке сообщения наш веб-сокет вернет его обратно. Это заготовка для терминала.
    В дальнейшем он не будет ждать сообщения.
    А будет опрашивать картридер и считывать с него серийный номер чипа,
    после чего отправлять его на фронт. И сообщение о том что работа выполнена и необходимо зарыть соединение!</p>
  <button @click="setUpSocket(displayMessage)">Установить соединение</button>
  <button @click="closeSocket" v-if="isConnectionOpened">Закрыть соединение</button>
  <form action="#" @submit="handleSubmit" v-if="isConnectionOpened">
    <input type="text" id="chat-msg"/>
    <input type="submit" value="send"/>
  </form>
  <div id="container">
  </div>
</template>

<script>
export default {
  name: "SocketConnection",
  data: function () {
    return {
      isConnectionOpened: false,
      socket: null,
    }
  },
  mounted() {

    // this.setUpSocket(this.displayMessage);
  },
  methods: {
    closeSocket(){
      this.socket.close();
      this.isConnectionOpened = false;
    },
    onOpenSocketConnection(){
      console.log("Connected");
      this.isConnectionOpened = true;
    },
    onCloseSocketConnection(event){
      if (event.wasClean) {
        console.log('Connection closed');
        this.isConnectionOpened = false;
      } else {
        console.log('ERROR: Connection reset');
        console.log('Code: ' + event.code + ' reason: ' + event.reason);
      }
    },
    setUpSocket(onmessage) {
      console.log("Set Up");
      this.socket = new WebSocket("ws://localhost:8080/getDateNow");
      this.socket.onopen = this.onOpenSocketConnection;
      this.socket.onclose = this.onCloseSocketConnection;

      this.socket.onmessage = onmessage;

      this.socket.onerror = function (error) {
        console.log("Ошибка " + error.message);
      }
    },
    sendMessage(msg) {
      let len = '' + msg.length
      while (len.length < 5) len += ' '
      this.socket.send(len + msg)
    },
    handleSubmit() {
      console.log("Handle Submit");
      var el = document.getElementById("chat-msg")
      this.sendMessage(el.value)
      el.value = ''

      return false;
    },
    displayMessage(msg) {
      let container = document.getElementById("container")

      let div = document.createElement("div")
      div.className = 'message'

      let textNode = document.createTextNode(msg.data);

      div.appendChild(textNode)
      container.appendChild(div)
    }
  }
}

</script>

<style scoped>

</style>