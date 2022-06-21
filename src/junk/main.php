<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="/app/javascript/websocket.js"></script>
    <style type="text/css">
        .message {
            padding-bottom: 20px;
        }

        input, div {
            font-size: x-large;
        }
    </style>
    <title>web-socket</title>
</head>
<body>
    <h1>{Тестируем веб сокет}</h1>
    <h2>--При отправке сообщения, наш веб-сокет вернет его обратно. Заготовка для терминала!--</h2>
    <h3>---В дальнейшем он не будет ждать сообщения. А будет опрашивать картридер и считывать с него серийный номер чипа, после чего отправлять его на фронт. И сообщение о том что работа выполнена и необходимо зарыть соединение!---</h3>
    <script>
        setUpSocket(displayMessage);
    </script>

    <form action="#" onsubmit="return handleSubmit()">
        <input type="text" id="chat-msg" />
        <input type="submit" value="send" />
    </form>

    <div id="container">

    </div>
</body>
</html>