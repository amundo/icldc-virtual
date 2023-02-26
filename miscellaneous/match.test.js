import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {match} from './match.js'


Deno.test("matches", () => {
  const objectA = {
    "location": "together",
    "timing": "asynchronous",
    "screens": "one",
    "media": "audio"
  }
  
  const objectB = {
    "location": "together",
    "timing": "asynchronous",
    "screens": "one",
    "media": "audio"
  }
  assertEquals(match(objectA, objectB), true);
});


Deno.test("no match", () => {
  const objectA = {
    location: "together",
    timing: "asynchronous",
    screens: "one",
    media: "audio"
  };
  const objectB = {
    location: { value: "together" },
    timing: { value: "asynchronous" },
    screens: { value: "one" },
    media: { value: "video" }
  };
  assertEquals(match(objectA, objectB), false);
});


Deno.test("partial match", () => {
  const scenario = {
    location: "together",
    timing: "asynchronous",
    screens: "one",
    media: "audio"
  };
  const impossible = {
    location:  "together" ,
    timing: "asynchronous" 
  };
  assertEquals(match(impossible, scenario), true);
});
