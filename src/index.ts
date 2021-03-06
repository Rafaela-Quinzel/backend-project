import express, { Express } from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { musicRouter } from "./controller.ts/routes/musicRouter"
import { userRouter } from "./controller.ts/routes/userRouter"
import { playlistRouter } from "./controller.ts/routes/playlistRouter"


const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/music", musicRouter)
app.use("/playlist", playlistRouter)



const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server running on http://localhost:${address.port}`)
   } else {
      console.error(`Failed to run the server.`)
   }
})  