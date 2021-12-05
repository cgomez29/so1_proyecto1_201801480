package socket

import (
	"fmt"
	"log"

	socketio "github.com/googollee/go-socket.io"
)

func CreateServerSocket() *socketio.Server {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		log.Println("A new user connected")
		s.Join("chat_room")
		s.SetContext("")
		return nil
	})

	server.OnEvent("/", "chat message", func(s socketio.Conn, msg string) {
		log.Println("A new user connected")
		s.SetContext(msg)
		s.Emit("chat message", "SIIU "+msg)
	})

	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	return server
}
