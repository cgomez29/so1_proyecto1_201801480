import Tree from '@naisutech/react-tree';
import { useEffect, useRef, useState } from 'react';
import { w3cwebsocket } from 'websocket';


interface Child {
  id: string;
  label: string;
  parentId: string | null;
  items: Child[];
}

export const ProcessTree = () => {
  const [data, updateData] = useState<Child[]>([])
  const client = useRef<any>(null);

  useEffect(() => {
    client.current = new w3cwebsocket('ws://localhost:4000/tree');

    client.current.onopen = () => {
      console.log('Websocket client connected')
      const obj = { run: 'start' };
      client.current.send(JSON.stringify(obj));
    }

    client.current.onclose = () => {
      console.log('Connection closed.');
    };

    client.current.onmessage = (evt: any) => {
      //preparando string
      let json = (evt.data).toString().replaceAll('"parentId":""', '"parentId": null')
      json = json.replaceAll(',"items":null', '')
      const array: Child[] = JSON.parse(json).tree;
      updateData(array);
    };

    return () => {
      client.current.close();
      client.current = null;
    }

  }, []);

  return (
    <div>
      <Tree nodes={data} theme='light' />
    </div>
  )
}
