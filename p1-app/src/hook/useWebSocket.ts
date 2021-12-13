import { useEffect, useRef, useState } from 'react';
import { w3cwebsocket } from 'websocket';

export const useWebSocket = ( { url, onConnected } ) => {
    const [data, updateData] = useState<number[]>([0,0,0,0,0,0,0,0,0,0]);
    const [reconnect, setReconnect] = useState<boolean>(false);
    const socket = useRef(null);

    useEffect(() => {
        console.log("running socket");
        socket.current = new w3cwebsocket(url);

        socket.current.onopen = () => {
            onConnected(socket.current)
        }

        socket.current.onclose = () => {
            if (socket.current) {
                if (reconnect) return;
                setReconnect(true);
                setTimeout(() => {
                    setReconnect(false)
                }, 2000);
            }
        }

        socket.current.onmessage = (e) => {
            const msg = JSON.parse((e.data).toString());
            let array = [...data, parseFloat(msg?.used), ];

            if (data.length >= 9) {
                array.shift();
            }

            updateData(array)
        }

        return () => {
            socket.current.close();
            socket.current = null;
        }
    }, [reconnect, url]);

    const readyState = () => {
        switch (socket.current.readyState) {
          case 0:
            return 'CONNECTING';
          case 1:
            return 'OPEN';
          case 2:
            return 'CLOSING';
          case 3:
            return 'CLOSED';
          default:
            return;
        }
    }

    return {
        socket: socket.current,
        readyState: readyState,
        reconnect,
        data,
    };

}
