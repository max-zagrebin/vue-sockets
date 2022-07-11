<!--При отправке сообщения наш веб-сокет вернет его обратно. Это заготовка для терминала.-->
<!--В дальнейшем он не будет ждать сообщения.-->
<!--А будет опрашивать картридер и считывать с него серийный номер чипа,-->
<!--после чего отправлять его на фронт. И сообщение о том что работа выполнена и необходимо зарыть соединение!-->
<template>
  <div class="container">
    <div class="form-container">
      Socket-Dual Connection Test

      <button class="form-container__button"
              v-if="!isConnectionOpened"
              @click="setUpSocket">
        Установить соединение
      </button>
      <button class="form-container__button"
              v-if="isConnectionOpened"
              @click="closeSocket">
        Закрыть соединение
      </button>
      <p>{{ currentStatusText }}</p>
      <div>
        <!--    <form action="#" @submit="handleSubmit">-->
        <!--      <input type="text" id="chat-msg"/>-->
        <!--      <input type="submit" value="Отправить"/>-->
        <!--    </form>-->
      </div>
      <div class="conf-container">
        <div>Конфигурация сокета:</div>
        <div>Порт: {{ socketPort }}</div>
        <div> Метод: {{ socketMethod }}</div>
      </div>
    </div>

    <div class="message-container">
      <p>Полученные сообщения</p>
      <button class=""
              @click="clearResponses">
        Очистить
      </button>
      <div class="message" v-for="(response, index) in responses" :key="index">
        {{ response.deviсe }}: {{ response.code }}
      </div>
    </div>
  </div>
</template>
<script>
import Response from '../functions/json-response';

export default {
  name: "SocketConnection",
  data: function () {
    return {
      currentStatusText: "",
      statusText: {
        "wait": "Ожидание соединения...",
        "connected": "Соединение установлено успешно.",
        "disconnected": "Соединение завершено. Для обмена сообщениями установите новое соединение.",
        "reset": "Соединение разорвано.",
        "failed": "Соединение не установлено."
      },
      isConnectionOpened: false,
      socket: null,
      responses: [],
      socketPort: "436",
      socketMethod: "listenCard"

      // this.socket = new WebSocket("ws://localhost:436/listenCard");
    }
  },
  mounted() {
  },
  methods: {
    clearResponses(){
      this.responses = [];
    },
    closeSocket() {
      // this.socket.close();
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
        this.socket = null;
      } else {
        this.currentStatusText = this.statusText['reset'] + ` Код: ${event.code}, Причина: ${event.reason}`;
        console.log('ERROR: Connection reset');
        this.socket = null;
        // console.log('Code: ' + event.code + ' reason: ' + event.reason);
      }
    },
    setUpSocket() {
      console.log("Set Up");
      this.currentStatusText = this.statusText['wait'];
      let urlString = `ws://localhost:${this.socketPort}/${this.socketMethod}`;
      console.log(urlString);
      this.socket = new WebSocket(urlString);
      this.socket.onopen = this.onOpenSocketConnection;
      this.socket.onclose = this.onCloseSocketConnection;
      this.socket.onmessage = this.onMessageReceived;
      this.socket.onerror = function (error) {
        console.log("Ошибка " + error.message);
        this.currentStatusText = this.statusText['failed'];
      }
    },
    onMessageReceived(msg) {
      let response = new Response(msg);
      if (response.isDataPresent()) {
        this.responses.push(response.getDatasetElem("readers"));
      }
    }
  }
}

</script>

<style scoped>

.container {
  display: flex;
  flex-flow: row nowrap;
  /*margin: 0 auto;*/
  column-gap: 20px;
  padding: 0px 40px;
}

.form-container {
  display: flex;
  flex-flow: column nowrap;
  width: 30%;
  /*margin: 0 auto;*/
  row-gap: 10px;
  /*max-w*/
}

.form-container__button {
  max-width: 300px;
  margin: 0 auto;
}

.conf-container {
  display: flex;
  flex-flow: column nowrap;
  row-gap: 10px;
  align-items: flex-start;
}
.message-container{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  row-gap: 10px;
  width: 70%;
}
</style>