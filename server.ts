import express, { Application } from 'express'
import cors from 'cors'
import http from 'http';
import { Server, Socket } from 'socket.io';
import routes from './routes'
import { INITIAL_DATA } from './configs/socketio';

export const app: Application = express()

app.use(cors({origin: ["*"]}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.send('Project somethingGame'))

app.use('/api', routes)

const server = http.createServer(app);
const io = new Server(server);

let time = 0;
let data = INITIAL_DATA
io.on('connection', (socket: Socket) => {
  
    console.log(`UserId[${socket.id}] Connected...`);

    socket.emit("initial-data", data);

    socket.emit("time", time);

    socket.on("time", (updateTime) => {
      time = updateTime;
      io.emit("time", time);
    });

    socket.on("update-score", (id, newScore) => {
      const player = data.findIndex((player) => player.id === id);
      if (player !== -1) {
        data[player] = {
          ...data[player],
          score: newScore,
        };
        io.emit("updated-data", data);
      }
    });

    socket.on("update-question", (id, newQuestion) => {
      const player = data.findIndex((player) => player.id === id);
      if (player !== -1) {
        data[player] = {
          ...data[player],
          question: newQuestion,
        };
        io.emit("updated-data", data);
      }
    });

    socket.on("update-isIncorrect", (id, NewisIncorrect) => {
      const player = data.findIndex((player) => player.id === id);
      if (player !== -1) {
        data[player] = {
          ...data[player],
          isIncorrect: NewisIncorrect,
        };
        io.emit("updated-data", data);
      }
    });

    socket.on("update-disabledInput", (id, NewDisabledInput) => {
      const player = data.findIndex((player) => player.id === id);
      if (player !== -1) {
        data[player] = {
          ...data[player],
          disabledInput: NewDisabledInput,
        };
        io.emit("updated-data", data);
      }
    });
    
    socket.on("update-textInput", (id, NewTextInput) => {
      const player = data.findIndex((player) => player.id === id);
      if (player !== -1) {
        data[player] = {
          ...data[player],
          textInput: NewTextInput,
        };
        io.emit("updated-data", data);
      }
    });
  
    socket.on("message", (message) => {
      io.emit("message", message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3001

try {
  server.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`)
  })
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`)
}
