import { test, expect } from "@playwright/test";

test("Não deve logar quando o código de autenticação e invalido", async ({
  page,
}) => {
  const endpoint = "http://paybank-mf-auth:3000/";

  const expectedMessage = "Código inválido. Por favor, tente novamente.";
  const user = {
    cpf: "00000014141",
    password: "147258",
  };

  await page.goto(endpoint);
  await page.getByRole("textbox", { name: "Digite seu CPF" }).fill(user.cpf);
  await page.getByRole("button", { name: "Continuar" }).click();

  for (const digit of user.password) {
    await page.getByRole("button", { name: digit }).click();
  }

  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByRole("textbox", { name: "000000" }).fill("123456");
  await page.getByRole("button", { name: "Verificar" }).click();
  await expect(page.locator("span")).toContainText(expectedMessage);
});
