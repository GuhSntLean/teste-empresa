import { Router } from "express";
import axios from "axios";
const EBCDIC = require("ebcdic-ascii").default;
const router = Router();

router.get("/home", async (request, response) => {
  const converter = new EBCDIC("0037");
  let cardNumber = await axios.get(
    "https://desafiotecnico314159265.free.beeceptor.com"
  );

  cardNumber.data.transacoes.forEach((element: any) => {
    // console.log(element.numeroCartao);
    const numerCard = converter.toASCII(element.numeroCartao);
    const stringCard = new String(numerCard);
    const lastNumber = Number(stringCard.charAt(15));
    const firstNumber = Number(stringCard.charAt(14));

    const soma = lastNumber + firstNumber;

    if (soma == 11) {
      console.log("Aprovado");
    } else {
      console.log("Negado");
    }

    const valorCompra = element.valorTransacao.toString();

    //const newCode: String = new String(valorCompra.concat(element.nomePortador));
    const converterNewCode: String = converter.toEBCDIC("Teste");

    console.log(converterNewCode);
  });

  response.send("Ola");
});

export { router };
