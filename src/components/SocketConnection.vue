<template>
  Socket Connection Test
  <p>
    При отправке сообщения наш веб-сокет вернет его обратно. Это заготовка для терминала.
    В дальнейшем он не будет ждать сообщения.
    А будет опрашивать картридер и считывать с него серийный номер чипа,
    после чего отправлять его на фронт. И сообщение о том что работа выполнена и необходимо зарыть соединение!</p>
  <button @click="setUpSocket(displayMessage)">Установить соединение</button>
  <button @click="closeSocket" v-if="isConnectionOpened">Закрыть соединение</button>
  <p>{{ currentStatusText }}</p>
  <div v-show="isConnectionOpened">
    <form action="#" @submit="handleSubmit">
      <input type="text" id="chat-msg"/>
      <input type="submit" value="Отправить"/>
    </form>
    <p>Сообщения:</p>
    <div id="container">
    </div>
  </div>
</template>
<script>
export default {
  name: "SocketConnection",
  data: function () {
    return {
      currentStatusText: "",
      statusText: {
        "wait": "Ожидание соединения...",
        "connected": "Соединение установлено успешно.",
        "disconnected": "Соединение завершено.",
        "reset": "Соединение разорвано.",
        "failed": "Соединение не установлено."
      },
      isConnectionOpened: false,
      socket: null,
    }
  },
  mounted() {
  },
  methods: {
    closeSocket() {
      this.socket.close();
      this.isConnectionOpened = false;
    },
    onOpenSocketConnection() {
      console.log("Connected");
      this.currentStatusText = this.statusText['connected'];
      this.isConnectionOpened = true;
    },
    onCloseSocketConnection(event) {
      if (event.wasClean) {
        this.currentStatusText = this.statusText['disconnected'];
        console.log('Connection closed');
        this.isConnectionOpened = false;
      } else {
        this.currentStatusText = this.statusText['reset'] + ` Код: ${event.code}, Причина: ${event.reason}`;
        console.log('ERROR: Connection reset');
        // console.log('Code: ' + event.code + ' reason: ' + event.reason);
      }
    },
    setUpSocket(onmessage) {
      console.log("Set Up");
      this.currentStatusText = this.statusText['wait'];
      this.socket = new WebSocket("ws://localhost:8080/getDateNow");
      this.socket.onopen = this.onOpenSocketConnection;
      this.socket.onclose = this.onCloseSocketConnection;
      this.socket.onmessage = onmessage;
      this.socket.onerror = function (error) {
        console.log("Ошибка " + error.message);
        this.currentStatusText = this.statusText['failed'];
      }
    },
    sendMessage(msg) {
      let len = '' + msg.length
      while (len.length < 5) len += ' '
      this.socket.send(len + msg)
    },
    handleSubmit() {
      console.log("Handle Submit");
      let el = document.getElementById("chat-msg")
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