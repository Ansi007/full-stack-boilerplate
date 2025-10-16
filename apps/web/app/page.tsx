"use client"

import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div>
      <Button onClick={callAPI} className={'underline'}>
        Hit NestJS API
      </Button>
    </div>
  );
}

async function callAPI() {
  const response = await fetch('http://localhost:4000');
  const result = await response.text();
  alert(result);
}