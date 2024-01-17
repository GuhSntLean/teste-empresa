import { Router} from "express";

const router = Router();

router.get("/home", (request, response) => {
  console.log("Teste");
  response.send("Hello");
});

export { router };
