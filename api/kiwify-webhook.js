export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const data = req.body;

    // Evento da Kiwify
    const event = data.event;
    const email = data.customer?.email;
    const product = data.product?.name;

    if (!email) {
      return res.status(400).json({ error: "Email não encontrado" });
    }

    // EXEMPLO de planos
    let credits = 0;
    let plan = "FREE";

    if (product === "Plano PRO") {
      credits = 50;
      plan = "PRO";
    }

    if (product === "Plano PREMIUM") {
      credits = 9999;
      plan = "PREMIUM";
    }

    // AQUI você atualiza seu banco de dados
    // Exemplo:
    // updateUser(email, plan, credits)

    console.log("Pagamento aprovado:", email, plan);

    return res.status(200).json({
      success: true,
      email,
      plan,
      credits,
    });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
