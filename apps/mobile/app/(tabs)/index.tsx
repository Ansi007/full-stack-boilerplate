import { Button } from "@repo/ui/button";

export default function HomeScreen() {
  return (
      <Button onClick={callAPI} className={'underline'}>
        Hit NestJS API
      </Button>
  );
}

async function callAPI() {
  const response = await fetch('http://localhost:4000');
  const result = await response.text();
  alert(result);
}
